import express from 'express'
import authenticate from '../middleware/authenticate.js';
import { createMultipleProductss, createProducts, deleteProducts, updateProducts } from '../controller/product.controller.js';
const router = express.Router();

router.post("/",authenticate,createProducts)
router.post("/creates",authenticate,createMultipleProductss)
router.delete("/:id",authenticate,deleteProducts)
router.put("/:id",authenticate,updateProducts);

export default router;