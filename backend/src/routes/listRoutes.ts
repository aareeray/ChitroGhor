import { Router } from 'express';
import { createList, addToList, getListById } from '../controllers/listController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createList);
router.post('/:id/items', requireAuth, addToList);
router.get('/:id', getListById);

export default router;
