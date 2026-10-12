import { Clock, Award, CheckCircle2, ChevronRight, Sparkles, Sprout } from 'lucide-react';
import { Mission } from '../types';
import { CategoryBadge } from './CategoryBadge';
import { DifficultyBadge } from './DifficultyBadge';

interface MissionCardProps {
  mission: Mission;
  isCompleted: boolean;
  onSelect: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, isCompleted, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(mission)}
      className={`group relative bg-offwhite-50 rounded-2xl sm:rounded-3xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isCompleted
          ? 'border-emerald-200/80 bg-emerald-50/20 shadow-sm'
          : 'border-offwhite-300 hover:border-lime-500/50 shadow-nature hover:shadow-nature-lg hover:-translate-y-0.5'
      }`}
    >
      {/* Top Meta: Category & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <CategoryBadge category={mission.category} />
          <div className="flex items-center space-x-1.5">
            <DifficultyBadge difficulty={mission.difficulty} />
            {isCompleted && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Done</span>
              </span>
            )}
          </div>
        </div>

        {/* AI Origin Pill */}
        {mission.isAiGenerated ? (
          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-lime-500/15 text-lime-800 border border-lime-500/30 mb-2">
            <Sparkles className="w-3 h-3 text-lime-600" />
            <span>Open-Weight AI Quest</span>
          </div>
        ) : mission.modelAttribution?.includes('Fallback') ? (
          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-800 border border-amber-500/30 mb-2">
            <Sprout className="w-3 h-3 text-amber-600" />
            <span>Offline Curated Fallback</span>
          </div>
        ) : null}

        {/* Title */}
        <h3 className="font-extrabold text-base sm:text-lg text-forest-900 group-hover:text-forest-700 transition leading-snug line-clamp-2">
          {mission.title}
        </h3>

        {/* Short description */}
        <p className="mt-2 text-xs sm:text-sm text-forest-800/80 line-clamp-2 leading-relaxed">
          {mission.description}
        </p>
      </div>

      {/* Bottom Footer: Duration, XP, and Button */}
      <div className="mt-5 pt-4 border-t border-offwhite-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3 text-forest-800">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-forest-600" />
            <span>{mission.durationMinutes} min</span>
          </span>
          <span className="flex items-center space-x-1 font-bold text-lime-700 bg-lime-100/60 px-2 py-0.5 rounded-md">
            <Award className="w-3.5 h-3.5 text-lime-600" />
            <span>+{mission.xpReward} XP</span>
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(mission);
          }}
          className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
            isCompleted
              ? 'bg-offwhite-200 text-forest-700 hover:bg-offwhite-300'
              : 'bg-forest-900 text-offwhite-50 hover:bg-forest-800 shadow-sm'
          }`}
        >
          <span>{isCompleted ? 'View' : 'Start Quest'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
