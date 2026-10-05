import React from 'react';
import { ShieldCheck, ShieldAlert, AlertOctagon, HelpCircle, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export default function RiskEnginePanel({ riskEngine, executionTimeMs }) {
  if (!riskEngine) return null;

  const level = riskEngine.risk_level || "CRITICAL";
  const score = riskEngine.risk_score || 95;
  const action = riskEngine.recommended_action || "BLOCK";
  const actionReason = riskEngine.action_reason || "Immediate threat detected.";
  const factors = riskEngine.evaluated_factors || [];

  const getBadgeStyle = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-rose-500/20 border-rose-500/60 text-rose-300',
          bar: 'bg-gradient-to-r from-rose-500 to-red-600',
          icon: AlertOctagon,
          actionBg: 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-500/20 border-amber-500/60 text-amber-300',
          bar: 'bg-gradient-to-r from-amber-500 to-orange-600',
          icon: ShieldAlert,
          actionBg: 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-500/20 border-yellow-500/60 text-yellow-300',
          bar: 'bg-gradient-to-r from-yellow-500 to-amber-600',
          icon: HelpCircle,
          actionBg: 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30'
        };
      default:
        return {
          bg: 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300',
          bar: 'bg-gradient-to-r from-emerald-500 to-teal-600',
          icon: ShieldCheck,
          actionBg: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
        };
    }
  };

  const style = getBadgeStyle();
  const Icon = style.icon;

  return (
    <div className="cyber-card p-5 border-slate-800">
      {/* Risk Engine Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl border ${style.bg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-100 tracking-wider uppercase">
                Transparent Risk Engine
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Rule & Signal Model
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluated {factors.length} detectable risk vectors in {executionTimeMs || 45}ms
            </p>
          </div>
        </div>

        {/* Recommended Action Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">RECOMMENDED ACTION:</span>
          <div className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-xs tracking-wider flex items-center gap-1.5 ${style.actionBg}`}>
            <span>{action}</span>
          </div>
        </div>
      </div>

      {/* Main Score Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Score Card */}
        <div className="p-4 rounded-xl bg-cyber-950/80 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              PROTOTYPE RISK SCORE
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {score}
              </span>
              <span className="text-xs font-mono text-slate-500">/ 100</span>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1 border ${style.bg}`}>
              {level} THREAT LEVEL
            </span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <span className="text-lg font-mono font-bold text-cyan-400">{score}%</span>
          </div>
        </div>

        {/* Action Rationale */}
        <div className="md:col-span-2 p-4 rounded-xl bg-cyber-950/80 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 flex items-center gap-1.5 mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>WHY THIS RISK LEVEL & ACTION?</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {actionReason}
            </p>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-2">
            *Transparent prototype scoring: Not a claim of production validation.
          </p>
        </div>
      </div>

      {/* Signal Breakdown Table */}
      <div>
        <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
          <span>DETECTED RISK FACTORS ({factors.length})</span>
          <span className="text-[10px] text-slate-500">WEIGHTED POINT CONTRIBUTIONS</span>
        </h4>
        <div className="space-y-1.5">
          {factors.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-cyber-950/50 border border-slate-800/60 text-xs hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-200">{f.signal}:</span>
                <span className="text-slate-400 hidden sm:inline text-[11px]">{f.detail}</span>
              </div>
              <span className="font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                +{f.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
