import financeReducer from './finance';

test('finance/updateExpense', () => {
  const initialState = {
    financeMap: {},
    expenseMap: {
      '2020-1': [
        {
          id: 'exp1',
          amount: 200,
          category: 'Groceries',
        },
      ],
    },
    balance: 1000,
    savingsGoal: 0,
    defaultIncome: 0,
  };
  const payload = {
    year: '2020',
    month: '1',
    expense: {
      id: 'exp1',
      amount: 400,
      category: 'Entertainment',
      tag: 'Switch',
    },
  };
  const state = financeReducer(initialState as any, {
    type: 'finance/updateExpense',
    payload,
  });
  expect(state.balance).toBe(800);
  expect(state.expenseMap['2020-1']).toEqual([
    {
      id: 'exp1',
      amount: 400,
      category: 'Entertainment',
      tag: 'Switch',
    },
  ]);
});
