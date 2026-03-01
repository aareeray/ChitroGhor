import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const createList = async (req: Request, res: Response) => {
    try {
        const user_id = (req as AuthRequest).user!.id;
        const { name, description, isPublic } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'List name is required' });
        }

        const newList = await prisma.list.create({
            data: {
                user_id,
                name,
                description,
                isPublic: isPublic !== undefined ? isPublic : true
            }
        });

        res.status(201).json({ message: 'List created', data: newList });
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addToList = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // List ID
        const user_id = (req as AuthRequest).user!.id;
        const { film_id, commentary, rank } = req.body;

        const list = await prisma.list.findUnique({ where: { id } });

        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        if (list.user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const listItem = await prisma.listItem.create({
            data: {
                list_id: id,
                film_id,
                commentary,
                rank
            }
        });

        res.status(201).json({ message: 'Added to list', data: listItem });
    } catch (error) {
        console.error('Error adding to list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getListById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const list = await prisma.list.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        film: {
                            select: { title_bn: true, title_en: true, poster: true, release_year: true }
                        }
                    },
                    orderBy: { rank: 'asc' }
                },
                user: {
                    select: { username: true, profile_photo: true }
                }
            }
        });

        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json({ data: list });
    } catch (error) {
        console.error('Error fetching list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
