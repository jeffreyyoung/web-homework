/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const TransactionType = require('./transaction-type')
const Resolvers = require('./../query-resolvers/resolvers')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    dob: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType.TransactionType),
      resolve (parentValue, args) {
        return Resolvers.findTransactions({ user_id: parentValue.id })
      }
    }
  })
})

module.exports = { UserType }
