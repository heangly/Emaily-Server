const { GraphQLID, GraphQLObjectType, GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    googleId: { type: GraphQLID },
    stripeCustomerId: { type: GraphQLID },
    credit: { type: GraphQLInt }
  })
})
