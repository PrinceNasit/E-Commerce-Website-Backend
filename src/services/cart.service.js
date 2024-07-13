import Cart from '../models/cart.model.js'
import CartItem from '../models/cartItem.model.js'
import Product from '../models/product.model.js'

const createcart=async (user)=>{
    console.log(user);
    try{
        const cart = new Cart({user});
        const createdCart = await cart.save();
        return createdCart;
    }
    catch(err){
        throw new Error(err.message);
    }
}


const finduserCart=async (userId)=>{
    try{
        // console.log(userId);
        let cart=await Cart.findOne({user:userId});
        let cartItems=await CartItem.find({cart:cart._id}).populate("product");
        // console.log(cartItems[0],cartItems[0]._id);
        cart.cartItems=cartItems;
        // console.log(typeof(cart.cartItems[0]),cart.cartItems[0]);
        let totalPrice=0;
        let totalDiscountedPrice=0;
        let totalItem=0;

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.price;
            // console.log(totalPrice,cartItem.price)
            totalDiscountedPrice+=cartItem.discountedPrice;
            // console.log(cartItem.discountedPrice);
            totalItem+=cartItem.quantity;
        }
        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.discount=totalPrice-totalDiscountedPrice;
        cart.totalDiscountedPrice=totalDiscountedPrice;
        // console.log(cart);
        // console.log(cart.cartItems[0].price);
        return cart;
    }
    catch(err){
        throw new Error(err.message);
    }
}

const addCartItem=async (userId,req)=>{
    try{
        const cart=await Cart.findOne({user:userId});
        const product=await Product.findById(req.productId);
        const isPresent = await CartItem.findOne({cart:cart._id,product:product._id,userId});
        if(!isPresent){
            const cartItem=new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId:userId,
                discountedPrice:product.discountedPrice,
                price:product.price,
                size:req.size,
            });
          const CreatedCartItem=  await cartItem.save();
          cart.cartItems.push(CreatedCartItem);
          await cart.save();
          return "Item Added to cart";
        }
    }catch(err){
        throw new Error(err.message);
    }
}
export {createcart,finduserCart,addCartItem};