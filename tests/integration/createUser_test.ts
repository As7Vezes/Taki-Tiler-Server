import { before, describe, it, after } from "mocha";
import { expect } from "chai";
import { ApolloServer } from "apollo-server";
import typeDefs from "../../src/graphql/schemas";
import resolvers from "../../src/graphql/resolvers/User";
import axios from "axios";
import { UserInput } from "../../src/graphql/resolvers/User/Usermutation-resolvers";
import { User } from "../../src/entities/User";
import { DataSource } from "typeorm";
import { join } from "path";
import "dotenv/config"

let server: ApolloServer

describe("Testing connection with database and server", () => {
    before("connect to database and start server", async () => {

      const appDataSourceTest = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: [join(__dirname, '.././src/entities/*.ts')],
      });

        await appDataSourceTest.initialize();
        const user = appDataSourceTest.getRepository(User)
        user.clear()
        console.log("Database connected");

        expect(appDataSourceTest.isInitialized).to.be.true;

        server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        const { url } = await server.listen({ port: 4001 });
        console.log(`🚀  Server is running on port ${url}`);
    });

    it('It should return a user created - 200', async () => {

        const userData: UserInput = {
            name: 'Nome do Usuário',
            email: 'email@exemplo.com',
            password: 'senha123',
            birthDate: '1990-01-01', 
          };

        const serverUrl = 'http://localhost:4001/';

        try {
            const response = await axios.post(serverUrl, {
                query: `
                mutation ($data: UserInput) {
                  createUser(data: $data) {
                    id
                    name
                    email
                    birthDate
                  }
                }
              `,
              variables: { data: userData },
            });
            console.log(response.data.data)
            console.log(response.data.errors)
            expect(response.status).to.equal(200)
            /* expect(response.data.data).to.haveOwnProperty("createUser") */
        } catch (error) {
            throw new Error(`Request error: ${error}`);
        }
    });

    after(async () => {
        await server.stop();
    });
});
