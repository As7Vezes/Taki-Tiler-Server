import { ApolloServer } from 'apollo-server';
import axios from 'axios';
import { afterEach, beforeEach, describe, it } from 'node:test';
import typeDefs from '../src/graphql/schemas';
import resolvers from '../src/graphql/resolvers/User';

let server: any;

beforeEach(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const port = 4000;
  const { url } = await server.listen({ port });
  console.log(`🚀  Server is running on port ${url}`);
});

afterEach(async () => {
  await server.stop();
});

describe('Teste de comunicação com o servidor Apollo', () => {
  it('Deve retornar a resposta "Hello world!" do servidor', async () => {
    const serverUrl = 'http://localhost:4000';

    try {
      const response = await axios.post(serverUrl, {
        query: '{ hello }',
      });
      console.log(response.data);
    } catch (error) {
      throw new Error(`Erro na solicitação: ${error}`);
    }
  });
});
