import { getManager } from 'typeorm';
import { User } from '../entity/User';
import { Profile } from '../entity/Profile';

export const saveUser = (payload: IUser) => {
  const manager = getManager();
  const userObj = manager.create(User, payload);
  return manager.save(userObj);
};

export const findOneUser = (payload: object) => {
  const manager = getManager();
  return manager.findOne(User, payload);
};

export const findProfileByUserId = (userId: string) => {
  const manager = getManager();
  return manager.findOne(Profile, { userId });
};

export const createUserAndProfile = async (payload: IUser) => {
  return await getManager().transaction(async (manager) => {
    const userObj = manager.create(User, payload);
    const user = await manager.save(userObj);
    const profileObj = manager.create(Profile, { userId: user.id });
    await manager.save(profileObj);
    return user;
  });
};

interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  googleId: string;
}
