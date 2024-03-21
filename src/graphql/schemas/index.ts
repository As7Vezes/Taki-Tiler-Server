import { gql } from 'apollo-server';
import { queryTypeDefs } from './query';
import { mutationTypeDefs } from './mutations';

const typeDefs = gql`
  ${queryTypeDefs}

  ${mutationTypeDefs}
`;

export default typeDefs;
