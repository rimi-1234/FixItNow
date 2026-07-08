import { Request, Response, NextFunction } from 'express';

import { ZodError } from 'zod';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errorDetails = err;

    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorDetails = {
            issues: err.issues.map(issue => ({
                field: issue.path[issue.path.length - 1],
                message: issue.message
            }))
        };
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorDetails
    });
};
