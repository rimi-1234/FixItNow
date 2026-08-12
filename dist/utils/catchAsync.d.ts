import { Request, Response, NextFunction } from 'express';
declare const catchAsync: (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map