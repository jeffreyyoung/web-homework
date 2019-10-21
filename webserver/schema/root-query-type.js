const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const MerchantType = require('./merchant-type')
const Resolvers = require('../query-resolvers/resolvers')
const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType.TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Resolvers.findOneTransaction(args.id)
      }
    },
    users: {
      type: GraphQLList(UserType.UserType),
      async resolve (pV, args) {
        const res = Resolvers.findUsers({})
        console.log(await res)
        return res
      }
    },
    merchants: {
      type: GraphQLList(MerchantType.MerchantType),
      resolve (pV, args) {
        return Resolvers.findMerchants({})
      }
    },
    transactions: {
      type: GraphQLList(TransactionType.TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Resolvers.findTransactions(args)
      }
    }
  })
})

module.exports.RootQuery = RootQuery
