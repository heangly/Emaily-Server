const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

const initializeGoogleStragety = () => {
  passport.use(
    // first initialize the strategy
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
      },

      // after redirect and when user has been granted permission
      async (accessToken, refreshToken, profile, done) => {
        // 'accessToken' allows us to access/update the user's information on their google account
        // 'refreshToken' allows us to refresh the access token if it expires
        const newUser = await User.create({
          googleId: profile.id
        })

        console.log(newUser)
      }
    )
  )
}

const askForPermission = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )
}

const redirectAfterPermissionGranted = (app) => {
  app.get('/auth/google/callback', passport.authenticate('google'))
}

const googleOAuth = (app) => {
  initializeGoogleStragety()
  askForPermission(app)
  redirectAfterPermissionGranted(app)
}

module.exports = googleOAuth
