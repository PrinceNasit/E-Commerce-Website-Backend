import express from 'express'
import authenticate from '../middleware/authenticate.js';
import {createRatings,getAllRatingss} from '../controller/rating.controller.js'
const router = express.Router();


router.post("/create",authenticate,createRatings)
router.get("/product/:productId",authenticate,getAllRatingss)

export default router;