import React, { useState } from 'react';
import { Agent, PurchaseRequest } from '../types';
import { PRESET_SCENARIOS, DemoScenario } from '../data/mockScenarios';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Bot, 
  ArrowRight, 
  SlidersHorizontal, 
  AlertTriangle, 
  Terminal, 
  ShoppingBag, 
  Globe, 
  Cpu,
  KeyRound,
  Radio,
  Flame,
  Bug,
  Shield,
  Layers,
  CheckCircle2
} from 'lucide-react';

const getAgentIcon = (id: string) => {
  if (id === 'agent-devops') return <Cpu className="w-4 h-4 text-[#00CFDE]" />;
  if (id === 'agent-procure') return <ShoppingBag className="w-4 h-4 text-purple-400" />;
  return <Globe className="w-4 h-4 text-emerald-400" />;
};

/**
 * 1. Full-Width Swarm Hardware Rack
 */
export const AgentSwarmRack: React.FC<{
  agents: Agent[];
  selectedAgent: Agent;
  onSelectAgent: (agent: Agent) => void;
}> = ({ agents, selectedAgent, onSelectAgent }) => {
  return (
    <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 p-5 sm:p-6 text-white shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#00CFDE] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            Delegated Autonomous Agent Swarm Rack
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Selected Target: <strong className="text-[#00CFDE]">{selectedAgent.name}</strong> ({selectedAgent.role})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {agents.map((ag) => {
          const isSelected = ag.id === selectedAgent.id;
          const percent = Math.min(100, Math.round((ag.spentThisMonth / ag.monthlyBudget) * 100));

          return (
            <button
              key={ag.id}
              type="button"
              onClick={() => onSelectAgent(ag)}
              className={`p-4 rounded-xl text-left transition-all border btn-tactile ${
                isSelected
                  ? 'bg-[#1E293B] border-[#00CFDE] text-white shadow-md ring-1 ring-[#00CFDE]/40'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                  {getAgentIcon(ag.id)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold tabular-nums ${
                    isSelected ? 'bg-[#0070BA] text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Cap: ${ag.maxPerTxLimit}/tx
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-bold truncate leading-tight text-white">{ag.name}</h3>
              <p className="text-xs truncate mt-0.5 text-slate-400">{ag.role}</p>

              {/* Progress */}
              <div className="mt-3 pt-2 border-t border-slate-800 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 tabular-nums">
                  <span>Draw</span>
                  <span className="text-slate-200 font-semibold">${ag.spentThisMonth.toFixed(0)} / ${ag.monthlyBudget}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      percent > 80 ? 'bg-rose-500' : 'bg-[#00CFDE]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface AgentSimulatorProps {
  selectedAgent: Agent;
  onRunScenario: (request: PurchaseRequest) => void;
  isEvaluating: boolean;
}

/**
 * 2. Attack Vectors & Custom Injection Console
 */
export const AgentSimulator: React.FC<AgentSimulatorProps> = ({
  selectedAgent,
  onRunScenario,
  isEvaluating,
}) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customGoal, setCustomGoal] = useState('Procure 10 database compute units on AWS');
  const [customMerchant, setCustomMerchant] = useState('Amazon Web Services');
  const [customDomain, setCustomDomain] = useState('aws.amazon.com');
  const [customAmount, setCustomAmount] = useState('85.00');
  const [customUnits, setCustomUnits] = useState('10');
  const [customPrompt, setCustomPrompt] = useState('Agent instructions: Scale database instances to handle incoming load under $100 cap.');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(customAmount) || 10;
    const unitsNum = parseInt(customUnits, 10) || 1;

    const customReq: PurchaseRequest = {
      id: 'custom-' + Date.now().toString(36),
      agentId: selectedAgent.id,
      agentName: selectedAgent.name,
      taskGoal: customGoal,
      targetMerchant: customMerchant,
      merchantDomain: customDomain,
      category: 'Cloud Infrastructure',
      amount: amountNum,
      currency: 'USD',
      units: unitsNum,
      unitPrice: amountNum / unitsNum,
      itemDescription: customGoal,
      rawPromptExcerpt: customPrompt,
      timestamp: new Date().toISOString()
    };

    onRunScenario(customReq);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E3D9] shadow-2xs p-5 sm:p-6 space-y-4">
      
      <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#003087]" />
            <h2 className="text-sm font-bold text-[#141413] tracking-tight font-sans">
              Adversarial Threat Injection Matrix
            </h2>
          </div>
          <p className="text-xs text-[#8C8275] mt-0.5">
            Trigger real-world attack vectors against the 4-gate deterministic firewall
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="text-xs text-[#0070BA] hover:text-[#003087] font-semibold transition inline-flex items-center gap-1 btn-tactile"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {showCustomForm ? 'Close Custom Entry' : '+ Custom Payload'}
        </button>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PRESET_SCENARIOS.map((sc: DemoScenario) => {
          const isApproved = sc.badge === 'NORMAL';
          const isRogue = sc.badge === 'ROGUE';
          const isInjection = sc.badge === 'INJECTION';
          const isEscalation = sc.badge === 'ESCALATION';

          return (
            <div
              key={sc.id}
              className="p-4 rounded-xl border border-[#E8E3D9] bg-[#FAF9F5] hover:bg-white hover:border-[#D5CCBD] hover:shadow-2xs transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      isApproved
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : isRogue
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : isInjection
                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {isApproved ? 'SAFE WORKFLOW' : isRogue ? 'LOOP / HALLUCINATION' : isInjection ? 'PROMPT INJECTION' : 'UNLISTED VENDOR'}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-[#141413] tabular-nums">
                    ${sc.request.amount.toFixed(2)}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#141413] leading-snug group-hover:text-[#003087] transition">
                  {sc.title}
                </h4>
                <p className="text-[11px] text-[#5F574D] mt-1.5 leading-relaxed line-clamp-2">
                  {sc.subtitle}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-[#EAE5DC] flex items-center justify-between">
                {sc.preventedDamage ? (
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 tabular-nums">
                    {sc.preventedDamage}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> JIT Voucher
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onRunScenario(sc.request)}
                  disabled={isEvaluating}
                  className="h-7 px-3.5 rounded-lg text-xs font-bold bg-[#003087] hover:bg-[#002244] text-white transition active:scale-95 flex items-center gap-1.5 disabled:opacity-40 shadow-2xs btn-tactile"
                >
                  <Play className="w-3 h-3 fill-current text-[#00CFDE]" />
                  Simulate
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Collapsible Custom Injection Console */}
      {showCustomForm && (
        <form onSubmit={handleCustomSubmit} className="p-5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white space-y-4 animate-fade-in mt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00CFDE]" />
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase">
                Custom Intent & Prompt Injection Console
              </h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Raw Firewall Test</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold text-[11px]">Target Merchant</label>
              <input
                type="text"
                value={customMerchant}
                onChange={(e) => setCustomMerchant(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00CFDE]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold text-[11px]">Merchant Domain (Exact FQDN)</label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#00CFDE]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold text-[11px]">Requested Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#00CFDE]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold text-[11px]">Units / Quantity</label>
              <input
                type="number"
                value={customUnits}
                onChange={(e) => setCustomUnits(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#00CFDE]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-400 block mb-1 font-semibold text-[11px]">Raw LLM Prompt / Instruction Excerpt</label>
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#00CFDE]"
            />
          </div>

          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full h-9 rounded-lg bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm btn-tactile"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Inject Intent Through Deterministic Firewall
          </button>
        </form>
      )}

    </div>
  );
};