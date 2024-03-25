import 'reflect-metadata';
import 'dotenv/config';
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
import queryUsers from '../resolvers/query/queryUsers';

let server: ApolloServer;
const serverUrl = 'http://localhost:4001/';

describe('Testing connection with database and server', () => {
  before('connect to database and start server', async () => {
    const port = 4001;

    await appDataSourceTest.initialize();

    const userRepo = appDataSourceTest.getRepository(User);
    userRepo.clear();

    server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  });

  it('It should return all the data of the user', async () => {
    const passwordHash = await hash('senha123', 10);

    const userData: UserInput = {
      name: 'usuarioTeste',
      email: 'email@exemplo.com',
      password: passwordHash,
      birthDate: '1990-01-01',
    };
    const isPasswordCorrect = await compare('senha123', passwordHash);

    const response = await axios.post(serverUrl, {
      query: createUserMutation,
      variables: { data: userData },
    });

    //verify data of user
    expect(response.status).to.equal(200);
    expect(response.data.data.createUser).to.have.all.keys('id', 'name', 'email', 'birthDate');
    expect(response.data.data.createUser.name).to.equal(userData.name);
    expect(response.data.data.createUser.email).to.equal(userData.email);
    expect(response.data.data.createUser.birthDate).to.equal(userData.birthDate);

    //verify the password is hashed
    expect(isPasswordCorrect).to.be.true;
  });

  it('It should not allow creating two identical emails.', async () => {
    const userRepo = appDataSourceTest.getRepository(User);
    await userRepo.save({
      name: 'testName',
      email: 'testmail@email.com',
      birthDate: '15-01-2004',
      password: '123456a',
    });

    const response = await axios.post(serverUrl, {
      query: createUserMutation,
      variables: {
        data: {
          name: 'testName',
          email: 'testmail@email.com',
          birthDate: '15-01-2004',
          password: '123456a',
        },
      },
    });

    const { errors } = response.data;
    console.log(response.data.errors)
    expect(errors[0]).to.be.an('object');
    expect(errors[0]).to.have.property('message').that.is.equal('User alredy exists with same email.');
  });

  it("It should return the data from the API of the 'users' query.", async () => {
    const response = await axios.post(serverUrl, {
      query: queryUsers,
    });

    // Verify if the response was successful (status 200) and if it contains data.
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('users');
    expect(response.data.data.users).to.be.an('array');

    // Verify the returned data.
    const users = response.data.data.users;
    expect(users).to.have.length.greaterThan(0);
    users.forEach((user: User) => {
      expect(user).to.have.property('id');
      expect(user).to.have.property('name');
      expect(user).to.have.property('email');
      expect(user).to.have.property('birthDate');
    });
  });

  after(async () => {
    await server.stop();
  });
});
