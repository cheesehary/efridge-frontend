import { Request, Response, NextFunction } from 'express';
import { catchError } from '../config/util';
import {
  exchangeCodeForToken,
  createTokenFromUser,
  extractExpiryFromToken,
} from '../service/AuthService';
import { createUserAndProfile, findOneUser } from '../service/UserService';

const _login = async (req: Request, res: Response) => {
  const error = req.query.error;
  const code = req.query.code as string;
  if (error || !code) {
    console.log(error);
    return res.end();
  }
  const token = await exchangeCodeForToken(code);
  let user = await findOneUser({ googleId: token.sub });
  if (!user) {
    user = await createUserAndProfile({
      firstName: token.given_name,
      lastName: token.family_name,
      googleId: token.sub,
    });
  }
  const jwtToken = createTokenFromUser(user);
  return res
    .cookie('jwt', jwtToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    })
    .cookie('exp', extractExpiryFromToken(jwtToken), {
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax',
    })
    .redirect(process.env.APP_URL + '/app');
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('unexpected error, ', err);
  return res.status(500).json({ message: 'server error' });
};

export const login = catchError(_login);
