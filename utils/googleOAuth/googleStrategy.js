const User = require('../../models/User')
const stripe = require('../stripe/stripeInstance')
const GoogleStrategy = require('passport-google-oauth20').Strategy

module.exports = (passport) => {
  passport.use(
    // first initialize the strategy
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
      },

      // after redirect and when user has been granted permission
      async (accessToken, refreshToken, profile, done) => {
        // 'accessToken' allows us to access/update the user's information on their google account
        // 'refreshToken' allows us to refresh the access token if it expires
        const exisitingUser = await User.findOne({ googleId: profile.id })

        if (exisitingUser) {
          //done(errorObject, data)
          done(null, exisitingUser)
        } else {
          const stripeCustomer = await stripe.customers.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value
            },
            { apiKey: process.env.STRIPE_SECRET_KEY }
          )

          const newUser = await User.create({
            googleId: profile.id,
            stripeCustomerId: stripeCustomer.id,
            credit: 0
          })
          done(null, newUser)
        }
      }
    )
  )
}
