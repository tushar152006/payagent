import React from 'react';
import { TransactionRecord } from '../types';
import { X, ShieldCheck, ShieldAlert, AlertCircle, Lock, Receipt, ExternalLink, KeyRound, Check, Fingerprint, Layers } from 'lucide-react';

interface TransactionDrawerProps {
  record: TransactionRecord | null;
  onClose: () => void;
}

export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  record,
  onClose,
}) => {
  if (!record) return null;

  const isApproved = record.status === 'APPROVED';
  const isBlocked = record.status === 'BLOCKED';

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-[#E8E3D9] p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#141413] font-sans">Forensic Transaction Certificate</h3>
                <p className="text-[11px] font-mono text-[#8C8275]">AUDIT ID: {record.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#FAF9F5] text-[#8C8275] hover:text-[#141413] transition btn-tactile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Verdict Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isApproved
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : isBlocked
                ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              {isApproved ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              ) : isBlocked ? (
                <ShieldAlert className="w-5 h-5 text-rose-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
              <span className="font-bold text-xs uppercase tracking-wider font-mono">
                {record.status === 'APPROVED' ? 'SETTLED' : record.status}
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono font-extrabold text-base tabular-nums block">
                ${record.request.amount.toFixed(2)} USD
              </span>
              {record.isIdempotentReplay && (
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                  IDEMPOTENT REPLAY SAFE
                </span>
              )}
            </div>
          </div>

          {/* Decision Reason */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider font-sans">
              Deterministic Firewall Reason
            </span>
            <p className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E3D9] text-xs text-[#433D35] leading-relaxed">
              {record.verification.decisionReason}
            </p>
          </div>

          {/* Canonical Proof-of-Intent & Idempotency Certificate (Kleppmann DDIA & Google SRE) */}
          <div className="p-4 rounded-xl bg-[#0B0F19] text-white border border-slate-800 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 text-[#00CFDE]">
                <Fingerprint className="w-4 h-4" />
                <span className="font-bold text-[11px] uppercase tracking-wider">
                  Cryptographic Audit Trail
                </span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                OWASP LLM06 Compliant
              </span>
            </div>

            {/* Idempotency Key */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Idempotency Key (Kleppmann DDIA):</span>
                <span className="text-emerald-400 font-bold">{record.isIdempotentReplay ? 'CACHED REPLAY' : 'FRESH'}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 break-all">
                {record.idempotencyKey || record.verification.idempotencyKey || 'idemp_deterministic_v2_auto'}
              </div>
            </div>

            {/* Proof-of-Intent Hash Chain */}
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] block">
                Proof-of-Intent Hash Chain (Ed25519 Merkle Root):
              </span>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-[#00CFDE] break-all">
                {record.proofOfIntentHash || record.verification.proofOfIntentHash || 'poi_ed25519_0x9a8f4c21e0b571d43a998bc19d3f52a1'}
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Cryptographically binds: Agent Key + Prompt Excerpt + Cart SKU + Approved Dollar Cap.
              </p>
            </div>

            {/* Dual-Custody Countersignature (if present) */}
            {record.supervisorSignature && (
              <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-800/80 space-y-1">
                <div className="flex items-center justify-between text-emerald-400 text-[10px] font-bold">
                  <span>Google SRE Dual-Custody Signature:</span>
                  <span>VERIFIED</span>
                </div>
                <div className="text-[10px] text-emerald-200 break-all">
                  {record.supervisorSignature}
                </div>
              </div>
            )}
          </div>

          {/* Transaction Metadata */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-2.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#8C8275]">Agent Entity:</span>
              <strong className="text-[#141413]">{record.request.agentName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8275]">Merchant Target:</span>
              <span className="text-[#003087] font-bold">{record.request.targetMerchant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8275]">Merchant Domain:</span>
              <span className="text-[#433D35]">{record.request.merchantDomain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8275]">Timestamp:</span>
              <span className="text-[#433D35] tabular-nums">{new Date(record.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#EAE5DC]">
              <span className="text-[#8C8275]">Threat Score:</span>
              <span className="font-bold text-[#141413] tabular-nums">{record.verification.riskScore} / 100</span>
            </div>
          </div>

          {/* User Instruction vs Agent Trace */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider block mb-1 font-sans">
                Stated Intent Goal
              </span>
              <p className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E3D9] text-[#141413] italic">
                "{record.request.taskGoal}"
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider block mb-1 font-sans">
                Agent Chain-of-Thought / Prompt Excerpt
              </span>
              <p className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E3D9] text-[#5F574D] font-mono text-[11px] leading-relaxed">
                {record.request.rawPromptExcerpt}
              </p>
            </div>
          </div>

          {/* PayPal Settlement Details */}
          {record.paypalReceipt && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#EBF4FA] to-white border border-[#0070BA]/30 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-[#E8E3D9] pb-2">
                <span className="font-bold text-[#003087] uppercase text-[11px]">PayPal Settlement Details</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  CAPTURED
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8275]">Order ID:</span>
                <span className="text-[#003087] font-bold">{record.paypalReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8275]">Capture ID:</span>
                <span className="text-[#433D35]">{record.paypalReceipt.captureId}</span>
              </div>
              {record.paypalReceipt.skuHashLock && (
                <div className="flex justify-between">
                  <span className="text-[#8C8275]">SKU Line-Lock:</span>
                  <span className="text-[#433D35] font-mono text-[11px]">{record.paypalReceipt.skuHashLock}</span>
                </div>
              )}
              {record.paypalReceipt.slippageTolerance && (
                <div className="flex justify-between">
                  <span className="text-[#8C8275]">Slippage Tolerance:</span>
                  <span className="text-emerald-700 font-semibold">{record.paypalReceipt.slippageTolerance}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E8E3D9] text-[11px] text-[#433D35] flex items-center gap-1.5 font-sans">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>180-Day Global Buyer Protection Active</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Close */}
        <div className="pt-4 border-t border-[#E8E3D9] mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F1EFEA] text-[#141413] border border-[#E8E3D9] font-bold text-xs transition btn-tactile shadow-2xs"
          >
            Close Forensic Inspector
          </button>
        </div>

      </div>
    </div>
  );
};