const express = require('express')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

// DEFINE PORT TO LINSTEN TO
const port = process.env.PORT || 5000
// RUN EXPRESS SERVER
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`))

