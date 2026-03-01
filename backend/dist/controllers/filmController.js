"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilmById = exports.getFilms = void 0;
const db_1 = require("../config/db");
const getFilms = async (req, res) => {
    try {
        const { search, type, platform, page = '1', limit = '20' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                { title_bn: { contains: search, mode: 'insensitive' } },
                { title_en: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (type) {
            whereClause.type = type;
        }
        if (platform) {
            whereClause.ott_platforms = { has: platform };
        }
        const films = await db_1.prisma.film.findMany({
            where: whereClause,
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
            orderBy: { release_year: 'desc' }
        });
        const total = await db_1.prisma.film.count({ where: whereClause });
        res.status(200).json({
            data: films,
            meta: {
                total,
                page: pageNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    }
    catch (error) {
        console.error('Error fetching films:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFilms = getFilms;
const getFilmById = async (req, res) => {
    try {
        const { id } = req.params;
        const film = await db_1.prisma.film.findUnique({
            where: { id },
            include: { awards: true }
        });
        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }
        res.status(200).json({ data: film });
    }
    catch (error) {
        console.error('Error fetching film:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFilmById = getFilmById;
