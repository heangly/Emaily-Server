const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Price',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt }
  })
})

module.exports = new GraphQLObjectType({
  name: 'Checkout',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    url: { type: GraphQLString }
  })
})
