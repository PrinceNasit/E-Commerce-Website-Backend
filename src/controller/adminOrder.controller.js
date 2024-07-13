import {getAllOrders as getAllOrdersS,confirmedOrder,shippedOrder,deliveredOrder,cancelledOrder, deleteOrder}  from '../services/order.service.js'

const getAllOrders=async(req,res)=>{
    try{
        const orders=await getAllOrdersS();
      return  res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const confirmOrders=async(req,res)=>{
    const orderId = req.params.orderId;
    try{
        const orders=await confirmedOrder(orderId);
      return  res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const shippOrders=async(req,res)=>{
    const orderId = req.params.orderId;
    try{
        const orders=await shippedOrder(orderId);
      return  res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}
const deliverOrders=async(req,res)=>{
    const orderId = req.params.orderId;
    try{
        const orders=await deliveredOrder(orderId);
      return  res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const cancelledOrders=async(req,res)=>{
    const orderId = req.params.orderId;
    try{
        const orders=await cancelledOrder(orderId);
      return  res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const deleteOrders=async(req,res)=>{
    const orderId = req.params.orderId;
    try{
        const orders=await deleteOrder(orderId);
      return  res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

export{
    getAllOrders,
    confirmOrders,
    shippOrders,
    deleteOrders,
    cancelledOrders,
    deliverOrders
}
