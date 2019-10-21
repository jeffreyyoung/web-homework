const graphql = require('graphql')
const MerchantType = require('./merchant-type')
const UserType = require('./user-type')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const Resolvers = require('./../query-resolvers/resolvers')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    user: {
      type: UserType.UserType,
      resolve (parentValue, args) {
        return Resolvers.findOneUser(parentValue.user_id)
      }
    },
    merchant: {
      type: MerchantType.MerchantType,
      resolve (parentValue, args) {
        return Resolvers.findOneMerchant(parentValue.merchant_id)
      }
    }
  })
})

module.exports.TransactionType = TransactionType
