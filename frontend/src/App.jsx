import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnalyzerView from './components/AnalyzerView';
import ScamEvolutionView from './components/ScamEvolutionView';
import MutationLabView from './components/MutationLabView';
import CampaignMemoryView from './components/CampaignMemoryView';
import DashboardView from './components/DashboardView';
import JudgeShowcaseModal from './components/JudgeShowcaseModal';
import {
  checkBackendHealth,
  analyzeMessageApi,
  fetchStatsApi,
  fetchCampaignsApi,
  fetchRecentDetectionsApi
} from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [isJudgeShowcaseOpen, setIsJudgeShowcaseOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  const [inputText, setInputText] = useState(
    'Dear Customer, Your SBI account has been suspended due to pending KYC update. Please update your PAN card immediately at https://sbi-kyc-verify-portal.test to avoid permanent account deactivation within 24 hours.'
  );
  const [inputMode, setInputMode] = useState('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentDetections, setRecentDetections] = useState([]);

  // Initial load
  useEffect(() => {
    async function initData() {
      const isOnline = await checkBackendHealth();
      setBackendOnline(isOnline);

      const [campData, statsData, recentData] = await Promise.all([
        fetchCampaignsApi(),
        fetchStatsApi(),
        fetchRecentDetectionsApi()
      ]);

      setCampaigns(campData);
      setStats(statsData);
      setRecentDetections(recentData);

      // Run initial default analysis so judge immediately sees full results
      handleAnalyze({
        text: 'Dear Customer, Your SBI account has been suspended due to pending KYC update. Please update your PAN card immediately at https://sbi-kyc-verify-portal.test to avoid permanent account deactivation within 24 hours.',
        input_type: 'text'
      }, true);
    }
    initData();
  }, []);

  const handleAnalyze = async (payload, isInitial = false) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeMessageApi(payload);
      // simulate realistic processing window for judge presentation
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
        // Refresh recent detections & stats
        fetchRecentDetectionsApi().then(setRecentDetections);
        fetchStatsApi().then(setStats);
      }, isInitial ? 300 : 1200);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans">
      {/* Top Cyber Command Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenJudgeShowcase={() => setIsJudgeShowcaseOpen(true)}
        backendOnline={backendOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'analyzer' && (
          <AnalyzerView
            inputText={inputText}
            setInputText={setInputText}
            inputMode={inputMode}
            setInputMode={setInputMode}
            onAnalyze={(payload) => handleAnalyze(payload)}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            onSelectVariant={(variantText) => {
              setInputText(variantText);
              setInputMode('text');
              handleAnalyze({ text: variantText, input_type: 'text' });
            }}
            onOpenJudgeShowcase={() => setIsJudgeShowcaseOpen(true)}
          />
        )}

        {activeTab === 'evolution' && (
          <ScamEvolutionView
            campaigns={campaigns}
            onSelectVariantForAnalysis={(variantText) => {
              setInputText(variantText);
              setInputMode('text');
              setActiveTab('analyzer');
              handleAnalyze({ text: variantText, input_type: 'text' });
            }}
          />
        )}

        {activeTab === 'mutation_lab' && (
          <MutationLabView />
        )}

        {activeTab === 'campaign_memory' && (
          <CampaignMemoryView
            campaigns={campaigns}
            onSelectVariantForAnalysis={(variantText) => {
              setInputText(variantText);
              setInputMode('text');
              setActiveTab('analyzer');
              handleAnalyze({ text: variantText, input_type: 'text' });
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            recentDetections={recentDetections}
            onSelectRecent={(text) => {
              setInputText(text);
              setInputMode('text');
              setActiveTab('analyzer');
              handleAnalyze({ text, input_type: 'text' });
            }}
          />
        )}
      </main>

      {/* 10-Second Judge Live Showcase Modal */}
      <JudgeShowcaseModal
        isOpen={isJudgeShowcaseOpen}
        onClose={() => setIsJudgeShowcaseOpen(false)}
        onSelectSample={(sampleText) => {
          setInputText(sampleText);
          setInputMode('text');
          setActiveTab('analyzer');
          handleAnalyze({ text: sampleText, input_type: 'text' });
        }}
      />

      {/* Cyber Command Center Footer */}
      <footer className="border-t border-slate-900 bg-cyber-950/90 py-4 px-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            SAGE — Scam Analysis & Genome Engine • <span className="text-cyan-400">“MESSAGES → DNA → IMMUNITY”</span>
          </span>
          <span className="text-[11px] text-slate-600">
            Hackathon Prototype • Safe Illustrative Testing Environment (.test domains)
          </span>
        </div>
      </footer>
    </div>
  );
}
