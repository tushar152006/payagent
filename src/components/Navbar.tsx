import React from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Zap, 
  Bot, 
  FileText, 
  Sliders, 
  Lock,
  ArrowUpRight,
  Activity,
  Layers
} from 'lucide-react';
import { PayAgentLogo } from './PayAgentLogo';

export type NavTab = 'dashboard' | 'simulator' | 'agents' | 'ledger' | 'policies';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  preventedLoss: number;
  settledAmount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  preventedLoss,
  settledAmount,
}) => {
  const navItems: { id: NavTab; label: string; shortcut: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Executive Command', shortcut: '1', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'simulator', label: 'Firewall Workbench', shortcut: '2', icon: <Zap className="w-4 h-4" />, badge: '4 Gates' },
    { id: 'agents', label: 'Agent Fleet & Caps', shortcut: '3', icon: <Bot className="w-4 h-4" /> },
    { id: 'ledger', label: 'Audit Ledger', shortcut: '4', icon: <FileText className="w-4 h-4" /> },
    { id: 'policies', label: 'Security Policies', shortcut: '5', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-[#0B0F19] text-white border-b border-[#1E293B] sticky top-0 z-50 shadow-md">
      
      {/* Top High-Density Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1128] border border-cyan-500/30 flex items-center justify-center p-1.5 shadow-sm ring-1 ring-white/10 shrink-0">
              <PayAgentLogo theme="dark" className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-base tracking-tight font-sans">
                  PayAgent <span className="text-[#00CFDE] font-light">AI</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#003087]/70 text-[#00CFDE] border border-[#0070BA]/40 tracking-wider">
                  PAYPAL PROTOCOL v2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Autonomous Spend Firewall & Ephemeral Settlement Protocol
              </p>
            </div>
          </div>

          {/* Top Real-Time Telemetry Gauges */}
          <div className="flex items-center space-x-2.5">
            
            {/* Prevented Loss */}
            <div className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 flex items-center space-x-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-[11px] text-rose-300 font-mono uppercase">Shielded:</span>
              <span className="text-xs font-bold text-rose-200 font-mono tabular-nums">
                ${preventedLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Settled via PayPal */}
            <div className="hidden sm:flex px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 items-center space-x-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] text-emerald-300 font-mono uppercase">PayPal Settled:</span>
              <span className="text-xs font-bold text-emerald-200 font-mono tabular-nums">
                ${settledAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* 180-Day Guarantee */}
            <div className="hidden md:flex px-3 py-1.5 rounded-lg bg-[#141B2D] border border-slate-700/60 items-center space-x-1.5 text-[11px] text-slate-300">
              <Lock className="w-3.5 h-3.5 text-[#00CFDE]" />
              <span className="font-mono">180-Day Buyer Protection</span>
            </div>

          </div>

        </div>

        {/* Precision Segmented Navigation Bar */}
        <div className="flex space-x-1 border-t border-[#1E293B] -mb-px overflow-x-auto no-scrollbar py-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all btn-tactile ${
                  isActive
                    ? 'bg-[#1E293B] text-white font-semibold ring-1 ring-slate-600 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span className={isActive ? 'text-[#00CFDE]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    isActive ? 'bg-[#0070BA] text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <span className="hidden lg:inline text-[9px] font-mono text-slate-500 ml-1">
                  [{item.shortcut}]
                </span>
              </button>
            );
          })}
        </div>

      </div>

    </header>
  );
};