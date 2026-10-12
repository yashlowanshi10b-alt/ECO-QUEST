import { IAiMissionProvider, GenerateMissionOptions, GeneratedMission } from '../types.js';
import { AI_SYSTEM_PROMPT, buildMissionUserPrompt } from '../prompt.js';
import { extractJsonFromText, validateAndSanitizeMission } from '../validation.js';

export class GroqLlamaProvider implements IAiMissionProvider {
  readonly name = 'Groq Cloud (Meta Llama 3.1 8B Instruct)';
  private readonly apiKey: string;
  private readonly modelName: string;

  constructor(apiKey?: string, modelName: string = 'llama-3.1-8b-instant') {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || '';
    this.modelName = modelName;
  }

  async generate(options: GenerateMissionOptions): Promise<GeneratedMission> {
    if (!this.apiKey || this.apiKey.trim().length === 0) {
      throw new Error('GROQ_API_KEY is not configured in server environment variables.');
    }

    const userPrompt = buildMissionUserPrompt(options);

    const requestBody = {
      model: this.modelName,
      messages: [
        { role: 'system', content: AI_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.6,
      max_tokens: 1024,
    };

    // Use Node.js built-in fetch
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Groq API responded with HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson?.error?.message) {
          errorMessage += `: ${errorJson.error.message}`;
        }
      } catch {
        errorMessage += `: ${errorText.substring(0, 150)}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;

    if (!rawContent || typeof rawContent !== 'string') {
      throw new Error('Groq model returned empty content');
    }

    const jsonString = extractJsonFromText(rawContent);
    const parsedData = JSON.parse(jsonString);

    return validateAndSanitizeMission(
      parsedData,
      `Meta Llama 3.1 8B Instruct (Hosted on Groq Cloud)`
    );
  }
}
