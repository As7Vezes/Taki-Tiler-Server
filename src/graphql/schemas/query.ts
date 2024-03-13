import { gql } from 'apollo-server';

export const queryTypeDefs = gql`
  type Query {
    hello: String
    users: [User]
  }

  type User {
    id: String!
    name: String!
    email: String!
    birthDate: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    birthDate: String
  }
`;
