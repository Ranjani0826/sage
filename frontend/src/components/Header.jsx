import React from 'react';
import { Shield, Dna, Activity, Cpu, Database, Zap, Sparkles, Terminal } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenJudgeShowcase, backendOnline }) {
  const navItems = [
    { id: 'analyzer', label: 'Live Analyzer', icon: Shield, badge: 'Core' },
    { id: 'evolution', label: 'Scam Evolution', icon: Dna, badge: 'Graph' },
    { id: 'mutation_lab', label: 'Mutation Lab', icon: Cpu, badge: 'Stress Test' },
    { id: 'campaign_memory', label: 'Campaign Memory', icon: Database, badge: '5 Families' },
    { id: 'dashboard', label: 'Threat Dashboard', icon: Activity, badge: 'Live Feed' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cyber-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('analyzer')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/20">
              <Dna className="w-5 h-5 animate-pulse-slow" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-cyber-950"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-xl bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 bg-clip-text text-transparent">
                  SAGE
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  v1.0 Demo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Scam Analysis & Genome Engine • <span className="text-cyan-400 font-medium">Detect • Fingerprint • Track</span>
              </p>
            </div>
          </div>

          {/* Mobile Showcase Trigger */}
          <button
            onClick={onOpenJudgeShowcase}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Judge Demo</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-cyber-900/90 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: 1-Click Judge Live Showcase */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span>{backendOnline ? 'AI Genome Engine: Active' : 'Offline Vector Demo Mode'}</span>
          </div>

          <button
            onClick={onOpenJudgeShowcase}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all border border-cyan-300/30"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>⚡ 10s Judge Live Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
