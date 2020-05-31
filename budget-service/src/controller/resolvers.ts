import { findOneUser, findProfileByUserId } from '../service/UserService';

export default {
  Query: {
    user(obj, args, context) {
      return findOneUser({ id: context.userId });
    },
    profile(obj, args, context) {
      return findProfileByUserId(context.userId);
    },
  },
  Mutation: {
    // upsertUser(obj, { user }, context) {
    //   return saveUser(user);
    // },
  },
};
