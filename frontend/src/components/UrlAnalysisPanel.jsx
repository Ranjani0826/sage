import React from 'react';
import { Globe, Lock, Unlock, AlertTriangle, ShieldCheck, Server, Radio } from 'lucide-react';

export default function UrlAnalysisPanel({ urlAnalysis }) {
  if (!urlAnalysis || urlAnalysis.length === 0) return null;

  return (
    <div className="cyber-card p-5 border-slate-800">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              URL & Infrastructure Telemetry
            </h3>
            <p className="text-xs text-slate-400">
              Payload Domain Analysis & Disposable Host Detection
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Demo Threat Signal
        </span>
      </div>

      <div className="space-y-4">
        {urlAnalysis.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-cyber-950/80 border border-slate-800/80 space-y-3">
            {/* Domain & Scheme */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.is_https ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3" /> HTTPS
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-950/40 border border-rose-800/50 px-2 py-0.5 rounded">
                    <Unlock className="w-3 h-3" /> HTTP (INSECURE)
                  </span>
                )}
                <span className="font-mono text-xs font-bold text-cyan-300 break-all">
                  {item.raw_url}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800/50 px-2 py-0.5 rounded">
                Threat Score: {item.simulated_threat_score}/100
              </span>
            </div>

            {/* Risk Indicators */}
            {item.risk_factors && item.risk_factors.length > 0 && (
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Detected Domain Flags:
                </span>
                <ul className="text-xs text-rose-200/90 space-y-0.5 list-disc list-inside">
                  {item.risk_factors.map((rf, rIdx) => (
                    <li key={rIdx} className="text-[11px]">{rf}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Simulated Server Telemetry */}
            {item.telemetry && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 block">DNS Host:</span>
                  <span className="text-slate-300">{item.telemetry.dns_resolution}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Hosting ASN:</span>
                  <span className="text-slate-300">{item.telemetry.hosting_asn}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Infrastructure Age:</span>
                  <span className="text-slate-300">{item.telemetry.first_registered}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
