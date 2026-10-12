import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { 
  validateAndSanitizeMission, 
  extractJsonFromText 
} from '../services/ai/validation.js';
import { FallbackMissionProvider } from '../services/ai/providers/fallbackProvider.js';
import { MissionService } from '../services/ai/missionService.js';

describe('EcoQuest AI Schema Validation', () => {
  test('validates and sanitizes a complete mission object', () => {
    const rawValid = {
      title: 'Meadow Butterfly Habitat Survey',
      description: 'Observe native butterflies and pollinators in open park meadows to evaluate floral health.',
      category: 'biodiversity',
      difficulty: 'Easy',
      durationMinutes: 20,
      xpReward: 65,
      safetyTips: [
        'Stay on public meadow trails to avoid trampling delicate wildflowers.',
        'Carry water and use sun protection during open field walks.'
      ],
      actionSteps: [
        'Find a sunny cluster of clover or wildflowers.',
        'Watch for 10 minutes counting distinct butterfly species.',
        'Record wing colors and flower preferences.'
      ],
      impactMetricLabel: 'Butterflies logged',
      impactUnit: 'pollinators',
      suggestedDefaultImpact: 5,
    };

    const validated = validateAndSanitizeMission(rawValid, 'Test Attribution');
    assert.equal(validated.title, 'Meadow Butterfly Habitat Survey');
    assert.equal(validated.category, 'biodiversity');
    assert.equal(validated.difficulty, 'Easy');
    assert.equal(validated.durationMinutes, 20);
    assert.equal(validated.xpReward, 65);
    assert.equal(validated.isAiGenerated, true);
    assert.equal(validated.modelAttribution, 'Test Attribution');
    assert.ok(validated.safetyTips.length >= 2);
    assert.ok(validated.actionSteps.length >= 2);
  });

  test('rejects missions with missing or short titles', () => {
    assert.throws(() => {
      validateAndSanitizeMission({ title: 'Hi', description: 'Long enough description text here' }, 'Test');
    }, /title/);
  });

  test('rejects missions without outdoor safety guidance', () => {
    assert.throws(() => {
      validateAndSanitizeMission({
        title: 'Walk in the Park',
        description: 'A pleasant walk through the park to clear litter.',
        safetyTips: ['Just one tip'],
        actionSteps: ['Step 1', 'Step 2']
      }, 'Test');
    }, /safety tips/);
  });
});

describe('EcoQuest AI Markdown & JSON Extraction', () => {
  test('extracts pure JSON from markdown code block', () => {
    const raw = '```json\n{"title": "Sample Quest"}\n```';
    assert.equal(extractJsonFromText(raw), '{"title": "Sample Quest"}');
  });

  test('extracts JSON surrounded by LLM preamble text', () => {
    const raw = 'Sure! Here is your quest:\n{"title": "Sample Quest"}\nHope you enjoy it!';
    assert.equal(extractJsonFromText(raw), '{"title": "Sample Quest"}');
  });
});

describe('EcoQuest Fallback Mission Provider', () => {
  const provider = new FallbackMissionProvider();

  test('generates realistic missions for requested environments', async () => {
    const mission = await provider.generate({ environment: 'forest', durationMinutes: 30, difficulty: 'Medium' });
    assert.ok(mission.id.startsWith('fallback-mission-'));
    assert.ok(mission.title.length > 5);
    assert.equal(mission.durationMinutes, 30);
    assert.equal(mission.difficulty, 'Medium');
    assert.equal(mission.isAiGenerated, false);
    assert.ok(mission.modelAttribution.includes('Offline Curated Fallback'));
    assert.ok(mission.safetyTips.length >= 2);
    assert.ok(mission.actionSteps.length >= 2);
  });
});

describe('EcoQuest MissionService Fallback Resilience', () => {
  test('falls back gracefully when provider is mock or unconfigured', async () => {
    const service = new MissionService();
    const result = await service.generateMission({ environment: 'beach' });

    assert.ok(result.mission);
    assert.equal(result.fallbackUsed, true);
    assert.ok(result.notice);
    assert.ok(result.mission.title.length > 5);
    assert.ok(result.mission.safetyTips.length >= 2);
  });

  test('recovers from provider network/API failure by engaging fallback', async () => {
    const prevProvider = process.env.AI_PROVIDER;
    const prevKey = process.env.GROQ_API_KEY;
    try {
      process.env.AI_PROVIDER = 'groq';
      process.env.GROQ_API_KEY = 'invalid-dummy-key';
      const service = new MissionService();
      const result = await service.generateMission({ environment: 'urban' });

      assert.ok(result.mission);
      assert.equal(result.fallbackUsed, true);
      assert.ok(result.notice?.includes('curated quest fallback'));
      assert.ok(result.mission.title.length > 5);
      assert.ok(result.mission.safetyTips.length >= 2);
    } finally {
      process.env.AI_PROVIDER = prevProvider;
      process.env.GROQ_API_KEY = prevKey;
    }
  });
});
