import React, { useState } from 'react';
import { Agent, PurchaseRequest } from '../types';
import { PRESET_SCENARIOS, DemoScenario } from '../data/mockScenarios';
import { 
  Play, 
  Plus, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Bot, 
  ArrowRight, 
  AlertTriangle, 
  Terminal, 
  ShoppingBag, 
  Globe, 
  Cpu, 
  Radio, 
  CheckCircle2, 
  Lock,
  Layers
} from 'lucide-react';
import { audioTactile } from '../utils/audioTactile';

const getAgentIcon = (id: string, isWhite = false) => {
  const iconColor = isWhite 
    ? 'text-white' 
    : id === 'agent-devops' 
    ? 'text-[#003087]' 
    : id === 'agent-procure' 
    ? 'text-[#0070BA]' 
    : 'text-[#065F46]';

  if (id === 'agent-devops') return <Cpu className={`w-4 h-4 ${iconColor}`} />;
  if (id === 'agent-procure') return <ShoppingBag className={`w-4 h-4 ${iconColor}`} />;
  return <Globe className={`w-4 h-4 ${iconColor}`} />;
};

const getNodeCode = (id: string) => {
  if (id === 'agent-devops') return 'NODE-01 // DEVOPS-CORE';
  if (id === 'agent-procure') return 'NODE-02 // PROCURE-SEC';
  return 'NODE-03 // SCOUT-NET';
};

/**
 * 1. Sovereign Treasury Swarm Hardware Rack
 */
export const AgentSwarmRack: React.FC<{
  agents: Agent[];
  selectedAgent: Agent;
  onSelectAgent: (agent: Agent) => void;
}> = ({ agents, selectedAgent, onSelectAgent }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 sm:p-6 text-[#141413] shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#F1EFEA] pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#003087] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-[#141413] uppercase">
            Delegated Autonomous Swarm Hardware Rack
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#5F574D]">
          Active Delegation: <strong className="text-[#003087]">{selectedAgent.name}</strong> ({getNodeCode(selectedAgent.id)})
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
              onClick={() => {
                audioTactile.playClick();
                onSelectAgent(ag);
              }}
              className={`p-4 rounded-xl text-left transition-all border btn-tactile ${
                isSelected
                  ? 'bg-white border-[#003087] ring-2 ring-[#003087]/20 shadow-md'
                  : 'bg-[#FAF9F5] border-[#E5E0D8] hover:border-[#D5CCBD] hover:bg-white text-[#5F574D]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg border ${
                    isSelected ? 'bg-[#003087] border-[#003087] text-white' : 'bg-white border-[#E5E0D8]'
                  }`}>
                    {getAgentIcon(ag.id, isSelected)}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#8C8275] block uppercase">
                      {getNodeCode(ag.id)}
                    </span>
                    <h3 className="text-sm font-bold truncate leading-tight text-[#141413]">{ag.name}</h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#141413] bg-[#FAF9F5] border border-[#E5E0D8] px-2 py-0.5 rounded tabular-nums">
                  ${ag.maxPerTxLimit}/tx
                </span>
              </div>

              {/* Progress */}
              <div className="mt-3 pt-2 border-t border-[#F1EFEA] space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-[#5F574D] tabular-nums">
                  <span>Allocation Draw ({percent}%)</span>
                  <span className="text-[#141413] font-semibold">${ag.spentThisMonth.toFixed(0)} / ${ag.monthlyBudget}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EAE5DC] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      percent > 80 ? 'bg-[#9F1239]' : 'bg-[#003087]'
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

  const getVerdictPill = (sc: DemoScenario) => {
    if (sc.expectedOutcome === 'APPROVED') {
      return (
        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
          WILL PASS & SETTLE
        </span>
      );
    }
    if (sc.expectedOutcome === 'BLOCKED') {
      return (
        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFF1F2] text-[#9F1239] border border-[#FECDD3]">
          WILL INTERCEPT
        </span>
      );
    }
    return (
      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-amber-800 border border-amber-300">
        WILL ESCROW
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-2xs p-5 sm:p-6 space-y-4">
      
      <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#003087]" />
            <h2 className="text-base font-serif font-bold text-[#141413] tracking-tight">
              Adversarial Threat Injection Matrix
            </h2>
          </div>
          <p className="text-xs text-[#5F574D] mt-0.5">
            1-Click benchmark scenarios for judges to evaluate the 4-gate deterministic firewall
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="text-xs text-[#003087] hover:text-[#002244] font-semibold transition inline-flex items-center gap-1 btn-tactile bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#E5E0D8]"
        >
          <Plus className="w-3.5 h-3.5 text-[#003087]" />
          {showCustomForm ? 'Close Custom' : 'Custom Payload'}
        </button>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PRESET_SCENARIOS.map((sc: DemoScenario) => {
          return (
            <div
              key={sc.id}
              className="p-4 rounded-xl border border-[#E5E0D8] bg-[#FAF9F5] hover:bg-white hover:border-[#003087]/30 hover:shadow-xs transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  {getVerdictPill(sc)}
                  <span className="text-xs font-mono font-extrabold text-[#141413] tabular-nums">
                    ${sc.request.amount.toFixed(2)}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#141413] leading-snug group-hover:text-[#003087] transition font-sans">
                  {sc.title}
                </h4>
                <p className="text-[11px] text-[#5F574D] mt-1.5 leading-relaxed line-clamp-2">
                  {sc.subtitle}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-[#EAE5DC] flex items-center justify-between gap-2">
                {sc.preventedDamage ? (
                  <span className="shrink-0 text-[10px] font-mono font-bold text-[#9F1239] bg-[#FFF1F2] px-2 py-1 rounded-md border border-[#FECDD3] tabular-nums">
                    {sc.preventedDamage}
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] font-semibold text-[#065F46] bg-[#ECFDF5] px-2 py-1 rounded-md border border-[#A7F3D0] flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#065F46]" /> JIT Voucher
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    audioTactile.playClick();
                    onRunScenario(sc.request);
                  }}
                  disabled={isEvaluating}
                  className="group/btn shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#003087] hover:bg-[#002244] active:scale-[0.98] text-white text-xs font-semibold tracking-tight transition-all duration-150 shadow-xs hover:shadow-sm border border-[#002244]/40 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap btn-tactile"
                >
                  <Play className="w-3 h-3 fill-white/90 text-white/90 shrink-0 group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                  <span>Run Verification</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Collapsible Custom Injection Console */}
      {showCustomForm && (
        <form onSubmit={handleCustomSubmit} className="p-5 rounded-xl border border-[#E5E0D8] bg-[#FAF9F5] text-[#141413] space-y-4 animate-fade-in mt-2">
          <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#003087]" />
              <h4 className="text-xs font-mono font-bold text-[#141413] uppercase">
                Custom Intent & Prompt Injection Console
              </h4>
            </div>
            <span className="text-[10px] text-[#5F574D] font-mono">Raw Firewall Test</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[#5F574D] block mb-1 font-semibold text-[11px]">Target Merchant</label>
              <input
                type="text"
                value={customMerchant}
                onChange={(e) => setCustomMerchant(e.target.value)}
                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#141413] focus:outline-none focus:border-[#003087]"
              />
            </div>
            <div>
              <label className="text-[#5F574D] block mb-1 font-semibold text-[11px]">Merchant Domain (Exact FQDN)</label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#141413] font-mono focus:outline-none focus:border-[#003087]"
              />
            </div>
            <div>
              <label className="text-[#5F574D] block mb-1 font-semibold text-[11px]">Requested Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#141413] font-mono focus:outline-none focus:border-[#003087]"
              />
            </div>
            <div>
              <label className="text-[#5F574D] block mb-1 font-semibold text-[11px]">Units / Quantity</label>
              <input
                type="number"
                value={customUnits}
                onChange={(e) => setCustomUnits(e.target.value)}
                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#141413] font-mono focus:outline-none focus:border-[#003087]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-[#5F574D] block mb-1 font-semibold text-[11px]">Raw LLM Prompt / Instruction Excerpt</label>
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-white border border-[#E5E0D8] rounded-lg p-2.5 text-xs font-mono text-[#141413] focus:outline-none focus:border-[#003087]"
            />
          </div>

          <button
            type="submit"
            disabled={isEvaluating}
            className="group/btn w-full h-9 rounded-lg bg-[#003087] hover:bg-[#002244] border border-[#002244]/40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-xs hover:shadow-sm btn-tactile disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5 fill-white/90 text-white/90 shrink-0 group-hover/btn:translate-x-0.5 transition-transform" />
            Inject Intent Through Deterministic Firewall
          </button>
        </form>
      )}

    </div>
  );
};
