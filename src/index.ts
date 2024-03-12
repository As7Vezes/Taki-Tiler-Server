import { ApolloServer, gql } from 'apollo-server';
import 'reflect-metadata';
import { connectDatabase } from './db/data-source';
import 'dotenv/config';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 3000;

async function startSever() {

  try {
    const connection = await connectDatabase();
    if (connection) {
      const { url } = await server.listen({ port });
      console.log(`🚀  Server ready at ${url}`);
    }
  } catch (error) {
    console.error('error: ' + error);
  }
}

startSever();
