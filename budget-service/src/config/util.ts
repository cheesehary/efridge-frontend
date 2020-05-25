import { Request, Response, NextFunction } from 'express';

export const catchError = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn.call(null, req, res, next)).catch(next);
};
