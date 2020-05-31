import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../action/user';

const HomePage: React.FC<any> = ({ dispatch, user }) => {
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div>
      <div>Hello, {user.firstName}</div>
    </div>
  );
};

export default connect((state: any) => ({
  user: state.user,
}))(HomePage);
