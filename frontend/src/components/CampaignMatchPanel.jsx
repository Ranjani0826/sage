import React from 'react';
import { Database, GitFork, Link2, CheckCircle2, Globe2, ArrowRight } from 'lucide-react';

export default function CampaignMatchPanel({ campaignMatch, onSelectVariant }) {
  if (!campaignMatch) return null;

  const isMatched = campaignMatch.is_matched;
  const variants = campaignMatch.known_variants || [];

  return (
    <div className="cyber-card p-5 border-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
                Scam Family / Campaign Memory Match
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 font-semibold">
                {campaignMatch.campaign_id}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Correlation to Known Threat Genome
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
            ✓ {campaignMatch.match_verdict}
          </span>
        </div>
      </div>

      {/* Main Campaign Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/30 via-cyber-900/60 to-cyan-950/30 border border-purple-500/30 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
              IDENTIFIED SCAM FAMILY
            </span>
            <h4 className="text-lg font-bold text-white tracking-wide">
              {campaignMatch.campaign_name}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Category: <span className="text-cyan-300 font-medium">{campaignMatch.category}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-cyber-950 border border-purple-800 text-purple-300">
              DNA: <span className="font-bold text-white">{campaignMatch.semantic_fingerprint}</span>
            </div>
          </div>
        </div>

        {/* Matching Criteria */}
        <div className="space-y-1 pt-2 border-t border-purple-900/40">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
            GENOME LINKING CRITERIA:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {(campaignMatch.matching_criteria || []).map((crit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connected Surface Variants ("Different words. Same attack.") */}
      {variants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                Connected Surface Variants ({variants.length})
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 font-semibold">
              “Different words. Same attack.”
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {variants.map((v, idx) => (
              <div
                key={v.id || idx}
                onClick={() => onSelectVariant && onSelectVariant(v.text)}
                className="group p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {v.label}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {v.language}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 italic mb-2">
                    "{v.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 group-hover:text-cyan-300 pt-1 border-t border-slate-800/50">
                  <span>Click to test variant</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
