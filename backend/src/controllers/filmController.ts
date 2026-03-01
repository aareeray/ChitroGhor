import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getFilms = async (req: Request, res: Response) => {
    try {
        const { search, type, platform, page = '1', limit = '20' } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);

        const whereClause: Record<string, any> = {};
        if (search) {
            whereClause.OR = [
                { title_bn: { contains: search as string, mode: 'insensitive' } },
                { title_en: { contains: search as string, mode: 'insensitive' } }
            ];
        }
        if (type) {
            whereClause.type = type;
        }
        if (platform) {
            whereClause.ott_platforms = { has: platform };
        }

        const films = await prisma.film.findMany({
            where: whereClause,
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
            orderBy: { release_year: 'desc' }
        });

        const total = await prisma.film.count({ where: whereClause });

        res.status(200).json({
            data: films,
            meta: {
                total,
                page: pageNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching films:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFilmById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const film = await prisma.film.findUnique({
            where: { id },
            include: { awards: true }
        });

        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }

        res.status(200).json({ data: film });
    } catch (error) {
        console.error('Error fetching film:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
