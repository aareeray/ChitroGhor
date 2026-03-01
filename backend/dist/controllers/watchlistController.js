"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWatchlist = exports.getWatchlist = exports.addToWatchlist = void 0;
const db_1 = require("../config/db");
const addToWatchlist = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { film_id, priority, notes } = req.body;
        if (!film_id) {
            return res.status(400).json({ error: 'Film ID is required' });
        }
        const watchlistItem = await db_1.prisma.watchlist.create({
            data: {
                user_id,
                film_id,
                priority: priority || 0,
                notes,
            }
        });
        res.status(201).json({ message: 'Added to watchlist', data: watchlistItem });
    }
    catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addToWatchlist = addToWatchlist;
const getWatchlist = async (req, res) => {
    try {
        const { id } = req.params; // User ID
        const watchlist = await db_1.prisma.watchlist.findMany({
            where: { user_id: id },
            include: {
                film: {
                    select: { title_bn: true, title_en: true, poster: true, ott_platforms: true }
                }
            },
            orderBy: { priority: 'desc' }
        });
        res.status(200).json({ data: watchlist });
    }
    catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getWatchlist = getWatchlist;
const removeFromWatchlist = async (req, res) => {
    try {
        const { id } = req.params; // Watchlist Item ID
        const user_id = req.user.id;
        const item = await db_1.prisma.watchlist.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ error: 'Watchlist item not found' });
        }
        if (item.user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized to delete this item' });
        }
        await db_1.prisma.watchlist.delete({ where: { id } });
        res.status(200).json({ message: 'Removed from watchlist' });
    }
    catch (error) {
        console.error('Error removing from watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.removeFromWatchlist = removeFromWatchlist;
