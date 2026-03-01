import { Router } from 'express';
import { getFilms, getFilmById } from '../controllers/filmController';

const router = Router();

router.get('/', getFilms);
router.get('/:id', getFilmById);

export default router;
