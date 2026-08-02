import React, { useState, useMemo } from 'react';
import { MINI_GAMES_DATA } from '../data/miniGamesData';
import { MiniGameSpec, CategoryType } from '../types';
import { Search, Gamepad2, Clock, Zap, Filter, ChevronRight, X, Play, CheckCircle2, Sparkles, ArrowUpDown, Layers, Cpu } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface MiniGamesViewProps {
  onPlayGameDemo?: (gameId: string) => void;
}

const CATEGORIES: ('All' | CategoryType)[] = [
  'All',
  'Board Games',
  'Sports',
  'Arcade',
  'Fighting',
  'Racing',
  'Puzzle',
  'Reaction',
  'Party',
  'Strategy',
];

export const MiniGamesView: React.FC<MiniGamesViewProps> = ({ onPlayGameDemo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CategoryType>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<number | 'All'>('All');
  const [selectedGame, setSelectedGame] = useState<MiniGameSpec | null>(null);
  const [showRankingMatrix, setShowRankingMatrix] = useState(false);

  // AI Generator state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiCustomConcept, setAiCustomConcept] = useState<string | null>(null);
  const [aiPromptCategory, setAiPromptCategory] = useState<CategoryType>('Arcade');

  // Filtered games
  const filteredGames = useMemo(() => {
    return MINI_GAMES_DATA.filter((game) => {
      const matchesSearch =
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || game.category === selectedCategory;
      const matchesDiff = difficultyFilter === 'All' || game.difficulty === difficultyFilter;
      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [searchTerm, selectedCategory, difficultyFilter]);

  // Ranked games (Easiest to Hardest)
  const rankedGames = useMemo(() => {
    return [...MINI_GAMES_DATA].sort((a, b) => {
      if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
      return a.estimatedDevDays - b.estimatedDevDays;
    });
  }, []);

  // Generate AI Mini-Game Idea using Gemini
  const handleGenerateAiIdea = async () => {
    setIsAiGenerating(true);
    setAiCustomConcept(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setAiCustomConcept(`[Concept Concept Generator]\nTitle: Cyber ${aiPromptCategory} Overdrive\nCategory: ${aiPromptCategory}\nGameplay: 2-player split-screen fast mechanics featuring energy shields and power-ups.\nControls P1: Left Touch Joystick | Controls P2: Right Touch Joystick\nWin Condition: Score 5 points first.\nEstimated Dev: 3 Days.`);
        setIsAiGenerating(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Act as a senior mobile game designer. Design 1 innovative, original 2-player local same-device mini-game concept in the category '${aiPromptCategory}'. Provide concise specifications formatted with: Title, Tagline, Gameplay, Controls P1/P2, Win Condition, Difficulty (1-5), and Est. Dev Days. Keep it brief and engaging.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAiCustomConcept(response.text || 'Failed to generate concept.');
    } catch (err) {
      console.error(err);
      setAiCustomConcept(`[Sample Generated Idea]\nTitle: Chrono ${aiPromptCategory} Duel\nCategory: ${aiPromptCategory}\nGameplay: Time-bending split-screen match where player actions alter rival friction.\nWin Condition: First to 3 round points.`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#12121A] border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dvandva: 30 Original Mini-Game Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight uppercase">
            30 Mini-Game Specifications
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Divided across 9 categories with complete gameplay, controls, assets, animations, and audio specs.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowRankingMatrix(!showRankingMatrix)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 border ${
              showRankingMatrix
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-800'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{showRankingMatrix ? 'Card Grid View' : 'Easiest-to-Hardest Ranking'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      {!showRankingMatrix && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search mini-games by name, tagline, or mechanics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400">Difficulty:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All (1-5)</option>
                <option value="1" className="bg-slate-900">1 - Easiest</option>
                <option value="2" className="bg-slate-900">2 - Easy</option>
                <option value="3" className="bg-slate-900">3 - Medium</option>
                <option value="4" className="bg-slate-900">4 - Hard</option>
                <option value="5" className="bg-slate-900">5 - Complex</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW Mode 1: Ranking Matrix Table */}
      {showRankingMatrix ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mb-8">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-amber-400" />
              <span>30 Mini-Games Development Complexity Matrix (Easiest → Hardest)</span>
            </h3>
            <span className="text-xs text-slate-400">Sorted by Difficulty & Est. Dev Days</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Mini-Game</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Physics</th>
                  <th className="p-3">Est. Dev</th>
                  <th className="p-3">Playable Demo</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rankedGames.map((game, idx) => (
                  <tr key={game.id} className="hover:bg-slate-800/50 transition">
                    <td className="p-3 font-mono text-amber-400 font-bold">#{idx + 1}</td>
                    <td className="p-3 font-bold text-white">{game.name}</td>
                    <td className="p-3 text-indigo-300">{game.category}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          game.difficulty === 1
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : game.difficulty === 2
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : game.difficulty === 3
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        Level {game.difficulty}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{game.physicsComplexity}</td>
                    <td className="p-3 font-mono text-slate-200">{game.estimatedDevDays} Days</td>
                    <td className="p-3">
                      {game.isPlayableInDemo ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                          Yes (Arcade)
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Spec Only</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedGame(game)}
                        className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold"
                      >
                        Inspect GDD
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW Mode 2: Mini-Games Card Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {game.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] font-bold text-slate-400">Diff:</span>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        game.difficulty === 1
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : game.difficulty <= 3
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {game.difficulty}/5
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                  {game.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {game.tagline}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3 text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{game.estimatedDevDays}d</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-500" />
                    <span>{game.physicsComplexity}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {game.isPlayableInDemo && onPlayGameDemo && (
                    <button
                      onClick={() => onPlayGameDemo(game.id)}
                      className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
                      title="Play Demo in Arcade"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedGame(game)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center space-x-1 text-xs shadow-md shadow-indigo-600/20"
                  >
                    <span>Spec</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Concept Generator Card */}
      <div className="mt-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>AI Mini-Game Concept Generator</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Generate additional 2-player local mini-game concepts on demand powered by Gemini AI.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={aiPromptCategory}
              onChange={(e) => setAiPromptCategory(e.target.value as CategoryType)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={handleGenerateAiIdea}
              disabled={isAiGenerating}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shrink-0 disabled:opacity-50"
            >
              {isAiGenerating ? 'Generating...' : 'Generate New Idea'}
            </button>
          </div>
        </div>

        {aiCustomConcept && (
          <div className="bg-slate-950 rounded-xl p-4 border border-indigo-500/30 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed">
            {aiCustomConcept}
          </div>
        )}
      </div>

      {/* Detail Modal for Selected Mini-Game */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {selectedGame.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">{selectedGame.name}</h3>
              <p className="text-xs text-amber-300 italic">{selectedGame.tagline}</p>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-1">Gameplay Mechanics</h4>
                <p className="leading-relaxed">{selectedGame.gameplay}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl">
                  <h5 className="font-bold text-amber-300 mb-1">Player 1 Controls</h5>
                  <p>{selectedGame.controlsP1}</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl">
                  <h5 className="font-bold text-emerald-300 mb-1">Player 2 Controls</h5>
                  <p>{selectedGame.controlsP2}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Win Condition:</span>
                  <span className="text-white font-semibold">{selectedGame.winCondition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Difficulty Level:</span>
                  <span className="text-amber-400 font-bold">{selectedGame.difficulty} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Physics Complexity:</span>
                  <span className="text-indigo-300">{selectedGame.physicsComplexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Estimated Dev Days:</span>
                  <span className="text-emerald-400 font-bold">{selectedGame.estimatedDevDays} Days</span>
                </div>
              </div>

              {/* Asset Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-white mb-2">Required Assets</h5>
                  <ul className="space-y-1">
                    {selectedGame.requiredAssets.map((ast, i) => (
                      <li key={i} className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{ast}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-white mb-2">Audio Requirements</h5>
                  <ul className="space-y-1">
                    {selectedGame.audioRequirements.map((aud, i) => (
                      <li key={i} className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{aud}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              {selectedGame.isPlayableInDemo && onPlayGameDemo && (
                <button
                  onClick={() => {
                    const id = selectedGame.id;
                    setSelectedGame(null);
                    onPlayGameDemo(id);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Interactive Demo Now</span>
                </button>
              )}
              <button
                onClick={() => setSelectedGame(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
