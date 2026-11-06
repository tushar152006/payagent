import React, { useState } from 'react';
import { Agent } from '../types';
import { 
  Bot, 
  Plus, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  Trash2, 
  Cpu, 
  ShoppingBag, 
  Globe, 
  KeyRound, 
  ShieldAlert,
  Sliders,
  Lock,
  Layers,
  Copy
} from 'lucide-react';

interface AgentFleetViewProps {
  agents: Agent[];
  onUpdateAgent: (updatedAgent: Agent) => void;
}

export const AgentFleetView: React.FC<AgentFleetViewProps> = ({
  agents,
  onUpdateAgent,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);
  const [newVendorName, setNewVendorName] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  const currentAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorName.trim()) return;
    if (currentAgent.allowedVendors.includes(newVendorName.trim())) return;

    const updated: Agent = {
      ...currentAgent,
      allowedVendors: [...currentAgent.allowedVendors, newVendorName.trim()]
    };
    onUpdateAgent(updated);
    setNewVendorName('');
  };

  const handleRemoveVendor = (vendorToRemove: string) => {
    const updated: Agent = {
      ...currentAgent,
      allowedVendors: currentAgent.allowedVendors.filter(v => v !== vendorToRemove)
    };
    onUpdateAgent(updated);
  };

  const handleUpdateLimit = (newLimit: number) => {
    const updated: Agent = {
      ...currentAgent,
      maxPerTxLimit: newLimit
    };
    onUpdateAgent(updated);
  };

  const getAgentIcon = (id: string) => {
    if (id === 'agent-devops') return <Cpu className="w-5 h-5 text-[#00CFDE]" />;
    if (id === 'agent-procure') return <ShoppingBag className="w-5 h-5 text-purple-400" />;
    return <Globe className="w-5 h-5 text-emerald-400" />;
  };

  const totalMonthlyBudget = agents.reduce((sum, a) => sum + a.monthlyBudget, 0);
  const totalSpent = agents.reduce((sum, a) => sum + a.spentThisMonth, 0);

  const handleCopyKey = (key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 1500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* 1. Fleet Master Summary Bar */}
      <div className="bg-[#0B0F19] text-white rounded-2xl border border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#00CFDE]" />
              <h1 className="text-lg font-bold text-white tracking-tight font-sans">
                Autonomous Fleet Spend Governance
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Define programmatic spending ceilings, per-task caps, and vendor allowlists for each autonomous agent.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              3 Autonomous Entities Armed
            </span>
          </div>
        </div>

        {/* Global Fleet Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-1">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Total Fleet Monthly Allocation</span>
            <div className="text-xl font-bold text-white tabular-nums">${totalMonthlyBudget.toLocaleString('en-US')}.00</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Month-to-Date Consumed</span>
            <div className="text-xl font-bold text-[#00CFDE] tabular-nums">${totalSpent.toFixed(2)}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Settlement Protocol</span>
            <div className="text-xl font-bold text-emerald-400">PayPal Orders v2 JIT</div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Agent Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {agents.map((ag) => {
          const isSelected = ag.id === currentAgent.id;
          const percent = Math.min(100, Math.round((ag.spentThisMonth / ag.monthlyBudget) * 100));

          return (
            <div
              key={ag.id}
              onClick={() => setSelectedAgentId(ag.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all btn-tactile ${
                isSelected
                  ? 'bg-white border-[#003087] ring-2 ring-[#003087]/20 shadow-md'
                  : 'bg-[#FAF9F5] border-[#E8E3D9] hover:border-[#D5CCBD] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl border ${
                    isSelected ? 'bg-[#003087] text-white border-[#003087]' : 'bg-white border-[#E8E3D9]'
                  }`}>
                    {getAgentIcon(ag.id)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#141413]">{ag.name}</h3>
                    <p className="text-xs text-[#8C8275] truncate max-w-[140px]">{ag.role}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#141413] bg-[#FAF9F5] border border-[#E8E3D9] px-2 py-0.5 rounded tabular-nums">
                  ${ag.maxPerTxLimit}/tx
                </span>
              </div>

              <div className="space-y-1 mt-3 pt-2.5 border-t border-[#F1EFEA] text-xs font-mono">
                <div className="flex justify-between text-[#8C8275] text-[11px] tabular-nums">
                  <span>Spend</span>
                  <span className="font-bold text-[#141413]">${ag.spentThisMonth.toFixed(0)} / ${ag.monthlyBudget}</span>
                </div>
                <div className="w-full h-1.5 bg-[#EAE5DC] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      percent > 80 ? 'bg-rose-500' : 'bg-[#003087]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Detailed Governance Console for Active Agent */}
      <div className="bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-6 sm:p-8 space-y-6">
        
        {/* Active Agent Identity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#F1EFEA] pb-5">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-[#003087] text-white shadow-sm">
              {getAgentIcon(currentAgent.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#141413] font-sans">{currentAgent.name}</h2>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  DELEGATION ENFORCED
                </span>
              </div>
              <p className="text-xs text-[#8C8275] mt-0.5">{currentAgent.role}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono uppercase text-[#8C8275] block font-semibold">Active Session Key</span>
            <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
              <span className="text-xs font-mono font-bold text-[#433D35] bg-[#FAF9F5] px-2.5 py-1 rounded border border-[#E8E3D9]">
                key_agent_{currentAgent.id.replace('agent-', '')}_live
              </span>
              <button
                type="button"
                onClick={() => handleCopyKey(`ed25519_pk_${currentAgent.id}_prod_2026`)}
                className="p-1 rounded hover:bg-[#F1EFEA] text-[#8C8275] transition"
                title="Copy public key"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Spend Limits Control */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Per-Transaction Cap */}
          <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#8C8275] tracking-wider font-sans">
                Per-Transaction Dollar Ceiling
              </span>
              <span className="text-lg font-extrabold font-mono text-[#141413] tabular-nums">
                ${currentAgent.maxPerTxLimit}.00 USD
              </span>
            </div>
            <p className="text-xs text-[#5F574D] leading-relaxed">
              Any single checkout intent exceeding this ceiling is immediately blocked or held in human supervisory escrow.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[50, 100, 250, 500, 1000].map(val => (
                <button
                  key={val}
                  onClick={() => handleUpdateLimit(val)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg border transition btn-tactile ${
                    currentAgent.maxPerTxLimit === val
                      ? 'bg-[#003087] text-white border-[#003087] shadow-xs'
                      : 'bg-white text-[#433D35] border-[#E8E3D9] hover:bg-[#FAF9F5]'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Budget */}
          <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#8C8275] tracking-wider font-sans">
                Monthly Allocation Limit
              </span>
              <span className="text-lg font-extrabold font-mono text-[#141413] tabular-nums">
                ${currentAgent.monthlyBudget}.00 USD
              </span>
            </div>
            <p className="text-xs text-[#5F574D] leading-relaxed">
              Cumulative calendar month ceiling. Prevents rogue loops from draining company reserves over weekends.
            </p>
            <div className="text-xs font-mono font-semibold text-[#433D35] bg-white p-2.5 rounded-lg border border-[#E8E3D9] flex justify-between tabular-nums">
              <span>Consumed: ${currentAgent.spentThisMonth.toFixed(2)}</span>
              <span className="text-emerald-700 font-bold">Remaining: ${(currentAgent.monthlyBudget - currentAgent.spentThisMonth).toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Allowed Vendors Manager */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#141413]">Enterprise Merchant Domain Allowlist</h3>
              <p className="text-xs text-[#8C8275]">
                Only verified domains matching this registry can be paid autonomously via PayPal Orders v2
              </p>
            </div>
          </div>

          {/* Vendor Tags */}
          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D9] min-h-[68px] items-center">
            {currentAgent.allowedVendors.map(vendor => (
              <span
                key={vendor}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8E3D9] text-xs font-semibold text-[#141413] shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{vendor}</span>
                <button
                  onClick={() => handleRemoveVendor(vendor)}
                  className="text-[#8C8275] hover:text-rose-600 ml-1 transition"
                  title="Remove from allowlist"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add Vendor Form */}
          <form onSubmit={handleAddVendor} className="flex gap-2">
            <input
              type="text"
              placeholder="Add approved merchant domain (e.g. Stripe, OpenAI, Cloudflare, Datadog)..."
              value={newVendorName}
              onChange={(e) => setNewVendorName(e.target.value)}
              className="flex-1 bg-white border border-[#E8E3D9] rounded-xl px-4 py-2.5 text-xs text-[#141413] focus:outline-none focus:border-[#0070BA] shadow-2xs"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#003087] hover:bg-[#002244] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-2xs btn-tactile"
            >
              <Plus className="w-4 h-4" /> Add Vendor
            </button>
          </form>
        </div>

        {/* Authorized Expense Categories */}
        <div className="space-y-2 pt-2 border-t border-[#F1EFEA]">
          <h4 className="text-xs font-bold uppercase text-[#8C8275] tracking-wider font-sans">
            Authorized Procurement Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentAgent.allowedCategories.map(cat => (
              <span key={cat} className="px-3 py-1 rounded-full text-xs font-medium bg-[#EBF4FA] text-[#003087] border border-[#0070BA]/20 font-mono">
                {cat}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};