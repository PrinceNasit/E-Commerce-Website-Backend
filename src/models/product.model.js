import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
   discountedPrice:{
        type:Number,
        required: true
    },
    discountedPercent:{
        type:Number
    },
    discount:{
        type:Number
    },
    brand:{
        type:String,
    },
    color:{
        type:String,
    },
    sizes:[
        {
           name:{type:String},
           quantity:{type:Number} 
        }
    ],
   imageurl:{
    type:String
   },
   ratings:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings",
    }
   ],
   reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews",
    }
   ],
   numRatings:{
    type:Number,
    default:0
   },
   category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"category"
   },
   createdAt:{
    type:Date,
    default:Date.now()
}

})


const Product=mongoose.model("products",productSchema);

export default Product;