import React, { useState } from 'react';
import { TransactionRecord, VerificationStatus } from '../types';
import { ShieldCheck, ShieldAlert, AlertCircle, FileText, ExternalLink, Search } from 'lucide-react';

interface AuditLedgerProps {
  transactions: TransactionRecord[];
}

export const AuditLedger: React.FC<AuditLedgerProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'ALL' | VerificationStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'ALL' || t.status === filter;
    const matchesSearch = 
      t.request.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.request.targetMerchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.request.taskGoal.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="docket-card p-6 space-y-4 shadow-paper">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-rule-light pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">Section 04 // Audit Registry</span>
          <h3 className="font-serif text-xl font-bold text-ink-primary tracking-tight mt-0.5">Cryptographic Treasury Ledger</h3>
        </div>

        {/* Archival Index Tabs */}
        <div className="flex items-center space-x-1 bg-canvas-subtle p-1 rounded border border-rule-medium text-xs font-mono">
          {(['ALL', 'APPROVED', 'BLOCKED', 'REQUIRES_HUMAN_APPROVAL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded text-[11px] font-semibold transition ${
                filter === tab
                  ? 'bg-white text-ink-primary shadow-sm border border-rule-medium'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              {tab === 'ALL' ? 'All Logs' : tab === 'APPROVED' ? 'Settled' : tab === 'BLOCKED' ? 'Blocked' : 'Escalated'}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3.5 top-2.5" />
        <input
          type="text"
          placeholder="Filter ledger by agent, merchant, or task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#FFFFFF] border border-rule-medium rounded pl-9 pr-4 py-1.5 text-xs text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-primary transition font-mono"
        />
      </div>

      {/* Accounting Ledger Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-rule-medium text-ink-muted text-[10px] uppercase tracking-wider">
              <th className="pb-2 font-semibold">Timestamp</th>
              <th className="pb-2 font-semibold">Delegation Entity</th>
              <th className="pb-2 font-semibold">Merchant / SKU Purpose</th>
              <th className="pb-2 font-semibold text-right">Amount</th>
              <th className="pb-2 font-semibold text-center">Verdict</th>
              <th className="pb-2 font-semibold text-right">PayPal Order Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule-light">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-ink-muted text-xs">
                  No records matching search query.
                </td>
              </tr>
            ) : (
              filtered.map((record) => {
                const isApproved = record.status === 'APPROVED';
                const isBlocked = record.status === 'BLOCKED';

                return (
                  <tr key={record.id} className="hover:bg-canvas-subtle/50 transition-colors">
                    <td className="py-3 text-[11px] text-ink-muted whitespace-nowrap">
                      {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 font-semibold text-ink-primary font-sans text-xs">
                      {record.request.agentName}
                    </td>
                    <td className="py-3 font-sans">
                      <div className="font-bold text-ink-primary text-xs">{record.request.targetMerchant}</div>
                      <div className="text-[11px] text-ink-secondary truncate max-w-xs">{record.request.itemDescription}</div>
                    </td>
                    <td className="py-3 text-right font-bold text-ink-primary tabular-nums">
                      ${record.request.amount.toFixed(2)}
                    </td>
                    <td className="py-3 text-center whitespace-nowrap">
                      <span
                        className={`stamp-badge ${
                          isApproved
                            ? 'bg-treasury-green-light text-treasury-green border border-treasury-green/30'
                            : isBlocked
                            ? 'bg-treasury-crimson-light text-treasury-crimson border border-treasury-crimson/30'
                            : 'bg-treasury-amber-light text-treasury-amber border border-treasury-amber/30'
                        }`}
                      >
                        {isApproved ? (
                          <ShieldCheck className="w-3 h-3 stroke-[2]" />
                        ) : isBlocked ? (
                          <ShieldAlert className="w-3 h-3 stroke-[2]" />
                        ) : (
                          <AlertCircle className="w-3 h-3 stroke-[2]" />
                        )}
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-[11px]">
                      {record.paypalReceipt ? (
                        <div className="flex items-center justify-end space-x-1 text-treasury-blue font-semibold">
                          <span className="truncate max-w-[130px]">{record.paypalReceipt.orderId}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </div>
                      ) : record.preventedLossAmount > 0 ? (
                        <span className="text-treasury-crimson font-bold bg-treasury-crimson-light px-2 py-0.5 rounded border border-treasury-crimson/20">
                          Shielded ${record.preventedLossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-treasury-amber italic font-semibold">In Escrow</span>
                      )}
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
