import express from 'express'
import { login, register } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/signup",register)
router.post("/signin",login)

export default router;