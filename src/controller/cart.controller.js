import { finduserCart,addCartItem as aITC} from "../services/cart.service.js";


const findUserCarts=async (req,res)=>{
    const userId=req.user._id;
    // console.log(userId);
    try{
        // console.log(typeof(req.user._id),user);
        const cart=await finduserCart(userId);
        return res.status(200).send(cart);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}


const addItemToCart=async (req,res)=>{
    const user=req.user;
    try{
        const cartItem=await aITC(user._id,req.body);
        return res.status(200).send(cartItem);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

export{
    findUserCarts,
    addItemToCart
}