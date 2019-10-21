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
const MerchantType = new GraphQLObjectType({
  name: 'Mercahnt',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType.TransactionType),
      resolve (parentValue) {
          return Resolvers.findTransactions({ merchant_id: parentValue.id })
      }
    }
  })
})

module.exports.MerchantType = MerchantType
