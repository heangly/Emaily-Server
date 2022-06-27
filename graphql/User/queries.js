const UserType = require('./type')

module.exports = {
  currentUser: {
    type: UserType,
    resolve(parentValue, args, context) {
      return context.user
    }
  }
}
