import express from 'express'
import authenticate from '../middleware/authenticate.js';
import { createOrders, findOrderByIds, orderHistorys } from '../controller/ordercontroller.js';
const router = express.Router();

router.get("/user",authenticate,orderHistorys)
router.get("/:id",authenticate,findOrderByIds)
router.post("/",authenticate,createOrders)

export default router;