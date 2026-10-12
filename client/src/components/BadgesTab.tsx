import React from 'react';
import { Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useEcoQuest } from '../context/EcoQuestContext';
import { BadgeIcon } from './BadgeIcon';

export const BadgesTab: React.FC = () => {
  const { badges } = useEcoQuest();

  const unlockedCount = badges.filter((b) => b.unlockedAt !== null).length;
  const progressPercent = Math.round((unlockedCount / badges.length) * 100);

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-forest-900 flex items-center space-x-2">
          <Award className="w-6 h-6 text-lime-600" />
          <span>Explorer Badges & Honors</span>
        </h1>
        <p className="text-xs sm:text-sm text-forest-700">
          Earn recognition for consistency, biodiversity discovery, and community action.
        </p>
      </div>

      {/* Progress banner */}
      <div className="bg-offwhite-50 rounded-3xl p-5 sm:p-6 border border-offwhite-300 shadow-nature">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-lime-600" />
            <span className="font-extrabold text-sm text-forest-900">
              Badge Collection Progress
            </span>
          </div>
          <span className="font-mono font-bold text-xs text-lime-700">
            {unlockedCount} / {badges.length} Unlocked ({progressPercent}%)
          </span>
        </div>

        <div className="w-full bg-offwhite-200 rounded-full h-3 p-0.5 border border-offwhite-300 overflow-hidden">
          <div
            className="bg-gradient-to-r from-lime-500 to-lime-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const isUnlocked = badge.unlockedAt !== null;

          return (
            <div
              key={badge.id}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-offwhite-50 border-lime-500/40 shadow-nature'
                  : 'bg-offwhite-100/60 border-offwhite-300 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <BadgeIcon iconName={badge.iconName} unlocked={isUnlocked} className="w-7 h-7" />
                  
                  {isUnlocked ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-lime-100 text-lime-800 border border-lime-300 uppercase">
                      <CheckCircle2 className="w-3 h-3 text-lime-600" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-offwhite-200 text-stone-500 border border-offwhite-300 uppercase">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-forest-900 leading-snug">
                  {badge.name}
                </h3>
                <p className="mt-1 text-xs text-forest-700 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-offwhite-200 text-[11px]">
                <div className="text-forest-600 font-medium">
                  <strong>Requirement:</strong> {badge.requirementText}
                </div>
                {isUnlocked && badge.unlockedAt && (
                  <div className="text-lime-700 font-semibold mt-1">
                    Earned on {new Date(badge.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
