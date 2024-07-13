import express from 'express'
import cors from 'cors'
// import router from './Routes/auth.route';

import authRouters from './Routes/auth.route.js';
import userRouters from './Routes/user.route.js';
import productRouters from './Routes/product.route.js'
import adminProductRouters from './Routes/adminProducts.route.js'
import cartRouters from './Routes/cart.route.js'
import cartItemRouters from './Routes/cartItem.route.js'
import ratingRouters from './Routes/rating.route.js';
import reviewRouters from './Routes/review.route.js';
import orderRouters from './Routes/order.route.js';
import adminOrderRouters from './Routes/adminOrder.route.js';

const app=express();

// app.use(express.bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send({message:"welcome to eccomerce api",status:true})
})

app.use("/auth",authRouters);

app.use("/api/users",userRouters);

app.use("/api/products",productRouters);

app.use("/api/admin/products",adminProductRouters)

app.use("/api/cart",cartRouters);

app.use("/api/cart_items",cartItemRouters);

app.use("/api/orders",orderRouters);

app.use("/api/admin/orders",adminOrderRouters);

app.use("/api/reviews",reviewRouters);

app.use("/api/ratings",ratingRouters);

export default app;