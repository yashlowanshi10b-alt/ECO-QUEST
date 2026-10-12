import { GeneratedMission, MissionCategory, MissionDifficulty } from './types.js';

const ALLOWED_CATEGORIES: MissionCategory[] = [
  'cleanup',
  'biodiversity',
  'plant-id',
  'waste-reduction',
  'mindfulness',
];

const ALLOWED_DIFFICULTIES: MissionDifficulty[] = ['Easy', 'Medium', 'Hard'];

/**
 * Extracts a JSON substring from raw text if surrounded by markdown code fences or conversational text.
 */
export function extractJsonFromText(rawText: string): string {
  const trimmed = rawText.trim();
  
  // If wrapped in ```json ... ``` or ``` ... ```
  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1].trim();
  }

  // Find the first '{' and last '}'
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.substring(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

/**
 * Validates and sanitizes a raw parsed object against the GeneratedMission schema.
 */
export function validateAndSanitizeMission(
  data: unknown,
  modelAttribution: string
): GeneratedMission {
  if (!data || typeof data !== 'object') {
    throw new Error('Mission output is not a valid JSON object');
  }

  const obj = data as Record<string, unknown>;

  // Title validation
  if (typeof obj.title !== 'string' || obj.title.trim().length < 4) {
    throw new Error('Mission title is missing or too short');
  }
  const title = obj.title.trim();

  // Description validation
  if (typeof obj.description !== 'string' || obj.description.trim().length < 15) {
    throw new Error('Mission description is missing or too short');
  }
  const description = obj.description.trim();

  // Category validation
  let category: MissionCategory = 'cleanup';
  if (typeof obj.category === 'string' && ALLOWED_CATEGORIES.includes(obj.category as MissionCategory)) {
    category = obj.category as MissionCategory;
  } else {
    category = 'cleanup';
  }

  // Difficulty validation
  let difficulty: MissionDifficulty = 'Easy';
  if (typeof obj.difficulty === 'string' && ALLOWED_DIFFICULTIES.includes(obj.difficulty as MissionDifficulty)) {
    difficulty = obj.difficulty as MissionDifficulty;
  }

  // Duration & XP validation
  const durationMinutes = typeof obj.durationMinutes === 'number' && obj.durationMinutes > 0
    ? Math.min(120, Math.round(obj.durationMinutes))
    : 25;

  const xpReward = typeof obj.xpReward === 'number' && obj.xpReward > 0
    ? Math.min(300, Math.max(30, Math.round(obj.xpReward)))
    : 60;

  // Safety tips validation (Must contain outdoor safety instructions)
  if (!Array.isArray(obj.safetyTips) || obj.safetyTips.length < 2) {
    throw new Error('Mission must contain at least 2 safety tips');
  }
  const safetyTips = obj.safetyTips
    .filter((tip): tip is string => typeof tip === 'string' && tip.trim().length > 3)
    .map((tip) => tip.trim());

  if (safetyTips.length < 2) {
    throw new Error('Mission safety tips must be descriptive strings');
  }

  // Action steps validation
  if (!Array.isArray(obj.actionSteps) || obj.actionSteps.length < 2) {
    throw new Error('Mission must contain at least 2 action steps');
  }
  const actionSteps = obj.actionSteps
    .filter((step): step is string => typeof step === 'string' && step.trim().length > 3)
    .map((step) => step.trim());

  if (actionSteps.length < 2) {
    throw new Error('Mission action steps must be descriptive strings');
  }

  // Impact metrics
  const impactMetricLabel = typeof obj.impactMetricLabel === 'string' && obj.impactMetricLabel.trim().length > 0
    ? obj.impactMetricLabel.trim()
    : 'Actions completed';

  const impactUnit = typeof obj.impactUnit === 'string' && obj.impactUnit.trim().length > 0
    ? obj.impactUnit.trim()
    : 'actions';

  const suggestedDefaultImpact = typeof obj.suggestedDefaultImpact === 'number' && obj.suggestedDefaultImpact > 0
    ? Math.max(1, Math.round(obj.suggestedDefaultImpact))
    : 5;

  const id = `ai-mission-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    title,
    description,
    category,
    difficulty,
    durationMinutes,
    xpReward,
    safetyTips,
    actionSteps,
    impactMetricLabel,
    impactUnit,
    suggestedDefaultImpact,
    isAiGenerated: true,
    modelAttribution,
    generatedAt: new Date().toISOString(),
  };
}
