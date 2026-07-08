import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.startsWith("Bearer ") ?
        req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;
      if (!token) {
        return res.status(401).json({ success: false, message: 'You are not authorized', errorDetails: 'No token provided' });
      }

      const decoded = jwt.verify(token, config.jwt_access_secret as string) as any;
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden', errorDetails: 'You do not have the required permissions' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
