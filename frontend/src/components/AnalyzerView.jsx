import React, { useState } from 'react';
import {
  ShieldAlert,
  Send,
  Sparkles,
  FileText,
  Image as ImageIcon,
  QrCode,
  Globe,
  Upload,
  RefreshCw,
  Building2,
  Package,
  Languages,
  MessageSquareCode,
  Download,
  AlertCircle
} from 'lucide-react';
import DnaCard from './DnaCard';
import AttackPathPanel from './AttackPathPanel';
import RiskEnginePanel from './RiskEnginePanel';
import CampaignMatchPanel from './CampaignMatchPanel';
import UrlAnalysisPanel from './UrlAnalysisPanel';
import PipelineAnimator from './PipelineAnimator';

const DEMO_BUTTONS = [
  {
    id: 'bank',
    label: 'Bank KYC Scam',
    icon: Building2,
    category: 'Banking',
    text: 'Dear Customer, Your SBI account has been suspended due to pending KYC update. Please update your PAN card immediately at https://sbi-kyc-verify-portal.test to avoid permanent account deactivation within 24 hours.'
  },
  {
    id: 'courier',
    label: 'Courier Delivery Scam',
    icon: Package,
    category: 'Logistics',
    text: 'Your package #IN-88291 cannot be delivered due to an incomplete street address. Please update your address and pay ₹25 redelivery fee at https://indiapost-redelivery.test within 24 hours to prevent parcel return.'
  },
  {
    id: 'upi',
    label: 'UPI/Payment Scam',
    icon: QrCode,
    category: 'UPI Rewards',
    text: 'Congratulations! You have received a cashback reward of Rs 4,999 on PhonePe. Click here or scan QR to receive instant credit into your bank account: https://phonepe-reward-claim.test'
  },
  {
    id: 'gov',
    label: 'Government / Challan',
    icon: ShieldAlert,
    category: 'Legal Coercion',
    text: 'TRAFFIC POLICE NOTICE: Pending e-challan of Rs 1,500 registered against vehicle. Pay within 12 hours at https://echallan-parivahan-gov.test or court warrant will be issued under MV Act Section 133.'
  },
  {
    id: 'tamil',
    label: 'Tamil KYC (தமிழ்)',
    icon: Languages,
    category: 'Regional Vernacular',
    text: 'அன்புள்ள வாடிக்கையாளரே, உங்கள் வங்கி கணக்கு KYC புதுப்பிக்கப்படாததால் தற்காலிகமாக முடக்கப்பட்டுள்ளது. 24 மணி நேரத்திற்குள் கணக்கு ரத்து செய்யப்படுவதைத் தவிர்க்க உடனடியாக இங்கே புதுப்பிக்கவும்: https://tamil-bank-kyc.test'
  },
  {
    id: 'hindi',
    label: 'Hindi KYC (हिंदी)',
    icon: Languages,
    category: 'Regional Vernacular',
    text: 'प्रिय ग्राहक, आपका बैंक खाता KYC अपडेट न होने के कारण आज रात ब्लॉक कर दिया जाएगा। खाते को चालू रखने के लिए तुरंत अपना पैन और आधार कार्ड अपडेट करें: https://bank-seva-kyc.test'
  },
  {
    id: 'hinglish',
    label: 'Hinglish Scam',
    icon: MessageSquareCode,
    category: 'Code-Mixed',
    text: 'Dear Customer aapka Bank Account aaj suspend ho jayega because KYC update pending hai. Abhi 24 hours me verify kare nahi toh account block hoga: https://quick-kyc-update.test'
  }
];

export default function AnalyzerView({
  inputText,
  setInputText,
  inputMode,
  setInputMode,
  onAnalyze,
  isAnalyzing,
  analysisResult,
  onSelectVariant,
  onOpenJudgeShowcase
}) {
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        onAnalyze({
          image_base64: event.target?.result,
          input_type: inputMode === 'screenshot' ? 'screenshot' : 'qr',
          text: `[Image Payload: ${file.name}] Analyzing OCR / QR structure...`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportReport = () => {
    if (!analysisResult) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysisResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SAGE-Threat-Report-${analysisResult.scam_dna?.semantic_fingerprint || 'DNA'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero 3-Pillars Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-cyber-900 via-cyber-850 to-slate-900 border border-cyan-500/30 p-6 md:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cybersecurity Threat Intelligence + Scam Genome Platform</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              SAGE — Scam Analysis & Genome Engine
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl font-light leading-relaxed">
              “Detect the attack. Track its mutations. Build immunity.”
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 shrink-0">
            <div className="p-3 rounded-xl bg-cyber-950/80 border border-cyan-500/40 text-center">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">PILLAR 1</span>
              <span className="text-xs sm:text-sm font-bold text-white">DETECT</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Multi-Vector NLP</span>
            </div>
            <div className="p-3 rounded-xl bg-cyber-950/80 border border-purple-500/40 text-center">
              <span className="text-[10px] font-mono text-purple-400 font-bold block uppercase">PILLAR 2</span>
              <span className="text-xs sm:text-sm font-bold text-white">FINGERPRINT</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Scam DNA Genome</span>
            </div>
            <div className="p-3 rounded-xl bg-cyber-950/80 border border-emerald-500/40 text-center">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">PILLAR 3</span>
              <span className="text-xs sm:text-sm font-bold text-white">TRACK</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Evolution & Family</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Console */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        {/* Input Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-1.5 bg-cyber-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'text', label: 'Message Text', icon: FileText },
              { id: 'screenshot', label: 'Screenshot / OCR', icon: ImageIcon },
              { id: 'qr', label: 'QR Code', icon: QrCode },
              { id: 'url', label: 'Suspicious URL', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = inputMode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setInputMode(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-slate-400">
            {inputMode === 'text' && 'Supports English, Tamil (தமிழ்), Hindi (हिंदी), Hinglish'}
            {inputMode === 'screenshot' && 'Visual OCR Engine (Prototype Extraction)'}
            {inputMode === 'qr' && 'UPI & Payment QR Intent Parser'}
            {inputMode === 'url' && 'Domain & Infrastructure Inspector'}
          </span>
        </div>

        {/* Input Body */}
        {inputMode === 'text' || inputMode === 'url' ? (
          <div>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                inputMode === 'url'
                  ? "Enter suspicious link (e.g. https://sbi-kyc-verify-portal.test or https://indiapost-redelivery.test)..."
                  : "Paste suspicious SMS, WhatsApp message, email, or chat text in English, Tamil, Hindi, or Hinglish..."
              }
              className="w-full bg-cyber-950 border border-slate-800 rounded-xl p-4 text-sm font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 resize-none transition-all shadow-inner"
            />
          </div>
        ) : (
          /* File Upload Box for Screenshot & QR */
          <div className="p-8 rounded-xl border-2 border-dashed border-slate-800 bg-cyber-950/60 hover:border-cyan-500/40 transition-all text-center">
            <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-medium text-slate-200">
              Drop {inputMode === 'screenshot' ? 'scam screenshot' : 'payment QR code image'} here or click to browse
            </p>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Supports PNG, JPG, WEBP • Instant OCR and payload extraction
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-semibold cursor-pointer border border-slate-700 transition-all"
            >
              Choose Image File
            </label>
            {uploadedFileName && (
              <p className="text-xs text-emerald-400 font-mono mt-2">
                ✓ Loaded: {uploadedFileName}
              </p>
            )}
          </div>
        )}

        {/* Demo Quick-Load Buttons */}
        <div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
            ⚡ Quick Demo Scenarios (Click to Load):
          </span>
          <div className="flex flex-wrap gap-2">
            {DEMO_BUTTONS.map((demo) => {
              const Icon = demo.icon;
              return (
                <button
                  key={demo.id}
                  onClick={() => {
                    setInputText(demo.text);
                    setInputMode('text');
                    onAnalyze({ text: demo.text, input_type: 'text' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-950/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{demo.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Prototype Engine: Safe mock infrastructure (.test domains)</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onAnalyze({ text: inputText, input_type: inputMode })}
              disabled={isAnalyzing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sequencing DNA...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Analyze Message DNA</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Pipeline Step Visualizer */}
      <PipelineAnimator isAnalyzing={isAnalyzing} />

      {/* Analysis Results Display */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6">
          {/* Top Actions: Export / Summary */}
          <div className="flex items-center justify-between bg-cyber-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">ANALYSIS COMPLETE:</span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {analysisResult.language_analysis?.primary_language} ({analysisResult.language_analysis?.script})
              </span>
            </div>
            <button
              onClick={handleExportReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-950 border border-cyan-800/60 text-cyan-400 hover:text-cyan-200 text-xs font-mono font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Threat Report (JSON)</span>
            </button>
          </div>

          {/* Differentiator 1: Scam DNA Fingerprint Card */}
          <DnaCard
            dna={analysisResult.scam_dna}
            campaignName={analysisResult.campaign_match?.campaign_name}
            category={analysisResult.campaign_match?.category}
          />

          {/* Differentiator 2: Attack Path Social Engineering Engine */}
          <AttackPathPanel attackPath={analysisResult.attack_path} />

          {/* Differentiator 3: Transparent Risk Engine */}
          <RiskEnginePanel
            riskEngine={analysisResult.risk_engine}
            executionTimeMs={analysisResult.execution_time_ms}
          />

          {/* Differentiator 4: Scam Family & Mutation Matcher */}
          <CampaignMatchPanel
            campaignMatch={analysisResult.campaign_match}
            onSelectVariant={(variantText) => {
              setInputText(variantText);
              setInputMode('text');
              onAnalyze({ text: variantText, input_type: 'text' });
            }}
          />

          {/* Differentiator 5: URL & Infrastructure Inspector */}
          {analysisResult.url_analysis && analysisResult.url_analysis.length > 0 && (
            <UrlAnalysisPanel urlAnalysis={analysisResult.url_analysis} />
          )}
        </div>
      )}
    </div>
  );
}
