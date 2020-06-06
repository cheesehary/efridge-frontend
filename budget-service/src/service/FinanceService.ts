import { getManager } from 'typeorm';
import { Finance } from '../entity/Finance';
import { Expense } from '../entity/Expense';
import { Profile } from '../entity/Profile';

export const findFinance = (payload: object) => {
  const manager = getManager();
  return manager.findOne(Finance, payload);
};

export const findExpenses = async (payload: object) => {
  const manager = getManager();
  const finance = await manager.findOne(Finance, payload);
  if (!finance) return [];
  return manager.find(Expense, { financeId: finance.id });
};

export const createFinance = (payload: object) => {
  const manager = getManager();
  const financeObj = manager.create(Finance, payload);
  return manager.save(Finance, financeObj);
};

export const updateFinance = async (id: string, payload: object) => {
  const manager = getManager();
  await manager.update(Finance, id, payload);
  return manager.findOne(Finance, { id });
};

export const createExpense = (payload: object) => {
  const manager = getManager();
  const expenseObj = manager.create(Expense, payload);
  return manager.save(Expense, expenseObj);
};

export const updateExpense = async (id: string, payload: object) => {
  const manager = getManager();
  await manager.update(Expense, id, payload);
  return manager.findOne(Expense, { id });
};

export const deleteExpense = (id: string) => {
  const manager = getManager();
  return manager.delete(Expense, id);
};

export const calculateBalance = async (userId: string) => {
  const manager = getManager();
  const rawIncome = await manager.query(
    `SELECT COUNT(*) AS months, SUM(income) AS income FROM finance WHERE userId='${userId}';`
  );
  if (!rawIncome[0].income) {
    return 0;
  }
  const income = rawIncome[0].income;
  const months = rawIncome[0].months;
  const profile = await manager.findOne(Profile, { userId });
  const rawSpending = await manager.query(
    `SELECT SUM(amount) AS spending FROM expense WHERE userId='${userId}';`
  );
  const spending = rawSpending[0].spending || 0;
  return income - spending - months * profile.savingsGoal;
};
