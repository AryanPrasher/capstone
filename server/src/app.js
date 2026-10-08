import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((url) => url.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Base health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// Auth & user routes
app.use('/api/auth', authRoutes);

// Skill-mapping, taxonomy, and benchmark routes
app.use('/api/skills', skillRoutes);

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

export default app;
