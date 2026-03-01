import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const createLog = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const user_id = authReq.user!.id;
        const { film_id, rating, date, review, spoiler, dnf } = req.body;

        if (!film_id) {
            return res.status(400).json({ error: 'Film ID is required' });
        }

        const newLog = await prisma.log.create({
            data: {
                user_id,
                film_id,
                rating,
                date: date ? new Date(date) : new Date(),
                review,
                spoiler: spoiler || false,
                dnf: dnf || false,
            }
        });

        res.status(201).json({ message: 'Log created successfully', data: newLog });
    } catch (error) {
        console.error('Error creating log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserLogs = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // User ID
        const logs = await prisma.log.findMany({
            where: { user_id: id },
            include: {
                film: {
                    select: { title_bn: true, title_en: true, poster: true, release_year: true }
                }
            },
            orderBy: { date: 'desc' }
        });

        res.status(200).json({ data: logs });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteLog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const authReq = req as AuthRequest;
        const user_id = authReq.user!.id;

        const log = await prisma.log.findUnique({ where: { id } });

        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }

        if (log.user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized to delete this log' });
        }

        await prisma.log.delete({ where: { id } });

        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        console.error('Error deleting log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
