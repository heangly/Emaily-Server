const User = require('../models/User')

const serializeUser = (passport) => {
  passport.serializeUser((user, done) => {
    // user.id is the model's id in MongoDB
    done(null, user.id)
  })
}

const deserializeUser = (passport) => {
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
  })
}

// after redirect and when user has been granted permission
const googleStrategyCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // 'accessToken' allows us to access/update the user's information on their google account
  // 'refreshToken' allows us to refresh the access token if it expires
  const exisitingUser = await User.findOne({ googleId: profile.id })

  if (exisitingUser) {
    //done(errorObject, data)
    done(null, exisitingUser)
  } else {
    const newUser = await User.create({
      googleId: profile.id
    })
    done(null, newUser)
  }
}

module.exports = { serializeUser, deserializeUser, googleStrategyCallback }
