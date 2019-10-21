const graphql = require('graphql')
const { GraphQLSchema } = graphql

const { RootQuery } = require('./root-query-type')
const mutations = require('./mutations')

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations
})
