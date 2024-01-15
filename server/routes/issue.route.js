import express from 'express'
import { createIssue } from '../controllers/issue.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createIssue);

export default router;