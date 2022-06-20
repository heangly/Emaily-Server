const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const UserQueries = require('./User/queries')
const UserMutations = require('./User/mutations')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: { ...UserQueries }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: { ...UserMutations }
  })
})
