const initialState = {
  id: '',
  firstName: '',
  income: 0,
  savingsGoal: 0,
  balance: 0,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case 'user/update':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
