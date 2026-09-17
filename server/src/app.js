import cors from 'cors';
import express from 'express';

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((url) => url.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

export default app;
