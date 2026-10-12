import React, { createContext, useContext, useState, useEffect } from 'react';
import { Mission, Badge, UserImpact, MissionCompletionRecord } from '../types';
import { CURATED_MISSIONS } from '../data/missions';
import { INITIAL_BADGES } from '../data/badges';
import {
  loadUserImpact,
  saveUserImpact,
  loadCompletionHistory,
  saveCompletionHistory,
  loadCustomMissions,
  saveCustomMissions,
  calculateLevel,
  updateStreak,
  evaluateBadges,
  LevelInfo,
  DEFAULT_USER_IMPACT,
} from '../utils/storage';

interface EcoQuestContextType {
  missions: Mission[];
  badges: Badge[];
  userImpact: UserImpact;
  levelInfo: LevelInfo;
  completionHistory: MissionCompletionRecord[];
  isMissionCompleted: (missionId: string) => boolean;
  completeMission: (
    mission: Mission,
    impactValue?: number,
    notes?: string
  ) => { success: boolean; xpEarned: number; newlyUnlockedBadges: Badge[] };
  addCustomMission: (mission: Mission) => void;
  resetProgress: () => void;
}

const EcoQuestContext = createContext<EcoQuestContextType | undefined>(undefined);

export const EcoQuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>(() => {
    const custom = loadCustomMissions();
    return [...custom, ...CURATED_MISSIONS];
  });
  const [userImpact, setUserImpact] = useState<UserImpact>(() => loadUserImpact());
  const [completionHistory, setCompletionHistory] = useState<MissionCompletionRecord[]>(() =>
    loadCompletionHistory()
  );

  // Compute active badges based on unlocked badge IDs
  const badges: Badge[] = INITIAL_BADGES.map((badge) => ({
    ...badge,
    unlockedAt: userImpact.unlockedBadgeIds.includes(badge.id)
      ? userImpact.lastActiveDate || new Date().toISOString()
      : null,
  }));

  const levelInfo = calculateLevel(userImpact.totalXp);

  // Persist user impact whenever it changes
  useEffect(() => {
    saveUserImpact(userImpact);
  }, [userImpact]);

  // Persist completion history whenever it changes
  useEffect(() => {
    saveCompletionHistory(completionHistory);
  }, [completionHistory]);

  const isMissionCompleted = (missionId: string): boolean => {
    return userImpact.completedMissionIds.includes(missionId);
  };

  const completeMission = (
    mission: Mission,
    impactValue?: number,
    notes?: string
  ): { success: boolean; xpEarned: number; newlyUnlockedBadges: Badge[] } => {
    // Guard against duplicate completions
    if (userImpact.completedMissionIds.includes(mission.id)) {
      return { success: false, xpEarned: 0, newlyUnlockedBadges: [] };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newStreak = updateStreak(userImpact.lastActiveDate, userImpact.streakDays, todayStr);
    const newXp = userImpact.totalXp + mission.xpReward;
    const newCompletedIds = [...userImpact.completedMissionIds, mission.id];
    const newLevelInfo = calculateLevel(newXp);

    const actualImpact = impactValue !== undefined && impactValue > 0 
      ? impactValue 
      : mission.suggestedDefaultImpact;

    // Tally category-specific self-reported metrics
    let litterDelta = 0;
    let speciesDelta = 0;
    let plantsDelta = 0;
    let wasteDelta = 0;

    if (mission.category === 'cleanup') {
      litterDelta = actualImpact;
    } else if (mission.category === 'biodiversity') {
      speciesDelta = actualImpact;
    } else if (mission.category === 'plant-id') {
      plantsDelta = actualImpact;
    } else if (mission.category === 'waste-reduction') {
      wasteDelta = actualImpact;
    }

    const tentativeImpact: UserImpact = {
      ...userImpact,
      totalXp: newXp,
      currentLevel: newLevelInfo.level,
      levelTitle: newLevelInfo.title,
      streakDays: newStreak,
      lastActiveDate: todayStr,
      completedMissionsCount: userImpact.completedMissionsCount + 1,
      completedMissionIds: newCompletedIds,
      selfReportedLitterCount: userImpact.selfReportedLitterCount + litterDelta,
      selfReportedSpeciesCount: userImpact.selfReportedSpeciesCount + speciesDelta,
      selfReportedPlantsIdentified: userImpact.selfReportedPlantsIdentified + plantsDelta,
      selfReportedWasteItemsAvoided: userImpact.selfReportedWasteItemsAvoided + wasteDelta,
      selfReportedOutdoorMinutes: userImpact.selfReportedOutdoorMinutes + mission.durationMinutes,
    };

    // Evaluate newly unlocked badges
    const completedMissionsList = missions.filter((m) => newCompletedIds.includes(m.id));
    const allUnlockedIds = evaluateBadges(tentativeImpact, completedMissionsList);
    const newlyUnlockedIds = allUnlockedIds.filter((id) => !userImpact.unlockedBadgeIds.includes(id));
    const newlyUnlockedBadges = INITIAL_BADGES.filter((b) => newlyUnlockedIds.includes(b.id));

    const finalImpact: UserImpact = {
      ...tentativeImpact,
      unlockedBadgeIds: allUnlockedIds,
    };

    // Create completion log record with explicit self-reported label
    const newRecord: MissionCompletionRecord = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      missionId: mission.id,
      missionTitle: mission.title,
      completedAt: new Date().toISOString(),
      xpEarned: mission.xpReward,
      notes: notes || undefined,
      selfReportedImpactValue: actualImpact,
      selfReportedImpactLabel: `${actualImpact} ${mission.impactUnit}`,
      verificationLabel: 'Self-Reported Community Action',
    };

    setUserImpact(finalImpact);
    setCompletionHistory((prev) => [newRecord, ...prev]);

    return {
      success: true,
      xpEarned: mission.xpReward,
      newlyUnlockedBadges,
    };
  };

  const addCustomMission = (newMission: Mission) => {
    setMissions((prev) => {
      if (prev.some((m) => m.id === newMission.id)) return prev;
      const updated = [newMission, ...prev];
      const customOnly = updated.filter(
        (m) => m.isAiGenerated || m.id.startsWith('ai-') || m.id.startsWith('fallback-')
      );
      saveCustomMissions(customOnly);
      return updated;
    });
  };

  const resetProgress = () => {
    setUserImpact(DEFAULT_USER_IMPACT);
    setCompletionHistory([]);
  };

  return (
    <EcoQuestContext.Provider
      value={{
        missions,
        badges,
        userImpact,
        levelInfo,
        completionHistory,
        isMissionCompleted,
        completeMission,
        addCustomMission,
        resetProgress,
      }}
    >
      {children}
    </EcoQuestContext.Provider>
  );
};

export const useEcoQuest = (): EcoQuestContextType => {
  const context = useContext(EcoQuestContext);
  if (!context) {
    throw new Error('useEcoQuest must be used within an EcoQuestProvider');
  }
  return context;
};
