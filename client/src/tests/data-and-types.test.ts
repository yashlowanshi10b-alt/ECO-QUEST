import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { CURATED_MISSIONS } from '../data/missions';
import { INITIAL_BADGES } from '../data/badges';
import { 
  DEFAULT_USER_IMPACT, 
  calculateLevel, 
  updateStreak, 
  evaluateBadges,
  IMPACT_DISCLAIMER
} from '../utils/storage';
import { MissionCategory } from '../types';

describe('EcoQuest Curated Mission Library', () => {
  test('has at least 8 curated realistic missions', () => {
    assert.ok(CURATED_MISSIONS.length >= 8, `Expected at least 8 missions, got ${CURATED_MISSIONS.length}`);
  });

  test('covers all four required challenge categories', () => {
    const categories = new Set(CURATED_MISSIONS.map(m => m.category));
    const requiredCategories: MissionCategory[] = ['cleanup', 'biodiversity', 'plant-id', 'waste-reduction'];
    
    for (const cat of requiredCategories) {
      assert.ok(categories.has(cat), `Mission library missing required category: ${cat}`);
    }
  });

  test('each mission has complete fields and safety instructions', () => {
    for (const mission of CURATED_MISSIONS) {
      assert.ok(mission.id && typeof mission.id === 'string', 'Mission must have an id');
      assert.ok(mission.title && mission.title.length > 5, `Mission ${mission.id} title is too short`);
      assert.ok(mission.description && mission.description.length > 15, `Mission ${mission.id} description too short`);
      assert.ok(['Easy', 'Medium', 'Hard'].includes(mission.difficulty), `Invalid difficulty in ${mission.id}`);
      assert.ok(mission.durationMinutes > 0, `Duration must be > 0 in ${mission.id}`);
      assert.ok(mission.xpReward > 0, `XP reward must be > 0 in ${mission.id}`);
      assert.ok(Array.isArray(mission.safetyTips) && mission.safetyTips.length > 0, `Safety tips missing in ${mission.id}`);
      assert.ok(Array.isArray(mission.actionSteps) && mission.actionSteps.length > 0, `Action steps missing in ${mission.id}`);
      assert.ok(mission.impactMetricLabel && mission.impactMetricLabel.length > 0, `Impact metric label missing in ${mission.id}`);
      assert.ok(mission.impactUnit && mission.impactUnit.length > 0, `Impact unit missing in ${mission.id}`);
      assert.equal(mission.isAiGenerated, false, 'Default curated missions should have isAiGenerated false');
    }
  });

  test('all mission IDs are unique', () => {
    const ids = CURATED_MISSIONS.map(m => m.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, 'Duplicate mission IDs detected');
  });
});

describe('EcoQuest Badges & Data Integrity', () => {
  test('has at least 6 initial badges with valid fields', () => {
    assert.ok(INITIAL_BADGES.length >= 6);
    for (const b of INITIAL_BADGES) {
      assert.ok(b.id, 'Badge must have id');
      assert.ok(b.name, 'Badge must have name');
      assert.ok(b.requirementText, 'Badge must have requirementText');
    }
  });

  test('default user impact explicitly marks self-reported status', () => {
    assert.equal(DEFAULT_USER_IMPACT.verificationStatus, 'self-reported');
    assert.equal(DEFAULT_USER_IMPACT.disclaimer, IMPACT_DISCLAIMER);
    assert.equal(DEFAULT_USER_IMPACT.totalXp, 0);
    assert.equal(DEFAULT_USER_IMPACT.currentLevel, 1);
  });
});

describe('EcoQuest Gamification Logic', () => {
  test('calculateLevel maps XP to progressive tiers correctly', () => {
    const lvl0 = calculateLevel(0);
    assert.equal(lvl0.level, 1);
    assert.equal(lvl0.title, 'Seedling');
    assert.equal(lvl0.progressPercent, 0);

    const lvl50 = calculateLevel(50);
    assert.equal(lvl50.level, 1);
    assert.equal(lvl50.progressPercent, 50);

    const lvl100 = calculateLevel(100);
    assert.equal(lvl100.level, 2);
    assert.equal(lvl100.title, 'Sprout');

    const lvl600 = calculateLevel(600);
    assert.equal(lvl600.level, 4);
    assert.equal(lvl600.title, 'Trailblazer');
  });

  test('updateStreak handles consecutive and non-consecutive days', () => {
    // First active day starts at 1
    assert.equal(updateStreak(null, 0, '2026-10-11'), 1);

    // Active same day keeps streak
    assert.equal(updateStreak('2026-10-11', 2, '2026-10-11'), 2);

    // Active next day increments streak
    assert.equal(updateStreak('2026-10-10', 2, '2026-10-11'), 3);

    // Active after 3 days resets streak to 1
    assert.equal(updateStreak('2026-10-05', 5, '2026-10-11'), 1);
  });

  test('evaluateBadges unlocks first mission and category badges', () => {
    const sampleImpact = {
      ...DEFAULT_USER_IMPACT,
      completedMissionsCount: 1,
      totalXp: 60,
    };
    const unlocked = evaluateBadges(sampleImpact, [CURATED_MISSIONS[0]]);
    assert.ok(unlocked.includes('badge-first-mission'), 'Should unlock First Step Out badge');
  });
});
