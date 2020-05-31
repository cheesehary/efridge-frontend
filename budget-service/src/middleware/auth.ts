import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../service/AuthService';

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies.jwt;
  try {
    const claims = verifyToken(jwtToken);
    req.userId = claims.sub;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};
