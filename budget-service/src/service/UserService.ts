import { getManager } from 'typeorm';
import { User } from '../entity/User';

export const saveUser = (payload: IUser) => {
  const manager = getManager();
  const user = manager.create(User, payload);
  return manager.save(user);
};

export const findOneUser = (payload: object) => {
  const manager = getManager();
  return manager.findOne(User, payload);
};

interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  googleId: string;
}
