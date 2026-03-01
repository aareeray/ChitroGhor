"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const filmRoutes_1 = __importDefault(require("./routes/filmRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const watchlistRoutes_1 = __importDefault(require("./routes/watchlistRoutes"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configure routes
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/films', filmRoutes_1.default);
app.use('/api/v1/logs', logRoutes_1.default);
app.use('/api/v1/watchlists', watchlistRoutes_1.default);
app.use('/api/v1/lists', listRoutes_1.default);
// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Bengali Cinema Tracker API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
