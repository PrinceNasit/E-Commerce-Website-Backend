import mongoose from "mongoose"
const cartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required: true,
    }
    ,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default:1
    },
    totalItem:{
        type:Number,
        required: true,
        default: 0
    },
   discountedPrice:{
        type:Number,
        required: true,
        default: 0
    },
    discount:{
        type:Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }

})


const CartItem=mongoose.model("cartItem",cartItemSchema);

export default CartItem;