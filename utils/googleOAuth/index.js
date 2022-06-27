const passport = require('passport')
const cookieSession = require('./cookieSession')

const initializeGoogleStragety = require('./googleStrategy')
const User = require('../../models/User')
const { CLIENT_URI } = require('../../constants/URI')

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
      // if success
      // if (req.user) {
      //   res.redirect(clientURL)
      // } else {
      //   // fail login
      //   res.redirect('http://localhost:3000/login-failed')
      // }
      res.redirect(CLIENT_URI + '/surveys')
    }
  )

  // After asking for permission, Redirect after permission granted -> googleStrategyCallback will be called
}

module.exports = googleOAuth
