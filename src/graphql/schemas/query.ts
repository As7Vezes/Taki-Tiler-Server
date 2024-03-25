import { gql } from 'apollo-server';

export const queryTypeDefs = gql`
  type Query {
    hello: String!
    users: [User!]
    findUser(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    birthDate: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    birthDate: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    birthDate: String
  }

  type DeleteUserResponse {
    message: String!
  }
`;
