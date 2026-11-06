import React from 'react';
import { PurchaseRequest } from '../types';
import { AlertCircle, CheckCircle, XCircle, ShieldCheck, Lock, X } from 'lucide-react';

interface HumanApprovalModalProps {
  request: PurchaseRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (request: PurchaseRequest) => void;
  onReject: (request: PurchaseRequest) => void;
}

export const HumanApprovalModal: React.FC<HumanApprovalModalProps> = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-lg p-6 rounded-2xl bg-white border border-[#E8E3D9] shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700">
              <AlertCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block font-semibold">
                Supervisory Action Required
              </span>
              <h3 className="font-serif text-lg font-bold text-[#141413] tracking-tight">
                Escrow Purchase Authorization
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8C8275] hover:text-[#141413] hover:bg-[#FAF9F5] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Summary */}
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="text-[#8C8275]">REQUESTING AGENT:</span>
              <strong className="text-[#141413] font-bold">{request.agentName}</strong>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-[#8C8275]">TARGET MERCHANT:</span>
              <span className="text-[#003087] font-bold">{request.targetMerchant} ({request.merchantDomain})</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#EAE5DC] font-mono">
              <span className="text-[#8C8275]">TOTAL AMOUNT:</span>
              <span className="text-base font-bold text-[#141413] tabular-nums">${request.amount.toFixed(2)} USD</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8C8275] block mb-1 font-semibold">
              Assigned Task Goal
            </label>
            <p className="p-2.5 rounded-lg bg-[#FAF9F5] text-[#141413] border border-[#E8E3D9] italic font-serif text-xs">
              "{request.taskGoal}"
            </p>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8C8275] block mb-1 font-semibold">
              Agent Reasoning Trace
            </label>
            <p className="p-2.5 rounded-lg bg-[#FAF9F5] text-[#5F574D] border border-[#E8E3D9] font-mono text-[11px] leading-relaxed">
              {request.rawPromptExcerpt}
            </p>
          </div>
        </div>

        {/* PayPal Safety Assurance Notice */}
        <div className="p-3 rounded-lg bg-[#EBF4FA] border border-[#0070BA]/20 flex items-center space-x-2 text-[11px] text-[#003087]">
          <ShieldCheck className="w-4 h-4 stroke-[2] shrink-0 text-[#0070BA]" />
          <span>If authorized, PayAgent mints a single-use PayPal Order token backed by 180-Day Buyer Protection.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#F1EFEA]">
          <button
            onClick={() => onReject(request)}
            className="px-4 py-2 rounded-lg border border-[#E8E3D9] bg-white hover:bg-rose-50 text-rose-700 font-mono text-xs font-semibold flex items-center gap-1.5 transition btn-tactile shadow-2xs"
          >
            <XCircle className="w-4 h-4" />
            Reject Transaction
          </button>
          <button
            onClick={() => onApprove(request)}
            className="px-5 py-2 rounded-lg bg-[#003087] hover:bg-[#002244] text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-2xs transition btn-tactile"
          >
            <CheckCircle className="w-4 h-4" />
            Countersign & Mint PayPal Order
          </button>
        </div>

      </div>
    </div>
  );
};