import { gql } from 'apollo-server';
export const mutationTypeDefs = gql`
  type Mutation {
    createUser(data: UserInput!): User
    updateUser(email: String!, data: UpdateUserInput): User
    deleteUser(email: String!): DeleteUserResponse
  }
`;
