import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => "Hello World!"
    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
})

const port = 3000

server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})