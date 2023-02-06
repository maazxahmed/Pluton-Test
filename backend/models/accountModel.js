const mongoose = require('mongoose')
const accountSchema = mongoose.Schema(
    {
        address : {
            type : String
        },
        balance :{
            type : Number
        }

    },
    {
        timestamps : true
    }
    )

    const Accounts = mongoose.model('Accounts', accountSchema)
    module.exports = Accounts