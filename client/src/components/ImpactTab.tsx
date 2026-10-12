import React from 'react';
import { 
  BarChart3, 
  Trash2, 
  Bug, 
  Trees, 
  Clock, 
  Sprout, 
  ShieldCheck, 
  HeartHandshake, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useEcoQuest } from '../context/EcoQuestContext';

export const ImpactTab: React.FC = () => {
  const { userImpact, completionHistory } = useEcoQuest();

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-fadeIn">
      
      {/* Title & Introduction */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-forest-900 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-lime-600" />
          <span>Environmental Impact Ledger</span>
        </h1>
        <p className="text-xs sm:text-sm text-forest-700">
          A transparent record of your real-world contributions to local ecosystems.
        </p>
      </div>

      {/* Ethical Transparency Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-5 text-emerald-950 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-emerald-800">
          <HeartHandshake className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Self-Reported Community Action Guarantee</span>
        </div>
        <p className="text-xs text-emerald-900/90 leading-relaxed">
          {userImpact.disclaimer}
        </p>
        <div className="pt-2 flex items-center space-x-2 text-[11px] text-emerald-800 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Status: <strong>Community-Reported (Unverified by Sensors/Labs)</strong></span>
        </div>
      </div>

      {/* Cumulative Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        
        {/* Metric 1: Litter */}
        <div className="bg-offwhite-50 p-5 rounded-3xl border border-offwhite-300 shadow-nature">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
              Cleanup
            </span>
          </div>
          <div className="text-3xl font-extrabold text-forest-900">{userImpact.selfReportedLitterCount}</div>
          <div className="text-xs font-semibold text-forest-800 mt-0.5">Litter Items Collected</div>
          <p className="text-[11px] text-forest-600 mt-1 leading-normal">
            Removed from trails, parks, and storm drains before degrading into microplastics.
          </p>
        </div>

        {/* Metric 2: Species */}
        <div className="bg-offwhite-50 p-5 rounded-3xl border border-offwhite-300 shadow-nature">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bug className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 uppercase">
              Biodiversity
            </span>
          </div>
          <div className="text-3xl font-extrabold text-forest-900">{userImpact.selfReportedSpeciesCount}</div>
          <div className="text-xs font-semibold text-forest-800 mt-0.5">Wildlife & Insects Cataloged</div>
          <p className="text-[11px] text-forest-600 mt-1 leading-normal">
            Observed pollinators, native birds, and local organisms in their natural habitats.
          </p>
        </div>

        {/* Metric 3: Trees & Plants */}
        <div className="bg-offwhite-50 p-5 rounded-3xl border border-offwhite-300 shadow-nature">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200 uppercase">
              Flora
            </span>
          </div>
          <div className="text-3xl font-extrabold text-forest-900">{userImpact.selfReportedPlantsIdentified}</div>
          <div className="text-xs font-semibold text-forest-800 mt-0.5">Native Trees & Flora Mapped</div>
          <p className="text-[11px] text-forest-600 mt-1 leading-normal">
            Identified through bark textures, leaf canopy, and seasonal wildflower observation.
          </p>
        </div>

        {/* Metric 4: Waste Avoided */}
        <div className="bg-offwhite-50 p-5 rounded-3xl border border-offwhite-300 shadow-nature">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 uppercase">
              Prevention
            </span>
          </div>
          <div className="text-3xl font-extrabold text-forest-900">{userImpact.selfReportedWasteItemsAvoided}</div>
          <div className="text-xs font-semibold text-forest-800 mt-0.5">Single-Use Items Prevented</div>
          <p className="text-[11px] text-forest-600 mt-1 leading-normal">
            Refused single-use plastics, cups, and bags during outdoor routines.
          </p>
        </div>

        {/* Metric 5: Outdoor Time */}
        <div className="bg-offwhite-50 p-5 rounded-3xl border border-offwhite-300 shadow-nature">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 uppercase">
              Touch Grass
            </span>
          </div>
          <div className="text-3xl font-extrabold text-forest-900">{userImpact.selfReportedOutdoorMinutes}</div>
          <div className="text-xs font-semibold text-forest-800 mt-0.5">Total Outdoor Minutes</div>
          <p className="text-[11px] text-forest-600 mt-1 leading-normal">
            Time disconnected from screens and connected to soil, sky, and fresh air.
          </p>
        </div>
      </div>

      {/* Completion History Log */}
      <div className="bg-offwhite-50 rounded-3xl p-5 sm:p-6 border border-offwhite-300 shadow-nature space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-forest-900 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-lime-600" />
            <span>Field Activity Log</span>
          </h2>
          <span className="text-xs font-semibold text-forest-700">
            {completionHistory.length} Logged Entries
          </span>
        </div>

        {completionHistory.length > 0 ? (
          <div className="divide-y divide-offwhite-200">
            {completionHistory.map((record) => (
              <div key={record.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-extrabold text-forest-900 text-sm">{record.missionTitle}</div>
                  <div className="flex items-center space-x-2 text-[11px] text-forest-600 mt-0.5">
                    <span>{new Date(record.completedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-medium text-emerald-800">{record.selfReportedImpactLabel}</span>
                    <span>•</span>
                    <span className="text-amber-800 font-semibold">{record.verificationLabel}</span>
                  </div>
                  {record.notes && (
                    <p className="mt-1 text-xs text-forest-700 italic bg-offwhite-200/60 px-2.5 py-1 rounded-lg">
                      &ldquo;{record.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-lime-100 font-bold text-lime-800 text-xs">
                    +{record.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-forest-600 text-xs space-y-1">
            <AlertCircle className="w-5 h-5 mx-auto text-forest-400 mb-1" />
            <p className="font-bold text-forest-800">No missions logged yet</p>
            <p>Complete your first outdoor quest to begin recording your environmental history.</p>
          </div>
        )}
      </div>
    </div>
  );
};
