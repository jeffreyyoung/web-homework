// seeds mongodb with fake data
const { TransactionModel } = require('./data-models/Transaction')
const { UserModel } = require('./data-models/User')
const { MerchantModel } = require('./data-models/Merchant')
const mongoose = require('mongoose')
const faker = require('faker')

const MONGO_URI = 'mongodb+srv://admin:yeehaw@cluster0-qxqhn.mongodb.net/test?retryWrites=true&w=majority'

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
})

function random (max = 10, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

async function seed () {
    // reset database before seed
    await Promise.all([
        TransactionModel.remove({}).exec(),
        UserModel.remove({}).exec(),
        MerchantModel.remove({}).exec()
    ])

    let users = []
    for (let i = 0; i < 5; i++) {
        let u = new UserModel({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            dob: '1990-10-20'
        })
        await u.save()
        console.log('created user', u)
        users.push(u)
    }

    let merchants = []
    for (let i = 0; i < 5; i++) {
        let m = new MerchantModel({
            name: faker.company.companyName()
        })
        await m.save()
        console.log('created merchant', m)
        merchants.push(m)
    }

    for (let i = 0; i < 10; i++) {
        let t = new TransactionModel({
            user_id: String(users[random(users.length - 1)]._id),
            amount: random(1000, 10),
            credit: random(1) === 1,
            debit: random(1) === 1,
            description: faker.lorem.words(),
            merchant_id: String(merchants[random(merchants.length - 1)]._id)
        })

        console.log('created transaction', t)
        await t.save()
    }
}

seed()
