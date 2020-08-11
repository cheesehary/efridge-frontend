import React, { useEffect } from 'react';
import { getCookie } from '../../util';
import Button from '@material-ui/core/Button';
import style from './style.module.scss';
import IMG_GOOGLE from '../../asset/google_logo.webp';

const LoginPage: React.FC<any> = ({ history }) => {
  useEffect(() => {
    if (getCookie('exp')) {
      history.replace('/app');
    }
  }, []);
  return (
    <div className={style.login}>
      <video className={style.bg} autoPlay muted loop>
        <source
          src="https://wyh-public.s3-ap-southeast-2.amazonaws.com/login_bg.mp4"
          type="video/mp4"
        />
      </video>
      <div className={style.content}>
        <p className={style.title}>
          <span></span>Develop good financial management habits... and watch
          your wealth grow
        </p>
        <div className={style.btnArea}>
          <Button onClick={login}>
            <img
              className={style.googleIcon}
              width="20px"
              alt="Google sign-in"
              src={IMG_GOOGLE}
            />
            <span className={style.googleLabel}>Sign in with Google</span>
          </Button>
        </div>
      </div>
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
