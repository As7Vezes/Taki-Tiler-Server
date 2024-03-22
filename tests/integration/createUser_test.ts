import 'reflect-metadata';
import "dotenv/config"
import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';
import axios from 'axios';
import { UserInput } from '../../src/graphql/resolvers/User/Usermutation-resolvers';
import typeDefs from '../../src/graphql/schemas';
import resolvers from '../../src/graphql/resolvers/User';
import { ApolloServer } from 'apollo-server';
import { appDataSourceTest } from '../../src/db/data-source';
import { User } from '../../src/entities/User';
import { compare, hash } from 'bcrypt';
import createUserMutation from '../resolvers/mutations/createUserMutation';

let server: ApolloServer

describe('Testing connection with database and server', () => {
  before('connect to database and start server', async () => {

    const port = 4001

    await appDataSourceTest.initialize()

    const userRepo = appDataSourceTest.getRepository(User)
    userRepo.clear()

    server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);

  });

  it('It should return all the data of the user', async () => {

    const passwordHash = await hash('senha123', 10)

    const userData: UserInput = {
      name: 'usuarioTeste',
      email: 'email@exemplo.com',
      password: passwordHash,
      birthDate: '1990-01-01',
    };
    const isPasswordCorrect = await compare('senha123', passwordHash);
    const serverUrl = 'http://localhost:4001/';

    const response = await axios.post(serverUrl, {
      query: createUserMutation,
      variables: { data: userData },
    });
    console.log(response.data);
    expect(response.status).to.equal(200);
    expect(response.data.data.createUser).to.have.all.keys('id', 'name', 'email', 'birthDate');
    expect(response.data.data.createUser.name).to.equal(userData.name)
    expect(response.data.data.createUser.email).to.equal(userData.email)
    expect(response.data.data.createUser.birthDate).to.equal(userData.birthDate)
    expect(isPasswordCorrect).to.be.true;
  });

  after(async () => {
    await server.stop()
  })
});
