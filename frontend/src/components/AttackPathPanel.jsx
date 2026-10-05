import React from 'react';
import { ArrowRight, CheckCircle2, Circle, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

export default function AttackPathPanel({ attackPath }) {
  if (!attackPath) return null;

  const stages = attackPath.stages || [];
  const explanation = attackPath.judge_explanation || "Message exhibits clear multi-stage social engineering manipulation.";

  return (
    <div className="cyber-card p-5 border-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              Social Engineering Attack Path
            </h3>
            <p className="text-xs text-slate-400">
              6-Stage Psychological Manipulation Progression
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Progression:</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {attackPath.triggered_count || 0}/6 STAGES ({attackPath.progression_percentage || 0}%)
          </span>
        </div>
      </div>

      {/* 6-Stage Visual Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
        {stages.map((stage, idx) => {
          const isTriggered = stage.triggered;
          return (
            <div
              key={idx}
              className={`relative p-3 rounded-xl border transition-all ${
                isTriggered
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-sm shadow-amber-950/40 text-amber-100'
                  : 'bg-cyber-950/50 border-slate-800/60 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                  {stage.name}
                </span>
                {isTriggered ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              <p className="text-[11px] leading-tight font-medium">
                {stage.title?.split('.')[1] || stage.name}
              </p>
              <div className="mt-2 text-[9px] font-mono text-slate-400 leading-snug">
                {stage.evidence ? (
                  <span className="line-clamp-2">{stage.evidence}</span>
                ) : (
                  <span>Stage dormant</span>
                )}
              </div>
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-700">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Judge Explanatory Note */}
      <div className="p-3.5 rounded-xl bg-cyber-950/80 border border-cyan-500/30 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
        <div>
          <span className="text-xs font-bold text-cyan-300 font-mono block mb-0.5">
            EXECUTIVE JUDGE EXPLANATION:
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
