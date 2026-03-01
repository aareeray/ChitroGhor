"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListById = exports.addToList = exports.createList = void 0;
const db_1 = require("../config/db");
const createList = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { name, description, isPublic } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'List name is required' });
        }
        const newList = await db_1.prisma.list.create({
            data: {
                user_id,
                name,
                description,
                isPublic: isPublic !== undefined ? isPublic : true
            }
        });
        res.status(201).json({ message: 'List created', data: newList });
    }
    catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createList = createList;
const addToList = async (req, res) => {
    try {
        const { id } = req.params; // List ID
        const user_id = req.user.id;
        const { film_id, commentary, rank } = req.body;
        const list = await db_1.prisma.list.findUnique({ where: { id } });
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        if (list.user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const listItem = await db_1.prisma.listItem.create({
            data: {
                list_id: id,
                film_id,
                commentary,
                rank
            }
        });
        res.status(201).json({ message: 'Added to list', data: listItem });
    }
    catch (error) {
        console.error('Error adding to list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addToList = addToList;
const getListById = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await db_1.prisma.list.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getListById = getListById;
