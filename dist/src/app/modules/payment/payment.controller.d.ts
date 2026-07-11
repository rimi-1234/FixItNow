import { Request, Response } from 'express';
export declare const PaymentControllers: {
    createPayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    confirmPayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    sslcommerzSuccess: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    sslcommerzFail: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    sslcommerzCancel: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    sslcommerzIPN: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getUserPayments: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPaymentDetails: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map