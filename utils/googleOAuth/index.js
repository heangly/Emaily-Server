const {
  serializeUser,
  deserializeUser,
  googleStrategyCallback
} = require('./passport')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieSession = require('./cookieSession')

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
      // this callback will automatically get  'accessToken', 'refreshToken', 'profile', 'done' as arguments
      googleStrategyCallback
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
  serializeUser(passport)
  deserializeUser(passport)

  initializeGoogleStragety()

  cookieSession(app)

  askForPermission(app)
  redirectAfterPermissionGranted(app)

  // convert these route to graphql please
  // app.get('/api/current_user', (req, res) => {
  //   res.json({ user: req.user })
  // })

  // app.get('/api/logout', (req, res) => {
  //   req.logout()
  //   res.json({ user: req.user })
  // })
}

module.exports = googleOAuth
