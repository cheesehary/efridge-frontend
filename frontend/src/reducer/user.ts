const initialState = {
  id: '',
  firstName: '',
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
