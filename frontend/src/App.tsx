import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import CssBaseline from '@material-ui/core/CssBaseline';

const LoginPage = loadable(() => import('./component/login'));
const AppPage = loadable(() => import('./component/Page'));

const App: React.FC<any> = () => {
  return (
    <Router>
      <CssBaseline />
      <Route exact path="/" component={LoginPage} />
      <Route path="/app" component={AppPage} />
    </Router>
  );
};

export default App;
