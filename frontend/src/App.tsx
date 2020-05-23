import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import api from './api';

const App = () => {
  const [response, setResponse] = useState('');
  const createUser = () => {
    api
      .graphql({
        query: `
      mutation CreateUser($user: UserInput!) {
        upsertUser(user: $user) {
          id
          firstName
          lastName
        }
      }
      `,
        variables: { user: { firstName: 'test', lastName: 'graphql' } },
      })
      .then((res) => setResponse(res.data));
  };
  return (
    <div className={style.title} onClick={createUser}>
      Hello there!!
    </div>
  );
};

export default App;
