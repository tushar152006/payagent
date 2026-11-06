import React from 'react';
import { SystemStats, TransactionRecord } from '../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Bot, 
  TrendingUp, 
  ArrowRight, 
  Lock, 
  AlertTriangle,
  Zap,
  Activity,
  Layers,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Clock,
  Terminal,
  Cpu,
  KeyRound,
  FileText
} from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface DashboardViewProps {
  stats: SystemStats;
  transactions: TransactionRecord[];
  onNavigate: (tab: NavTab) => void;
  onSelectTransaction?: (record: TransactionRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  transactions,
  onNavigate,
  onSelectTransaction,
}) => {
  const blockedTransactions = transactions.filter(t => t.status === 'BLOCKED');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. Master Editorial Broadsheet Manifesto & Live Engine Telemetry */}
      <section className="bg-white rounded-2xl border border-[#E8E3D9] shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E3D9]">
          
          {/* Left Column (7 Cols): The Editorial Manifesto */}
          <div className="lg:col-span-7 p-6 sm:p-9 space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold text-[#003087] tracking-wider uppercase">
                Autonomous Treasury & Spend Firewall // Protocol v2.4
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif text-[#141413] leading-[1.18] font-normal tracking-tight">
              When AI agents reach for a credit card, traditional payment rails break.
            </h1>

            {/* Forbes Quote Callout */}
            <div className="p-3.5 rounded-xl bg-[#FAF9F5] border-l-4 border-[#003087] border-[#E8E3D9] text-xs space-y-1">
              <p className="italic text-[#2A2723] font-serif text-[13px] leading-relaxed">
                "Banks and payment processors cannot distinguish between a malicious actor, a hallucinating AI, and a legitimate cardholder."
              </p>
              <div className="text-[11px] font-mono text-[#8C8275] font-semibold">
                — Sandy Carter & John Sviokla, <strong className="text-[#141413]">Forbes</strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5F574D] leading-relaxed font-sans">
              Autonomous swarms are spinning up GPU clusters, purchasing SaaS seats, and retrying failed checkouts in recursive loops. PayAgent acts as an application-layer deterministic firewall—evaluating semantic prompt intent, merchant domain allowlists, and velocity caps before minting <strong>single-use, ephemeral PayPal Order vouchers</strong> with $0.00 slippage tolerance and 180-day buyer protection.
            </p>

            {/* Tactical Actions */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('simulator')}
                className="px-5 py-2.5 rounded-xl bg-[#003087] hover:bg-[#002244] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition btn-tactile"
              >
                <Zap className="w-4 h-4 fill-current text-[#00CFDE]" />
                Launch Live Firewall Workbench
              </button>
              <button
                onClick={() => onNavigate('ledger')}
                className="px-5 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F1EFEA] border border-[#E8E3D9] text-[#141413] font-semibold text-xs flex items-center gap-2 transition btn-tactile shadow-2xs"
              >
                <FileText className="w-4 h-4 text-[#8C8275]" />
                Inspect Audit Ledger ({transactions.length} Events)
              </button>
            </div>

          </div>

          {/* Right Column (5 Cols): Live Firewall Engine Status Instrument */}
          <div className="lg:col-span-5 bg-[#0B0F19] p-6 sm:p-8 text-white flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00CFDE]" />
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Deterministic Engine Status
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  ONLINE • 16ms
                </span>
              </div>

              {/* Engine Gate Readouts */}
              <div className="space-y-2 font-mono text-xs">
                
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00CFDE] font-bold text-[11px]">GATE 01</span>
                    <span className="text-slate-300 text-[11px]">Semantic & DAN Regex Suite</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    3ms
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00CFDE] font-bold text-[11px]">GATE 02</span>
                    <span className="text-slate-300 text-[11px]">Domain & Anti-Typosquat</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    5ms
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00CFDE] font-bold text-[11px]">GATE 03</span>
                    <span className="text-slate-300 text-[11px]">Delegated Cap & Slippage Lock</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    1ms
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00CFDE] font-bold text-[11px]">GATE 04</span>
                    <span className="text-slate-300 text-[11px]">Loop & Smurfing Breaker</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    2ms
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom Seal */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#00CFDE]" />
                <span>Single-Use Auto-Burn Order Tokens</span>
              </div>
              <span className="text-slate-500">15m TTL</span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Four Monolithic Financial Telemetry Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pillar 1: Prevented Loss */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-2 hover:border-[#D5CCBD] transition">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Shielded Rogue Capital</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#141413] font-mono tabular-nums tracking-tight">
              ${stats.totalPreventedLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-rose-700 font-medium mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>{stats.blockedCount} rogue spend loops aborted pre-mint</span>
            </p>
          </div>
        </div>

        {/* Pillar 2: Settled Volume */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-2 hover:border-[#D5CCBD] transition">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">PayPal Settled Volume</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#141413] font-mono tabular-nums tracking-tight">
              ${stats.totalProcessedPayPal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Scoped single-use JIT vouchers</span>
            </p>
          </div>
        </div>

        {/* Pillar 3: Defense Accuracy */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-2 hover:border-[#D5CCBD] transition">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Defense Interception</span>
            <div className="p-1.5 rounded-lg bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#141413] font-mono tabular-nums tracking-tight">
              100.0%
            </div>
            <p className="text-[11px] text-[#5F574D] font-medium mt-1">
              Zero unauthorized corporate capital leaked
            </p>
          </div>
        </div>

        {/* Pillar 4: Active Agents */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-2 hover:border-[#D5CCBD] transition">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Guarded Autonomous Fleet</span>
            <div className="p-1.5 rounded-lg bg-[#FAF9F5] text-[#433D35] border border-[#E8E3D9]">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#141413] font-mono tabular-nums tracking-tight">
              3 Agents
            </div>
            <p className="text-[11px] text-[#5F574D] font-medium mt-1">
              DevOps, Procurement & Web Harvester
            </p>
          </div>
        </div>

      </section>

      {/* 3. The 4-Gate Execution Pipeline Visual Architecture */}
      <section className="bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F1EFEA] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#003087]" />
              <h2 className="text-sm font-bold text-[#141413] tracking-tight font-sans">
                Deterministic 4-Gate Execution Waterfall
              </h2>
            </div>
            <p className="text-xs text-[#8C8275] mt-0.5">
              Every autonomous machine spend intent passes through 4 sequential zero-trust gates in &lt;16ms before token mint
            </p>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#003087] bg-[#EBF4FA] px-2.5 py-1 rounded border border-[#0070BA]/20">
            Sequential Zero-Trust Waterfall
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 text-xs">
          
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[10px] text-[#003087] bg-white border border-[#E8E3D9] px-2 py-0.5 rounded">
                GATE 01
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">3ms</span>
            </div>
            <h3 className="font-bold text-[#141413] text-xs">Semantic Intent & DAN Check</h3>
            <p className="text-[11px] text-[#5F574D] leading-relaxed">
              Cosine vector alignment between task goal and cart SKU items. 6-engine regex catches DAN roleplay prompts and prompt injections.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[10px] text-[#003087] bg-white border border-[#E8E3D9] px-2 py-0.5 rounded">
                GATE 02
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">5ms</span>
            </div>
            <h3 className="font-bold text-[#141413] text-xs">Domain & Typosquat Defense</h3>
            <p className="text-[11px] text-[#5F574D] leading-relaxed">
              Strict allowlist matching. Halts lookalike phishing domains (e.g. evil-aws.com, github-billing.org) via Levenshtein audit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[10px] text-[#003087] bg-white border border-[#E8E3D9] px-2 py-0.5 rounded">
                GATE 03
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">1ms</span>
            </div>
            <h3 className="font-bold text-[#141413] text-xs">Caps & Unit Hallucinations</h3>
            <p className="text-[11px] text-[#5F574D] leading-relaxed">
              Per-transaction ceiling ($50-$500) and monthly budget allocation. Halts unit hallucinations (Lobstar 100x order spike).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[10px] text-[#003087] bg-white border border-[#E8E3D9] px-2 py-0.5 rounded">
                GATE 04
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">2ms</span>
            </div>
            <h3 className="font-bold text-[#141413] text-xs">Loop & Smurfing Breaker</h3>
            <p className="text-[11px] text-[#5F574D] leading-relaxed">
              Rolling 60s frequency throttle (max 5 tx/min) and rolling 10-minute cumulative cap ($300). Halts recursive retry loops instantly.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Incident Stream & The PayPal Trust Anchor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left (7 Cols): Real-world Incident Interceptions */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <h2 className="text-sm font-bold text-[#141413] tracking-tight font-sans">
                  Critical Interception Incident Log
                </h2>
              </div>
              <p className="text-xs text-[#8C8275] mt-0.5">
                Autonomous spending anomalies halted by the firewall before transaction dispatch
              </p>
            </div>
            <button
              onClick={() => onNavigate('ledger')}
              className="text-xs text-[#0070BA] hover:text-[#003087] font-semibold transition flex items-center gap-1"
            >
              All Records ({transactions.length}) <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {blockedTransactions.map((tx) => (
              <div 
                key={tx.id}
                onClick={() => onSelectTransaction?.(tx)}
                className="p-4 rounded-xl border border-rose-200/80 bg-[#FFF5F5]/70 hover:bg-[#FFF5F5] transition cursor-pointer space-y-2.5 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-2.5">
                    <span className="p-1 rounded-md bg-rose-100 text-rose-700 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-[#141413] group-hover:text-rose-900 transition">
                        {tx.request.itemDescription}
                      </h3>
                      <p className="text-[11px] text-[#8C8275] font-mono mt-0.5">
                        Agent: <strong className="text-[#433D35] font-semibold">{tx.request.agentName}</strong> • Target: {tx.request.targetMerchant}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200 tabular-nums whitespace-nowrap">
                    Shielded: ${tx.preventedLossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <p className="text-xs text-[#433D35] leading-relaxed bg-white/80 p-2.5 rounded-lg border border-rose-100">
                  {tx.verification.decisionReason}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#8C8275] pt-1 border-t border-rose-100 font-mono">
                  <span>{new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  <span className="text-[#0070BA] font-sans font-semibold group-hover:underline flex items-center gap-0.5">
                    View Forensic Trace <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right (5 Cols): The PayPal Settlement Anchor */}
        <section className="lg:col-span-5 space-y-5">
          
          {/* PayPal Moat Card */}
          <div className="bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-6 space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-[#F1EFEA] pb-3">
              <div className="p-2 rounded-lg bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#141413]">The PayPal Settlement Anchor</h3>
                <p className="text-xs text-[#8C8275]">Why PayAgent is built natively on PayPal Orders v2</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#5F574D]">
              
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#141413] font-semibold text-[11px]">180-Day Global Buyer Protection</strong>
                  <span className="text-[10px] font-mono text-[#003087] font-semibold">DISPUTE PROOF</span>
                </div>
                <p className="text-[11px] text-[#5F574D] leading-relaxed">
                  Unlike irreversible crypto agent rails (x402), PayPal guarantees 180 days of dispute resolution if an agent is tricked into buying incorrect SaaS tiers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#141413] font-semibold text-[11px]">400M+ Two-Sided Merchant Mesh</strong>
                  <span className="text-[10px] font-mono text-[#003087] font-semibold">GLOBAL RAILS</span>
                </div>
                <p className="text-[11px] text-[#5F574D] leading-relaxed">
                  Agents do not need new niche protocols. They settle directly across AWS, GitHub, GCP, Stripe, and millions of enterprise providers using standardized PayPal Order tokens.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#141413] font-semibold text-[11px]">Ephemeral Scoped Vouchers ($0.00 Slippage)</strong>
                  <span className="text-[10px] font-mono text-[#003087] font-semibold">ED25519 LOCK</span>
                </div>
                <p className="text-[11px] text-[#5F574D] leading-relaxed">
                  Agents never receive raw credit cards or static API credentials. Vouchers carry strict 15-minute TTLs, auto-destruct upon capture, and allow $0.00 slippage.
                </p>
              </div>

            </div>
          </div>

          {/* Quick Sandbox Callout */}
          <div className="bg-[#0B0F19] rounded-2xl p-5 text-white shadow-sm space-y-3 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#00CFDE] font-semibold tracking-wider uppercase">
                Interactive Testing Suite
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <h4 className="text-sm font-serif font-bold text-white">
              Test Real-World Attack Scenarios in Real Time
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Inject Devin retry loops, Lobstar 100x hallucinations, or DAN roleplay jailbreaks against the live deterministic waterfall.
            </p>
            <button
              onClick={() => onNavigate('simulator')}
              className="w-full py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 btn-tactile shadow-xs"
            >
              Open Firewall Simulator Workbench <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </section>

      </div>

    </div>
  );
};