const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const UserQueries = require('./User/queries')
const UserMutations = require('./User/mutations')
const PaymentQueries = require('./Payment/queries')
const PaymentMutations = require('./Payment/mutations')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: { ...UserQueries, ...PaymentQueries }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: { ...UserMutations, ...PaymentMutations }
  })
})
