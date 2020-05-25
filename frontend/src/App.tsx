import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import api from './api';

const App = () => {
  const [name, setName] = useState('unknown');
  // const createUser = () => {
  //   api
  //     .graphql({
  //       query: `
  //     mutation CreateUser($user: UserInput!) {
  //       upsertUser(user: $user) {
  //         id
  //         firstName
  //         lastName
  //       }
  //     }
  //     `,
  //       variables: { user: { firstName: 'test', lastName: 'graphql' } },
  //     })
  //     .then((res) => setResponse(res.data));
  // };
  const login = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      process.env.GOOGLE_CLIENT_ID as string
    )}&redirect_uri=${
      process.env.GOOGLE_REDIRECT_URI
    }&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid`;
    window.location.href = url;
  };
  return (
    <div>
      <div className={style.title}>Hello {name}!</div>
      <button onClick={login}>login</button>
    </div>
  );
};

export default App;
