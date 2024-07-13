import Address from '../models/address.model.js'
import { finduserCart } from './cart.service.js';
import Order from '../models/order.model.js'
import OrderItem from '../models/orderItem.model.js'

const createOrder = async (user, shippAddress) => {
    let address;
    if (shippAddress._id) {
        let isExist = await Address.findById(shippAddress._id);
        address = isExist;
    }
    else {
        address = new Address(shippAddress);
        // console.log(user);
        address.user = user;
        await address.save();
        user.address.push(address);
        await user.save();
    }

    const cart = await finduserCart(user._id);
    const orderItems = [];
    // console.log(cart.cartItems);
    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            quantity: item.quantity,
            product: item.product,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice
        })
        const coItem = await orderItem.save();
        orderItems.push(coItem);
    }

    const cOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address
    })
    console.log(cOrder);
    const savedOrder = await cOrder.save();
    return savedOrder;
}

const placeOrder = async (orderId) => {
    const order = await Order.findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save();
}

const confirmedOrder = async (orderId) => {
    const order = await Order.findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
}

const shippedOrder = async (orderId) => {
    const order = await Order.findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
}

const deliveredOrder = async (orderId) => {
    const order = await Order.findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
}

const cancelledOrder = async (orderId) => {
    const order = await Order.findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    return await order.save();
}

const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")
    console.log(order);
    return order;
}

const usersOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId,orderStatus:"PLACED" })
        .populate({path:"orderItems",populate:{path:"product"}}).lean()

        return orders;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

const getAllOrders=async()=>{
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
}

const deleteOrder=async(orderId)=>{
    const order=await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

export {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelledOrder,
    findOrderById,
    getAllOrders,
    deleteOrder,
    usersOrderHistory
}