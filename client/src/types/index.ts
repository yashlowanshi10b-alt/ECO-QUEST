export type MissionCategory = 
  | 'cleanup' 
  | 'biodiversity' 
  | 'plant-id' 
  | 'waste-reduction' 
  | 'mindfulness';

export type MissionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  durationMinutes: number;
  xpReward: number;
  safetyTips: string[];
  actionSteps: string[];
  impactMetricLabel: string;
  impactUnit: string;
  suggestedDefaultImpact: number;
  isAiGenerated: boolean;
  modelAttribution?: string;
}

export type BadgeCategory = 'starter' | 'cleanup' | 'biodiversity' | 'plant' | 'streak' | 'impact';

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: BadgeCategory;
  requirementText: string;
  unlockedAt: string | null;
}

export interface UserImpact {
  /**
   * Data honesty: EcoQuest explicitly marks all environmental metrics
   * as self-reported community actions, not third-party lab/sensor verified.
   */
  readonly verificationStatus: 'self-reported';
  readonly disclaimer: string;
  totalXp: number;
  currentLevel: number;
  levelTitle: string;
  streakDays: number;
  lastActiveDate: string | null;
  completedMissionsCount: number;
  completedMissionIds: string[];
  selfReportedLitterCount: number;
  selfReportedSpeciesCount: number;
  selfReportedPlantsIdentified: number;
  selfReportedOutdoorMinutes: number;
  selfReportedWasteItemsAvoided: number;
  unlockedBadgeIds: string[];
}

export interface MissionCompletionRecord {
  id: string;
  missionId: string;
  missionTitle: string;
  completedAt: string;
  xpEarned: number;
  notes?: string;
  photoDataUrl?: string;
  selfReportedImpactValue: number;
  selfReportedImpactLabel: string;
  verificationLabel: 'Self-Reported Community Action';
}
