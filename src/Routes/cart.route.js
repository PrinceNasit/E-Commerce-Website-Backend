import express from 'express'
import authenticate from '../middleware/authenticate.js';
import { addItemToCart, findUserCarts } from '../controller/cart.controller.js';

const router = express.Router();

router.get("/",authenticate,findUserCarts)
router.put("/add",authenticate,addItemToCart);

export default router;