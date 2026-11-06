import React, { useState } from 'react';
import { TransactionRecord, VerificationStatus } from '../types';
import { ShieldCheck, ShieldAlert, AlertCircle, FileText, ExternalLink, Search, Download, Eye, ArrowUpRight } from 'lucide-react';

interface LedgerViewProps {
  transactions: TransactionRecord[];
  onSelectTransaction: (record: TransactionRecord) => void;
}

export const LedgerView: React.FC<LedgerViewProps> = ({
  transactions,
  onSelectTransaction,
}) => {
  const [filter, setFilter] = useState<'ALL' | VerificationStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'ALL' || t.status === filter;
    const matchesSearch = 
      t.request.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.request.targetMerchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.request.taskGoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.paypalReceipt?.orderId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.idempotencyKey || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.proofOfIntentHash || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Agent', 'Merchant', 'Domain', 'Amount', 'Currency', 'Status', 'RiskScore', 'PayPalOrderId', 'IdempotencyKey', 'ProofOfIntentHash'];
    const rows = filtered.map(t => [
      t.timestamp,
      `"${t.request.agentName}"`,
      `"${t.request.targetMerchant}"`,
      t.request.merchantDomain,
      t.request.amount.toFixed(2),
      t.request.currency,
      t.status,
      t.verification.riskScore,
      t.paypalReceipt?.orderId || 'N/A',
      t.idempotencyKey || t.verification.idempotencyKey || 'N/A',
      t.proofOfIntentHash || t.verification.proofOfIntentHash || 'N/A'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `payagent-audit-ledger-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8E3D9] shadow-2xs p-5 sm:p-6 space-y-5 animate-fade-in">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#F1EFEA] pb-4">
        <div>
          <h1 className="text-xl font-serif font-bold text-[#141413] tracking-tight">Audit Ledger & Settlement Registry</h1>
          <p className="text-xs text-[#8C8275]">
            Cryptographically signed record of all autonomous spend requests, deterministic evaluations, and PayPal settlement receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg border border-[#E8E3D9] bg-[#FAF9F5] hover:bg-[#F1EFEA] text-xs font-semibold text-[#433D35] flex items-center gap-1.5 transition btn-tactile shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#8C8275]" />
            Export CSV
          </button>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#E8E3D9] text-xs font-mono">
            {(['ALL', 'APPROVED', 'BLOCKED', 'REQUIRES_HUMAN_APPROVAL'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition btn-tactile ${
                  filter === tab
                    ? 'bg-white text-[#141413] shadow-2xs border border-[#E8E3D9]'
                    : 'text-[#8C8275] hover:text-[#141413]'
                }`}
              >
                {tab === 'ALL' ? 'All' : tab === 'APPROVED' ? 'Settled' : tab === 'BLOCKED' ? 'Blocked' : 'Escrow'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search ledger by agent name, merchant domain, SKU, or PayPal Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#FAF9F5] border border-[#E8E3D9] rounded-xl pl-10 pr-4 py-2 text-xs text-[#141413] placeholder-[#8C8275] focus:outline-none focus:border-[#0070BA] shadow-2xs"
        />
      </div>

      {/* Full Accounting Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E8E3D9] text-[#8C8275] text-[10px] uppercase font-mono tracking-wider">
              <th className="pb-3 font-semibold">Timestamp</th>
              <th className="pb-3 font-semibold">Autonomous Entity</th>
              <th className="pb-3 font-semibold">Merchant / SKU Purpose</th>
              <th className="pb-3 font-semibold text-right">Amount</th>
              <th className="pb-3 font-semibold text-center">Verdict</th>
              <th className="pb-3 font-semibold text-right">PayPal Reference</th>
              <th className="pb-3 font-semibold text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1EFEA]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#8C8275] text-xs">
                  No transaction records matching filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((record) => {
                const isApproved = record.status === 'APPROVED';
                const isBlocked = record.status === 'BLOCKED';

                return (
                  <tr 
                    key={record.id} 
                    onClick={() => onSelectTransaction(record)}
                    className="hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                  >
                    <td className="py-3 font-mono text-[#8C8275] text-[11px] whitespace-nowrap tabular-nums">
                      {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 font-bold text-[#141413]">
                      {record.request.agentName}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-[#141413]">{record.request.targetMerchant}</div>
                      <div className="text-[11px] text-[#8C8275] truncate max-w-xs">{record.request.itemDescription}</div>
                    </td>
                    <td className="py-3 text-right font-mono font-extrabold text-[#141413] tabular-nums">
                      ${record.request.amount.toFixed(2)}
                    </td>
                    <td className="py-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border font-mono ${
                          isApproved
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isBlocked
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {isApproved ? (
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        ) : isBlocked ? (
                          <ShieldAlert className="w-3 h-3 text-rose-600" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                        )}
                        {record.status === 'APPROVED' ? 'SETTLED' : record.status}
                      </span>
                      {record.isIdempotentReplay && (
                        <span className="block text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.2 mt-1 mx-auto w-max">
                          IDEMP REPLAY
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right font-mono text-[11px] tabular-nums">
                      {record.paypalReceipt ? (
                        <span className="text-[#003087] font-bold truncate block">
                          {record.paypalReceipt.orderId}
                        </span>
                      ) : record.preventedLossAmount > 0 ? (
                        <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Shielded ${record.preventedLossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-amber-700 italic font-semibold">Held in Escrow</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTransaction(record);
                        }}
                        className="p-1 rounded hover:bg-[#F1EFEA] text-[#8C8275] hover:text-[#141413] transition btn-tactile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};