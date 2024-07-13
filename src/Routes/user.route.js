import express from 'express';
import { getAllUsers, getuserProfile } from '../controller/user.controller.js';

const router = express.Router();

router.get("/profile",getuserProfile);
router.get("/",getAllUsers);

export default router;
