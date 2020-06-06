import api from '../api/index';

export const updateFinance = (payload: {
  id: string;
  income: number;
  year: number;
  month: number;
}) => ({ type: 'finance/updateFinance', payload });

export const replaceFinance = (payload: {
  id: string;
  income: number;
  year: number;
  month: number;
}) => ({ type: 'finance/replaceFinance', payload });

export const replaceExpenses = (payload: {
  expenses: Array<any>;
  year: number;
  month: number;
}) => ({ type: 'finance/replaceExpenses', payload });

export const fetchFinanceWithExpenses = (payload: {
  year: number;
  month: number;
}) => async (dispatch: any) => {
  try {
    const res = await api.graphql({
      query: `
      query FetchFinanceWithExpenses($year: Int!, $month: Int!) {
        finance(year: $year, month: $month) {
          id
          income
        }
        expense(year: $year, month: $month) {
          id
          amount
          tag
          category
        }
      }
      `,
      variables: { year: payload.year, month: payload.month },
    });
    const finance = {
      ...res.data.finance,
      year: payload.year,
      month: payload.month,
    };
    const expenses = {
      expenses: res.data.expense,
      year: payload.year,
      month: payload.month,
    };
    dispatch(replaceFinance(finance));
    dispatch(replaceExpenses(expenses));
  } catch (e) {
    console.log(e);
  }
};

// export const fetchExpenses = (payload: {
//   year: number;
//   month: number;
// }) => async (dispatch: any) => {
//   try {
//     const res = await api.graphql({
//       query: `
//       query FetchExpenses($year: Int!, $month: Int!) {
//         expense(year: $year, month: $month) {
//           id
//           amount
//           tag
//           category
//         }
//       }
//       `,
//       variables: { year: payload.year, month: payload.month },
//     });
//     const expenses = {
//       expenses: res.data.expense,
//       year: payload.year,
//       month: payload.month,
//     };
//     dispatch(replaceExpenses(expenses));
//   } catch (e) {
//     console.log(e);
//   }
// };

export const createOrUpdateFinance = (payload: {
  id?: string;
  income: number;
  year: number;
  month: number;
}) => async (dispatch: any) => {
  try {
    const res = await api.graphql({
      query: `
      mutation CreateOrUpdateFinance($f: FinanceInput!) {
        createOrUpdateFinance(finance: $f) {
          id
          income
        }
      }
      `,
      variables: { f: payload },
    });
    const finance = {
      year: payload.year,
      month: payload.month,
      ...res.data.createOrUpdateFinance,
    };
    dispatch(updateFinance(finance));
  } catch (e) {
    console.log(e);
  }
};

export const createOrUpdateExpense = (payload: {
  expense: IExpense;
  year: number;
  month: number;
}) => async (dispatch: any) => {
  try {
    const res = await api.graphql({
      query: `
      mutation CreateOrUpdateExpense($exp: ExpenseInput!) {
        createOrUpdateExpense(expense: $exp) {
          id
          amount
          tag
          category
        }
      }
      `,
      variables: { exp: payload.expense },
    });
    if (payload.expense.id) {
      dispatch(
        updateExpense({
          year: payload.year,
          month: payload.month,
          expense: res.data.createOrUpdateExpense,
        })
      );
    } else {
      dispatch(
        addExpense({
          year: payload.year,
          month: payload.month,
          expense: res.data.createOrUpdateExpense,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateExpense = (payload: any) => ({
  type: 'finance/updateExpense',
  payload,
});

export const addExpense = (payload: any) => ({
  type: 'finance/addExpense',
  payload,
});

export const deleteExpense = (payload: {
  expense: any;
  year: number;
  month: number;
}) => async (dispatch: any) => {
  try {
    const res = await api.graphql({
      query: `
      mutation DeleteExpense($id: ID!) {
        deleteExpense(id: $id)
      }
      `,
      variables: { id: payload.expense.id },
    });
    dispatch(removeExpense(payload));
  } catch (e) {
    console.log(e);
  }
};

export const removeExpense = (payload: any) => ({
  type: 'finance/removeExpense',
  payload,
});

interface IExpense {
  id?: string;
  financeId?: string;
  amount: number;
  tag?: string;
  category: string;
}
