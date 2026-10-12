import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { missionsRouter } from './routes/missions.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'EcoQuest backend is healthy',
    timestamp: new Date().toISOString(),
    aiProvider: process.env.AI_PROVIDER || 'mock',
  });
});

// AI Missions Router
app.use('/api/missions', missionsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`[EcoQuest Server] Running on http://localhost:${PORT}`);
  console.log(`[EcoQuest Server] Active AI Provider: ${process.env.AI_PROVIDER || 'mock'}`);
});
