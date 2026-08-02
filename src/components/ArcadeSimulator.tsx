import React, { useState, useEffect, useRef } from 'react';
import { MINI_GAMES_DATA } from '../data/miniGamesData';
import { THEMES_DATA } from '../data/themesData';
import { soundFx } from '../utils/audioSynth';
import { Play, RotateCcw, Award, Coins, Volume2, Sparkles, Trophy, Keyboard, Smartphone, Gamepad2, ArrowLeft } from 'lucide-react';

interface ArcadeSimulatorProps {
  initialGameId?: string;
  selectedThemeId: string;
  onRecordWin: (winner: 1 | 2, coinsEarned: number) => void;
  p1Wins: number;
  p2Wins: number;
}

export const ArcadeSimulator: React.FC<ArcadeSimulatorProps> = ({
  initialGameId = 'puck_clash',
  selectedThemeId,
  onRecordWin,
  p1Wins,
  p2Wins,
}) => {
  const [activeGameId, setActiveGameId] = useState(initialGameId);
  const [gameScore, setGameScore] = useState({ p1: 0, p2: 0 });
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [gameState, setGameState] = useState<'countdown' | 'playing' | 'gameover'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [reactionSignal, setReactionSignal] = useState<'red' | 'green'>('red');
  const [reactionTimes, setReactionTimes] = useState<{ p1: number | null; p2: number | null }>({ p1: null, p2: null });
  
  // Math Game State
  const [mathQuestion, setMathQuestion] = useState({ eq: '7 + 8', answer: 15, options: [12, 15, 14, 16] });

  // Tug of war state
  const [ropePosition, setRopePosition] = useState(0); // -100 (P1 Win) to +100 (P2 Win)

  // Canvas Refs for Physics Games
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentTheme = THEMES_DATA.find((t) => t.id === selectedThemeId) || THEMES_DATA[0];

  const playableGames = MINI_GAMES_DATA.filter((g) => g.isPlayableInDemo);

  // Sync initial game choice if passed from prop
  useEffect(() => {
    if (initialGameId) {
      setActiveGameId(initialGameId);
      resetMatch();
    }
  }, [initialGameId]);

  const resetMatch = () => {
    setGameScore({ p1: 0, p2: 0 });
    setWinner(null);
    setGameState('countdown');
    setCountdown(3);
    setRopePosition(0);
    setReactionSignal('red');
    setReactionTimes({ p1: null, p2: null });
    generateNewMathQuestion();
  };

  // Countdown timer
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          soundFx.playClick();
          setCountdown((c) => c - 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        setGameState('playing');
        soundFx.playBounce();
        if (activeGameId === 'speed_tap') {
          triggerReactionSignal();
        }
      }
    }
  }, [gameState, countdown, activeGameId]);

  // Reaction Game Random Green Light Trigger
  const triggerReactionSignal = () => {
    setReactionSignal('red');
    setReactionTimes({ p1: null, p2: null });
    const randomDelay = 1500 + Math.random() * 2500;
    setTimeout(() => {
      setReactionSignal('green');
      soundFx.playBounce();
    }, randomDelay);
  };

  // Math question generator
  const generateNewMathQuestion = () => {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const isAdd = Math.random() > 0.5;
    const ans = isAdd ? a + b : a * b;
    const eqStr = isAdd ? `${a} + ${b}` : `${a} × ${b}`;

    const fake1 = ans + (Math.random() > 0.5 ? 2 : -2);
    const fake2 = ans + (Math.random() > 0.5 ? 3 : -3);
    const fake3 = ans + 5;
    const opts = [ans, fake1, fake2, fake3].sort(() => Math.random() - 0.5);

    setMathQuestion({ eq: eqStr, answer: ans, options: opts });
  };

  // Handle Score increment and Victory Check
  const handleScorePoint = (player: 1 | 2, targetScore: number = 5) => {
    if (winner) return;

    soundFx.playScore();
    setGameScore((prev) => {
      const newP1 = player === 1 ? prev.p1 + 1 : prev.p1;
      const newP2 = player === 2 ? prev.p2 + 1 : prev.p2;

      if (newP1 >= targetScore) {
        setWinner(1);
        setGameState('gameover');
        soundFx.playWinFanfare();
        onRecordWin(1, 50);
      } else if (newP2 >= targetScore) {
        setWinner(2);
        setGameState('gameover');
        soundFx.playWinFanfare();
        onRecordWin(2, 50);
      }

      return { p1: newP1, p2: newP2 };
    });
  };

  // Handle Speed Tap Reaction Button
  const handleReactionTap = (player: 1 | 2) => {
    if (gameState !== 'playing' || winner) return;

    if (reactionSignal === 'red') {
      // False start penalty
      soundFx.playExplosion();
      handleScorePoint(player === 1 ? 2 : 1, 3);
      return;
    }

    if (player === 1 && reactionTimes.p1 === null) {
      soundFx.playScore();
      handleScorePoint(1, 3);
      triggerReactionSignal();
    } else if (player === 2 && reactionTimes.p2 === null) {
      soundFx.playScore();
      handleScorePoint(2, 3);
      triggerReactionSignal();
    }
  };

  // Handle Tug of War Mash
  const handleTugMash = (player: 1 | 2) => {
    if (gameState !== 'playing' || winner) return;

    soundFx.playClick();
    setRopePosition((prev) => {
      const delta = player === 1 ? -8 : 8;
      const nextPos = prev + delta;

      if (nextPos <= -80) {
        setWinner(1);
        setGameState('gameover');
        soundFx.playWinFanfare();
        onRecordWin(1, 50);
      } else if (nextPos >= 80) {
        setWinner(2);
        setGameState('gameover');
        soundFx.playWinFanfare();
        onRecordWin(2, 50);
      }

      return nextPos;
    });
  };

  // Handle Math Answer
  const handleMathAnswer = (player: 1 | 2, selectedOpt: number) => {
    if (gameState !== 'playing' || winner) return;

    if (selectedOpt === mathQuestion.answer) {
      soundFx.playScore();
      handleScorePoint(player, 5);
      generateNewMathQuestion();
    } else {
      soundFx.playExplosion();
      // Wrong answer gives point to rival
      handleScorePoint(player === 1 ? 2 : 1, 5);
      generateNewMathQuestion();
    }
  };

  // Canvas Physics Loop for Air Hockey / Puck Clash
  useEffect(() => {
    if (activeGameId !== 'puck_clash' || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Rink Dimensions
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 420);

    // Puck state
    let puck = { x: width / 2, y: height / 2, vx: 3, vy: -3, radius: 14 };

    // Paddles state
    let p1Paddle = { x: width / 2, y: 50, radius: 24 };
    let p2Paddle = { x: width / 2, y: height - 50, radius: 24 };

    // Mouse/Touch Drag for P2 (Bottom) and P1 (Top)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const mouseX = e.clientX - rect.left;

      if (mouseY < height / 2) {
        p1Paddle.x = mouseX;
        p1Paddle.y = Math.min(mouseY, height / 2 - 30);
      } else {
        p2Paddle.x = mouseX;
        p2Paddle.y = Math.max(mouseY, height / 2 + 30);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Rink
      ctx.fillStyle = currentTheme.colors.background;
      ctx.fillRect(0, 0, width, height);

      // Center Line & Circle
      ctx.strokeStyle = currentTheme.colors.primary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 45, 0, Math.PI * 2);
      ctx.stroke();

      // Goals (Top & Bottom)
      ctx.fillStyle = '#111827';
      const goalWidth = 140;
      ctx.fillRect(width / 2 - goalWidth / 2, 0, goalWidth, 10);
      ctx.fillRect(width / 2 - goalWidth / 2, height - 10, goalWidth, 10);

      // Move Puck
      puck.x += puck.vx;
      puck.y += puck.vy;

      // Wall Collisions
      if (puck.x - puck.radius < 0 || puck.x + puck.radius > width) {
        puck.vx *= -1;
        soundFx.playBounce();
      }

      // Goal Check
      if (puck.y < 0) {
        if (puck.x > width / 2 - goalWidth / 2 && puck.x < width / 2 + goalWidth / 2) {
          handleScorePoint(2, 5); // P2 Goal
          puck = { x: width / 2, y: height / 2, vx: (Math.random() - 0.5) * 4, vy: 4, radius: 14 };
        } else {
          puck.vy *= -1;
          soundFx.playBounce();
        }
      }

      if (puck.y > height) {
        if (puck.x > width / 2 - goalWidth / 2 && puck.x < width / 2 + goalWidth / 2) {
          handleScorePoint(1, 5); // P1 Goal
          puck = { x: width / 2, y: height / 2, vx: (Math.random() - 0.5) * 4, vy: -4, radius: 14 };
        } else {
          puck.vy *= -1;
          soundFx.playBounce();
        }
      }

      // Paddle Collisions
      const checkPaddleHit = (paddle: typeof p1Paddle) => {
        const dx = puck.x - paddle.x;
        const dy = puck.y - paddle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < puck.radius + paddle.radius) {
          const angle = Math.atan2(dy, dx);
          const speed = 7;
          puck.vx = Math.cos(angle) * speed;
          puck.vy = Math.sin(angle) * speed;
          soundFx.playBounce();
        }
      };

      checkPaddleHit(p1Paddle);
      checkPaddleHit(p2Paddle);

      // Draw P1 Paddle (Amber)
      ctx.fillStyle = currentTheme.colors.player1Color;
      ctx.beginPath();
      ctx.arc(p1Paddle.x, p1Paddle.y, p1Paddle.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw P2 Paddle (Green)
      ctx.fillStyle = currentTheme.colors.player2Color;
      ctx.beginPath();
      ctx.arc(p2Paddle.x, p2Paddle.y, p2Paddle.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Puck
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(puck.x, puck.y, puck.radius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [activeGameId, gameState, currentTheme]);

  // Keyboard Hotkeys listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGameId === 'tug_of_war') {
        if (e.key === 'a' || e.key === 'A' || e.key === 'w' || e.key === 'W') {
          handleTugMash(1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'Enter') {
          handleTugMash(2);
        }
      } else if (activeGameId === 'speed_tap') {
        if (e.key === ' ' || e.key === 'q' || e.key === 'Q') {
          handleReactionTap(1);
        } else if (e.key === 'Enter' || e.key === '/') {
          handleReactionTap(2);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGameId, gameState, reactionSignal, winner]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12121A] border border-slate-800/80 p-6 rounded-3xl shadow-2xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dvandva: 2-Player Local Arcade</span>
          </div>
          <h2 className="text-2xl font-black text-white italic tracking-tight uppercase">Playable Mini-Game Simulator</h2>
          <p className="text-xs text-slate-400 mt-1">
            Test live split-screen gameplay on same device using touch, mouse drag, or keyboard hotkeys!
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {playableGames.map((game) => {
            const isActive = game.id === activeGameId;
            return (
              <button
                key={game.id}
                onClick={() => {
                  setActiveGameId(game.id);
                  resetMatch();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {game.name.split('(')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Arcade Frame Container */}
      <div
        className="rounded-3xl border-2 overflow-hidden shadow-2xl relative"
        style={{
          borderColor: currentTheme.colors.primary,
          backgroundColor: currentTheme.colors.background,
        }}
      >
        {/* Match HUD Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
          {/* Player 1 HUD */}
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow"
              style={{ backgroundColor: currentTheme.colors.player1Color }}
            >
              P1
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">PLAYER 1</div>
              <div className="text-xl font-black font-mono text-white">{gameScore.p1} PTS</div>
            </div>
          </div>

          {/* Reset / Status Center */}
          <div className="text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
              Active Theme: {currentTheme.title.split(':')[0]}
            </span>
            <button
              onClick={resetMatch}
              className="mt-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center space-x-1.5 mx-auto border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET MATCH</span>
            </button>
          </div>

          {/* Player 2 HUD */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-300">PLAYER 2</div>
              <div className="text-xl font-black font-mono text-white">{gameScore.p2} PTS</div>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow"
              style={{ backgroundColor: currentTheme.colors.player2Color }}
            >
              P2
            </div>
          </div>
        </div>

        {/* Countdown Overlay */}
        {gameState === 'countdown' && (
          <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-2">Get Ready!</span>
            <div className="text-6xl font-black text-white font-mono animate-bounce">
              {countdown > 0 ? countdown : 'GO!'}
            </div>
          </div>
        )}

        {/* Game Area Rendering */}
        <div className="relative min-h-[420px] flex flex-col justify-between">
          {/* GAME 1: Puck Clash Air Hockey Canvas */}
          {activeGameId === 'puck_clash' && (
            <div className="w-full h-[420px] relative">
              <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full pointer-events-none">
                Drag cursor/touch on Top (P1) or Bottom (P2) half to strike puck!
              </div>
            </div>
          )}

          {/* GAME 2: Speed Tap Reaction */}
          {activeGameId === 'speed_tap' && (
            <div className="grid grid-rows-2 h-[420px] w-full">
              {/* P1 Zone (Top - Rotated 180 for face-to-face play) */}
              <button
                onClick={() => handleReactionTap(1)}
                className={`p-6 flex flex-col items-center justify-center transition-all ${
                  reactionSignal === 'green' ? 'bg-emerald-600 text-white' : 'bg-red-950 text-red-300'
                }`}
              >
                <div className="rotate-180 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider block mb-1">PLAYER 1 ZONE</span>
                  <span className="text-2xl font-black">{reactionSignal === 'green' ? 'TAP NOW!!' : 'WAIT FOR GREEN!'}</span>
                  <span className="text-[10px] block opacity-80 mt-1">[Keyboard: Space / Q]</span>
                </div>
              </button>

              {/* P2 Zone (Bottom) */}
              <button
                onClick={() => handleReactionTap(2)}
                className={`p-6 flex flex-col items-center justify-center transition-all ${
                  reactionSignal === 'green' ? 'bg-emerald-600 text-white' : 'bg-red-950 text-red-300'
                }`}
              >
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-wider block mb-1">PLAYER 2 ZONE</span>
                  <span className="text-2xl font-black">{reactionSignal === 'green' ? 'TAP NOW!!' : 'WAIT FOR GREEN!'}</span>
                  <span className="text-[10px] block opacity-80 mt-1">[Keyboard: Enter / /]</span>
                </div>
              </button>
            </div>
          )}

          {/* GAME 3: Tug of War Mash */}
          {activeGameId === 'tug_of_war' && (
            <div className="p-8 flex flex-col items-center justify-between h-[420px] bg-slate-950">
              {/* P1 Tap Button */}
              <button
                onClick={() => handleTugMash(1)}
                className="w-full max-w-md py-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xl shadow-lg active:scale-95 transition"
              >
                P1: MASH TAP FAST! [WASD]
              </button>

              {/* Rope Bar */}
              <div className="w-full max-w-lg bg-slate-800 h-8 rounded-full p-1 relative overflow-hidden border border-slate-700">
                <div className="absolute inset-y-0 left-1/2 w-1 bg-amber-400 z-10" />
                <div
                  className="w-10 h-full bg-indigo-500 rounded-full transition-all duration-75 shadow-lg shadow-indigo-500/50"
                  style={{ marginLeft: `calc(50% + ${ropePosition * 2}px - 20px)` }}
                />
              </div>

              {/* P2 Tap Button */}
              <button
                onClick={() => handleTugMash(2)}
                className="w-full max-w-md py-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl shadow-lg active:scale-95 transition"
              >
                P2: MASH TAP FAST! [Arrows]
              </button>
            </div>
          )}

          {/* GAME 4: Math Speed Dash */}
          {activeGameId === 'math_speed_dash' && (
            <div className="p-6 flex flex-col items-center justify-between h-[420px] bg-slate-950">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center w-full max-w-md">
                <span className="text-xs text-amber-400 font-bold block mb-1">SOLVE THE EQUATION FIRST:</span>
                <span className="text-4xl font-mono font-black text-white">{mathQuestion.eq} = ?</span>
              </div>

              {/* P1 Answer Pads (Top) */}
              <div className="w-full max-w-md grid grid-cols-2 gap-2">
                {mathQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleMathAnswer(1, opt)}
                    className="py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold font-mono text-sm"
                  >
                    P1: {opt}
                  </button>
                ))}
              </div>

              {/* P2 Answer Pads (Bottom) */}
              <div className="w-full max-w-md grid grid-cols-2 gap-2">
                {mathQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleMathAnswer(2, opt)}
                    className="py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold font-mono text-sm"
                  >
                    P2: {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Victory Overlay */}
        {winner && (
          <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <Trophy className="w-16 h-16 text-amber-400 animate-bounce mb-3" />
            <h3 className="text-3xl font-black text-white">
              PLAYER {winner} CLAIMS VICTORY!
            </h3>
            <p className="text-xs text-amber-300 mt-1 mb-4 flex items-center space-x-1">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>+50 Coins Awarded to Player {winner}</span>
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={resetMatch}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REMATCH NOW</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
