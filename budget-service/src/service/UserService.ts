import { getManager } from 'typeorm';
import { User } from '../entity/User';

export const saveUser = ({ id, firstName, lastName }) => {
  const manager = getManager();
  const user = manager.create(User, { id, firstName, lastName });
  return manager.save(user);
};
