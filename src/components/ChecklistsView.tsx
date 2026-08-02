import React, { useState } from 'react';
import { CHECKLISTS_DATA } from '../data/checklistsData';
import { CheckSquare, CheckCircle2, Circle, Sparkles, RefreshCw } from 'lucide-react';

export const ChecklistsView: React.FC = () => {
  const [checklists, setChecklists] = useState(CHECKLISTS_DATA);

  const toggleItem = (categoryId: string, itemId: string) => {
    setChecklists((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
          };
        }
        return cat;
      })
    );
  };

  const totalItems = checklists.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = checklists.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.completed).length,
    0
  );
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-[#12121A] border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dvandva: Commercial Quality Assurance Checklists</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight uppercase">
            7 Production Launch Checklists
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Track asset production, 60 FPS low-end performance tuning, audio mix, multi-touch QA, and Google Play Store compliance.
          </p>
        </div>

        {/* Global Progress Gauge */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shrink-0 w-full md:w-64">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-bold text-slate-300">Launch Readiness</span>
            <span className="font-mono font-bold text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-1.5 text-right font-mono">
            {completedItems} of {totalItems} verified
          </div>
        </div>
      </div>

      {/* Checklists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklists.map((cat) => {
          const catCompleted = cat.items.filter((i) => i.completed).length;
          const catTotal = cat.items.length;
          const isAllDone = catCompleted === catTotal;

          return (
            <div
              key={cat.id}
              className={`bg-slate-900/90 border rounded-2xl p-5 shadow-xl transition-all ${
                isAllDone ? 'border-emerald-500/40' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>{cat.title}</span>
                    {isAllDone && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        VERIFIED
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 font-bold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
                  {catCompleted}/{catTotal}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(cat.id, item.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-start space-x-3 ${
                      item.completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 focus:outline-none">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <div>
                      <div className={`text-xs font-bold ${item.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {item.task}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {item.details}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
