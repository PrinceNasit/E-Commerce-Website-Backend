import express from 'express'
import authenticate from '../middleware/authenticate.js';
import { removeCartItems, updateCartItems } from '../controller/cartItem.controller.js';
const router = express.Router();

router.put("/:id",authenticate,updateCartItems)
router.delete("/:id",authenticate,removeCartItems);

export default router;