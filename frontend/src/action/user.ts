import api from '../api/index';

export const updateUser = (payload: any) => ({ type: 'user/update', payload });

export const fetchUser = () => async (dispatch: any) => {
  try {
    const res = await api.graphql(`
    query FetchUser {
      user {
        id
        firstName
      }
      profile {
        income
        savingsGoal
      }
      balance
    }
    `);
    dispatch(updateUser(res.data.user));
    dispatch(
      setFinanceInfo({
        balance: res.data.balance,
        defaultIncome: res.data.profile.income,
        savingsGoal: res.data.profile.savingsGoal,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const updateProfile = (payload: any) => async (dispatch: any) => {
  try {
    const res = await api.graphql({
      query: `
      mutation UpdateProfile($p: ProfileInput!) {
        updateProfile(profile: $p) {
          income
          savingsGoal
        }
      }
      `,
      variables: { p: payload },
    });
    dispatch(
      setFinanceInfo({
        defaultIncome: res.data.updateProfile.income,
        savingsGoal: res.data.updateProfile.savingsGoal,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const setFinanceInfo = (payload: any) => ({
  type: 'finance/setFinanceInfo',
  payload,
});
