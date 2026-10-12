export type EnvironmentType = 
  | 'park' 
  | 'forest' 
  | 'neighborhood' 
  | 'backyard' 
  | 'beach' 
  | 'urban';

export type MissionCategory = 
  | 'cleanup' 
  | 'biodiversity' 
  | 'plant-id' 
  | 'waste-reduction' 
  | 'mindfulness';

export type MissionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface GenerateMissionOptions {
  environment?: EnvironmentType;
  durationMinutes?: number;
  difficulty?: MissionDifficulty;
  focusArea?: MissionCategory;
}

export interface GeneratedMission {
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
  modelAttribution: string;
  generatedAt: string;
}

export interface IAiMissionProvider {
  readonly name: string;
  generate(options: GenerateMissionOptions): Promise<GeneratedMission>;
}
