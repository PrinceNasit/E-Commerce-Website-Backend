import { createOrder, findOrderById, usersOrderHistory } from "../services/order.service.js";


const createOrders=async(req,res)=>{
    const user=await req.user;
    try{
        let creOrder = await createOrder(user,req.body);
        return res.status(201).send(creOrder);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const findOrderByIds=async(req,res)=>{
    const user=await req.user;
    try{
        let creOrder = await findOrderById(req.params.id);
        return res.status(201).send(creOrder);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const orderHistorys=async(req,res)=>{
    const user=await req.user;
    try{
        let creOrder = await usersOrderHistory(user._id);
        return res.status(201).send(creOrder);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

export {
    createOrders,
    findOrderByIds,
    orderHistorys
}