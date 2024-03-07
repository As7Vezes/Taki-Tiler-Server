var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { ruruHTML } = require("ruru/server")
var { buildSchema } = require("graphql")

var schema = buildSchema(`
    type Query {
        hello: String
    }
`)

var root = {
    hello: () => {
        return "Hello World!"
    }
}

var app = express()

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