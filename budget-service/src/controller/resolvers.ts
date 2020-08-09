import {
  findUser,
  findProfileByUserId,
  updateProfile,
} from '../service/UserService';
import {
  findFinance,
  createFinance,
  createExpense,
  updateFinance,
  findExpenses,
  updateExpense,
  deleteExpense,
  calculateBalance,
} from '../service/FinanceService';

export default {
  Query: {
    user(obj, args, { userId }) {
      console.log('userId: ', userId);
      return findUser({ id: userId });
    },
    profile(obj, args, { userId }) {
      return findProfileByUserId(userId);
    },
    finance(obj, args, { userId }) {
      return findFinance({
        userId,
        year: args.year,
        month: args.month,
      });
    },
    expense(obj, args, { userId }) {
      return findExpenses({
        userId,
        year: args.year,
        month: args.month,
      });
    },
    balance(obj, args, { userId }) {
      return calculateBalance(userId);
    },
  },
  Mutation: {
    updateProfile(obj, args, { userId }) {
      return updateProfile(userId, args.profile);
    },
    createOrUpdateFinance(obj, args, { userId }) {
      if (args.finance.id) {
        return updateFinance(args.finance.id, args.finance);
      }
      return createFinance({ ...args.finance, userId });
    },
    createOrUpdateExpense(obj, args, { userId }) {
      if (args.expense.id) {
        return updateExpense(args.expense.id, args.expense);
      }
      return createExpense({ ...args.expense, userId });
    },
    async deleteExpense(obj, args, { userId }) {
      await deleteExpense(args.id);
      return args.id;
    },
  },
};
