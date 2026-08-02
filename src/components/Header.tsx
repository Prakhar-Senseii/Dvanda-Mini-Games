import React from 'react';
import { Gamepad2, Coins, Sparkles, Volume2, VolumeX, Shield, Award, FolderKanban, CheckSquare, Layers, Code, Play } from 'lucide-react';
import { THEMES_DATA } from '../data/themesData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedThemeId: string;
  setSelectedThemeId: (id: 'ancient_india' | 'futuristic_arena' | 'cartoon_sports') => void;
  coins: number;
  p1Wins: number;
  p2Wins: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedThemeId,
  setSelectedThemeId,
  coins,
  p1Wins,
  p2Wins,
  soundEnabled,
  setSoundEnabled,
}) => {
  const currentTheme = THEMES_DATA.find((t) => t.id === selectedThemeId) || THEMES_DATA[0];

  const navTabs = [
    { id: 'arcade', label: 'Play Arcade Demo', icon: Play, highlight: true },
    { id: 'gdd', label: 'Master GDD & Systems', icon: Shield },
    { id: 'themes', label: 'Visual Themes', icon: Sparkles },
    { id: 'games', label: '30 Mini-Game Specs', icon: Gamepad2 },
    { id: 'architecture', label: 'C# Unity Architecture', icon: Code },
    { id: 'roadmap', label: 'Milestone Roadmap', icon: FolderKanban },
    { id: 'checklists', label: 'Launch Checklists', icon: CheckSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#12121A]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl text-slate-100 transition-colors">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
            <span className="text-xl font-black italic text-white tracking-tighter">DV</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black tracking-tight text-white uppercase italic">
                DVANDVA
              </h1>
              <span className="text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">
                Mini Games
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block mt-0.5">
              Commercial Unity C# 2-Player Local Arcade Suite • Rank #1 Multiplayer Hub
            </p>
          </div>
        </div>

        {/* Rival Scores & Currency Bar */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* P1 vs P2 Local Rival Scoreboard */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-full py-1.5 px-4 text-xs font-semibold shadow-inner">
            <span className="text-amber-400 font-bold mr-1.5 text-xs">P1</span>
            <span className="text-white font-mono text-xs font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">{p1Wins}</span>
            <span className="text-slate-500 font-black mx-2 text-[10px]">VS</span>
            <span className="text-emerald-400 font-bold mr-1.5 text-xs">P2</span>
            <span className="text-white font-mono text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">{p2Wins}</span>
          </div>

          {/* Coins Display */}
          <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-full py-1.5 px-4 text-xs font-semibold">
            <div className="w-4 h-4 bg-amber-400 rounded-full border-2 border-amber-600 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
            <span className="font-bold text-xs text-amber-100 font-mono">{coins}</span>
          </div>

          {/* Theme Selector Dropdown */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-900/80 rounded-full px-3 py-1.5 border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedThemeId}
              onChange={(e) => setSelectedThemeId(e.target.value as 'ancient_india' | 'futuristic_arena' | 'cartoon_sports')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer font-medium"
            >
              {THEMES_DATA.map((theme) => (
                <option key={theme.id} value={theme.id} className="bg-slate-900 text-slate-200">
                  Theme: {theme.title.split(':')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Audio Mute Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition shadow"
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar py-1">
        <nav className="flex space-x-1.5 min-w-max pb-1.5">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40'
                    : tab.highlight
                    ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'
                    : 'bg-slate-900/40 hover:bg-slate-800/80 text-slate-400 border border-transparent'
                }`}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_6px_rgba(165,180,252,1)]" />}
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
