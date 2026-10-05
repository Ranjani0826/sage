import React, { useState } from 'react';
import { Activity, ShieldAlert, Dna, Globe, Cpu, AlertTriangle, Search, Filter, ArrowUpRight } from 'lucide-react';

export default function DashboardView({ stats, recentDetections, onSelectRecent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const defaultStats = stats || {
    scams_analyzed: 48,
    scam_families: 5,
    languages_supported: ["English", "Tamil (தமிழ்)", "Hindi (हिंदी)", "Hinglish"],
    linked_mutations: 26,
    high_risk_cases: 44,
    blind_spots_identified: 3
  };

  const detections = recentDetections && recentDetections.length > 0 ? recentDetections : [
    {
      id: 1,
      created_at: "2026-10-05T06:45:10Z",
      input_type: "text",
      language: "Tamil",
      preview: "அன்புள்ள வாடிக்கையாளரே, உங்கள் வங்கி கணக்கு KYC புதுப்பிக்கப்படாததால்...",
      risk_level: "CRITICAL",
      risk_score: 95,
      campaign_name: "Bank KYC Suspension Blitz",
      recommended_action: "BLOCK"
    },
    {
      id: 2,
      created_at: "2026-10-05T06:42:30Z",
      input_type: "text",
      language: "Hindi",
      preview: "प्रिय ग्राहक, आपका बैंक खाता KYC अपडेट न होने के कारण आज रात ब्लॉक...",
      risk_level: "CRITICAL",
      risk_score: 95,
      campaign_name: "Bank KYC Suspension Blitz",
      recommended_action: "BLOCK"
    },
    {
      id: 3,
      created_at: "2026-10-05T06:30:15Z",
      input_type: "url",
      language: "English",
      preview: "https://indiapost-redelivery.test — Postal redirection payload...",
      risk_level: "HIGH",
      risk_score: 82,
      campaign_name: "Failed Parcel Delivery Redirection",
      recommended_action: "BLOCK"
    },
    {
      id: 4,
      created_at: "2026-10-05T06:15:00Z",
      input_type: "qr",
      language: "English",
      preview: "PhonePe UPI Cashback QR voucher decode payload (₹4,999)...",
      risk_level: "CRITICAL",
      risk_score: 96,
      campaign_name: "UPI Refund / Cashback QR Reverse-Pay",
      recommended_action: "BLOCK"
    },
    {
      id: 5,
      created_at: "2026-10-05T05:50:20Z",
      input_type: "text",
      language: "Hinglish",
      preview: "Dear Customer aapka Bank Account aaj suspend ho jayega because KYC...",
      risk_level: "CRITICAL",
      risk_score: 92,
      campaign_name: "Bank KYC Suspension Blitz",
      recommended_action: "BLOCK"
    }
  ];

  const filteredDetections = detections.filter((d) => {
    const matchesSearch =
      d.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || d.risk_level === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Dashboard Top Banner */}
      <div className="cyber-card p-6 border-slate-800 bg-gradient-to-r from-cyber-950 via-cyber-900 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold mb-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cyber Threat Operations & Telemetry Matrix</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Threat Intelligence Dashboard
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-light">
              Aggregated real-time metrics across multi-lingual scam families and mutation vectors.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-cyber-950 border border-slate-800 text-xs font-mono text-slate-400 text-right">
            <span className="text-cyan-400 block font-bold">STATUS: PROTOTYPE DEMO ENVIRONMENT</span>
            <span>Illustrative telemetry metrics</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-cyber-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase">SCAMS ANALYZED</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-white">
            {defaultStats.scams_analyzed}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 block mt-1">+12 today</span>
        </div>

        <div className="p-4 rounded-xl bg-cyber-950/80 border border-purple-500/40">
          <div className="flex items-center justify-between text-purple-400 mb-1">
            <span className="text-[10px] font-mono uppercase">SCAM FAMILIES</span>
            <Dna className="w-3.5 h-3.5" />
          </div>
          <span className="text-2xl font-bold font-mono text-white">
            {defaultStats.scam_families}
          </span>
          <span className="text-[10px] font-mono text-purple-300 block mt-1">Unique Genomes</span>
        </div>

        <div className="p-4 rounded-xl bg-cyber-950/80 border border-cyan-500/40">
          <div className="flex items-center justify-between text-cyan-400 mb-1">
            <span className="text-[10px] font-mono uppercase">LANGUAGES</span>
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span className="text-2xl font-bold font-mono text-white">4</span>
          <span className="text-[10px] font-mono text-cyan-300 block mt-1">EN, TA, HI, HINGLISH</span>
        </div>

        <div className="p-4 rounded-xl bg-cyber-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase">LINKED MUTATIONS</span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-white">
            {defaultStats.linked_mutations}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-1">Cross-Variant</span>
        </div>

        <div className="p-4 rounded-xl bg-cyber-950/80 border border-rose-500/40">
          <div className="flex items-center justify-between text-rose-400 mb-1">
            <span className="text-[10px] font-mono uppercase">HIGH RISK</span>
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <span className="text-2xl font-bold font-mono text-rose-300">
            {defaultStats.high_risk_cases}
          </span>
          <span className="text-[10px] font-mono text-rose-400 block mt-1">Action: BLOCK</span>
        </div>

        <div className="p-4 rounded-xl bg-cyber-950/80 border border-amber-500/40">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-[10px] font-mono uppercase">BLIND SPOTS</span>
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="text-2xl font-bold font-mono text-amber-300">
            {defaultStats.blind_spots_identified}
          </span>
          <span className="text-[10px] font-mono text-amber-400 block mt-1">Patching active</span>
        </div>
      </div>

      {/* Recent Detections Table Console */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Interactive Recent Threat Feed</span>
          </h3>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by preview / family..."
                className="bg-cyber-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-cyber-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="py-2.5 px-3">Input Type</th>
                <th className="py-2.5 px-3">Language</th>
                <th className="py-2.5 px-3">Message Preview</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Linked Family</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDetections.map((d, idx) => (
                <tr
                  key={d.id || idx}
                  className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                  onClick={() => onSelectRecent && onSelectRecent(d.preview)}
                >
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase text-[10px]">
                      {d.input_type || 'text'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-semibold">
                    {d.language}
                  </td>
                  <td className="py-3 px-3 text-slate-400 max-w-xs truncate group-hover:text-cyan-200">
                    "{d.preview}"
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        d.risk_level === 'CRITICAL'
                          ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                          : 'bg-amber-950/60 border-amber-800 text-amber-300'
                      }`}
                    >
                      {d.risk_level} ({d.risk_score || 90}%)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-purple-300 font-semibold">
                    {d.campaign_name}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-rose-600 text-white">
                      {d.recommended_action || 'BLOCK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
