import {removeCartItem, updateCartItem} from '../services/cartItem.service.js'

const updateCartItems=async (req,res)=>{
    const user=await req.user;
    try{
        const updateCartItemV=await  updateCartItem(user._id,req.params.id,req.body);
        return res.status(200).send(updateCartItemV);
    }catch(err){
        return res.status(500).send({error:err.message});
    }
}

const removeCartItems=async (req,res)=>{
    const user=await req.user;
    try{
        await removeCartItem(user._id,req.params.id);
        return res.status(200).send({message:"cart item removed successfully"});
    }catch(err){
        return res.status(500).send({error:err.message});
    }
}

export{
    updateCartItems,
    removeCartItems
}