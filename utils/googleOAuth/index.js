const passport = require('passport')
const cookieSession = require('./cookieSession')

const initializeGoogleStragety = require('./googleStrategy')
const User = require('../../models/User')

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
  app.get('/auth/google/callback', passport.authenticate('google'))

  // After asking for permission, Redirect after permission granted -> googleStrategyCallback will be called
}

module.exports = googleOAuth
