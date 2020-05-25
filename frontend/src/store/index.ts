import { combineReducers, createStore } from 'redux';
import user from './user';

const reducer = combineReducers({
  user,
});

export default createStore(reducer);
