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
export declare function isGoogleOAuthConfigured(): boolean;
export declare function signGoogleOAuthState(payload: Omit<GoogleOAuthState, 'purpose'>): string;
export declare function readGoogleOAuthState(state: string): GoogleOAuthState;
export declare function buildGoogleAuthUrl(redirectUri: string, state: string): string;
export declare function exchangeGoogleCode(code: string, redirectUri: string): Promise<string>;
export declare function verifyGoogleIdToken(idToken: string): Promise<GoogleIdProfile>;
//# sourceMappingURL=auth.google.d.ts.map