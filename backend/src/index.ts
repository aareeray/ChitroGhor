import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import filmRoutes from './routes/filmRoutes';
import logRoutes from './routes/logRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import listRoutes from './routes/listRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/films', filmRoutes);
app.use('/api/v1/logs', logRoutes);
app.use('/api/v1/watchlists', watchlistRoutes);
app.use('/api/v1/lists', listRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'ChitroGhor API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
