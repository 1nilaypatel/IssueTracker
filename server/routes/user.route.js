import express from 'express';
import { addNotification, clearAllNotifications, deleteUser, getAllUsers, getCurrentUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/', verifyToken, getAllUsers);
router.post('/add-notification/:id', verifyToken, addNotification);
router.get('/:id', verifyToken, getCurrentUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/update/:id', verifyToken, updateUser);
router.post('/clear-all-notifications/:id', verifyToken, clearAllNotifications);

export default router;