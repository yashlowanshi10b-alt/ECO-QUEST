import { useState, useEffect } from 'react';
import { EcoQuestProvider, useEcoQuest } from './context/EcoQuestContext';
import { Navbar } from './components/Navbar';
import { MobileNav, TabKey } from './components/MobileNav';
import { DashboardTab } from './components/DashboardTab';
import { MissionsTab } from './components/MissionsTab';
import { ImpactTab } from './components/ImpactTab';
import { BadgesTab } from './components/BadgesTab';
import { MissionDetailModal } from './components/MissionDetailModal';
import { AiMissionGeneratorModal } from './components/ai/AiMissionGeneratorModal';
import { Mission } from './types';
import { Home, Compass, BarChart3, Award } from 'lucide-react';

function EcoQuestApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'offline'>('checking');

  const { missions, badges, isMissionCompleted, completeMission, addCustomMission } = useEcoQuest();

  // Check backend health status from Phase 1
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('offline');
        }
      })
      .catch(() => {
        setBackendStatus('offline');
      });
  }, []);

  const uncompletedMissionsCount = missions.filter((m) => !isMissionCompleted(m.id)).length;
  const unlockedBadgesCount = badges.filter((b) => b.unlockedAt !== null).length;

  const desktopNavItems = [
    { id: 'home' as TabKey, label: 'Dashboard', icon: Home },
    { id: 'missions' as TabKey, label: `Missions (${uncompletedMissionsCount})`, icon: Compass },
    { id: 'impact' as TabKey, label: 'Impact Ledger', icon: BarChart3 },
    { id: 'badges' as TabKey, label: `Badges (${unlockedBadgesCount}/${badges.length})`, icon: Award },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-offwhite-100 text-forest-950">
      {/* Top Header */}
      <Navbar />

      {/* Desktop Tab Navigation Bar */}
      <div className="hidden sm:block border-b border-offwhite-300 bg-offwhite-50/80 backdrop-blur-sm sticky top-[61px] z-20">
        <div className="max-w-4xl mx-auto px-4 flex items-center space-x-1">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
                  isActive
                    ? 'border-forest-900 text-forest-900 bg-offwhite-200/50'
                    : 'border-transparent text-forest-700 hover:text-forest-950 hover:bg-offwhite-200/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-lime-600' : 'text-forest-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab View */}
      <main className="max-w-4xl mx-auto px-4 pt-6 sm:pt-8 flex-1 w-full">
        {activeTab === 'home' && (
          <DashboardTab
            onGoToMissions={() => setActiveTab('missions')}
            onSelectMission={(m) => setSelectedMission(m)}
            onOpenAiGenerator={() => setIsAiModalOpen(true)}
          />
        )}
        {activeTab === 'missions' && (
          <MissionsTab 
            onSelectMission={(m) => setSelectedMission(m)} 
            onOpenAiGenerator={() => setIsAiModalOpen(true)}
          />
        )}
        {activeTab === 'impact' && <ImpactTab />}
        {activeTab === 'badges' && <BadgesTab />}
      </main>

      {/* AI Mission Generator Modal */}
      {isAiModalOpen && (
        <AiMissionGeneratorModal
          onClose={() => setIsAiModalOpen(false)}
          onMissionCreated={(newMission) => {
            addCustomMission(newMission);
            setSelectedMission(newMission);
          }}
        />
      )}

      {/* Active Mission Details Modal */}
      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          isCompleted={isMissionCompleted(selectedMission.id)}
          onClose={() => setSelectedMission(null)}
          onComplete={(mission, impactValue, notes) => {
            return completeMission(mission, impactValue, notes);
          }}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        uncompletedCount={uncompletedMissionsCount}
        unlockedBadgeCount={unlockedBadgesCount}
      />

      {/* Desktop Footer with System Health Indicator */}
      <footer className="border-t border-offwhite-300 bg-offwhite-200/40 py-4 px-4 text-center text-xs text-forest-700 hidden sm:block">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p>EcoQuest • MLH Hacktoberfest Open-Source AI Challenge</p>
          <div className="flex items-center space-x-2 text-[11px]">
            <span>Backend:</span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold ${
                backendStatus === 'connected'
                  ? 'bg-lime-500/20 text-lime-800'
                  : 'bg-stone-200 text-stone-600'
              }`}
            >
              {backendStatus === 'connected' ? '● Online' : '○ Standby'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <EcoQuestProvider>
      <EcoQuestApp />
    </EcoQuestProvider>
  );
}
