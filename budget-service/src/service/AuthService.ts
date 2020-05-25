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
    console.error(e.response.data);
    throw e;
  }
};

interface IToken {
  sub: string;
  email: string;
  family_name: string;
  given_name: string;
}
