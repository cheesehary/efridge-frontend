import axios from 'axios';
import jwt from 'jsonwebtoken';

export const exchangeCodeForToken = async (code: string): Promise<IToken> => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });
    const token = jwt.decode(response.data.id_token) as IToken;
    return token;
  } catch (e) {
    console.error('exchange failed: ', e.response.data);
    throw e;
  }
};

export const createTokenFromUser = (user: any): string => {
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '1h',
    subject: user.id,
  });
};

export const verifyToken = (token: string): IClaims => {
  return jwt.verify(token, process.env.JWT_SECRET) as IClaims;
};

export const extractExpiryFromToken = (token: string): number => {
  const jwtToken = jwt.decode(token) as IClaims;
  return jwtToken.exp;
};

interface IToken {
  sub: string;
  email: string;
  family_name: string;
  given_name: string;
}

interface IUser {
  id: string;
}

interface IClaims {
  sub: string;
  exp: number;
}
