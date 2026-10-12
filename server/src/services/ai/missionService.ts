import { 
  GenerateMissionOptions, 
  GeneratedMission, 
  IAiMissionProvider 
} from './types.js';
import { GroqLlamaProvider } from './providers/groqProvider.js';
import { OllamaProvider } from './providers/ollamaProvider.js';
import { FallbackMissionProvider } from './providers/fallbackProvider.js';

export interface GenerateMissionResult {
  mission: GeneratedMission;
  fallbackUsed: boolean;
  providerUsed: string;
  notice?: string;
}

export class MissionService {
  private fallbackProvider: FallbackMissionProvider;

  constructor() {
    this.fallbackProvider = new FallbackMissionProvider();
  }

  private getActiveProvider(): IAiMissionProvider | null {
    const providerName = (process.env.AI_PROVIDER || 'mock').toLowerCase();

    switch (providerName) {
      case 'groq':
        return new GroqLlamaProvider();
      case 'ollama':
        return new OllamaProvider();
      case 'mock':
      case 'fallback':
      default:
        return null;
    }
  }

  async generateMission(options: GenerateMissionOptions): Promise<GenerateMissionResult> {
    const primaryProvider = this.getActiveProvider();

    // If configured as mock/fallback or no provider set, use offline fallback directly
    if (!primaryProvider) {
      const mission = await this.fallbackProvider.generate(options);
      return {
        mission,
        fallbackUsed: true,
        providerUsed: this.fallbackProvider.name,
        notice: 'Offline mode active. Generated via curated environmental engine.',
      };
    }

    try {
      console.log(`[EcoQuest AI] Attempting generation with provider: ${primaryProvider.name}`);
      const mission = await primaryProvider.generate(options);
      console.log(`[EcoQuest AI] Successfully generated quest: "${mission.title}"`);
      return {
        mission,
        fallbackUsed: false,
        providerUsed: primaryProvider.name,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown AI generation error';
      
      // Log safely without exposing secret keys
      console.warn(`[EcoQuest AI] Provider "${primaryProvider.name}" failed: ${errorMessage}. Engaging offline fallback.`);

      const fallbackMission = await this.fallbackProvider.generate(options);

      return {
        mission: fallbackMission,
        fallbackUsed: true,
        providerUsed: this.fallbackProvider.name,
        notice: `Primary AI provider encountered an issue (${errorMessage}). Successfully provided a curated quest fallback.`,
      };
    }
  }
}

export const missionService = new MissionService();
