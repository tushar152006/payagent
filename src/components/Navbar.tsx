import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Bot, 
  FileText, 
  Sliders, 
  Lock,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PayAgentLogo } from './PayAgentLogo';
import { audioTactile } from '../utils/audioTactile';

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
  const [soundOn, setSoundOn] = useState(true);

  const handleToggleSound = () => {
    const next = audioTactile.toggleSound();
    setSoundOn(next);
    if (next) audioTactile.playClick();
  };
  const navItems: { id: NavTab; label: string; shortcut: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Executive Command', shortcut: '1', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'simulator', label: 'Firewall Workbench', shortcut: '2', icon: <Zap className="w-4 h-4" />, badge: '4 Gates' },
    { id: 'agents', label: 'Agent Fleet & Caps', shortcut: '3', icon: <Bot className="w-4 h-4" /> },
    { id: 'ledger', label: 'Audit Ledger', shortcut: '4', icon: <FileText className="w-4 h-4" /> },
    { id: 'policies', label: 'Security Policies', shortcut: '5', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white border-b border-[#E5E0D8] sticky top-0 z-50 shadow-[0_1px_3px_rgba(20,20,19,0.03)]">
      
      {/* Top Broadsheet Brand & Telemetry Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#003087] border border-[#002244] flex items-center justify-center p-1.5 shadow-sm shrink-0">
              <PayAgentLogo theme="dark" className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-[#141413] tracking-tight">
                  PayAgent <span className="font-sans text-[#0070BA] font-bold text-sm tracking-normal">AI</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EBF4FA] text-[#003087] border border-[#003087]/20 tracking-wider">
                  TREASURY PROTOCOL v2
                </span>
              </div>
              <p className="text-[11px] text-[#5F574D] font-sans hidden sm:block">
                Pre-Execution Spend Firewall & Ephemeral PayPal Settlement
              </p>
            </div>
          </div>

          {/* Top Real-Time Sovereign Treasury Telemetry Gauges */}
          <div className="flex items-center space-x-2.5">
            
            {/* Prevented Loss KPI */}
            <div className="px-3 py-1.5 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] flex items-center space-x-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#9F1239] animate-pulse-dot"></span>
              <span className="text-[11px] text-[#9F1239] font-mono uppercase font-semibold">Shielded:</span>
              <span className="text-xs font-bold text-[#9F1239] font-mono tabular-nums">
                ${preventedLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Settled via PayPal */}
            <div className="hidden sm:flex px-3 py-1.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] items-center space-x-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#065F46]"></span>
              <span className="text-[11px] text-[#065F46] font-mono uppercase font-semibold">Settled:</span>
              <span className="text-xs font-bold text-[#065F46] font-mono tabular-nums">
                ${settledAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* 180-Day Guarantee */}
            <div className="hidden md:flex px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#E5E0D8] items-center space-x-1.5 text-[11px] text-[#433D35]">
              <Lock className="w-3.5 h-3.5 text-[#003087]" />
              <span className="font-mono font-medium">180-Day Buyer Shield</span>
            </div>

            {/* Tactile Audio Feedback Switch */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Tactile Audio Cues Active (Click to Mute)' : 'Tactile Audio Muted (Click to Unmute)'}
              className={`p-1.5 rounded-lg border transition btn-tactile ${
                soundOn
                  ? 'bg-[#EBF4FA] border-[#0070BA]/30 text-[#003087]'
                  : 'bg-[#FAF9F5] border-[#E5E0D8] text-[#8C8275]'
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

          </div>

        </div>

        {/* Precision Segmented Navigation Bar */}
        <div className="flex space-x-1.5 border-t border-[#F1EFEA] -mb-px overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 py-1.5 px-3.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all btn-tactile ${
                  isActive
                    ? 'bg-[#003087] text-white font-semibold shadow-xs'
                    : 'text-[#5F574D] hover:text-[#141413] hover:bg-[#F5F2EB]/80'
                }`}
              >
                <span className={isActive ? 'text-[#00CFDE]' : 'text-[#8C8275]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <span className={`hidden lg:inline text-[9px] font-mono ml-0.5 ${isActive ? 'text-white/60' : 'text-[#8C8275]'}`}>
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
