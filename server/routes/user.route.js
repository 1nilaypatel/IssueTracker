import express from 'express';
import { addNotification, getAllUsers, test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/', verifyToken, getAllUsers);
router.post('/add-notification/:id', verifyToken, addNotification);

export default router;