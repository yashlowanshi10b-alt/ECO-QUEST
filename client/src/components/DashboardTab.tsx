import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Compass, 
  Trash2, 
  Bug, 
  Trees, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useEcoQuest } from '../context/EcoQuestContext';
import { Mission } from '../types';

interface DashboardTabProps {
  onGoToMissions: () => void;
  onSelectMission: (mission: Mission) => void;
  onOpenAiGenerator: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ 
  onGoToMissions, 
  onSelectMission,
  onOpenAiGenerator 
}) => {
  const { userImpact, levelInfo, missions, isMissionCompleted } = useEcoQuest();

  // Find the first uncompleted mission as the recommended daily quest
  const recommendedMission = missions.find((m) => !isMissionCompleted(m.id)) || missions[0];

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-fadeIn">
      
      {/* Hero Card */}
      <section className="bg-gradient-to-br from-forest-800 to-forest-950 text-offwhite-50 rounded-3xl p-6 sm:p-8 shadow-nature-lg border border-forest-700 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Compass className="w-64 h-64 text-lime-400" />
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-semibold mb-3 border border-lime-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MLH Hacktoberfest • Touch Grass AI Challenge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-offwhite-50 leading-tight">
            Step outside. Explore your biome. Restore local nature.
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-offwhite-300 leading-relaxed">
            Trade screen time for real-world environmental stewardship. Choose daily eco-missions, log self-reported impact, and level up your outdoor rank.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenAiGenerator}
              className="px-5 py-2.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-forest-950 font-extrabold text-xs shadow-md shadow-lime-500/20 flex items-center space-x-1.5 transition"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Generate AI Quest</span>
            </button>
            <button
              onClick={onGoToMissions}
              className="px-4 py-2.5 rounded-2xl bg-forest-900/80 hover:bg-forest-850 text-offwhite-100 border border-forest-700 font-bold text-xs flex items-center space-x-1.5 transition"
            >
              <Compass className="w-4 h-4 text-lime-400" />
              <span>Explore Missions</span>
            </button>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-2xl bg-forest-900/60 border border-forest-700 text-xs text-offwhite-200">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>{userImpact.streakDays} Day Streak</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Level & XP Progress Card */}
      <section className="bg-offwhite-50 rounded-3xl p-5 sm:p-6 border border-offwhite-300 shadow-nature">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-lime-500/20 border border-lime-400 flex items-center justify-center text-lime-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-forest-700">Current Explorer Rank</div>
              <div className="text-lg font-extrabold text-forest-900">
                Level {levelInfo.level} — <span className="text-lime-700">{levelInfo.title}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-forest-900">{userImpact.totalXp} XP</span>
            <div className="text-[10px] text-forest-600">Next tier: {levelInfo.maxXp} XP</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-offwhite-200 rounded-full h-3 p-0.5 border border-offwhite-300 overflow-hidden">
          <div
            className="bg-gradient-to-r from-lime-500 to-lime-400 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-[11px] text-forest-600">
          <span>{levelInfo.minXp} XP</span>
          <span className="font-semibold text-lime-700">{levelInfo.progressPercent}% to Level {levelInfo.level + 1}</span>
          <span>{levelInfo.maxXp} XP</span>
        </div>
      </section>

      {/* Self-Reported Impact Metrics Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-lime-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Your Environmental Footprint
            </h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-offwhite-200 text-forest-700 font-semibold border border-offwhite-300">
            Self-Reported Community Action
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Metric 1 */}
          <div className="bg-offwhite-50 p-4 rounded-2xl border border-offwhite-300 shadow-nature flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-forest-900">{userImpact.selfReportedLitterCount}</div>
              <div className="text-[11px] text-forest-700 font-medium leading-tight">Litter Items Cleaned</div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-offwhite-50 p-4 rounded-2xl border border-offwhite-300 shadow-nature flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-forest-900">{userImpact.selfReportedSpeciesCount}</div>
              <div className="text-[11px] text-forest-700 font-medium leading-tight">Wildlife & Insects Spotted</div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-offwhite-50 p-4 rounded-2xl border border-offwhite-300 shadow-nature flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center mb-2">
              <Trees className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-forest-900">{userImpact.selfReportedPlantsIdentified}</div>
              <div className="text-[11px] text-forest-700 font-medium leading-tight">Native Trees/Plants ID&rsquo;d</div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-offwhite-50 p-4 rounded-2xl border border-offwhite-300 shadow-nature flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-forest-900">{userImpact.selfReportedOutdoorMinutes}</div>
              <div className="text-[11px] text-forest-700 font-medium leading-tight">Outdoor Minutes Logged</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quest of the Day */}
      {recommendedMission && (
        <section className="bg-gradient-to-r from-forest-900 to-forest-800 text-offwhite-50 rounded-3xl p-5 sm:p-6 shadow-nature border border-forest-700">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-lime-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Quest for Today</span>
            </span>
            <span className="text-offwhite-300 font-medium">{recommendedMission.durationMinutes} mins</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-offwhite-50">
            {recommendedMission.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-offwhite-300 line-clamp-2 leading-relaxed">
            {recommendedMission.description}
          </p>

          <div className="mt-4 pt-4 border-t border-forest-700/80 flex items-center justify-between">
            <span className="text-xs font-bold text-lime-400 bg-lime-400/20 px-2.5 py-1 rounded-lg border border-lime-400/30">
              +{recommendedMission.xpReward} XP Reward
            </span>

            <button
              onClick={() => onSelectMission(recommendedMission)}
              className="px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-forest-950 font-bold text-xs flex items-center space-x-1 transition"
            >
              <span>{isMissionCompleted(recommendedMission.id) ? 'View Completed' : 'Accept Quest'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* Completed Missions Summary Bar */}
      <section className="bg-offwhite-50 rounded-2xl p-4 border border-offwhite-300 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-forest-800">
            <strong>{userImpact.completedMissionsCount}</strong> of <strong>{missions.length}</strong> Curated Missions Completed
          </span>
        </div>
        <button
          onClick={onGoToMissions}
          className="text-forest-900 font-bold hover:text-lime-700 transition flex items-center space-x-1"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};
