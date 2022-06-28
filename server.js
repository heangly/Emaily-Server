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
  CLIENT_PRODUCTION_URI,
  CLIENT_URI
} = require('./constants/URI')
const stripe = require('./utils/stripe/stripeInstance')
const User = require('./models/User')

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

app.use('/api/checkout/success', async (req, res) => {
  if (req.query.session_id) {
    const { status, amount_total } = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
      {
        apiKey: process.env.STRIPE_SECRET_KEY
      }
    )

    const userId = req.user.id

    if (userId && status === 'complete') {
      const user = await User.findById(userId)

      await User.findByIdAndUpdate(userId, {
        credits: user.credits + amount_total / 100
      })
    }
  }

  res.redirect(CLIENT_URI)
})

app.use('/api/checkout/fail', (req, res) => {
  res.redirect(CLIENT_URI)
})

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
