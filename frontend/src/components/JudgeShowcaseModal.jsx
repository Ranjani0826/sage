import React, { useState, useEffect } from 'react';
import { X, Play, Pause, ChevronRight, ChevronLeft, Dna, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JudgeShowcaseModal({ isOpen, onClose, onSelectSample }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const showcaseSteps = [
    {
      step: 1,
      title: "1. English Original SMS",
      tag: "Original Seed Phish",
      language: "English",
      text: "Dear Customer, Your SBI account has been suspended due to pending KYC update. Please update your PAN card immediately at https://sbi-kyc-verify-portal.test to avoid permanent account deactivation within 24 hours.",
      url: "https://sbi-kyc-verify-portal.test",
      dna: "DNA-BNK-KYC-94F8A2",
      risk: "CRITICAL",
      action: "BLOCK",
      observation: "Traditional filters look for static keywords: 'SBI', 'KYC', 'sbi-kyc-verify-portal.test'."
    },
    {
      step: 2,
      title: "2. AI Neural Paraphrase",
      tag: "Polite Corporate Tone Mutation",
      language: "English",
      text: "Important banking notice: To prevent disruption of your netbanking services, mandatory verification of your KYC documents is required before midnight. Access our secure verification portal: https://secure-bank-update.test",
      url: "https://secure-bank-update.test",
      dna: "DNA-BNK-KYC-94F8A2",
      risk: "CRITICAL",
      action: "BLOCK",
      observation: "Wording is completely polite & changed. Traditional filters fail. SAGE matches identical Scam DNA!"
    },
    {
      step: 3,
      title: "3. Vernacular Translation (Tamil)",
      tag: "Regional Script Shift (தமிழ்)",
      language: "Tamil (தமிழ்)",
      text: "அன்புள்ள வாடிக்கையாளரே, உங்கள் வங்கி கணக்கு KYC புதுப்பிக்கப்படாததால் தற்காலிகமாக முடக்கப்பட்டுள்ளது. 24 மணி நேரத்திற்குள் கணக்கு ரத்து செய்யப்படுவதைத் தவிர்க்க உடனடியாக இங்கே புதுப்பிக்கவும்: https://tamil-bank-kyc.test",
      url: "https://tamil-bank-kyc.test",
      dna: "DNA-BNK-KYC-94F8A2",
      risk: "CRITICAL",
      action: "BLOCK",
      observation: "Entire script shifted to Tamil. SAGE extracts the invariant intent & maps to Campaign #001!"
    },
    {
      step: 4,
      title: "4. Compressed 160-char SMS",
      tag: "SMS Gateway Compression",
      language: "English (Abbr)",
      text: "ALERT: Acct Blocked! KYC exp in 24hr. Re-activate now: https://bit-ly-sbi.test",
      url: "https://bit-ly-sbi.test",
      dna: "DNA-BNK-KYC-94F8A2",
      risk: "CRITICAL",
      action: "BLOCK",
      observation: "Heavy abbreviations & URL shortener. SAGE reconstructs the 6-stage Attack Path."
    },
    {
      step: 5,
      title: "5. Ephemeral Domain Rotation",
      tag: "Infrastructure Hop",
      language: "English",
      text: "SBI Alert: Complete your KYC renewal immediately to prevent debit card deactivation at https://ephemeral-fast-token-891.test/auth",
      url: "https://ephemeral-fast-token-891.test/auth",
      dna: "DNA-BNK-KYC-94F8A2",
      risk: "CRITICAL",
      action: "BLOCK",
      observation: "Disposable new domain. SAGE's Campaign Memory instantly classifies it under the same family."
    }
  ];

  useEffect(() => {
    let timer;
    if (isOpen && isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= showcaseSteps.length - 1) {
            setIsPlaying(false);
            try {
              confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            } catch (e) {}
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const current = showcaseSteps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-950/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl bg-gradient-to-b from-cyber-900 via-cyber-850 to-cyber-950 border-2 border-cyan-500/60 shadow-2xl shadow-cyan-950/80 p-6 md:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            10-Second Executive Judge Pitch
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            “Attackers change the words. We track the attack.”
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Watch 5 completely different surface mutations resolve to the <span className="text-cyan-300 font-bold underline">SAME SCAM DNA</span> in real-time.
          </p>
        </div>

        {/* Stepper Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {showcaseSteps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                idx === currentStepIndex
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/40 scale-105'
                  : idx < currentStepIndex
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              <span>{s.step}. {s.language}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Display Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-2xl bg-cyber-950/90 border border-cyan-500/40 mb-6 relative overflow-hidden">
          {/* Left Column: Surface Variant */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                SURFACE VARIATION #{current.step}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/50">
                {current.tag}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed shadow-inner">
              "{current.text}"
            </div>

            <div className="text-xs text-slate-400">
              Payload: <span className="font-mono text-cyan-300">{current.url}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-900/50 text-xs text-cyan-200">
              💡 <span className="font-semibold">Insight:</span> {current.observation}
            </div>
          </div>

          {/* Right Column: Invariant Scam DNA Linking */}
          <div className="md:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-purple-950/40 to-cyan-950/40 border border-purple-500/40">
            <div>
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block mb-1">
                INVARIANT ATTACK GENOME
              </span>
              <div className="flex items-center gap-2 mb-3">
                <Dna className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="text-lg font-mono font-extrabold text-white">
                  {current.dna}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Intent: KYC Credential Theft</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Target: Bank Customers</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Family: Campaign #001</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-purple-900/50 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">RISK: {current.risk}</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                ACTION: {current.action}
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Pitch Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                setIsPlaying(false);
              }}
              disabled={currentStepIndex === 0}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentStepIndex((prev) => Math.min(showcaseSteps.length - 1, prev + 1));
                setIsPlaying(false);
              }}
              disabled={currentStepIndex === showcaseSteps.length - 1}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectSample && onSelectSample(current.text);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
            >
              <span>Analyze This Mutation in Full Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
