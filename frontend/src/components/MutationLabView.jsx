import React, { useState } from 'react';
import { Cpu, Zap, AlertTriangle, CheckCircle2, XCircle, RefreshCw, ShieldAlert, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { testMutationLabApi } from '../api';

export default function MutationLabView() {
  const [baselineType, setBaselineType] = useState('BANK_KYC');
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [labResult, setLabResult] = useState(null);

  const baselineOptions = [
    {
      id: 'BANK_KYC',
      name: 'Bank KYC Suspension Scam',
      text: 'Dear Customer, Your SBI account has been suspended due to pending KYC update. Please update your PAN card immediately at https://sbi-kyc-verify-portal.test to avoid permanent account deactivation within 24 hours.'
    },
    {
      id: 'PARCEL_FEE',
      name: 'Courier Redelivery Fee Scam',
      text: 'Your package #IN-88291 cannot be delivered due to an incomplete street address. Please update your address and pay ₹25 redelivery fee at https://indiapost-redelivery.test within 24 hours to prevent parcel return.'
    },
    {
      id: 'GOV_CHALLAN',
      name: 'Traffic Challan Extortion Scam',
      text: 'TRAFFIC POLICE NOTICE: Pending e-challan of Rs 1,500 registered against vehicle. Pay within 12 hours at https://echallan-parivahan-gov.test or court warrant will be issued under MV Act Section 133.'
    }
  ];

  const currentBaseline = baselineOptions.find((b) => b.id === baselineType) || baselineOptions[0];

  const handleRunStressTest = async () => {
    setIsStressTesting(true);
    try {
      const res = await testMutationLabApi({
        baseline_text: currentBaseline.text,
        family_type: currentBaseline.id
      });
      setLabResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsStressTesting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="cyber-card p-6 border-slate-800 bg-gradient-to-r from-cyber-950 via-cyber-900 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Adversarial Stress Testing & Blind Spot Discovery</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Mutation Lab
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Stress-test the SAGE Genome Engine against controlled adversarial perturbations, regional scripts, high-compression SMS, and leetspeak obfuscation to discover <span className="text-amber-400 font-bold">Blind Spots</span> and generate immunity patches.
            </p>
          </div>

          <button
            onClick={handleRunStressTest}
            disabled={isStressTesting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isStressTesting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Stress Suite...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>Run Adversarial Mutation Suite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Baseline Selection */}
      <div className="cyber-card p-5 border-slate-800">
        <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-2">
          1. SELECT SEED ATTACK FOR CONTROLLED MUTATION GENERATION:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {baselineOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setBaselineType(opt.id);
                setLabResult(null);
              }}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                baselineType === opt.id
                  ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-cyber-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-xs mb-1">{opt.name}</div>
              <p className="text-[11px] font-mono text-slate-400 line-clamp-2 italic">
                "{opt.text}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Test Results */}
      {labResult && (
        <div className="space-y-6">
          {/* Summary Score Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-cyber-950/80 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">TOTAL MUTATIONS</span>
              <span className="text-2xl font-mono font-bold text-white">{labResult.total_mutations_tested}</span>
            </div>
            <div className="p-4 rounded-xl bg-cyber-950/80 border border-emerald-500/40 text-center">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase">DETECTED</span>
              <span className="text-2xl font-mono font-bold text-emerald-300">{labResult.detected_count}</span>
            </div>
            <div className="p-4 rounded-xl bg-cyber-950/80 border border-amber-500/40 text-center">
              <span className="text-[10px] font-mono text-amber-400 block uppercase">BLIND SPOTS</span>
              <span className="text-2xl font-mono font-bold text-amber-300">{labResult.blind_spot_count}</span>
            </div>
            <div className="p-4 rounded-xl bg-cyber-950/80 border border-cyan-500/40 text-center">
              <span className="text-[10px] font-mono text-cyan-400 block uppercase">ROBUSTNESS RATE</span>
              <span className="text-2xl font-mono font-bold text-cyan-300">{labResult.detection_robustness_rate}%</span>
            </div>
          </div>

          {/* Mutation Breakdown List */}
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
                Controlled Mutation Benchmark Results
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Evaluating invariant DNA retention vs edge-case evasion
              </span>
            </div>

            <div className="space-y-3">
              {labResult.mutations.map((m) => {
                const isDetected = m.status === 'DETECTED';
                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isDetected
                        ? 'bg-cyber-950/80 border-slate-800 hover:border-emerald-500/40'
                        : 'bg-amber-950/20 border-amber-500/50 shadow-md shadow-amber-950/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {m.id}
                        </span>
                        <h4 className="font-bold text-sm text-white">{m.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {m.language}
                        </span>
                      </div>

                      {/* Status Tag */}
                      <div>
                        {isDetected ? (
                          <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> DETECTED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-600 px-2.5 py-1 rounded-full animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5" /> BLIND SPOT IDENTIFIED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mutated Text */}
                    <div className="p-3 rounded-lg bg-slate-900/90 font-mono text-xs text-slate-300 mb-2.5 shadow-inner">
                      "{m.mutated_text}"
                    </div>

                    {/* Technique & Blind Spot Note */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                      <span>Technique: {m.technique}</span>
                      {m.blind_spot_note && (
                        <span className="text-amber-300 font-medium">
                          ⚠️ {m.blind_spot_note}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback Loop: Attack → Mutation → Blind Spot → Adaptive Immunity Patch */}
          <div className="cyber-card p-6 border-purple-500/40 bg-gradient-to-r from-purple-950/30 via-cyber-900 to-cyan-950/30">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-sm text-white font-mono uppercase tracking-wider">
                SAGE Continuous Immunity Feedback Loop
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-cyber-950 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">STEP 1</span>
                <span>Known Scam Profiled</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">STEP 2</span>
                <span>Controlled Mutations</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">STEP 3</span>
                <span>Genome Evaluation</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/50 text-amber-200">
                <span className="text-amber-400 font-bold block mb-1">STEP 4</span>
                <span>Blind Spot Flagged</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200">
                <span className="text-emerald-400 font-bold block mb-1">STEP 5</span>
                <span>Vector Immunity Patch</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
