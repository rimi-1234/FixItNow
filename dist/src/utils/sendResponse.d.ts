import { Response } from 'express';
type IApiReponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    data?: T | null;
    errorDetails?: any;
};
export declare const sendResponse: <T>(res: Response, data: IApiReponse<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map