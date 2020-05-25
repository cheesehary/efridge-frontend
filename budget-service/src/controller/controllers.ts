import { Request, Response, NextFunction } from 'express';
import { catchError } from '../config/util';
import { exchangeCodeForToken } from '../service/AuthService';
import { saveUser, findOneUser } from '../service/UserService';

const _login = async (req: Request, res: Response, next: NextFunction) => {
  const error = req.query.error;
  const code = req.query.code as string;
  if (error || !code) {
    console.log(error);
    return res.end();
  }
  const token = await exchangeCodeForToken(code);
  const user = await findOneUser({ googleId: token.sub });
  if (!user) {
    await saveUser({
      firstName: token.given_name,
      lastName: token.family_name,
      googleId: token.sub,
    });
  }
  return res.redirect(process.env.APP_URL);
};

export const login = catchError(_login);
