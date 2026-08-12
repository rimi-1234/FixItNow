import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';

export type GoogleOAuthState = {
  purpose: 'google_oauth';
  role: 'CUSTOMER' | 'TECHNICIAN';
  next?: string;
};

export type GoogleIdProfile = {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
};

const httpError = (message: string, statusCode: number) =>
  Object.assign(new Error(message), { statusCode });

export function isGoogleOAuthConfigured() {
  return Boolean(config.google_client_id && config.google_client_secret);
}

export function signGoogleOAuthState(payload: Omit<GoogleOAuthState, 'purpose'>) {
  return jwt.sign(
    { purpose: 'google_oauth', role: payload.role, next: payload.next },
    config.jwt_access_secret as string,
    { expiresIn: '10m' }
  );
}

export function readGoogleOAuthState(state: string): GoogleOAuthState {
  const decoded = jwt.verify(state, config.jwt_access_secret as string) as GoogleOAuthState;
  if (decoded?.purpose !== 'google_oauth') {
    throw httpError('Invalid Google sign-in state', 400);
  }
  const role = decoded.role === 'TECHNICIAN' ? 'TECHNICIAN' : 'CUSTOMER';
  return { purpose: 'google_oauth', role, next: decoded.next };
}

export function buildGoogleAuthUrl(redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: config.google_client_id,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
    access_type: 'online',
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string, redirectUri: string) {
  const body = new URLSearchParams({
    code,
    client_id: config.google_client_id,
    client_secret: config.google_client_secret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const payload = (await response.json()) as { id_token?: string; error?: string };

  if (!response.ok || !payload.id_token) {
    throw httpError(payload.error || 'Failed to exchange Google authorization code', 401);
  }

  return payload.id_token;
}

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleIdProfile> {
  if (!config.google_client_id) {
    throw httpError('Google sign-in is not configured', 503);
  }

  const response = await fetch(
    `${GOOGLE_TOKENINFO_URL}?id_token=${encodeURIComponent(idToken)}`
  );
  const payload = (await response.json()) as {
    aud?: string;
    iss?: string;
    sub?: string;
    email?: string;
    email_verified?: boolean | string;
    name?: string;
    picture?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !payload.sub || !payload.email) {
    throw httpError(payload.error_description || payload.error || 'Google token is invalid', 401);
  }

  if (payload.aud !== config.google_client_id) {
    throw httpError('Google token audience mismatch', 401);
  }

  const issuer = String(payload.iss || '');
  if (issuer !== 'https://accounts.google.com' && issuer !== 'accounts.google.com') {
    throw httpError('Google token issuer is invalid', 401);
  }

  const verified = payload.email_verified === true || payload.email_verified === 'true';
  if (!verified) {
    throw httpError('Google account email is not verified', 401);
  }

  return {
    sub: payload.sub,
    email: payload.email.toLowerCase(),
    name: payload.name,
    picture: payload.picture,
  };
}
