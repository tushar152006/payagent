import React, { useState } from 'react';
import { VerificationResult, PurchaseRequest, PayPalOrderReceipt } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Lock,
  Layers,
  ArrowRight,
  Receipt,
  Copy,
  Check,
  Clock,
  Sparkles,
  KeyRound,
  FileCheck2,
  Terminal,
  Activity,
  AlertOctagon
} from 'lucide-react';

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

  if (!currentRequest) {
    return (
      <div className="bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-14 h-14 rounded-2xl bg-[#0B0F19] text-[#00CFDE] flex items-center justify-center mb-4 shadow-sm border border-slate-800">
          <Layers className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-[#141413] mb-1.5 font-sans">
          Awaiting Autonomous Spend Intent
        </h3>
        <p className="text-xs text-[#8C8275] max-w-sm leading-relaxed">
          Select an agent benchmark attack on the left or inject custom instructions to observe the 4-gate deterministic firewall evaluate every rule in real-time.
        </p>
      </div>
    );
  }

  if (isEvaluating) {
    return (
      <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 text-white shadow-md p-12 text-center flex flex-col items-center justify-center min-h-[500px] space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-[#003087] border border-[#0070BA] flex items-center justify-center text-[#00CFDE] animate-spin shadow-md">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase">
            Executing Deterministic Security Waterfall…
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Evaluating semantic alignment • Verifying domain lock • Enforcing velocity cap (&lt;16ms)
          </p>
        </div>
      </div>
    );
  }

  if (!verificationResult) return null;

  const isApproved = verificationResult.overallStatus === 'APPROVED';
  const isBlocked = verificationResult.overallStatus === 'BLOCKED';
  const isEscalated = verificationResult.overallStatus === 'REQUIRES_HUMAN_APPROVAL';

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 1500);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-5 sm:p-6 space-y-5 animate-fade-in">
      
      {/* 1. Pipeline Execution Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#F1EFEA] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#141413] tracking-tight font-sans">
              Pre-Authorization Security Pipeline
            </h2>
            <span className="text-[10px] font-mono text-[#8C8275] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#E8E3D9]">
              {currentRequest.id}
            </span>
          </div>
          <p className="text-xs text-[#8C8275] mt-0.5">
            Sequential zero-trust evaluation completed in 16ms
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Risk Score Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF9F5] border border-[#E8E3D9]">
            <span className="text-[10px] font-mono uppercase text-[#8C8275] font-bold">Threat Index</span>
            <span
              className={`text-xs font-bold font-mono tabular-nums ${
                verificationResult.riskScore > 60
                  ? 'text-rose-600'
                  : verificationResult.riskScore > 30
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {verificationResult.riskScore}/100
            </span>
          </div>

          {/* Verdict Badge */}
          <div
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border font-mono ${
              isApproved
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : isBlocked
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {isApproved ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ) : isBlocked ? (
              <ShieldAlert className="w-4 h-4 text-rose-600" />
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
      <div className="p-4 rounded-xl bg-[#0B0F19] text-white border border-slate-800 space-y-2.5 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">AGENT:</span>
            <span className="font-bold text-[#00CFDE]">{currentRequest.agentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">REQUESTED:</span>
            <span className="font-bold text-white tabular-nums">
              ${currentRequest.amount.toFixed(2)} USD ({currentRequest.units} units)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-0.5">
          <div>
            <span className="text-slate-400 block font-medium">Target Merchant:</span>
            <span className="text-slate-200 font-semibold">{currentRequest.targetMerchant}</span>
            <span className="text-[#00CFDE] font-mono ml-1">({currentRequest.merchantDomain})</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Stated Task Goal:</span>
            <span className="text-slate-300 italic truncate block">"{currentRequest.taskGoal}"</span>
          </div>
        </div>

        {/* Idempotency Key Status Strip (Kleppmann DDIA) */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>IDEMPOTENCY:</span>
            <span className="text-slate-200 font-bold">
              {verificationResult.idempotencyKey || currentRequest.idempotencyKey || 'idemp_verified_fresh'}
            </span>
          </div>
          {verificationResult.isIdempotentReplay ? (
            <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              REPLAY PROTECTED (0 extra budget consumed)
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              FRESH TRANSACTION INTENT
            </span>
          )}
        </div>
      </div>

      {/* 3. The 4 Security Gates (Technical Waterfall) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider block font-sans">
            Deterministic Security Gates (4/4 Evaluated)
          </label>
          <span className="text-[10px] font-mono text-[#8C8275]">Pipeline Total: 16ms</span>
        </div>

        <div className="space-y-2">
          {verificationResult.checks.map((check, idx) => (
            <div
              key={check.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                check.passed
                  ? 'bg-white border-[#E8E3D9]'
                  : check.anomalyDetected
                  ? 'bg-[#FFF5F5] border-rose-200'
                  : 'bg-[#FFFBEB] border-amber-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 shrink-0">
                  {check.passed ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                      ✓
                    </div>
                  ) : check.anomalyDetected ? (
                    <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs border border-rose-200">
                      ✕
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-200">
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
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/80'
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
                <span className={`text-[10px] font-mono font-bold ${check.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {check.passed ? 'PASSED' : 'REJECTED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Human Supervisory Action Bar (If Quarantined) */}
      {isEscalated && onOpenApprovalModal && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-amber-900">Human Supervisor Sign-Off Required</p>
            <p className="text-xs text-amber-800 mt-0.5">
              Domain <span className="font-mono font-semibold">{currentRequest.merchantDomain}</span> is unverified. Funds held in pending escrow.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenApprovalModal}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition flex items-center gap-1.5 shadow-2xs shrink-0 btn-tactile"
          >
            Review & Counter-Sign <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. Blocked Threat Summary (If Blocked) */}
      {isBlocked && (
        <div className="p-4 rounded-xl bg-[#FFF5F5] border border-rose-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5 font-sans">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Autonomous Spending Exploit Neutralized
            </span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-200 tabular-nums">
              Loss Prevented: ${currentRequest.amount.toFixed(2)} USD
            </span>
          </div>
          <p className="text-xs text-rose-800 leading-relaxed">
            {verificationResult.decisionReason} Ephemeral PayPal token generation was aborted pre-mint—zero exposure to payment rails.
          </p>
        </div>
      )}

      {/* 6. Ephemeral PayPal Order Voucher (If Approved) */}
      {isApproved && paypalReceipt && (
        <div className="rounded-2xl border-2 border-[#003087] overflow-hidden shadow-md bg-white">
          {/* Card Top Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#003087] via-[#004B87] to-[#002244] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase font-mono">
                Single-Use Delegated PayPal Voucher
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-amber-200 bg-white/10 px-2 py-0.5 rounded border border-white/20">
              <Clock className="w-3 h-3" />
              <span>Expires in 14m 59s</span>
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
                    className="text-[11px] font-medium text-[#433D35] hover:text-[#141413] bg-[#FAF9F5] hover:bg-[#F1EFEA] px-2 py-0.5 rounded border border-[#E8E3D9] inline-flex items-center gap-1 transition btn-tactile"
                  >
                    {copiedOrderId ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
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
                <span className="font-mono text-[11px] text-emerald-700 font-semibold">1-Transaction Auto-Burn</span>
              </div>
              {paypalReceipt.skuHashLock && (
                <div>
                  <span className="text-[#8C8275] text-[10px] uppercase font-mono font-semibold block">SKU Line-Item Lock</span>
                  <span className="font-mono text-[11px] text-[#433D35] font-semibold">{paypalReceipt.skuHashLock}</span>
                </div>
              )}
              {paypalReceipt.slippageTolerance && (
                <div>
                  <span className="text-[#8C8275] text-[10px] uppercase font-mono font-semibold block">Slippage Protection</span>
                  <span className="font-mono text-[11px] text-emerald-700 font-semibold">{paypalReceipt.slippageTolerance}</span>
                </div>
              )}
            </div>

            {/* Buyer Protection Seal */}
            <div className="pt-3 border-t border-[#F1EFEA] flex flex-wrap items-center justify-between text-xs text-[#5F574D] gap-2">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-[#0070BA]" />
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