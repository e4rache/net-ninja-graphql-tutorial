const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config.js')

const app = express()

mongoose.connect(config.MONGOOSE_CONNECT_URL, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for request on port 4000')
})

