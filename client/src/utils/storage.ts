import { UserImpact, MissionCompletionRecord, Mission } from '../types';

export const STORAGE_KEYS = {
  USER_IMPACT: 'ecoquest_user_impact_v1',
  COMPLETION_HISTORY: 'ecoquest_completion_history_v1',
  CUSTOM_MISSIONS: 'ecoquest_custom_missions_v1',
};

export const IMPACT_DISCLAIMER = 
  'All environmental metrics reflect self-reported community actions and are not third-party lab or sensor verified.';

export const DEFAULT_USER_IMPACT: UserImpact = {
  verificationStatus: 'self-reported',
  disclaimer: IMPACT_DISCLAIMER,
  totalXp: 0,
  currentLevel: 1,
  levelTitle: 'Seedling',
  streakDays: 0,
  lastActiveDate: null,
  completedMissionsCount: 0,
  completedMissionIds: [],
  selfReportedLitterCount: 0,
  selfReportedSpeciesCount: 0,
  selfReportedPlantsIdentified: 0,
  selfReportedOutdoorMinutes: 0,
  selfReportedWasteItemsAvoided: 0,
  unlockedBadgeIds: [],
};

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  progressPercent: number;
}

const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Seedling', minXp: 0, maxXp: 100 },
  { level: 2, title: 'Sprout', minXp: 100, maxXp: 250 },
  { level: 3, title: 'Forager', minXp: 250, maxXp: 500 },
  { level: 4, title: 'Trailblazer', minXp: 500, maxXp: 850 },
  { level: 5, title: 'Eco Ranger', minXp: 850, maxXp: 1300 },
  { level: 6, title: 'Earth Guardian', minXp: 1300, maxXp: 2000 },
];

export function calculateLevel(xp: number): LevelInfo {
  const safeXp = Math.max(0, xp);
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    const tier = LEVEL_THRESHOLDS[i];
    if (safeXp < tier.maxXp || i === LEVEL_THRESHOLDS.length - 1) {
      const range = tier.maxXp - tier.minXp;
      const progressInTier = Math.min(safeXp - tier.minXp, range);
      const progressPercent = Math.min(100, Math.max(0, Math.round((progressInTier / range) * 100)));
      return {
        level: tier.level,
        title: tier.title,
        minXp: tier.minXp,
        maxXp: tier.maxXp,
        progressPercent,
      };
    }
  }
  return {
    level: 6,
    title: 'Earth Guardian',
    minXp: 1300,
    maxXp: 2000,
    progressPercent: 100,
  };
}

export function updateStreak(lastActiveDate: string | null, currentStreak: number, todayStr: string): number {
  if (!lastActiveDate) {
    return 1;
  }
  if (lastActiveDate === todayStr) {
    return Math.max(1, currentStreak);
  }

  const last = new Date(lastActiveDate);
  const today = new Date(todayStr);
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 1) {
    return currentStreak + 1;
  } else if (diffDays > 1) {
    return 1;
  }
  return currentStreak;
}

export function evaluateBadges(impact: UserImpact, completedMissions: Mission[]): string[] {
  const unlocked = new Set<string>(impact.unlockedBadgeIds);

  // Badge 1: First Step Out (1 mission)
  if (impact.completedMissionsCount >= 1) {
    unlocked.add('badge-first-mission');
  }

  // Badge 2: Litter Sweeper (2 cleanup missions)
  const cleanupCount = completedMissions.filter(m => m.category === 'cleanup').length;
  if (cleanupCount >= 2) {
    unlocked.add('badge-trail-sweeper');
  }

  // Badge 3: Pollinator Ally (2 biodiversity missions)
  const bioCount = completedMissions.filter(m => m.category === 'biodiversity').length;
  if (bioCount >= 2) {
    unlocked.add('badge-pollinator-ally');
  }

  // Badge 4: Canopy Scout (2 plant-id missions)
  const plantCount = completedMissions.filter(m => m.category === 'plant-id').length;
  if (plantCount >= 2) {
    unlocked.add('badge-canopy-scout');
  }

  // Badge 5: 3-Day streak
  if (impact.streakDays >= 3) {
    unlocked.add('badge-streak-3');
  }

  // Badge 6: 500 XP
  if (impact.totalXp >= 500) {
    unlocked.add('badge-xp-500');
  }

  return Array.from(unlocked);
}

export function loadUserImpact(): UserImpact {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { ...DEFAULT_USER_IMPACT };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.USER_IMPACT);
    if (!raw) return { ...DEFAULT_USER_IMPACT };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER_IMPACT,
      ...parsed,
      verificationStatus: 'self-reported',
      disclaimer: IMPACT_DISCLAIMER,
    };
  } catch {
    return { ...DEFAULT_USER_IMPACT };
  }
}

export function saveUserImpact(impact: UserImpact): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const sanitized: UserImpact = {
      ...impact,
      verificationStatus: 'self-reported',
      disclaimer: IMPACT_DISCLAIMER,
    };
    window.localStorage.setItem(STORAGE_KEYS.USER_IMPACT, JSON.stringify(sanitized));
  } catch (err) {
    console.error('Failed to save EcoQuest user impact to localStorage:', err);
  }
}

export function loadCompletionHistory(): MissionCompletionRecord[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.COMPLETION_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCompletionHistory(records: MissionCompletionRecord[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.COMPLETION_HISTORY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save EcoQuest completion history:', err);
  }
}

export function loadCustomMissions(): Mission[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.CUSTOM_MISSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomMissions(missions: Mission[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.CUSTOM_MISSIONS, JSON.stringify(missions));
  } catch (err) {
    console.error('Failed to save custom missions:', err);
  }
}
