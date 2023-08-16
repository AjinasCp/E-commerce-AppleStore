const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    adminid:{
        type:Number,
        required:false
    },
    cart:[{
        type:String,
        required:false

    }],
    wishlist:[{
        type:String,
        required:false
    }],
    orders:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"productSchema"
            },
            orderId:{
                type:String
            },
            payment:{
                type:Number
            },
            orderData:{
                type:Date,
                default:Date.now
            }
        }
     ]

})

module.exports = mongoose.model("signUpSchema",userSchema) 