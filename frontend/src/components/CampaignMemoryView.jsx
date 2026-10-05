import React, { useState } from 'react';
import { Database, ShieldAlert, GitFork, Globe, Link2, Calendar, ChevronRight, Dna, ArrowRight } from 'lucide-react';

export default function CampaignMemoryView({ campaigns, onSelectVariantForAnalysis }) {
  const [activeCampId, setActiveCampId] = useState(campaigns[0]?.id || 'CAMP-001');

  const activeCamp = campaigns.find((c) => c.id === activeCampId) || campaigns[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="cyber-card p-6 border-slate-800 bg-gradient-to-r from-cyber-950 via-cyber-900 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold mb-2">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scam Memory & Threat Intelligence Repository</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Campaign Memory
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-light">
              “Next time the scam changes its wording, SAGE remembers the underlying attack.”
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{campaigns.length} Active Threat Families Indexed</span>
          </div>
        </div>
      </div>

      {/* Campaign Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Family List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
            INDEXED THREAT FAMILIES:
          </span>
          {campaigns.map((camp) => {
            const isActive = camp.id === activeCampId;
            return (
              <div
                key={camp.id}
                onClick={() => setActiveCampId(camp.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-950/40 to-cyber-900 border-purple-500/60 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500/40'
                    : 'bg-cyber-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {camp.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {camp.variants?.length || 0} Variants
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">{camp.name}</h4>
                <p className="text-xs text-slate-400 mb-2">{camp.category}</p>

                <div className="flex flex-wrap gap-1">
                  {(camp.languages_observed || []).map((lang, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyber-950 text-slate-400 border border-slate-800"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Campaign Intelligence Dossier */}
        <div className="lg:col-span-7 cyber-card p-6 border-slate-800 space-y-5">
          {activeCamp && (
            <>
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                    THREAT DOSSIER • {activeCamp.id}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {activeCamp.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sector: <span className="text-cyan-300">{activeCamp.category}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                    {activeCamp.status}
                  </span>
                </div>
              </div>

              {/* DNA Attributes Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-cyber-950 border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-0.5">INTENT</span>
                  <p className="text-xs font-semibold text-slate-200">{activeCamp.dna?.intent}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-0.5">IMPERSONATION</span>
                  <p className="text-xs font-semibold text-slate-200">{activeCamp.dna?.impersonation}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-0.5">TACTICS</span>
                  <p className="text-xs font-semibold text-slate-200">{activeCamp.dna?.tactics?.join(' + ')}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-0.5">GENOME HASH</span>
                  <p className="text-xs font-mono text-purple-300">{activeCamp.dna?.genome_hash}</p>
                </div>
              </div>

              {/* Attack Path Stages */}
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-2">
                  STANDARD ATTACK PATH PHASES:
                </span>
                <div className="space-y-1.5">
                  {(activeCamp.attack_path || []).map((st) => (
                    <div
                      key={st.stage}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-cyber-950/60 border border-slate-800/80 text-xs"
                    >
                      <span className="font-mono text-cyan-400 font-bold w-20">
                        {st.name}
                      </span>
                      <span className="text-slate-300 text-[11px] flex-1">
                        {st.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observed Mutation Variants */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                    KNOWN SURFACE MUTATIONS ({activeCamp.variants?.length || 0}):
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Click to analyze</span>
                </div>
                <div className="space-y-2">
                  {(activeCamp.variants || []).map((v) => (
                    <div
                      key={v.id}
                      onClick={() => onSelectVariantForAnalysis && onSelectVariantForAnalysis(v.text)}
                      className="group p-3 rounded-xl bg-cyber-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 cursor-pointer transition-all flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                            {v.label}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {v.language}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 line-clamp-1 italic">
                          "{v.text}"
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
