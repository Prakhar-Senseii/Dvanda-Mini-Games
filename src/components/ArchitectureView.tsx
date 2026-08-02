import React, { useState } from 'react';
import { ARCHITECTURE_PATTERNS, CSHARP_SCRIPTS } from '../data/architectureData';
import { Code, Copy, Check, Download, Layers, ShieldCheck, Cpu, Terminal, FileCode } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activeScript = CSHARP_SCRIPTS[selectedScriptIndex] || CSHARP_SCRIPTS[0];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadCode = (script: typeof activeScript) => {
    const blob = new Blob([script.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = script.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="mb-8 p-8 rounded-3xl bg-[#12121A] border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
          <Code className="w-3.5 h-3.5 text-indigo-400" />
          <span>Unity C# Engine Architecture & SOLID Specifications</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight uppercase">
          SOLID Principles & Design Patterns
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
          Clean, modular, zero-GC C# architecture engineered specifically for mobile same-device 2-player games. Inspect production C# scripts ready to drop into Unity 2022/6.0 LTS.
        </p>
      </div>

      {/* Patterns Grid */}
      <div className="mb-12">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Applied Design Patterns in Dvandva: Mini Games</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARCHITECTURE_PATTERNS.map((pattern) => (
            <div
              key={pattern.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">{pattern.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {pattern.solidPrinciple.split('&')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {pattern.description}
                </p>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 mb-3 text-xs">
                  <span className="font-bold text-amber-300 block mb-1">Unity Application:</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{pattern.unityApplication}</p>
                </div>
              </div>

              <div className="space-y-1">
                {pattern.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* C# Production Code Repository Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Production C# Unity Scripts</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopyCode(activeScript.code, selectedScriptIndex)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              {copiedIndex === selectedScriptIndex ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownloadCode(activeScript)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .cs</span>
            </button>
          </div>
        </div>

        {/* Script Selection Tabs */}
        <div className="bg-slate-950/60 p-2 border-b border-slate-800 overflow-x-auto no-scrollbar flex space-x-2">
          {CSHARP_SCRIPTS.map((script, idx) => {
            const isActive = idx === selectedScriptIndex;
            return (
              <button
                key={script.filename}
                onClick={() => setSelectedScriptIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition flex items-center space-x-2 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{script.filename}</span>
              </button>
            );
          })}
        </div>

        {/* Script Metadata Bar */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 text-xs text-slate-300">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold text-white text-sm">{activeScript.filename}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {activeScript.category} Module
            </span>
          </div>
          <p className="text-slate-400">{activeScript.description}</p>
        </div>

        {/* Code Editor Preview */}
        <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed">
          <pre>
            <code>{activeScript.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
