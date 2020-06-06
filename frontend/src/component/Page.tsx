import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { fetchUser } from '../action/user';

const HomePage = loadable(() => import('./home'));
const ProfilePage = loadable(() => import('./profile'));

const Page: React.FC<any> = ({ dispatch, match, userId }) => {
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  if (match.url.charAt(match.url.length - 1) === '/') {
    return (
      <Redirect to={match.url.substring(0, match.url.length - 1)}></Redirect>
    );
  }
  if (!userId) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Route exact path={`${match.path}`} component={HomePage} />
      <Route path={`${match.path}/profile`} component={ProfilePage} />
    </Router>
  );
};

export default connect((state: any) => ({ userId: state.user.id }))(Page);
