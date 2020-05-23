export const schema = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  user(id: ID!): User!
  profile: Profile!
}

type Mutation {
  upsertProfile: Profile!
  upsertUser(user: UserInput!): User!
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
}

type Profile {
  id: ID!
  income: Int!
  savingsGoal: Int!
  balance: Int!
}

input UserInput {
  id: ID
  firstName: String
  lastName: String
}
`;
