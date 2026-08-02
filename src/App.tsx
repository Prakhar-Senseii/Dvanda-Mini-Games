import React, { useState } from 'react';
import { Header } from './components/Header';
import { ArcadeSimulator } from './components/ArcadeSimulator';
import { GddView } from './components/GddView';
import { ThemesView } from './components/ThemesView';
import { MiniGamesView } from './components/MiniGamesView';
import { ArchitectureView } from './components/ArchitectureView';
import { RoadmapView } from './components/RoadmapView';
import { ChecklistsView } from './components/ChecklistsView';
import { soundFx } from './utils/audioSynth';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('arcade');
  const [selectedThemeId, setSelectedThemeId] = useState<'ancient_india' | 'futuristic_arena' | 'cartoon_sports'>('ancient_india');
  const [coins, setCoins] = useState<number>(350);
  const [p1Wins, setP1Wins] = useState<number>(3);
  const [p2Wins, setP2Wins] = useState<number>(2);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedDemoGameId, setSelectedDemoGameId] = useState<string>('puck_clash');

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    soundFx.enabled = enabled;
  };

  const handleRecordWin = (winningPlayer: 1 | 2, coinsEarned: number) => {
    if (winningPlayer === 1) setP1Wins((w) => w + 1);
    else setP2Wins((w) => w + 1);
    setCoins((c) => c + coinsEarned);
  };

  const handlePlayGameDemo = (gameId: string) => {
    setSelectedDemoGameId(gameId);
    setActiveTab('arcade');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedThemeId={selectedThemeId}
        setSelectedThemeId={setSelectedThemeId}
        coins={coins}
        p1Wins={p1Wins}
        p2Wins={p2Wins}
        soundEnabled={soundEnabled}
        setSoundEnabled={handleSoundToggle}
      />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0A0A0F]">
        {activeTab === 'arcade' && (
          <ArcadeSimulator
            initialGameId={selectedDemoGameId}
            selectedThemeId={selectedThemeId}
            onRecordWin={handleRecordWin}
            p1Wins={p1Wins}
            p2Wins={p2Wins}
          />
        )}

        {activeTab === 'gdd' && <GddView />}

        {activeTab === 'themes' && (
          <ThemesView
            selectedThemeId={selectedThemeId}
            setSelectedThemeId={setSelectedThemeId}
          />
        )}

        {activeTab === 'games' && (
          <MiniGamesView onPlayGameDemo={handlePlayGameDemo} />
        )}

        {activeTab === 'architecture' && <ArchitectureView />}

        {activeTab === 'roadmap' && <RoadmapView />}

        {activeTab === 'checklists' && <ChecklistsView />}
      </main>

      {/* Footer Ticker / Status Bar */}
      <footer className="border-t border-slate-800/50 bg-[#0A0A0F] py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-400 font-black italic">DVANDVA: MINI GAMES</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Senior Technical Game Director & Lead Designer Specification</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
              <span>60 FPS Low-End Android Ready</span>
            </span>
            <span>•</span>
            <span>AES-256 Encrypted Save System</span>
            <span>•</span>
            <span className="text-indigo-400 font-bold">30 Original Games</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
