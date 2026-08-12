import jwt from 'jsonwebtoken';
export declare const generateToken: (payload: Record<string, unknown>, secret: string, expiresIn: string) => string;
export declare const verifyToken: (token: string, secret: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map