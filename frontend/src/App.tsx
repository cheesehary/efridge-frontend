import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const LoginPage = loadable(() => import('./component/login'));
const HomePage = loadable(() => import('./component/home'));

const App: React.FC<any> = () => {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <Route path="/app" component={HomePage} />
    </Router>
  );
};

export default App;
