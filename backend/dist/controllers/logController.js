"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLog = exports.getUserLogs = exports.createLog = void 0;
const db_1 = require("../config/db");
const createLog = async (req, res) => {
    try {
        const authReq = req;
        const user_id = authReq.user.id;
        const { film_id, rating, date, review, spoiler, dnf } = req.body;
        if (!film_id) {
            return res.status(400).json({ error: 'Film ID is required' });
        }
        const newLog = await db_1.prisma.log.create({
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
    }
    catch (error) {
        console.error('Error creating log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createLog = createLog;
const getUserLogs = async (req, res) => {
    try {
        const { id } = req.params; // User ID
        const logs = await db_1.prisma.log.findMany({
            where: { user_id: id },
            include: {
                film: {
                    select: { title_bn: true, title_en: true, poster: true, release_year: true }
                }
            },
            orderBy: { date: 'desc' }
        });
        res.status(200).json({ data: logs });
    }
    catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserLogs = getUserLogs;
const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const authReq = req;
        const user_id = authReq.user.id;
        const log = await db_1.prisma.log.findUnique({ where: { id } });
        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }
        if (log.user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized to delete this log' });
        }
        await db_1.prisma.log.delete({ where: { id } });
        res.status(200).json({ message: 'Log deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteLog = deleteLog;
