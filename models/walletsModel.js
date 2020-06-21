const { Schema, model} = require('mongoose');


const transSchema = new Schema({
        title:{type: String},
        amount:{type: Number},
        type:{type: String},
        created:{type: Date, default: Date.now}
})

const walletSchema = new Schema({

    name:{type: String, required: true},
    budget:{type: Number, required: true},
    transactions:[transSchema]   
})

module.exports = model('Wallet',walletSchema);