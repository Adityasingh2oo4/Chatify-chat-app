import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controller.js';
import ProtectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/",ProtectRoute, getUsersForSidebar);

export default router;
