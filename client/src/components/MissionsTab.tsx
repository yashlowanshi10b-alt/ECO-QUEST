import { useState, useMemo } from 'react';
import { Search, Filter, Compass, Sparkles } from 'lucide-react';
import { useEcoQuest } from '../context/EcoQuestContext';
import { Mission } from '../types';
import { MissionCard } from './MissionCard';

interface MissionsTabProps {
  onSelectMission: (mission: Mission) => void;
  onOpenAiGenerator: () => void;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ onSelectMission, onOpenAiGenerator }) => {
  const { missions, isMissionCompleted } = useEcoQuest();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed'>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Quests' },
    { id: 'cleanup', label: 'Litter Cleanup' },
    { id: 'biodiversity', label: 'Biodiversity' },
    { id: 'plant-id', label: 'Plant ID' },
    { id: 'waste-reduction', label: 'Waste Reduction' },
    { id: 'mindfulness', label: 'Mindfulness' },
  ];

  const filteredMissions = useMemo(() => {
    return missions.filter((mission) => {
      // Category filter
      if (selectedCategory !== 'all' && mission.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && mission.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      const completed = isMissionCompleted(mission.id);
      if (statusFilter === 'uncompleted' && completed) return false;
      if (statusFilter === 'completed' && !completed) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = mission.title.toLowerCase().includes(query);
        const matchesDesc = mission.description.toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [missions, selectedCategory, selectedDifficulty, statusFilter, searchQuery, isMissionCompleted]);

  return (
    <div className="space-y-5 pb-20 sm:pb-8 animate-fadeIn">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-forest-900 flex items-center space-x-2">
            <Compass className="w-6 h-6 text-lime-600" />
            <span>Outdoor Quest Board</span>
          </h1>
          <p className="text-xs sm:text-sm text-forest-700">
            Curated hands-on activities to restore biodiversity and minimize waste.
          </p>
        </div>

        {/* Actions bar: Search & AI Generator Button */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-forest-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search quests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-offwhite-50 border border-offwhite-300 text-xs text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-700 shadow-sm"
            />
          </div>

          <button
            onClick={onOpenAiGenerator}
            className="px-3.5 py-2 rounded-2xl bg-lime-500 hover:bg-lime-400 text-forest-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-sm shadow-lime-500/20 flex-shrink-0 transition"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>AI Quest</span>
          </button>
        </div>
      </div>

      {/* Category Pills (horizontal scrollable on mobile) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                isSelected
                  ? 'bg-forest-900 text-offwhite-50 shadow-sm'
                  : 'bg-offwhite-50 text-forest-800 border border-offwhite-300 hover:border-forest-400'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Filters: Difficulty & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-forest-700 font-semibold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Difficulty:</span>
          </span>
          {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                selectedDifficulty === diff
                  ? 'bg-lime-500/20 text-lime-800 border border-lime-500/40 font-bold'
                  : 'text-forest-700 hover:bg-offwhite-200'
              }`}
            >
              {diff === 'all' ? 'Any' : diff}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1.5 bg-offwhite-200 p-1 rounded-xl border border-offwhite-300">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-0.5 rounded-lg font-semibold transition ${
              statusFilter === 'all' ? 'bg-offwhite-50 text-forest-900 shadow-xs' : 'text-forest-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('uncompleted')}
            className={`px-2.5 py-0.5 rounded-lg font-semibold transition ${
              statusFilter === 'uncompleted' ? 'bg-offwhite-50 text-forest-900 shadow-xs' : 'text-forest-600'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-0.5 rounded-lg font-semibold transition ${
              statusFilter === 'completed' ? 'bg-offwhite-50 text-forest-900 shadow-xs' : 'text-forest-600'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Missions Grid */}
      {filteredMissions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              isCompleted={isMissionCompleted(mission.id)}
              onSelect={onSelectMission}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-offwhite-50 rounded-3xl border border-offwhite-300 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-offwhite-200 text-forest-700 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-forest-900">No missions match your filters</h3>
          <p className="text-xs text-forest-600 max-w-sm mx-auto">
            Try resetting your difficulty or category filters, or search for a different keyword.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-forest-900 text-offwhite-50 text-xs font-bold hover:bg-forest-800 transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
