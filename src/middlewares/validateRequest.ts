import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

/** Express 5 exposes req.query as a getter-only property — redefine to write coerced values. */
function setRequestQuery(req: Request, value: unknown) {
  Object.defineProperty(req, 'query', {
    value: value as Request['query'],
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

function setRequestParams(req: Request, value: unknown) {
  try {
    req.params = value as Request['params'];
  } catch {
    Object.defineProperty(req, 'params', {
      value: value as Request['params'],
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }
}

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
          setRequestQuery(req, data.query);
        }
        if (data.params !== undefined) {
          setRequestParams(req, data.params);
        }
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
};
