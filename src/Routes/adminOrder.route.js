import express from 'express'
import authenticate from '../middleware/authenticate.js';
import { cancelledOrders, confirmOrders, deleteOrders, getAllOrders } from '../controller/adminOrder.controller.js';
import { deliveredOrder, shippedOrder } from '../services/order.service.js';

const router = express.Router();

router.get("/",authenticate,getAllOrders);
router.put("/:orderId/confirmed",authenticate,confirmOrders)
router.put("/:orderId/ship",authenticate,shippedOrder)
router.put("/:orderId/deliver",authenticate,deliveredOrder)
router.put("/:orderId/cancel",authenticate,cancelledOrders)
router.delete("/delete/:orderId",authenticate,deleteOrders)

export default router;