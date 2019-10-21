const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const { MerchantModel } = require('../data-models/Merchant')
const { packageModel } = require('./utils.js')

function makeFind (Model) {
  return async (criteria) => {
    const query = Object.keys(criteria).length
    ? Model.find(criteria)
    : Model.find()

  const entities = await query.exec()

  return packageModel(entities)
  }
}

function makeFindOne (Model) {
  return async (id) => {
    const query = Model.findById(id)
    const entity = await query.exec()

    return packageModel(entity)[0] || null
  }
}

module.exports = {
  findTransactions: makeFind(TransactionModel),
  findOneTransaction: makeFindOne(TransactionModel),

  findMerchants: makeFind(MerchantModel),
  findOneMerchant: makeFindOne(MerchantModel),

  findUsers: makeFind(UserModel),
  findOneUser: makeFindOne(UserModel)
}
