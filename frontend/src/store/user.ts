const initialState = {
  id: '',
  firstName: '',
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: object }
) => {
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
