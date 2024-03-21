import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers/User';
import { connectDatabase } from './db/data-source';

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
