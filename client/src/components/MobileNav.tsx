import React from 'react';
import { Home, Compass, BarChart3, Award } from 'lucide-react';

export type TabKey = 'home' | 'missions' | 'impact' | 'badges';

interface MobileNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  uncompletedCount: number;
  unlockedBadgeCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  uncompletedCount,
  unlockedBadgeCount,
}) => {
  const tabs = [
    {
      id: 'home' as TabKey,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'missions' as TabKey,
      label: 'Missions',
      icon: Compass,
      badgeCount: uncompletedCount,
    },
    {
      id: 'impact' as TabKey,
      label: 'Impact',
      icon: BarChart3,
    },
    {
      id: 'badges' as TabKey,
      label: 'Badges',
      icon: Award,
      badgeCount: unlockedBadgeCount > 0 ? unlockedBadgeCount : undefined,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-forest-900/95 backdrop-blur-md border-t border-forest-800 pb-safe sm:hidden"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 relative transition-colors ${
                isActive ? 'text-lime-400 font-bold' : 'text-offwhite-300 hover:text-offwhite-50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-extrabold rounded-full bg-lime-500 text-forest-950">
                    {tab.badgeCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-8 h-1 rounded-full bg-lime-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
