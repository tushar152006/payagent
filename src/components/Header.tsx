import React from 'react';
import { ShieldCheck, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';
import { SystemStats } from '../types';
import { PayAgentLogo } from './PayAgentLogo';

interface HeaderProps {
  stats: SystemStats;
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  return (
    <header className="border-b border-rule-medium bg-[#FFFFFF] sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand Seal & Monogram */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-lg border border-[#1E293B] bg-[#090D16] flex items-center justify-center p-1.5 shadow-sm ring-1 ring-white/10 shrink-0">
              <PayAgentLogo theme="dark" className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-ink-primary tracking-tight">PayAgent</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-treasury-blue-light text-treasury-blue border border-treasury-blue/20 font-semibold tracking-wider">
                  Treasury Protocol
                </span>
                <span className="text-xs text-ink-faint">•</span>
                <span className="text-xs text-ink-secondary font-medium">Anchored to PayPal</span>
              </div>
              <p className="text-[11px] text-ink-muted">
                Pre-Execution Spend Governance & Ephemeral Delegated Settlement
              </p>
            </div>
          </div>

          {/* Stamped Treasury Metric Chips */}
          <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            
            {/* Prevented Loss KPI */}
            <div className="px-3 py-1.5 rounded border border-treasury-crimson/30 bg-treasury-crimson-light flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-treasury-crimson"></span>
              <span className="text-[11px] text-ink-secondary font-medium uppercase font-mono tracking-wider">Prevented Loss:</span>
              <span className="font-mono font-bold text-treasury-crimson tabular-nums text-xs">
                ${stats.totalPreventedLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Total Settled via PayPal */}
            <div className="px-3 py-1.5 rounded border border-treasury-green/30 bg-treasury-green-light flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-treasury-green"></span>
              <span className="text-[11px] text-ink-secondary font-medium uppercase font-mono tracking-wider">PayPal Settled:</span>
              <span className="font-mono font-bold text-treasury-green tabular-nums text-xs">
                ${stats.totalProcessedPayPal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* 180-Day Guarantee */}
            <div className="px-3 py-1.5 rounded border border-rule-medium bg-[#FAF9F5] flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-treasury-blue" />
              <span className="text-[11px] font-mono text-ink-secondary font-medium">180-Day Escrow Shield</span>
            </div>

            {/* Active Delegations */}
            <div className="px-3 py-1.5 rounded border border-rule-medium bg-[#FAF9F5] hidden lg:flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-treasury-green" />
              <span className="text-[11px] font-mono text-ink-muted">3 Autonomous Entities</span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
