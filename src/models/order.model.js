import mongoose from "mongoose"
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
    ,
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems"
    }],
    orderDate: {
        type: Date,
        default: Date.now(),
    },
    deliveryDate: {
        type: Date,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    },
    paymentDetails: {
        paymentMethod: { type: String, },
        transectionId: { type: String, },
        paymentId: { type: String, },
        paymentStatus: { type: String, default: "PENDING" }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: { 
        type: String, 
        default: "PENDING" 
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})


const Order = mongoose.model("order", orderSchema);

export default Order;