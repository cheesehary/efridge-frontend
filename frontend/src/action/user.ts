import api from '../api/index';

export const updateUser = (payload: any) => ({ type: 'user/update', payload });

export const fetchUser = () => async (dispatch: any) => {
  try {
    const res = await api.graphql(`
    query {
      user {
        id
        firstName
      }
      profile {
        income
        savingsGoal
        balance
      }
    }
    `);
    const user = { ...res.data.user, ...res.data.profile };
    dispatch(updateUser(user));
  } catch (e) {
    console.log(e);
  }
};

// const createUser = () => {
//   api
//     .graphql({
//       query: `
//     mutation CreateUser($user: UserInput!) {
//       upsertUser(user: $user) {
//         id
//         firstName
//         lastName
//       }
//     }
//     `,
//       variables: { user: { firstName: 'test', lastName: 'graphql' } },
//     })
//     .then((res) => setResponse(res.data));
// };
