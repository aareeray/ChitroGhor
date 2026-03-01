import { Router } from 'express';
import { createLog, getUserLogs, deleteLog } from '../controllers/logController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createLog);
router.get('/user/:id', getUserLogs);
router.delete('/:id', requireAuth, deleteLog);

export default router;
