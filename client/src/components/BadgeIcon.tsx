import React from 'react';
import { Footprints, Trash2, Bug, Trees, Flame, Award, Sparkles } from 'lucide-react';

interface BadgeIconProps {
  iconName: string;
  className?: string;
  unlocked?: boolean;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ iconName, className = 'w-6 h-6', unlocked = false }) => {
  const getIcon = () => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className={className} />;
      case 'Trash2':
        return <Trash2 className={className} />;
      case 'Bug':
        return <Bug className={className} />;
      case 'Trees':
        return <Trees className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Award':
        return <Award className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl p-2.5 transition-all duration-300 ${
        unlocked
          ? 'bg-gradient-to-br from-lime-400 to-lime-600 text-forest-950 shadow-md shadow-lime-500/20'
          : 'bg-offwhite-300 text-earth-400 opacity-60'
      }`}
    >
      {getIcon()}
    </div>
  );
};
