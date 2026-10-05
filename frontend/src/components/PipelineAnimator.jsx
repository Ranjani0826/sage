import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Dna, Activity, Search, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'INPUT', label: 'Input Ingestion', icon: Search, detail: 'Sanitizing text / OCR parsing' },
  { id: 'LANG_OCR', label: 'Language & OCR', icon: Globe, detail: 'Script & Vernacular Tokenizer' },
  { id: 'INTENT', label: 'Intent Extraction', icon: Activity, detail: 'Coercion & Lure Profiling' },
  { id: 'TACTICS', label: 'Tactic Deconstruction', icon: Zap, detail: 'Social Engineering Mapping' },
  { id: 'INFRA', label: 'Infrastructure Check', icon: Globe, detail: 'Domain & Typosquat Inspection' },
  { id: 'SCAM_DNA', label: 'Scam DNA Fingerprinting', icon: Dna, detail: 'Generating Genome Vector' },
  { id: 'CAMPAIGN', label: 'Campaign Memory Match', icon: Cpu, detail: 'Cross-Variant Family Linking' },
  { id: 'RISK_ACTION', label: 'Risk Engine & Action', icon: ShieldCheck, detail: 'Transparent Score & Recommendation' },
];

export default function PipelineAnimator({ isAnalyzing, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= PIPELINE_STEPS.length - 1) {
          clearInterval(interval);
          if (onComplete) setTimeout(onComplete, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isAnalyzing, onComplete]);

  if (!isAnalyzing) return null;

  return (
    <div className="cyber-card p-6 border-cyan-500/50 bg-cyber-950/90 shadow-2xl shadow-cyan-950/60 my-6 animate-pulse-slow">
      <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60 mb-5">
        <div className="flex items-center gap-2.5">
          <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
          <h3 className="font-mono font-bold text-sm text-cyan-300 tracking-wider">
            SAGE AI GENOME PIPELINE PROCESSING...
          </h3>
        </div>
        <span className="text-xs font-mono text-cyan-400">
          Step {Math.min(currentStep + 1, PIPELINE_STEPS.length)} of {PIPELINE_STEPS.length}
        </span>
      </div>

      {/* Step Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isCurrent
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 scale-105 ring-1 ring-cyan-400'
                  : isDone
                  ? 'bg-cyber-900/80 border-emerald-500/50 text-emerald-300'
                  : 'bg-cyber-950/40 border-slate-800/40 text-slate-600'
              }`}
            >
              <div className="flex justify-center mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <Icon className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <span className="text-[10px] font-mono font-bold block truncate">
                {step.label}
              </span>
              <span className="text-[8px] font-mono text-slate-500 block truncate mt-0.5">
                {step.detail}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
