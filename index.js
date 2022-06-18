const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
require('colors')

const connectDB = require('./config/db')
const schema = require('./graphql/schema')
const googleOAuth = require('./config/googleOAuth')
const cookieSession = require('./config/cookieSession')

dotenv.config()
connectDB()

const app = express()
// app.use(cors())

cookieSession(app)
googleOAuth(app)

app.get('/', (_, res) => res.send('Emaily server is running!!!'))

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    formatError: (err) => {
      console.log('formatError', err)
      return err.message
    }
  })
)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`==> Server is running on PORT ${PORT} <==`.cyan.bold)
)
