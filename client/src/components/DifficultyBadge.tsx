import React from 'react';
import { MissionDifficulty } from '../types';

interface DifficultyBadgeProps {
  difficulty: MissionDifficulty;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const getStyle = () => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hard':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border tracking-wide uppercase ${getStyle()}`}>
      {difficulty}
    </span>
  );
};
