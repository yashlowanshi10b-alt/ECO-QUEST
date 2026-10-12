import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  Award, 
  Check, 
  ShieldAlert, 
  Info, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { Mission, MissionDifficulty } from '../../types';
import { CategoryBadge } from '../CategoryBadge';
import { DifficultyBadge } from '../DifficultyBadge';

interface AiMissionGeneratorModalProps {
  onClose: () => void;
  onMissionCreated: (mission: Mission) => void;
}

type EnvironmentOption = 'park' | 'forest' | 'neighborhood' | 'backyard' | 'beach' | 'urban';

const ENVIRONMENTS: { id: EnvironmentOption; label: string; icon: string; desc: string }[] = [
  { id: 'park', label: 'Public Park', icon: '🌳', desc: 'Lawns, trails, flowerbeds, recreation zones' },
  { id: 'forest', label: 'Forest / Woods', icon: '🌲', desc: 'Canopy cover, hiking trails, fallen timber' },
  { id: 'neighborhood', label: 'Neighborhood', icon: '🏘️', desc: 'Sidewalks, street trees, storm drains, curbs' },
  { id: 'backyard', label: 'Backyard / Patio', icon: '🏡', desc: 'Private garden, balcony planters, yard soil' },
  { id: 'beach', label: 'Beach / Waterway', icon: '🏖️', desc: 'Lakefront, riverbank, ocean shoreline' },
  { id: 'urban', label: 'Urban Town', icon: '🏙️', desc: 'City sidewalks, plaza planters, downtown greens' },
];

const ROTATING_TIPS = [
  'Consulting open-weight Meta Llama 3.1 8B for safe outdoor activities...',
  'Checking Leave-No-Trace and ecological non-destructive principles...',
  'Tailoring safety warnings and protective equipment checklist...',
  'Formatting structured quest schema with XP rewards...',
];

export const AiMissionGeneratorModal: React.FC<AiMissionGeneratorModalProps> = ({
  onClose,
  onMissionCreated,
}) => {
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentOption>('park');
  const [duration, setDuration] = useState<number>(25);
  const [difficulty, setDifficulty] = useState<MissionDifficulty>('Easy');
  const [focusArea, setFocusArea] = useState<string>('any');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [generatedMission, setGeneratedMission] = useState<Mission | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Rotate educational tips while loading
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % ROTATING_TIPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setFallbackNotice(null);

    try {
      const response = await fetch('/api/missions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environment: selectedEnv,
          durationMinutes: duration,
          difficulty,
          focusArea: focusArea === 'any' ? undefined : focusArea,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate mission from backend.');
      }

      setGeneratedMission(json.data);
      if (json.fallbackUsed && json.notice) {
        setFallbackNotice(json.notice);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorMessage(`Generation failed: ${msg}. Try again or use offline mode.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptMission = () => {
    if (generatedMission) {
      onMissionCreated(generatedMission);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="generator-title"
    >
      <div className="bg-offwhite-50 border border-offwhite-300 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-nature-lg relative overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-offwhite-300 bg-offwhite-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-lime-500/20 text-lime-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="generator-title" className="font-extrabold text-base sm:text-lg text-forest-900 leading-tight">
                AI Outdoor Quest Generator
              </h2>
              <p className="text-[11px] text-forest-700 font-medium">Powered by Open-Weight Models & Curated Fallbacks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-forest-700 hover:bg-offwhite-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-forest-800">
          
          {/* LOADING STATE */}
          {isLoading ? (
            <div className="text-center py-12 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-lime-500/20 text-lime-700 flex items-center justify-center mx-auto relative">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-forest-900">Synthesizing Nature Quest...</h3>
                <p className="text-xs text-forest-700 italic max-w-xs mx-auto min-h-[32px] transition-all">
                  &ldquo;{ROTATING_TIPS[tipIndex]}&rdquo;
                </p>
              </div>
              <div className="p-3 bg-offwhite-200 rounded-2xl border border-offwhite-300 text-[11px] text-forest-700 max-w-sm mx-auto flex items-center space-x-2 text-left">
                <Info className="w-4 h-4 text-forest-500 flex-shrink-0" />
                <span>Our secure backend calls genuine open-weight models without exposing API keys.</span>
              </div>
            </div>
          ) : generatedMission ? (
            /* PREVIEW OF GENERATED MISSION */
            <div className="space-y-4 animate-scaleUp">
              
              {/* Attribution Banner */}
              <div className="p-3 rounded-2xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-lime-600" />
                  <span className="font-extrabold text-[11px] text-forest-900">
                    {generatedMission.isAiGenerated ? 'Genuine Open-Weight AI Quest' : 'Curated Offline Fallback Quest'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-lime-800 bg-lime-200/60 px-2 py-0.5 rounded-md font-semibold">
                  {generatedMission.modelAttribution}
                </span>
              </div>

              {fallbackNotice && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{fallbackNotice}</span>
                </div>
              )}

              {/* Mission Card Preview */}
              <div className="bg-offwhite-100 p-4 rounded-2xl border border-offwhite-300 space-y-3">
                <div className="flex items-center justify-between">
                  <CategoryBadge category={generatedMission.category} />
                  <DifficultyBadge difficulty={generatedMission.difficulty} />
                </div>

                <h3 className="text-base font-extrabold text-forest-900 leading-snug">
                  {generatedMission.title}
                </h3>
                <p className="text-xs text-forest-800 leading-relaxed">
                  {generatedMission.description}
                </p>

                <div className="flex items-center space-x-3 text-xs pt-2 border-t border-offwhite-300 font-semibold text-forest-800">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-forest-600" />
                    <span>{generatedMission.durationMinutes} mins</span>
                  </span>
                  <span className="flex items-center space-x-1 text-lime-700 bg-lime-100 px-2 py-0.5 rounded-lg">
                    <Award className="w-3.5 h-3.5 text-lime-600" />
                    <span>+{generatedMission.xpReward} XP</span>
                  </span>
                </div>
              </div>

              {/* Safety Instructions Preview */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-[11px] uppercase tracking-wider text-amber-800">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>AI Safety Guidelines</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-900">
                  {generatedMission.safetyTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Action Steps Preview */}
              <div className="space-y-1.5">
                <span className="font-bold uppercase tracking-wider text-forest-700 text-[10px]">Action Steps</span>
                <div className="space-y-1">
                  {generatedMission.actionSteps.map((step, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-offwhite-200 border border-offwhite-300 text-[11px] flex items-start space-x-2">
                      <span className="font-bold text-lime-700">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={() => setGeneratedMission(null)}
                  className="flex-1 py-2.5 rounded-xl border border-offwhite-300 font-bold text-xs text-forest-800 hover:bg-offwhite-200 transition"
                >
                  Adjust Options
                </button>
                <button
                  onClick={handleAcceptMission}
                  className="flex-1 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-forest-950 font-extrabold text-xs shadow-md shadow-lime-500/20 flex items-center justify-center space-x-1.5 transition"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Accept Quest</span>
                </button>
              </div>
            </div>
          ) : (
            /* CONFIGURATION FORM */
            <div className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Environment Selection */}
              <div>
                <label className="block font-bold text-forest-900 mb-2">
                  1. Where are you touching grass right now?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ENVIRONMENTS.map((env) => {
                    const isSelected = selectedEnv === env.id;
                    return (
                      <button
                        key={env.id}
                        type="button"
                        onClick={() => setSelectedEnv(env.id)}
                        className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-lime-500/15 border-lime-500 text-forest-950 shadow-xs'
                            : 'bg-offwhite-100 border-offwhite-300 hover:border-forest-400 text-forest-800'
                        }`}
                      >
                        <div className="text-xl mb-1">{env.icon}</div>
                        <div>
                          <div className="font-bold text-xs">{env.label}</div>
                          <div className="text-[10px] text-forest-600 line-clamp-1">{env.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Available */}
              <div>
                <label className="block font-bold text-forest-900 mb-1.5">
                  2. How much time do you have?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDuration(mins)}
                      className={`py-2 rounded-xl border text-center font-bold text-xs transition ${
                        duration === mins
                          ? 'bg-forest-900 text-offwhite-50 border-forest-900 shadow-xs'
                          : 'bg-offwhite-100 border-offwhite-300 hover:bg-offwhite-200 text-forest-800'
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block font-bold text-forest-900 mb-1.5">
                  3. Quest Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Easy', 'Medium', 'Hard'] as MissionDifficulty[]).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 rounded-xl border text-center font-bold text-xs transition ${
                        difficulty === diff
                          ? 'bg-lime-500/20 text-lime-800 border-lime-500 font-extrabold'
                          : 'bg-offwhite-100 border-offwhite-300 hover:bg-offwhite-200 text-forest-800'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block font-bold text-forest-900 mb-1.5">
                  4. Optional Focus Area
                </label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-offwhite-100 border border-offwhite-300 text-xs text-forest-900 font-semibold focus:outline-none focus:border-forest-700"
                >
                  <option value="any">Any Ecological Activity</option>
                  <option value="cleanup">Litter Cleanup & Waterway Defense</option>
                  <option value="biodiversity">Biodiversity & Pollinator Survey</option>
                  <option value="plant-id">Native Tree & Flora Identification</option>
                  <option value="waste-reduction">Single-Use Waste Reduction</option>
                  <option value="mindfulness">Outdoor Mindful Unplugging</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-forest-950 font-extrabold text-xs shadow-md shadow-lime-500/20 flex items-center justify-center space-x-2 transition"
                >
                  <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  <span>Generate Outdoor Quest</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
