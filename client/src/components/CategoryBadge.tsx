import React from 'react';
import { Trash2, Bug, Trees, Sprout, Compass } from 'lucide-react';
import { MissionCategory } from '../types';

interface CategoryBadgeProps {
  category: MissionCategory;
  showIcon?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, showIcon = true }) => {
  const getConfig = () => {
    switch (category) {
      case 'cleanup':
        return {
          label: 'Litter Cleanup',
          icon: <Trash2 className="w-3.5 h-3.5" />,
          classes: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        };
      case 'biodiversity':
        return {
          label: 'Biodiversity',
          icon: <Bug className="w-3.5 h-3.5" />,
          classes: 'bg-amber-100 text-amber-800 border-amber-300',
        };
      case 'plant-id':
        return {
          label: 'Plant Identification',
          icon: <Trees className="w-3.5 h-3.5" />,
          classes: 'bg-lime-100 text-lime-800 border-lime-300',
        };
      case 'waste-reduction':
        return {
          label: 'Waste Reduction',
          icon: <Sprout className="w-3.5 h-3.5" />,
          classes: 'bg-teal-100 text-teal-800 border-teal-300',
        };
      case 'mindfulness':
        return {
          label: 'Nature Mindfulness',
          icon: <Compass className="w-3.5 h-3.5" />,
          classes: 'bg-sky-100 text-sky-800 border-sky-300',
        };
      default:
        return {
          label: category,
          icon: <Sprout className="w-3.5 h-3.5" />,
          classes: 'bg-stone-100 text-stone-800 border-stone-300',
        };
    }
  };

  const { label, icon, classes } = getConfig();

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}
    >
      {showIcon && <span>{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
