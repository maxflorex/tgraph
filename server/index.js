const express = require('express')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
const connectDB = require('./config/db');

// CONNECT TO DB
connectDB()


// DEFINE PORT TO LINSTEN TO
const port = process.env.PORT || 5000

// RUN EXPRESS SERVER
const app = express()

// MIDDLEWARE
app.use(cors())

// GRAPHQL PLAYGROUND
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

// PORT LISTENER
app.listen(port, console.log(`Server running on port ${port}`))

