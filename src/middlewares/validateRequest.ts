import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // Write coerced/validated values back so controllers see numbers, not strings.
      if (parsed && typeof parsed === 'object') {
        const data = parsed as {
          body?: unknown;
          query?: unknown;
          params?: unknown;
        };
        if (data.body !== undefined) req.body = data.body;
        if (data.query !== undefined) {
          req.query = data.query as Request['query'];
        }
        if (data.params !== undefined) {
          req.params = data.params as Request['params'];
        }
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
};
