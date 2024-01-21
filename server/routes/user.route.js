import express from 'express';
import { addNotification, getAllUsers, getCurrentUser, test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/', verifyToken, getAllUsers);
router.post('/add-notification/:id', verifyToken, addNotification);
router.get('/:id', verifyToken, getCurrentUser);

export default router;