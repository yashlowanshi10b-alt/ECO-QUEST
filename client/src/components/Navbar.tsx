import React, { useState } from 'react';
import { Sprout, Flame, Award, Info, X, ShieldAlert } from 'lucide-react';
import { useEcoQuest } from '../context/EcoQuestContext';

export const Navbar: React.FC = () => {
  const { userImpact, levelInfo } = useEcoQuest();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-forest-900 text-offwhite-50 border-b border-forest-800 shadow-nature backdrop-blur-md bg-opacity-95">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center text-forest-950 shadow-md shadow-lime-500/20">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-offwhite-50">EcoQuest</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 font-semibold tracking-wide uppercase">
                  Touch Grass
                </span>
              </div>
              <p className="text-[11px] text-offwhite-300 hidden sm:block">Outdoor Environmental Adventure</p>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Streak Counter */}
            <div 
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                userImpact.streakDays > 0
                  ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                  : 'bg-forest-800/80 text-offwhite-300 border-forest-700'
              }`}
              title="Consecutive daily outdoor streak"
            >
              <Flame className={`w-4 h-4 ${userImpact.streakDays > 0 ? 'text-orange-400 fill-orange-400 animate-pulse' : 'text-stone-400'}`} />
              <span>{userImpact.streakDays}d Streak</span>
            </div>

            {/* Level & XP */}
            <div className="hidden xs:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-forest-800/90 text-offwhite-50 border border-forest-700">
              <Award className="w-3.5 h-3.5 text-lime-400" />
              <span>Lvl {levelInfo.level}</span>
              <span className="text-lime-400 font-mono text-[11px] font-semibold">{userImpact.totalXp} XP</span>
            </div>

            {/* Info modal toggle button */}
            <button
              onClick={() => setShowInfo(true)}
              aria-label="View challenge and data honesty information"
              className="p-1.5 rounded-full text-offwhite-300 hover:text-offwhite-50 hover:bg-forest-800 transition"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Info & Data Honesty Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-offwhite-50 border border-offwhite-300 rounded-3xl max-w-md w-full p-6 shadow-nature-lg relative text-forest-900">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-forest-700 hover:bg-offwhite-200"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-forest-800 font-bold text-lg mb-3">
              <Sprout className="w-5 h-5 text-lime-600" />
              <span>About EcoQuest</span>
            </div>

            <p className="text-sm text-forest-800 leading-relaxed mb-4">
              EcoQuest is designed for the <strong>MLH Hacktoberfest &ldquo;Touch Grass&rdquo; AI Challenge</strong> to encourage people to spend meaningful time outdoors improving their local environment.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 text-xs text-amber-900 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-950">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Our Transparency Commitment</span>
              </div>
              <p>
                All environmental metrics (litter gathered, species spotted, trees logged) are <strong>self-reported community contributions</strong>.
              </p>
              <p>
                We do not invent automated camera verification or claim third-party certification. Your impact reflects your personal commitment to our shared outdoors.
              </p>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-offwhite-50 font-bold text-sm transition"
            >
              Got it, let&rsquo;s touch grass!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
