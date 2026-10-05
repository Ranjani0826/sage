import React from 'react';
import { Dna, Fingerprint, ShieldAlert, Target, Crosshair, CreditCard, Globe, Zap } from 'lucide-react';

export default function DnaCard({ dna, campaignName, category }) {
  if (!dna) return null;

  const strands = dna.dna_strands || {
    authority_coercion: 0.9,
    fear_urgency: 0.85,
    credential_harvest: 0.95,
    monetary_theft: 0.8,
    impersonation_depth: 0.88,
    infrastructure_disp: 0.75
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-cyber-900 via-cyber-850 to-cyber-950 border-2 border-cyan-500/40 p-5 shadow-2xl shadow-cyan-950/50">
      {/* Background Genome Scanlines */}
      <div className="absolute inset-0 dna-helix-bg opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card Header & Hex Sequence */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-100 tracking-wide">
                SCAM DNA FINGERPRINT
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                Invariant Core
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Unique psychological & architectural attack genome
            </p>
          </div>
        </div>

        {/* Genome Fingerprint Tag & Hex Hash */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-2.5 py-1 rounded-lg bg-cyber-950/90 border border-cyan-800/80 text-cyan-400 flex items-center gap-1.5 shadow-inner">
            <Dna className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold">{dna.semantic_fingerprint || "DNA-BNK-KYC-94F8A2"}</span>
          </div>
          <div className="px-2 py-1 rounded-lg bg-cyber-950/90 border border-slate-800 text-slate-400 text-[11px] hidden sm:block">
            HASH: <span className="text-purple-300">{dna.genome_hash || "e7c8b214901f"}</span>
          </div>
        </div>
      </div>

      {/* DNA Attribute Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5 my-4">
        {/* Intent */}
        <div className="p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
            <Crosshair className="w-3.5 h-3.5" />
            <span>PRIMARY INTENT</span>
          </div>
          <p className="text-sm font-medium text-slate-200">
            {dna.intent || "Account Takeover via Credential & OTP Harvest"}
          </p>
        </div>

        {/* Target */}
        <div className="p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>VICTIM TARGET PROFILE</span>
          </div>
          <p className="text-sm font-medium text-slate-200">
            {dna.target || "Retail Banking Customer"}
          </p>
        </div>

        {/* Impersonation */}
        <div className="p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>IMPERSONATION SPOOF</span>
          </div>
          <p className="text-sm font-medium text-slate-200">
            {dna.impersonation || "Nationalized Banking Institution"}
          </p>
        </div>

        {/* Tactics */}
        <div className="p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>DETECTED PSYCHOLOGICAL TACTICS</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(dna.tactics || ["Authority", "Fear", "Urgency"]).map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Requested Action */}
        <div className="p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>REQUESTED OUT-OF-BAND ACTION</span>
          </div>
          <p className="text-xs font-medium text-slate-300">
            {dna.requested_action || "Click unverified link to submit credentials"}
          </p>
        </div>

        {/* Financial / Credential Ask */}
        <div className="p-3 rounded-xl bg-cyber-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
            <CreditCard className="w-3.5 h-3.5" />
            <span>FINANCIAL / CREDENTIAL EXTRACTION</span>
          </div>
          <p className="text-xs font-medium text-slate-300">
            {dna.financial_ask || "Netbanking Credentials + OTP + Card Details"}
          </p>
        </div>
      </div>

      {/* Genome Tactical Strands (Visual Bar Matrix) */}
      <div className="relative z-10 pt-3 border-t border-cyan-900/60">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>DNA STRAND VECTOR DENSITY</span>
          <span className="text-cyan-400">1 UNDERLYING ATTACK → MULTIPLE SURFACE VARIANTS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(strands).map(([key, val]) => (
            <div key={key} className="p-2 rounded-lg bg-cyber-950/60 border border-slate-800/60">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span className="capitalize">{key.replace('_', ' ')}</span>
                <span className="text-cyan-300 font-bold">{Math.round(val * 100)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(val * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
