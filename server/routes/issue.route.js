import express from 'express'
import { createIssue, getIssues } from '../controllers/issue.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createIssue);
router.get('/get', getIssues);

export default router;