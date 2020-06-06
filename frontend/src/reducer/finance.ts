const initialState: IFinanceState = {
  financeMap: {},
  expenseMap: {},
  balance: 0,
  savingsGoal: 0,
  defaultIncome: 0,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case 'finance/updateFinance': {
      const key = `${payload.year}-${payload.month}`;
      let balance = state.balance;
      if (payload.income) {
        if (state.financeMap[key] && state.financeMap[key].income) {
          balance += payload.income - state.financeMap[key].income;
        } else {
          balance += payload.income - state.savingsGoal;
        }
      }
      const financeMap = {
        ...state.financeMap,
        [key]: {
          id: payload.id,
          income: payload.income,
        },
      };
      return {
        ...state,
        financeMap,
        balance,
      };
    }
    case 'finance/replaceFinance': {
      const key = `${payload.year}-${payload.month}`;
      const financeMap = {
        ...state.financeMap,
        [key]: {
          id: payload.id,
          income: payload.income,
        },
      };
      return {
        ...state,
        financeMap,
      };
    }
    case 'finance/replaceExpenses': {
      const key = `${payload.year}-${payload.month}`;
      const expenseMap = {
        ...state.expenseMap,
        [key]: payload.expenses,
      };
      return {
        ...state,
        expenseMap,
      };
    }
    case 'finance/updateExpense': {
      const key = `${payload.year}-${payload.month}`;
      const expenses = [...state.expenseMap[key]];
      const index = expenses.findIndex((exp) => exp.id === payload.expense.id);
      let balance = state.balance;
      balance -= payload.expense.amount - expenses[index].amount;
      expenses[index] = payload.expense;
      const expenseMap = {
        ...state.expenseMap,
        [key]: expenses,
      };
      return {
        ...state,
        expenseMap,
        balance,
      };
    }
    case 'finance/addExpense': {
      const key = `${payload.year}-${payload.month}`;
      const expenses = [...state.expenseMap[key]];
      expenses.push(payload.expense);
      const expenseMap = {
        ...state.expenseMap,
        [key]: expenses,
      };
      let balance = state.balance;
      balance -= payload.expense.amount;
      return {
        ...state,
        expenseMap,
        balance,
      };
    }
    case 'finance/removeExpense': {
      const key = `${payload.year}-${payload.month}`;
      const expenses = state.expenseMap[key].filter(
        (exp) => exp.id !== payload.expense.id
      );
      const expenseMap = {
        ...state.expenseMap,
        [key]: expenses,
      };
      let balance = state.balance;
      balance += payload.expense.amount;
      return {
        ...state,
        expenseMap,
        balance,
      };
    }
    case 'finance/setFinanceInfo': {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

interface IFinanceState {
  financeMap: {
    [date: string]: {
      id: string;
      income: number;
    };
  };
  expenseMap: {
    [date: string]: Array<{
      id: string;
      amount: number;
      tag?: string;
      category: string;
    }>;
  };
  balance: number;
  savingsGoal: number;
  defaultIncome: number;
}
