const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { ruruHTML } = require("ruru/server")
const { buildSchema } = require("graphql")

const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

const root = {
    hello: () => {
        return "Hello World!"
    }
}

const app = express()

app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
        graphql: true
    })
)

app.get("/", (_req, res) => {
    res.type("html")
    res.send(ruruHTML({ endpoint: "graphql" }))
})

app.listen(4000)
console.log("Server running at port http://localhost:4000")