import React, { useState, useEffect } from 'react';
import { VerificationResult, PurchaseRequest, PayPalOrderReceipt } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  Lock,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Clock,
  Terminal,
  Activity,
  FileCheck2,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { PayAgentLogo } from './PayAgentLogo';
import { audioTactile } from '../utils/audioTactile';

interface VerificationPipelineProps {
  currentRequest: PurchaseRequest | null;
  verificationResult: VerificationResult | null;
  paypalReceipt: PayPalOrderReceipt | null;
  isEvaluating: boolean;
  onOpenApprovalModal?: () => void;
}

export const VerificationPipeline: React.FC<VerificationPipelineProps> = ({
  currentRequest,
  verificationResult,
  paypalReceipt,
  isEvaluating,
  onOpenApprovalModal,
}) => {
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(14 * 60 + 59);
  const [evalGateStep, setEvalGateStep] = useState(0);

  // 15-minute countdown timer for ephemeral voucher
  useEffect(() => {
    if (paypalReceipt) {
      setCountdownSeconds(14 * 60 + 59);
      const interval = setInterval(() => {
        setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [paypalReceipt]);

  // Sequential gate scanning animation step during evaluation
  useEffect(() => {
    if (isEvaluating) {
      setEvalGateStep(0);
      const t1 = setTimeout(() => setEvalGateStep(1), 75);
      const t2 = setTimeout(() => setEvalGateStep(2), 150);
      const t3 = setTimeout(() => setEvalGateStep(3), 225);
      const t4 = setTimeout(() => setEvalGateStep(4), 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      setEvalGateStep(4);
    }
  }, [isEvaluating]);

  if (!currentRequest) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-2xs p-12 text-center flex flex-col items-center justify-center min-h-[520px]">
        <div className="w-14 h-14 rounded-2xl bg-[#003087] text-white flex items-center justify-center mb-4 shadow-sm">
          <PayAgentLogo theme="dark" className="w-8 h-8" />
        </div>
        <h3 className="text-base font-serif font-bold text-[#141413] mb-1.5">
          Deterministic Spend Firewall Ready
        </h3>
        <p className="text-xs text-[#5F574D] max-w-sm leading-relaxed">
          Select an agent benchmark attack on the left or enter a custom prompt payload to observe the 4-gate zero-trust verification waterfall evaluate in real-time.
        </p>
      </div>
    );
  }

  // Active Scanning State
  if (isEvaluating) {
    return (
      <div className="bg-white rounded-2xl border border-[#003087]/30 shadow-md p-8 text-center flex flex-col items-center justify-center min-h-[520px] space-y-6 animate-fade-in relative overflow-hidden">
        {/* Shimmer line pass */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#003087]/5 to-transparent animate-shimmer pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-[#003087] flex items-center justify-center text-[#00CFDE] shadow-md relative">
          <PayAgentLogo theme="dark" className="w-8 h-8 animate-pulse-dot" />
        </div>

        <div className="space-y-1.5 max-w-md">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0070E0] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#003087] uppercase tracking-wider">
              Evaluating Zero-Trust Waterfall &lt; 16ms
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-[#141413]">
            Scanning Machine Spend Intent: {currentRequest.targetMerchant}
          </h3>
          <p className="text-xs text-[#5F574D] font-mono">
            Amount: ${currentRequest.amount.toFixed(2)} USD • Agent: {currentRequest.agentName}
          </p>
        </div>

        {/* 4 sequential scanning progress bars */}
        <div className="w-full max-w-md space-y-2.5 text-left font-mono text-xs">
          {[
            { label: 'GATE 01: Semantic Intent & DAN Regex Suite', step: 1 },
            { label: 'GATE 02: Domain & Anti-Typosquat Defense', step: 2 },
            { label: 'GATE 03: Delegated Dollar Cap & Slippage Lock', step: 3 },
            { label: 'GATE 04: Loop Circuit Breaker & Smurfing Cap', step: 4 },
          ].map((g, idx) => {
            const isDone = evalGateStep >= g.step;
            const isCurrent = evalGateStep === g.step - 1;
            return (
              <div 
                key={idx}
                className={`p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between ${
                  isDone 
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' 
                    : isCurrent
                    ? 'bg-[#EBF4FA] border-[#0070BA]/40 text-[#003087] ring-1 ring-[#0070BA]/30'
                    : 'bg-[#FAF9F5] border-[#E5E0D8] text-[#8C8275]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isDone ? 'bg-[#065F46]' : isCurrent ? 'bg-[#0070E0] animate-pulse' : 'bg-[#C8C1B4]'
                  }`} />
                  <span className="text-[11px] font-bold">{g.label}</span>
                </div>
                <span className="text-[10px] font-semibold">
                  {isDone ? 'AUDITED' : isCurrent ? 'SCANNING…' : 'QUEUED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!verificationResult) return null;

  const isApproved = verificationResult.overallStatus === 'APPROVED';
  const isBlocked = verificationResult.overallStatus === 'BLOCKED';
  const isEscalated = verificationResult.overallStatus === 'REQUIRES_HUMAN_APPROVAL';

  const handleCopy = (text: string) => {
    audioTactile.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 1500);
    }
  };

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}m ${remainder < 10 ? '0' : ''}${remainder}s`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-2xs p-5 sm:p-6 space-y-5 animate-fade-in">
      
      {/* 1. Pipeline Execution Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#F1EFEA] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-serif font-bold text-[#141413] tracking-tight">
              Pre-Authorization Security Pipeline
            </h2>
            <span className="text-[10px] font-mono text-[#5F574D] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#E5E0D8]">
              {currentRequest.id}
            </span>
          </div>
          <p className="text-xs text-[#5F574D] mt-0.5">
            Sequential zero-trust evaluation completed in 16ms
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Threat Index */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF9F5] border border-[#E5E0D8]">
            <span className="text-[10px] font-mono uppercase text-[#5F574D] font-bold">Threat Index</span>
            <span
              className={`text-xs font-bold font-mono tabular-nums ${
                verificationResult.riskScore > 60
                  ? 'text-[#9F1239]'
                  : verificationResult.riskScore > 30
                  ? 'text-amber-700'
                  : 'text-[#065F46]'
              }`}
            >
              {verificationResult.riskScore}/100
            </span>
          </div>

          {/* Verdict Stamped Badge */}
          <div
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border font-mono animate-stamp-pop ${
              isApproved
                ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                : isBlocked
                ? 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]'
                : 'bg-[#FFFBEB] text-amber-800 border-amber-300'
            }`}
          >
            {isApproved ? (
              <ShieldCheck className="w-4 h-4 text-[#065F46]" />
            ) : isBlocked ? (
              <ShieldAlert className="w-4 h-4 text-[#9F1239]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>
              {isApproved ? 'VERIFIED & SETTLED' : isBlocked ? 'FIREWALL INTERCEPTED' : 'SUPERVISORY QUARANTINE'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Evaluated Purchase Intent Metadata Strip */}
      <div className="p-4 rounded-xl bg-[#FAF9F5] text-[#141413] border border-[#E5E0D8] space-y-2.5 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E0D8] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#8C8275] uppercase">AGENT:</span>
            <span className="font-bold text-[#003087]">{currentRequest.agentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#8C8275] uppercase">REQUESTED:</span>
            <span className="font-bold text-[#141413] tabular-nums">
              ${currentRequest.amount.toFixed(2)} USD ({currentRequest.units} units)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-0.5">
          <div>
            <span className="text-[#8C8275] block font-medium">Target Merchant:</span>
            <span className="text-[#141413] font-semibold">{currentRequest.targetMerchant}</span>
            <span className="text-[#0070BA] font-mono ml-1">({currentRequest.merchantDomain})</span>
          </div>
          <div>
            <span className="text-[#8C8275] block font-medium">Stated Task Goal:</span>
            <span className="text-[#433D35] italic truncate block">"{currentRequest.taskGoal}"</span>
          </div>
        </div>

        {/* Idempotency Key Status Strip (Kleppmann DDIA) */}
        <div className="pt-2 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-1.5 text-[#5F574D]">
            <span>IDEMPOTENCY:</span>
            <span className="text-[#141413] font-bold">
              {verificationResult.idempotencyKey || currentRequest.idempotencyKey || 'idemp_verified_fresh'}
            </span>
          </div>
          {verificationResult.isIdempotentReplay ? (
            <span className="text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] animate-pulse"></span>
              REPLAY PROTECTED (0 extra budget consumed)
            </span>
          ) : (
            <span className="text-[#5F574D] bg-white px-2 py-0.5 rounded border border-[#E5E0D8]">
              FRESH TRANSACTION INTENT
            </span>
          )}
        </div>
      </div>

      {/* 3. The 4 Security Gates (Technical Waterfall with Shake on Failure) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-[#5F574D] uppercase tracking-wider block font-sans">
            Deterministic Security Gates (4/4 Evaluated)
          </label>
          <span className="text-[10px] font-mono text-[#8C8275]">Pipeline Total: 16ms</span>
        </div>

        <div className="space-y-2">
          {verificationResult.checks.map((check, idx) => {
            const hasFailed = !check.passed;
            return (
              <div
                key={check.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  hasFailed ? 'animate-gate-shake' : ''
                } ${
                  check.passed
                    ? 'bg-white border-[#E5E0D8]'
                    : check.anomalyDetected
                    ? 'bg-[#FFF1F2] border-[#FECDD3]'
                    : 'bg-[#FFFBEB] border-amber-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 shrink-0">
                    {check.passed ? (
                      <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#065F46] flex items-center justify-center font-bold text-xs border border-[#A7F3D0] animate-stamp-pop">
                        ✓
                      </div>
                    ) : check.anomalyDetected ? (
                      <div className="w-5 h-5 rounded-full bg-[#FFF1F2] text-[#9F1239] flex items-center justify-center font-bold text-xs border border-[#FECDD3] animate-stamp-pop">
                        ✕
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-200 animate-stamp-pop">
                        !
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#141413]">
                        Gate 0{idx + 1}: {check.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold tabular-nums ${
                          check.passed
                            ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                            : 'bg-[#FFF1F2] text-[#9F1239] border border-[#FECDD3]'
                        }`}
                      >
                        {check.score}% Confidence
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5F574D] mt-0.5 leading-relaxed">
                      {check.detail}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-mono font-bold ${check.passed ? 'text-[#065F46]' : 'text-[#9F1239]'}`}>
                    {check.passed ? 'PASSED' : 'REJECTED'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Human Supervisory Action Bar (If Quarantined) */}
      {isEscalated && onOpenApprovalModal && (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-stamp-pop">
          <div>
            <p className="text-xs font-bold text-amber-900">Human Supervisor Sign-Off Required (Dual-Custody)</p>
            <p className="text-xs text-amber-800 mt-0.5">
              Domain <span className="font-mono font-semibold">{currentRequest.merchantDomain}</span> is unverified. Funds held in pending escrow.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenApprovalModal}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#003087] hover:bg-[#002244] text-white transition flex items-center gap-1.5 shadow-2xs shrink-0 btn-tactile"
          >
            Review & Counter-Sign <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. Blocked Threat Summary (If Blocked) */}
      {isBlocked && (
        <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] space-y-2 animate-stamp-pop">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9F1239] flex items-center gap-1.5 font-sans">
              <ShieldAlert className="w-4 h-4 text-[#9F1239]" />
              Autonomous Spending Exploit Neutralized Pre-Mint
            </span>
            <span className="text-xs font-mono font-bold text-[#9F1239] bg-white px-2.5 py-0.5 rounded border border-[#FECDD3] tabular-nums">
              Shielded: ${currentRequest.amount.toFixed(2)} USD
            </span>
          </div>
          <p className="text-xs text-[#7F1D1D] leading-relaxed">
            {verificationResult.decisionReason} Ephemeral PayPal token generation was aborted pre-mint (zero exposure to payment rails).
          </p>
        </div>
      )}

      {/* 6. Ephemeral PayPal Order Voucher (If Approved) */}
      {isApproved && paypalReceipt && (
        <div className="rounded-2xl border-2 border-[#003087] overflow-hidden shadow-md bg-white animate-stamp-pop relative">
          
          {/* Card Top Broadsheet Header */}
          <div className="px-5 py-3.5 bg-[#003087] text-white flex items-center justify-between relative overflow-hidden">
            {/* Shimmer line pass */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />

            <div className="flex items-center gap-2 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase font-mono">
                Single-Use Delegated PayPal Voucher
              </span>
            </div>
            
            {/* Live 15-minute countdown clock */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00CFDE] bg-white/10 px-2.5 py-0.5 rounded border border-white/20 relative z-10">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>TTL: {formatCountdown(countdownSeconds)}</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-semibold text-[#8C8275] block uppercase">
                  Ephemeral PayPal Order ID
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-base font-mono font-bold text-[#003087] tracking-tight">
                    {paypalReceipt.orderId}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(paypalReceipt.orderId)}
                    className="text-[11px] font-medium text-[#433D35] hover:text-[#141413] bg-[#FAF9F5] hover:bg-[#F1EFEA] px-2 py-0.5 rounded border border-[#E5E0D8] inline-flex items-center gap-1 transition btn-tactile"
                  >
                    {copiedOrderId ? (
                      <>
                        <Check className="w-3 h-3 text-[#065F46]" />
                        <span className="text-[#065F46] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#8C8275]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono font-semibold text-[#8C8275] block uppercase">
                  Authorized Dollar Cap
                </span>
                <span className="mt-1 block text-base font-mono font-bold text-[#141413] tabular-nums">
                  ${paypalReceipt.amount.toFixed(2)} <span className="text-xs font-normal text-[#8C8275]">USD</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1EFEA] text-xs">
              <div>
                <span className="text-[#8C8275] text-[10px] uppercase font-mono font-semibold block">Merchant Domain Lock</span>
                <span className="font-semibold text-[#141413] mt-0.5 block truncate">{currentRequest.targetMerchant}</span>
                <span className="font-mono text-[11px] text-[#5F574D]">{currentRequest.merchantDomain}</span>
              </div>
              <div>
                <span className="text-[#8C8275] text-[10px] uppercase font-mono font-semibold block">Delegated Wallet Binding</span>
                <span className="font-semibold text-[#141413] mt-0.5 block truncate">{currentRequest.agentName}</span>
                <span className="font-mono text-[11px] text-[#065F46] font-semibold">1-Transaction Auto-Burn</span>
              </div>
              {paypalReceipt.skuHashLock && (
                <div>
                  <span className="text-[#8C8275] text-[10px] uppercase font-mono font-semibold block">SKU Line-Item Lock</span>
                  <span className="font-mono text-[11px] text-[#433D35] font-semibold">{paypalReceipt.skuHashLock}</span>
                </div>
              )}
              {paypalReceipt.slippageTolerance && (
                <div>
                  <span className="text-[#8C8275] text-[10px] uppercase font-mono font-semibold block">Slippage Guarantee</span>
                  <span className="font-mono text-[11px] text-[#065F46] font-semibold">{paypalReceipt.slippageTolerance}</span>
                </div>
              )}
            </div>

            {/* Buyer Protection Seal */}
            <div className="pt-3 border-t border-[#F1EFEA] flex flex-wrap items-center justify-between text-xs text-[#5F574D] gap-2">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#003087]">
                <Lock className="w-3.5 h-3.5 text-[#003087]" />
                PayPal 180-Day Buyer Protection Active
              </span>
              <span className="font-mono text-[11px] text-[#8C8275]">
                Ed25519 Sig: {paypalReceipt.transactionHash.slice(0, 16)}…
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
