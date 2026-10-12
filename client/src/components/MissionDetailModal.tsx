import { useState } from 'react';
import { 
  X, 
  Clock, 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  Check, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { Mission, Badge } from '../types';
import { CategoryBadge } from './CategoryBadge';
import { DifficultyBadge } from './DifficultyBadge';

interface MissionDetailModalProps {
  mission: Mission;
  isCompleted: boolean;
  onClose: () => void;
  onComplete: (mission: Mission, impactValue: number, notes: string) => {
    success: boolean;
    xpEarned: number;
    newlyUnlockedBadges: Badge[];
  };
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({
  mission,
  isCompleted,
  onClose,
  onComplete,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [impactCount, setImpactCount] = useState<number>(mission.suggestedDefaultImpact);
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [celebrationResult, setCelebrationResult] = useState<{
    xpEarned: number;
    newlyUnlockedBadges: Badge[];
  } | null>(null);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleFinishMission = () => {
    const res = onComplete(mission, impactCount, personalNotes);
    if (res.success) {
      setCelebrationResult({
        xpEarned: res.xpEarned,
        newlyUnlockedBadges: res.newlyUnlockedBadges,
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-title"
    >
      <div className="bg-offwhite-50 border border-offwhite-300 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-nature-lg relative overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-offwhite-300 bg-offwhite-100 flex items-start justify-between">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center space-x-2">
              <CategoryBadge category={mission.category} />
              <DifficultyBadge difficulty={mission.difficulty} />
            </div>
            <h2 id="mission-title" className="text-xl sm:text-2xl font-extrabold text-forest-900 leading-tight">
              {mission.title}
            </h2>
            {mission.isAiGenerated && mission.modelAttribution && (
              <div className="flex items-center space-x-1.5 text-[11px] font-bold text-lime-800 bg-lime-500/15 border border-lime-500/30 px-2.5 py-0.5 rounded-full inline-flex">
                <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                <span>{mission.modelAttribution}</span>
              </div>
            )}
            {!mission.isAiGenerated && mission.modelAttribution?.includes('Fallback') && (
              <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-800 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-flex">
                <span>🌿 {mission.modelAttribution}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-forest-700 hover:bg-offwhite-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          
          {/* CELEBRATION VIEW WHEN COMPLETED */}
          {celebrationResult ? (
            <div className="text-center py-6 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-lime-400 text-forest-950 flex items-center justify-center mx-auto shadow-lg shadow-lime-500/30">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-700">Quest Completed!</span>
                <h3 className="text-2xl font-extrabold text-forest-900 mt-1">
                  +{celebrationResult.xpEarned} XP Earned
                </h3>
                <p className="text-xs text-forest-700 mt-1">
                  Thank you for contributing to your local environment.
                </p>
              </div>

              {/* Badges unlocked alert */}
              {celebrationResult.newlyUnlockedBadges.length > 0 && (
                <div className="p-4 rounded-2xl bg-lime-500/15 border border-lime-500/30 text-left space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-extrabold text-lime-800">
                    <Sparkles className="w-4 h-4 text-lime-600" />
                    <span>New Badge Unlocked!</span>
                  </div>
                  {celebrationResult.newlyUnlockedBadges.map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-3 bg-offwhite-50 p-2.5 rounded-xl border border-lime-300">
                      <div className="w-8 h-8 rounded-lg bg-lime-500 flex items-center justify-center text-forest-950 font-bold text-xs">
                        🏆
                      </div>
                      <div>
                        <div className="font-bold text-xs text-forest-900">{badge.name}</div>
                        <div className="text-[11px] text-forest-700">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Data transparency badge */}
              <div className="p-3 rounded-xl bg-offwhite-200 border border-offwhite-300 text-[11px] text-forest-700 text-left flex items-start space-x-2">
                <HeartHandshake className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Logged as Self-Reported Impact:</strong> Saved to your local device. We celebrate your honest stewardship!
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-forest-900 hover:bg-forest-800 text-offwhite-50 font-bold text-sm shadow-md transition"
              >
                Back to Quest Feed
              </button>
            </div>
          ) : (
            <>
              {/* Mission Stats bar */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-offwhite-200 border border-offwhite-300 text-xs">
                <div className="flex items-center space-x-1.5 font-medium text-forest-800">
                  <Clock className="w-4 h-4 text-forest-600" />
                  <span>Estimated: <strong>{mission.durationMinutes} mins</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 font-bold text-lime-700 bg-lime-100 px-2.5 py-1 rounded-xl">
                  <Award className="w-4 h-4 text-lime-600" />
                  <span>Reward: +{mission.xpReward} XP</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-forest-700 mb-1">Overview</h3>
                <p className="text-forest-800 leading-relaxed text-sm">
                  {mission.description}
                </p>
              </div>

              {/* Safety Instructions (Crucial for outdoor challenge) */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-amber-800">
                  <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Outdoor Safety Guidelines</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-amber-900/90 leading-relaxed">
                  {mission.safetyTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Step by Step Action Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-700">Action Steps</h3>
                  <span className="text-[11px] text-forest-600">
                    {completedSteps.length} of {mission.actionSteps.length} checked
                  </span>
                </div>
                <div className="space-y-2">
                  {mission.actionSteps.map((step, idx) => {
                    const isChecked = completedSteps.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleStep(idx)}
                        className={`w-full text-left p-3 rounded-2xl border text-xs flex items-start space-x-3 transition ${
                          isChecked
                            ? 'bg-lime-500/10 border-lime-500/40 text-forest-900'
                            : 'bg-offwhite-100 border-offwhite-300 hover:border-forest-400 text-forest-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border transition ${
                            isChecked
                              ? 'bg-lime-500 border-lime-500 text-forest-950 font-bold'
                              : 'border-forest-400 bg-offwhite-50'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={`leading-relaxed ${isChecked ? 'line-through text-forest-600' : ''}`}>
                          {step}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Self-Reported Impact Entry */}
              {!isCompleted && (
                <div className="p-4 rounded-2xl bg-offwhite-200 border border-offwhite-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="impact-input" className="text-xs font-bold text-forest-900">
                      Self-Reported Impact ({mission.impactMetricLabel})
                    </label>
                    <span className="text-[11px] text-forest-600 font-mono">
                      {impactCount} {mission.impactUnit}
                    </span>
                  </div>
                  <input
                    id="impact-input"
                    type="range"
                    min="1"
                    max={Math.max(50, mission.suggestedDefaultImpact * 3)}
                    value={impactCount}
                    onChange={(e) => setImpactCount(Number(e.target.value))}
                    className="w-full accent-lime-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-forest-600">
                    <span>1</span>
                    <span>Default: {mission.suggestedDefaultImpact}</span>
                    <span>{Math.max(50, mission.suggestedDefaultImpact * 3)}+</span>
                  </div>

                  <div>
                    <label htmlFor="notes-input" className="text-[11px] font-medium text-forest-700 block mb-1">
                      Field Notes (Optional Observation)
                    </label>
                    <input
                      id="notes-input"
                      type="text"
                      placeholder="e.g. Spotted 3 monarch butterflies near the oak tree"
                      value={personalNotes}
                      onChange={(e) => setPersonalNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-offwhite-50 border border-offwhite-300 text-xs text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-700"
                    />
                  </div>
                </div>
              )}

              {/* Already Completed Notice */}
              {isCompleted && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 flex items-center space-x-3 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Mission Already Completed!</span>
                    <p className="text-[11px] text-emerald-800">
                      You have already earned the reward for this quest. Duplicate XP is disabled to encourage exploring new outdoor missions.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Action Bar */}
        {!celebrationResult && (
          <div className="p-4 border-t border-offwhite-300 bg-offwhite-100 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-offwhite-300 text-forest-800 font-semibold text-xs hover:bg-offwhite-200 transition"
            >
              Close
            </button>

            {!isCompleted ? (
              <button
                onClick={handleFinishMission}
                className="flex-1 py-2.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-forest-950 font-extrabold text-xs shadow-md shadow-lime-500/20 flex items-center justify-center space-x-1.5 transition"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Mark Quest Completed (+{mission.xpReward} XP)</span>
              </button>
            ) : (
              <button
                disabled
                className="flex-1 py-2.5 px-4 rounded-xl bg-offwhite-300 text-stone-500 font-bold text-xs cursor-not-allowed"
              >
                Completed ✓
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
