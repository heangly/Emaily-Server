const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
require('colors')

const connectDB = require('./utils/db')
const schema = require('./graphql/schema')
const googleOAuth = require('./utils/googleOAuth/index')
const {
  CLIENT_DEVELOPMENT_URI,
  CLIENT_PRODUCTION_URI
} = require('./constants/URI')

dotenv.config()
connectDB()

const app = express()

// Must Specify cors ORIGIN(client or browser) here
app.use(
  cors({
    origin: [CLIENT_DEVELOPMENT_URI, CLIENT_PRODUCTION_URI],
    credentials: true
  })
)

googleOAuth(app)

app.get('/', (_, res) => res.send('Emaily server is running!!!'))

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
  })
)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`==> Server is running on PORT ${PORT} <==`.cyan.bold)
)
