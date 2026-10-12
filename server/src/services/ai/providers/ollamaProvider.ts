import { IAiMissionProvider, GenerateMissionOptions, GeneratedMission } from '../types.js';
import { AI_SYSTEM_PROMPT, buildMissionUserPrompt } from '../prompt.js';
import { extractJsonFromText, validateAndSanitizeMission } from '../validation.js';

export class OllamaProvider implements IAiMissionProvider {
  readonly name = 'Local Ollama';
  private readonly baseUrl: string;
  private readonly modelName: string;

  constructor(baseUrl?: string, modelName: string = 'llama3.2:3b') {
    this.baseUrl = (baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/$/, '');
    this.modelName = process.env.OLLAMA_MODEL || modelName;
  }

  async generate(options: GenerateMissionOptions): Promise<GeneratedMission> {
    const userPrompt = buildMissionUserPrompt(options);

    const requestBody = {
      model: this.modelName,
      system: AI_SYSTEM_PROMPT,
      prompt: userPrompt,
      format: 'json',
      stream: false,
    };

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Ollama local endpoint responded with HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data?.response;

    if (!rawContent || typeof rawContent !== 'string') {
      throw new Error('Ollama local model returned empty response');
    }

    const jsonString = extractJsonFromText(rawContent);
    const parsedData = JSON.parse(jsonString);

    return validateAndSanitizeMission(
      parsedData,
      `Local Open-Weight Model (${this.modelName} via Ollama)`
    );
  }
}
