import { Router, Request, Response } from 'express';
import { missionService } from '../services/ai/missionService.js';
import { GenerateMissionOptions } from '../services/ai/types.js';

export const missionsRouter = Router();

missionsRouter.post('/generate', async (req: Request, res: Response) => {
  try {
    const { environment, durationMinutes, difficulty, focusArea } = req.body || {};

    const options: GenerateMissionOptions = {
      environment: ['park', 'forest', 'neighborhood', 'backyard', 'beach', 'urban'].includes(environment)
        ? environment
        : 'park',
      durationMinutes: typeof durationMinutes === 'number' && durationMinutes > 0
        ? Math.min(120, durationMinutes)
        : 25,
      difficulty: ['Easy', 'Medium', 'Hard'].includes(difficulty)
        ? difficulty
        : 'Easy',
      focusArea: ['cleanup', 'biodiversity', 'plant-id', 'waste-reduction', 'mindfulness'].includes(focusArea)
        ? focusArea
        : undefined,
    };

    const result = await missionService.generateMission(options);

    res.json({
      success: true,
      data: result.mission,
      fallbackUsed: result.fallbackUsed,
      providerUsed: result.providerUsed,
      notice: result.notice,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to generate mission';
    console.error('[EcoQuest Server] Unexpected error in /api/missions/generate:', message);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while generating quest.',
    });
  }
});
