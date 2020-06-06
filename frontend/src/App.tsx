import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const LoginPage = loadable(() => import('./component/login'));
const AppPage = loadable(() => import('./component/Page'));

const App: React.FC<any> = () => {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <Route path="/app" component={AppPage} />
    </Router>
  );
};

export default App;
