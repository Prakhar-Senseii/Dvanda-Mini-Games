import React, { useState } from 'react';
import { ROADMAP_DATA } from '../data/roadmapData';
import { FolderKanban, Clock, CheckCircle2, Folder, FileCode, Box, ChevronDown, ChevronUp } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const [expandedMilestone, setExpandedMilestone] = useState<number>(1);

  const totalWeeks = ROADMAP_DATA.reduce((acc, curr) => acc + curr.estimatedWeeks, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-[#12121A] border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            <FolderKanban className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dvandva: 8-Milestone Production Timeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight uppercase">
            Development Roadmap & Pipeline
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Structured roadmap covering framework creation, UI, input, 30 mini-games production, polish, optimization, and Play Store launch.
          </p>
        </div>

        <div className="bg-[#0A0A0F] px-5 py-3.5 rounded-2xl border border-slate-800 shrink-0 text-right shadow-inner">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block">Total Est. Timeline</span>
          <span className="text-2xl font-black text-indigo-400 font-mono">{totalWeeks} Weeks</span>
          <span className="text-[10px] text-slate-400 font-medium block">~5.5 Months Commercial Production</span>
        </div>
      </div>

      {/* Milestones Accordion List */}
      <div className="space-y-4">
        {ROADMAP_DATA.map((milestone) => {
          const isExpanded = milestone.number === expandedMilestone;
          return (
            <div
              key={milestone.number}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-amber-500/60 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Milestone Header */}
              <button
                onClick={() => setExpandedMilestone(isExpanded ? 0 : milestone.number)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isExpanded
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-amber-400'
                    }`}
                  >
                    M{milestone.number}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white truncate">{milestone.title}</h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{milestone.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="hidden sm:flex items-center space-x-1 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{milestone.estimatedWeeks} Weeks</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-amber-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Milestone Details Expansion */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-5 text-xs text-slate-300">
                  <p className="text-slate-300 leading-relaxed font-medium bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {milestone.summary}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Tasks List */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Key Tasks</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {milestone.tasks.map((task, i) => (
                          <li key={i} className="flex items-start space-x-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            <span className="text-slate-300">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Folder Structure & Scripts */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center space-x-1.5 mb-2">
                          <Folder className="w-4 h-4 text-indigo-400" />
                          <span>Unity Folder Structure</span>
                        </h4>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1">
                          {milestone.folderStructure.map((folder, i) => (
                            <div key={i} className="text-indigo-300 flex items-center space-x-1.5">
                              <span>📁</span>
                              <span>{folder}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="font-bold text-slate-400 text-[10px] uppercase block mb-1 flex items-center space-x-1">
                            <FileCode className="w-3 h-3 text-amber-400" />
                            <span>Scripts</span>
                          </span>
                          <div className="space-y-0.5 font-mono text-[11px] text-slate-300">
                            {milestone.scripts.map((s, i) => (
                              <div key={i}>• {s}</div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="font-bold text-slate-400 text-[10px] uppercase block mb-1 flex items-center space-x-1">
                            <Box className="w-3 h-3 text-emerald-400" />
                            <span>Prefabs</span>
                          </span>
                          <div className="space-y-0.5 font-mono text-[11px] text-slate-300">
                            {milestone.prefabs.map((p, i) => (
                              <div key={i}>• {p}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
