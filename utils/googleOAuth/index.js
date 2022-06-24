const passport = require('passport')
const cookieSession = require('./cookieSession')

const initializeGoogleStragety = require('./googleStrategy')
const User = require('../../models/User')
const {
  CLIENT_DEVELOPMENT_URI,
  CLIENT_PRODUCTION_URI
} = require('../../constants/URI')

const googleOAuth = (app) => {
  passport.serializeUser((user, done) => {
    // user.id is the model's id in MongoDB
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
  })

  initializeGoogleStragety(passport)

  cookieSession(app)

  // Ask for permission
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  // Redirect after permission granted
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const clientURL =
        process.env.NODE_ENV === 'development'
          ? CLIENT_DEVELOPMENT_URI
          : CLIENT_PRODUCTION_URI
      // if success
      // if (req.user) {
      //   res.redirect(clientURL)
      // } else {
      //   // fail login
      //   res.redirect('http://localhost:3000/login-failed')
      // }
      res.redirect(clientURL + '/surveys')
    }
  )

  // After asking for permission, Redirect after permission granted -> googleStrategyCallback will be called
}

module.exports = googleOAuth
