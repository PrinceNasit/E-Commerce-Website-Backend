import { getUserById } from "./user.service.js";
import CartItem from "../models/cartItem.model.js";

const updateCartItem=async (userId,cartItemId,CartItemData)=>{
    try{
        let item = await findCartItemById(cartItemId);
        
        const user = await getUserById(item.userId);
        if(!user){
            throw new Error("user item not found: ",userId);
        }
        console.log(item);
        if(user._id.toString() === userId.toString()){
            item.quantity=CartItemData.quantity;
            console.log(item.product.price);
            item.price=item.quantity*item.product.price;
            console.log(item.product.discountedPrice)
            item.discountedPrice=item.quantity*item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        }
        else throw new Error("you can't update this cart item");
    }
    catch(err){
        throw new Error(err.message);
    }
}

const findCartItemById=async(cartItemId)=>{
        const cartItem = await CartItem.findById(cartItemId).populate("product");
        if(cartItem) return cartItem;
        else throw new Error("cartItem not found with id :",cartItemId);
}

const removeCartItem= async(userId,cartItemId)=>{
    const cartItem = await findCartItemById(cartItemId);
    const user=await getUserById(userId);
    if(user._id.toString()==cartItem.userId.toString()){
        await CartItem.findByIdAndDelete(cartItemId);
    }
   else throw new Error("you can't remove this cart item")
}

export {updateCartItem,removeCartItem,findCartItemById}