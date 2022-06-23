const { GraphQLID, GraphQLList } = require('graphql')
const UserType = require('./type')
const UserModel = require('../../models/User')

module.exports = {
  // users: {
  //   type: new GraphQLList(UserType),
  //   resolve() {
  //     return UserModel.find()
  //   }
  // },

  currentUser: {
    type: UserType,
    resolve(parentValue, args, context) {
      return context.user
    }
  }
}
