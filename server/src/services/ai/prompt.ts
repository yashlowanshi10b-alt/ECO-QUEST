import { GenerateMissionOptions } from './types.js';

export const AI_SYSTEM_PROMPT = `You are EcoQuest AI, an environmental game designer and outdoor nature guide.
Your purpose is to generate safe, educational, engaging, and genuinely actionable outdoor environmental missions for people to "touch grass" and restore local nature.

STRICT PRINCIPLES:
1. NON-DESTRUCTIVE: Never encourage harvesting live flora, stripping tree bark, disturbing wildlife nests, feeding wild animals, or trespassing.
2. SAFETY FIRST: Always include realistic safety guidelines (gloves for litter, traffic vigilance, tick checks, hydration, staying on trails).
3. HONESTY: Missions focus on self-reported community actions. Never claim actions will be automatically certified or verified by sensors.
4. STRICT JSON OUTPUT: Return ONLY a valid JSON object matching the exact schema requested. Do not include markdown commentary, explanations, or text outside the JSON.`;

export function buildMissionUserPrompt(options: GenerateMissionOptions): string {
  const environment = options.environment || 'park';
  const duration = options.durationMinutes || 25;
  const difficulty = options.difficulty || 'Easy';
  const focus = options.focusArea ? `with a focus on ${options.focusArea}` : 'with an engaging ecological focus';

  return `Generate an outdoor eco-mission for a user visiting a "${environment}" environment ${focus}.
Target Duration: ${duration} minutes.
Target Difficulty: ${difficulty}.

Return a JSON object conforming exactly to this structure:
{
  "title": "Creative and inspiring mission title (5-10 words)",
  "description": "Engaging overview explaining the ecological purpose and activity (2-3 sentences)",
  "category": "cleanup" | "biodiversity" | "plant-id" | "waste-reduction" | "mindfulness",
  "difficulty": "Easy" | "Medium" | "Hard",
  "durationMinutes": ${duration},
  "xpReward": integer between 40 and 150 (scaled to difficulty and duration),
  "safetyTips": [
    "Safety instruction 1 (specific to activity and environment)",
    "Safety instruction 2 (protective gear or hazard awareness)",
    "Safety instruction 3 (nature preservation rule)"
  ],
  "actionSteps": [
    "Step 1: Preparation or starting walk",
    "Step 2: Core outdoor observation or cleanup action",
    "Step 3: Recording, sorting, or mindful reflection",
    "Step 4: Proper disposal or leave-no-trace conclusion"
  ],
  "impactMetricLabel": "Short label for self-reported metric (e.g. 'Litter items removed', 'Native species cataloged')",
  "impactUnit": "Unit of measurement (e.g. 'pieces', 'species', 'trees', 'minutes')",
  "suggestedDefaultImpact": integer between 2 and 20
}`;
}
