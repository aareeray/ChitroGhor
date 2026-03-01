import { Router } from 'express';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/watchlistController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, addToWatchlist);
router.get('/user/:id', getWatchlist);
router.delete('/:id', requireAuth, removeFromWatchlist);

export default router;
