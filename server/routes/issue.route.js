import express from 'express'
import { createIssue, deleteIssue, getIssues, updateIssue } from '../controllers/issue.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createIssue);
router.get('/get', verifyToken, getIssues);
router.delete('/delete/:id', verifyToken, deleteIssue);
router.put('/update/:id', verifyToken, updateIssue);

export default router;