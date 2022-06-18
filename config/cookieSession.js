const cookieSession = require('cookie-session')
const passport = require('passport')

module.exports = (app) => {
  app.use(
    cookieSession({
      // last full 30 days
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY]
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())
}
