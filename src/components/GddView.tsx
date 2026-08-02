import React, { useState } from 'react';
import { SYSTEMS_DATA, SystemDocSection } from '../data/systemsData';
import { Layout, GitMerge, Award, Coins, Target, Calendar, BarChart2, Sliders, DollarSign, Database, PackagePlus, ChevronRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  GitMerge,
  Award,
  Coins,
  Target,
  Calendar,
  BarChart2,
  Sliders,
  DollarSign,
  Database,
  PackagePlus,
};

export const GddView: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(SYSTEMS_DATA[0].id);

  const selectedSection = SYSTEMS_DATA.find((s) => s.id === activeSectionId) || SYSTEMS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Overview Banner */}
      <div className="mb-8 p-8 rounded-3xl bg-[#12121A] border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3 border border-indigo-500/30">
            <span>Dvandva: Mini Games • Commercial Master GDD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight uppercase">
            Systems & Game Design Document
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed font-medium">
            Commercial-grade functional specs for Home Screen Navigation, Dual-Touch HUD, Economy Engine, Player Progression, Daily Quests, 7-Day Rewards, Save Encryption, and Modular Mini-Game Expansion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar System Menu */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
            GDD Systems Modules ({SYSTEMS_DATA.length})
          </h3>
          <div className="space-y-1.5">
            {SYSTEMS_DATA.map((sys) => {
              const Icon = iconMap[sys.iconName] || Layout;
              const isActive = sys.id === activeSectionId;
              return (
                <button
                  key={sys.id}
                  onClick={() => setActiveSectionId(sys.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{sys.title}</div>
                    <div className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {sys.summary}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 mt-1.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Module Detail Panel */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4 mb-6">
            {(() => {
              const Icon = iconMap[selectedSection.iconName] || Layout;
              return (
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Icon className="w-6 h-6" />
                </div>
              );
            })()}
            <div>
              <h3 className="text-xl font-bold text-white">{selectedSection.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedSection.summary}</p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedSection.details.map((detail, index) => (
              <div key={index} className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
                <h4 className="text-sm font-bold text-amber-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>{detail.heading}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {detail.content}
                </p>

                {detail.bulletPoints && detail.bulletPoints.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {detail.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
