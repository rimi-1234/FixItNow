import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { AuthServices } from './auth.service.js';
import config from '../../../config/index.js';
import {
  buildGoogleAuthUrl,
  exchangeGoogleCode,
  isGoogleOAuthConfigured,
  readGoogleOAuthState,
  signGoogleOAuthState,
} from './auth.google.js';

function requestOrigin(req: Request) {
  const proto = (req.get('x-forwarded-proto') ?? req.protocol ?? 'http').split(',')[0];
  const host = req.get('host') ?? 'localhost:5000';
  return `${proto}://${host}`.replace(/\/$/, '');
}

function oauthFrontendBase(req: Request) {
  const host = req.get('host') ?? '';
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'http://localhost:3000';
  }
  return (config.frontend_url || 'http://localhost:3000').replace(/\/$/, '');
}

function frontendAuthError(req: Request, code: string) {
  return `${oauthFrontendBase(req)}/login?error=${encodeURIComponent(code)}`;
}

function frontendAuthCallback(req: Request, accessToken: string) {
  const params = new URLSearchParams({ accessToken });
  return `${oauthFrontendBase(req)}/auth/callback?${params.toString()}`;
}

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await AuthServices.getMeFromDB(user.email);

  res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: result
  });
});

const demoLoginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.demoLoginUser(req.body.role);

  res.status(200).json({
    success: true,
    message: "Demo user logged in successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.updateProfile(req.user.id, req.body);
  res.status(200).json({ success: true, message: 'Profile updated successfully', data: result });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginWithGoogle(req.body);
  res.status(200).json({
    success: true,
    message: 'Google sign-in successful',
    data: result,
  });
});

const googleStart = catchAsync(async (req: Request, res: Response) => {
  if (!isGoogleOAuthConfigured()) {
    return res.redirect(302, frontendAuthError(req, 'google_not_configured'));
  }

  const role = req.query.role === 'TECHNICIAN' ? 'TECHNICIAN' : 'CUSTOMER';
  const state = signGoogleOAuthState({ role });
  const redirectUri = `${requestOrigin(req)}/api/auth/google/callback`;
  return res.redirect(302, buildGoogleAuthUrl(redirectUri, state));
});

const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const error = typeof req.query.error === 'string' ? req.query.error : '';
  if (error) {
    return res.redirect(302, frontendAuthError(req, 'google_denied'));
  }

  const code = typeof req.query.code === 'string' ? req.query.code : '';
  const state = typeof req.query.state === 'string' ? req.query.state : '';
  if (!code || !state) {
    return res.redirect(302, frontendAuthError(req, 'google_failed'));
  }

  try {
    const parsed = readGoogleOAuthState(state);
    const redirectUri = `${requestOrigin(req)}/api/auth/google/callback`;
    const idToken = await exchangeGoogleCode(code, redirectUri);
    const result = await AuthServices.loginWithGoogle({
      idToken,
      role: parsed.role === 'TECHNICIAN' ? Role.TECHNICIAN : Role.CUSTOMER,
    });
    return res.redirect(302, frontendAuthCallback(req, result.accessToken));
  } catch {
    return res.redirect(302, frontendAuthError(req, 'google_failed'));
  }
});

export const AuthControllers = {
  registerUser,
  loginUser,
  demoLoginUser,
  googleLogin,
  googleStart,
  googleCallback,
  getMe,
  updateProfile,
};
