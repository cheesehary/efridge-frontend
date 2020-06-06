import React, { useEffect } from 'react';
import { getCookie } from '../../util';

const LoginPage: React.FC<any> = ({ history }) => {
  useEffect(() => {
    if (getCookie('exp')) {
      history.replace('/app');
    }
  }, []);
  return (
    <div>
      <button onClick={login}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;

const login = () => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    process.env.GOOGLE_CLIENT_ID as string
  )}&redirect_uri=${
    process.env.GOOGLE_REDIRECT_URI
  }&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid&prompt=select_account`;
  window.location.href = url;
};
