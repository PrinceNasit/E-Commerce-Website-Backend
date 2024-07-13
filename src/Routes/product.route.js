import express from 'express'
import authenticate from '../middleware/authenticate.js';
import { deleteProducts, findProductByIds, getAllProductss } from '../controller/product.controller.js';
const router = express.Router();

// console.log("dfjkngjerskdg");
router.get("/",authenticate,getAllProductss)
router.get("/id/:id",authenticate,findProductByIds)
router.delete("/:id",authenticate,deleteProducts)

export default router