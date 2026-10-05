import React, { useState } from 'react';
import { Dna, GitFork, ArrowRight, Languages, Sparkles, CheckCircle2, ShieldCheck, ChevronRight, Eye } from 'lucide-react';

export default function ScamEvolutionView({ campaigns, onSelectVariantForAnalysis }) {
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0]?.id || 'CAMP-001');
  const [activeVariantId, setActiveVariantId] = useState('VAR-001-EN-ORIG');

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];
  const variants = selectedCampaign?.variants || [];
  const activeVariant = variants.find((v) => v.id === activeVariantId) || variants[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="cyber-card p-6 border-slate-800 bg-gradient-to-r from-cyber-950 via-cyber-900 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold mb-2">
              <Dna className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scam Evolution & Mutation Network</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              “Different words. Same attack.”
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Track how a single cyberattack mutates across languages, AI paraphrases, compressed SMS formats, and disposable domains while preserving its invariant <span className="text-cyan-400 font-bold">Scam DNA</span>.
            </p>
          </div>

          {/* Campaign Selector Dropdown / Pills */}
          <div className="flex flex-wrap gap-2">
            {campaigns.map((camp) => (
              <button
                key={camp.id}
                onClick={() => {
                  setSelectedCampaignId(camp.id);
                  if (camp.variants && camp.variants[0]) {
                    setActiveVariantId(camp.variants[0].id);
                  }
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  selectedCampaignId === camp.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                    : 'bg-cyber-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{camp.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30">{camp.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Evolution Graph Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Mutation Starburst Graph */}
        <div className="lg:col-span-7 cyber-card p-6 border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
              <GitFork className="w-4 h-4" />
              <span>SURFACE MUTATION CLUSTER ({variants.length} NODES)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">Click a node to inspect</span>
          </div>

          {/* Central DNA Hub & Orbital Mutation Nodes */}
          <div className="relative my-6 py-6 flex flex-col items-center justify-center min-h-[340px] bg-cyber-950/70 rounded-2xl border border-cyan-900/40 p-4 overflow-hidden">
            {/* Background Grid & Pulsing Circles */}
            <div className="absolute inset-0 dna-helix-bg opacity-30 pointer-events-none"></div>
            <div className="absolute w-72 h-72 rounded-full border border-cyan-500/20 animate-pulse-slow pointer-events-none"></div>
            <div className="absolute w-96 h-96 rounded-full border border-purple-500/10 pointer-events-none"></div>

            {/* Center: Invariant Scam DNA Core */}
            <div className="relative z-20 p-4 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 text-white text-center shadow-2xl shadow-cyan-500/40 border-2 border-white/40 max-w-xs scale-105">
              <div className="flex items-center justify-center gap-1.5 mb-1 text-xs font-mono font-bold uppercase tracking-widest text-cyan-200">
                <Dna className="w-4 h-4" />
                <span>SCAM DNA FAMILY</span>
              </div>
              <h4 className="font-extrabold text-sm tracking-wide">
                {selectedCampaign?.name}
              </h4>
              <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-cyan-300 font-bold inline-block">
                {selectedCampaign?.dna?.semantic_fingerprint || "DNA-BNK-KYC-94F8A2"}
              </div>
            </div>

            {/* Surrounding Connected Variants Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6 w-full">
              {variants.map((v) => {
                const isSelected = v.id === activeVariantId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariantId(v.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-500/30 scale-105 ring-1 ring-cyan-400'
                        : 'bg-cyber-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold truncate">{v.label}</span>
                      <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-400">
                        {v.language}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400 block truncate">
                      {v.mutation_type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center pt-2">
            Every surface mutation carries the exact same psychological exploit vector.
          </div>
        </div>

        {/* Right Column: Variant Inspector & DNA Corroboration */}
        <div className="lg:col-span-5 cyber-card p-6 border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>MUTATION INSPECTION</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                {activeVariant?.carrier || "SMS"} Payload
              </span>
            </div>

            {/* Active Variant Title */}
            <div className="space-y-1 mb-3">
              <h3 className="text-base font-bold text-white">
                {activeVariant?.label}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Mutation Strategy: <span className="text-cyan-300">{activeVariant?.mutation_type}</span> • Script: <span className="text-purple-300">{activeVariant?.language}</span>
              </p>
            </div>

            {/* Surface Text Card */}
            <div className="p-4 rounded-xl bg-cyber-950 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed mb-4 shadow-inner">
              "{activeVariant?.text}"
            </div>

            {/* Invariant DNA Attributes Match List */}
            <div className="space-y-2 p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                MATCHED TO ACTIVE CAMPAIGN GENOME:
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-slate-200">Same Underlying Intent:</strong> {selectedCampaign?.dna?.intent}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-slate-200">Same Manipulation Strategy:</strong> {selectedCampaign?.dna?.tactics?.join(' + ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-slate-200">Similar Target Demographics:</strong> {selectedCampaign?.dna?.target}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-slate-200">Common Extraction Ask:</strong> {selectedCampaign?.dna?.financial_ask}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action to test in Analyzer */}
          <button
            onClick={() => onSelectVariantForAnalysis && onSelectVariantForAnalysis(activeVariant?.text)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
          >
            <span>Run Full SAGE Pipeline on this Variant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
