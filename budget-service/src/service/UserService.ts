import { getManager } from 'typeorm';
import { User } from '../entity/User';
import { Profile } from '../entity/Profile';

export const findUser = (payload: object) => {
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

export const updateProfile = async (userId: string, payload: IProfile) => {
  const manager = getManager();
  await manager.update(Profile, { userId }, payload);
  return manager.findOne(Profile, { userId });
};

interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  googleId: string;
}

interface IProfile {
  income: number;
  savingsGoal: number;
}
