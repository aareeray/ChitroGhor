import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const addToWatchlist = async (req: Request, res: Response) => {
    try {
        const user_id = (req as AuthRequest).user!.id;
        const { film_id, priority, notes } = req.body;

        if (!film_id) {
            return res.status(400).json({ error: 'Film ID is required' });
        }

        const watchlistItem = await prisma.watchlist.create({
            data: {
                user_id,
                film_id,
                priority: priority || 0,
                notes,
            }
        });

        res.status(201).json({ message: 'Added to watchlist', data: watchlistItem });
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getWatchlist = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // User ID
        const watchlist = await prisma.watchlist.findMany({
            where: { user_id: id },
            include: {
                film: {
                    select: { title_bn: true, title_en: true, poster: true, ott_platforms: true }
                }
            },
            orderBy: { priority: 'desc' }
        });

        res.status(200).json({ data: watchlist });
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const removeFromWatchlist = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Watchlist Item ID
        const user_id = (req as AuthRequest).user!.id;

        const item = await prisma.watchlist.findUnique({ where: { id } });

        if (!item) {
            return res.status(404).json({ error: 'Watchlist item not found' });
        }

        if (item.user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized to delete this item' });
        }

        await prisma.watchlist.delete({ where: { id } });

        res.status(200).json({ message: 'Removed from watchlist' });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
