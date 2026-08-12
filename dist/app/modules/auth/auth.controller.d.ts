import { Request, Response } from 'express';
export declare const AuthControllers: {
    registerUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    loginUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    demoLoginUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    googleLogin: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    googleStart: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    googleCallback: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMe: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map