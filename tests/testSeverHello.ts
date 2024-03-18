import { ApolloServer } from 'apollo-server';
import axios from 'axios';
import { after, before, describe, it } from 'mocha';
import typeDefs from '../src/graphql/schemas';
import resolvers from '../src/graphql/resolvers/User';
import { expect } from 'chai';

let server: any;

describe('Teste de comunicação com o servidor Apollo', () => {
  before(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const port = 4000;
    const { url } = await server.listen({ port });
    console.log(`🚀  Server is running on port ${url}`);
  });


  it('Deve retornar a resposta "Hello world!" do servidor', async () => {
    const serverUrl = 'http://localhost:4000';

    try {
      const response = await axios.post(serverUrl, {
        query: '{ hello }',
      });
      expect(response.data.data.hello).to.equal("Hello World!")
    } catch (error) {
      throw new Error(`Erro na solicitação: ${error}`);
    }
  });

  after(async () => {
    await server.stop();
  });

});
