import React, { useState } from 'react';
import { Sliders, ShieldCheck, Lock, AlertTriangle, Check, RefreshCw, Zap } from 'lucide-react';
import { SecurityPolicyConfig } from '../types';

interface PoliciesViewProps {
  policyConfig: SecurityPolicyConfig;
  onUpdatePolicy: (newConfig: SecurityPolicyConfig) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  policyConfig,
  onUpdatePolicy,
}) => {
  const [velocityLimit, setVelocityLimit] = useState(policyConfig.velocityLimitPerMin);
  const [maxRollingSpend, setMaxRollingSpend] = useState(policyConfig.maxRollingSpend10Min);
  const [semanticMode, setSemanticMode] = useState<'strict' | 'balanced' | 'permissive'>(policyConfig.semanticSensitivity);
  const [vendorMode, setVendorMode] = useState<'escalate' | 'block'>(policyConfig.vendorQuarantineMode);
  const [enable180Day, setEnable180Day] = useState(policyConfig.enforce180DayProtection);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePolicy({
      velocityLimitPerMin: velocityLimit,
      maxRollingSpend10Min: maxRollingSpend,
      semanticSensitivity: semanticMode,
      vendorQuarantineMode: vendorMode,
      enforce180DayProtection: enable180Day,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      
      {/* Page Header */}
      <div className="border-b border-[#E8E3D9] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-serif font-bold text-[#141413] tracking-tight">Firewall Security Policies</h1>
          <p className="text-xs text-[#8C8275]">
            Configure dynamic autonomous transaction guardrails, loop circuit breakers, and PayPal settlement behavior.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20">
            Deterministic Engine Live
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Velocity & Smurfing Circuit Breaker */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F1EFEA] pb-3">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141413]">Loop & Smurfing Circuit Breaker (Gate 04)</h3>
              <p className="text-xs text-[#8C8275]">Halts recursive autonomous retry loops and micro-transaction smurfing before funds are drained</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E8E3D9]">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#141413]">Max Transactions per 60 Seconds</label>
                <span className="font-mono font-bold text-[#003087] text-xs bg-white border border-[#E8E3D9] px-2 py-0.5 rounded tabular-nums">
                  {velocityLimit} tx / min
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={velocityLimit}
                onChange={(e) => setVelocityLimit(parseInt(e.target.value, 10))}
                className="w-full accent-[#003087] cursor-pointer"
              />
              <p className="text-[#8C8275] text-[11px] leading-relaxed">
                Prevents runaway recursive API loops by hard-blocking agents exceeding {velocityLimit} requests/min.
              </p>
            </div>

            <div className="space-y-2 p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E8E3D9]">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#141413]">Rolling 10-Min Smurfing Cap</label>
                <span className="font-mono font-bold text-[#003087] text-xs bg-white border border-[#E8E3D9] px-2 py-0.5 rounded tabular-nums">
                  ${maxRollingSpend} USD
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={maxRollingSpend}
                onChange={(e) => setMaxRollingSpend(parseInt(e.target.value, 10))}
                className="w-full accent-[#003087] cursor-pointer"
              />
              <p className="text-[#8C8275] text-[11px] leading-relaxed">
                Prevents split micro-transactions from silently draining wallets. Halts if cumulative spend exceeds ${maxRollingSpend} in 10 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Semantic Intent Sensitivity */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F1EFEA] pb-3">
            <div className="p-2 rounded-lg bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141413]">Semantic Intent Verification Sensitivity (Gate 01)</h3>
              <p className="text-xs text-[#8C8275]">Threshold for catching prompt injections, jailbreaks, and unit hallucinations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { id: 'strict', title: 'Strict (Recommended)', desc: '90%+ semantic vector alignment. Zero tolerance for gift cards, cash equivalents, or prompt overrides.' },
              { id: 'balanced', title: 'Balanced', desc: '75%+ alignment. Permits minor adjacent software tooling purchases within budget.' },
              { id: 'permissive', title: 'Permissive', desc: '50%+ alignment. Only flags verified hostile prompt injection syntax.' },
            ].map((mode) => (
              <label
                key={mode.id}
                onClick={() => setSemanticMode(mode.id as any)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between btn-tactile ${
                  semanticMode === mode.id
                    ? 'bg-[#FAF9F5] border-[#003087] ring-1 ring-[#003087] shadow-2xs'
                    : 'bg-white border-[#E8E3D9] hover:border-[#D5CCBD]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#141413] capitalize">{mode.title}</span>
                    {semanticMode === mode.id && <Check className="w-4 h-4 text-[#003087]" />}
                  </div>
                  <p className="text-[#5F574D] leading-relaxed text-[11px]">{mode.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section 3: Vendor Whitelist Enforcement & Spoofing Defense */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F1EFEA] pb-3">
            <div className="p-2 rounded-lg bg-[#FAF9F5] text-[#433D35] border border-[#E8E3D9]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141413]">Vendor Domain Authentication Policy (Gate 02)</h3>
              <p className="text-xs text-[#8C8275]">Action taken when an agent requests payment to an unverified merchant or suspicious domain</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label
              onClick={() => setVendorMode('escalate')}
              className={`p-4 rounded-xl border cursor-pointer transition btn-tactile ${
                vendorMode === 'escalate'
                  ? 'bg-[#FFFBEB] border-amber-300 ring-1 ring-amber-400 shadow-2xs'
                  : 'bg-white border-[#E8E3D9] hover:border-[#D5CCBD]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#141413]">Human Supervisory Escrow (Default)</span>
                {vendorMode === 'escalate' && <Check className="w-4 h-4 text-amber-700" />}
              </div>
              <p className="text-[#5F574D] leading-relaxed text-[11px]">
                Quarantines the transaction in escrow and dispatches an instant approval prompt to the human supervisor.
              </p>
            </label>

            <label
              onClick={() => setVendorMode('block')}
              className={`p-4 rounded-xl border cursor-pointer transition btn-tactile ${
                vendorMode === 'block'
                  ? 'bg-[#FFF5F5] border-rose-300 ring-1 ring-rose-400 shadow-2xs'
                  : 'bg-white border-[#E8E3D9] hover:border-[#D5CCBD]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#141413]">Strict Hard Block</span>
                {vendorMode === 'block' && <Check className="w-4 h-4 text-rose-700" />}
              </div>
              <p className="text-[#5F574D] leading-relaxed text-[11px]">
                Immediately rejects any merchant not explicitly matching an authentic domain in the agent's allowlist.
              </p>
            </label>
          </div>
        </div>

        {/* Section 4: PayPal Settlement Settings & SKU Lock */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E3D9] shadow-2xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F1EFEA] pb-3">
            <div className="p-2 rounded-lg bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141413]">PayPal Production Settlement Rails & Cart Locking</h3>
              <p className="text-xs text-[#8C8275]">Cryptographic SKU Line-Item Lock and 180-Day Dispute Protection</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9]">
              <div>
                <strong className="text-[#141413] block font-semibold">180-Day Buyer Protection Program</strong>
                <p className="text-[#5F574D]">Attaches dispute defense and purchase guarantee tokens to every single-use PayPal transaction.</p>
              </div>
              <input
                type="checkbox"
                checked={enable180Day}
                onChange={(e) => setEnable180Day(e.target.checked)}
                className="w-5 h-5 text-[#003087] rounded border-[#E8E3D9] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#5F574D] block mb-1 font-semibold">Cart Tampering & Slippage Policy</label>
                <input
                  type="text"
                  readOnly
                  value="$0.00 USD (Strict Zero Slippage Lock)"
                  className="w-full bg-[#FAF9F5] border border-[#E8E3D9] rounded-lg px-3 py-2 text-[#433D35] font-mono text-xs cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-[#5F574D] block mb-1 font-semibold">Settlement Protocol Version</label>
                <input
                  type="text"
                  readOnly
                  value="PayPal Agentic Commerce Protocol v2.4 (JIT Scoped)"
                  className="w-full bg-[#FAF9F5] border border-[#E8E3D9] rounded-lg px-3 py-2 text-[#433D35] font-mono text-xs cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-bounce">
              <Check className="w-4 h-4" /> Policies updated successfully and deployed to firewall edge!
            </span>
          ) : (
            <span className="text-xs text-[#8C8275]">Rules deploy deterministically across all active agent sessions</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#003087] hover:bg-[#002244] text-white font-bold text-xs shadow-xs transition btn-tactile"
          >
            Deploy Updated Policies
          </button>
        </div>

      </form>

    </div>
  );
};