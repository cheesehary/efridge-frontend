import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import api from './api';

const App = () => {
  const [response, setResponse] = useState('');
  useEffect(() => {
    api.get('/me').then((res) => setResponse(res.data));
  }, []);
  return <div className={style.title}>Hello {response}!!</div>;
};

export default App;
