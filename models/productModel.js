const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    categories:{type:Array},
    modelname:{type:String},
    color:{type:String},
    storage:{type:String},
    price:{type:Number,required:true},

})

module.exports= mongoose.model("productSchema",productSchema) 