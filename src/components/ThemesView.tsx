import React from 'react';
import { THEMES_DATA } from '../data/themesData';
import { ThemeConfig } from '../types';
import { Sparkles, Palette, Type, Music, Volume2, Image as ImageIcon, Check } from 'lucide-react';

interface ThemesViewProps {
  selectedThemeId: string;
  setSelectedThemeId: (id: 'ancient_india' | 'futuristic_arena' | 'cartoon_sports') => void;
}

export const ThemesView: React.FC<ThemesViewProps> = ({ selectedThemeId, setSelectedThemeId }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="mb-8 p-8 rounded-3xl bg-[#12121A] border border-indigo-500/30 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Dvandva: 3 Unique Visual Identity Themes</span>
        </div>
        <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">
          Cohesive Visual & Audio Identity Systems
        </h2>
        <p className="mt-2 text-sm text-slate-300 font-medium">
          Every theme includes a tailored color palette, font pairings, UI layout styles, icon art direction, background music stems, and character styles.
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEMES_DATA.map((theme: ThemeConfig) => {
          const isSelected = theme.id === selectedThemeId;
          return (
            <div
              key={theme.id}
              className={`rounded-2xl border transition-all flex flex-col overflow-hidden shadow-2xl relative ${
                isSelected
                  ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Visual Bar */}
              <div
                className="h-28 p-4 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.cardBg} 100%)`,
                }}
              >
                <div className="flex items-center justify-between z-10">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow"
                    style={{ backgroundColor: theme.colors.primary, color: '#000' }}
                  >
                    Theme {theme.id === 'ancient_india' ? '#1' : theme.id === 'futuristic_arena' ? '#2' : '#3'}
                  </span>
                  {isSelected && (
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold shadow">
                      <Check className="w-3 h-3" />
                      <span>ACTIVE THEME</span>
                    </div>
                  )}
                </div>

                <div className="z-10">
                  <h3 className="text-lg font-black" style={{ color: theme.colors.text }}>
                    {theme.title}
                  </h3>
                  <p className="text-xs opacity-80 line-clamp-1" style={{ color: theme.colors.text }}>
                    {theme.subtitle}
                  </p>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5 flex-1 flex flex-col space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">{theme.description}</p>

                {/* Color Palette Swatches */}
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400 mb-2 flex items-center space-x-1">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>Color Palette Swatches</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-1">
                      <div className="h-7 rounded-lg shadow border border-white/10" style={{ backgroundColor: theme.colors.primary }} />
                      <div className="text-[9px] text-slate-400 text-center truncate">Primary</div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-7 rounded-lg shadow border border-white/10" style={{ backgroundColor: theme.colors.secondary }} />
                      <div className="text-[9px] text-slate-400 text-center truncate">Secondary</div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-7 rounded-lg shadow border border-white/10" style={{ backgroundColor: theme.colors.player1Color }} />
                      <div className="text-[9px] text-slate-400 text-center truncate">Player 1</div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-7 rounded-lg shadow border border-white/10" style={{ backgroundColor: theme.colors.player2Color }} />
                      <div className="text-[9px] text-slate-400 text-center truncate">Player 2</div>
                    </div>
                  </div>
                </div>

                {/* Fonts & UI Specs */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start space-x-2">
                    <Type className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Display Font:</span>{' '}
                      <span className="text-slate-400">{theme.fonts.display}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Music className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Music Style:</span>{' '}
                      <span className="text-slate-400">{theme.musicStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">SFX Style:</span>{' '}
                      <span className="text-slate-400">{theme.sfxStyle}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Characters:</span>{' '}
                      <span className="text-slate-400">{theme.characterStyle}</span>
                    </div>
                  </div>
                </div>

                {/* Apply Theme Button */}
                <div className="pt-2 mt-auto">
                  <button
                    onClick={() => setSelectedThemeId(theme.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {isSelected ? 'ACTIVE THEME APPLIED' : 'APPLY THIS THEME'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
