const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:String,
    role:{
        type:String,
        required:true
    },
    cart:[{
        id:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Product'
        },
        quantity:Number
    }],
    orders:[{
        product:{},
        quantity:Number,
        date:{
            type:Date,
            default:Date.now
        }
    }]
})
module.exports=mongoose.model('user',userSchema)