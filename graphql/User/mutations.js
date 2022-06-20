const UserType = require('./type')

module.exports = {
  logout: {
    type: UserType,
    resolve(parent, args, context) {
      context.logout()
      return context.user
    }
  }
}
