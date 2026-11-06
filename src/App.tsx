import React, { useState } from 'react';
import { Agent, PurchaseRequest, VerificationResult, PayPalOrderReceipt, TransactionRecord, SystemStats, SecurityPolicyConfig, DEFAULT_POLICY_CONFIG } from './types';
import { INITIAL_AGENTS, PRESET_SCENARIOS } from './data/mockScenarios';
import { guardrailEngine } from './engine/guardrailEngine';
import { paypalService } from './engine/paypalClient';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './views/DashboardView';
import { AgentSimulator, AgentSwarmRack } from './components/AgentSimulator';
import { VerificationPipeline } from './components/VerificationPipeline';
import { AgentFleetView } from './views/AgentFleetView';
import { LedgerView } from './views/LedgerView';
import { PoliciesView } from './views/PoliciesView';
import { HumanApprovalModal } from './components/HumanApprovalModal';
import { TransactionDrawer } from './components/TransactionDrawer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<Agent>(INITIAL_AGENTS[0]);
  
  const [currentRequest, setCurrentRequest] = useState<PurchaseRequest | null>(PRESET_SCENARIOS[0].request);
  const [policyConfig, setPolicyConfig] = useState<SecurityPolicyConfig>(DEFAULT_POLICY_CONFIG);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(() => 
    guardrailEngine.evaluatePurchase(PRESET_SCENARIOS[0].request, INITIAL_AGENTS[0], DEFAULT_POLICY_CONFIG)
  );
  const [paypalReceipt, setPaypalReceipt] = useState<PayPalOrderReceipt | null>({
    orderId: 'PAYID-M9K32Q8-7712',
    captureId: 'CAP-789218FA',
    amount: 19.00,
    currency: 'USD',
    merchant: 'GitHub Inc.',
    buyerProtectionEligible: true,
    protectionWindowDays: 180,
    transactionHash: '0x9a8f4c21e0b571d43a998bc19d3f52',
    skuHashLock: 'sku_github_copilot_seat_19',
    slippageTolerance: '$0.00 (Strict Zero Slippage)',
    burnStatus: 'ACTIVE_UNTIL_CAPTURED',
    status: 'COMPLETED',
    timestamp: new Date().toISOString()
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [inspectedTransaction, setInspectedTransaction] = useState<TransactionRecord | null>(null);

  // Pre-seed realistic past transaction records
  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'tx-seed-1',
      request: PRESET_SCENARIOS[0].request,
      verification: guardrailEngine.evaluatePurchase(PRESET_SCENARIOS[0].request, INITIAL_AGENTS[0]),
      paypalReceipt: {
        orderId: 'PAYID-M9K32Q8-7712',
        captureId: 'CAP-789218FA',
        amount: 19.00,
        currency: 'USD',
        merchant: 'GitHub Inc.',
        buyerProtectionEligible: true,
        protectionWindowDays: 180,
        transactionHash: '0x9a8f4c21e0b571d43a998bc19d3f52',
        skuHashLock: 'sku_github_copilot_seat_19',
        slippageTolerance: '$0.00 (Strict Zero Slippage)',
        burnStatus: 'ACTIVE_UNTIL_CAPTURED',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      status: 'APPROVED',
      preventedLossAmount: 0,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'tx-seed-2',
      request: PRESET_SCENARIOS[1].request,
      verification: guardrailEngine.evaluatePurchase(PRESET_SCENARIOS[1].request, INITIAL_AGENTS[0]),
      status: 'BLOCKED',
      preventedLossAmount: 4250.00,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 'tx-seed-3',
      request: PRESET_SCENARIOS[2].request,
      verification: guardrailEngine.evaluatePurchase(PRESET_SCENARIOS[2].request, INITIAL_AGENTS[1]),
      status: 'BLOCKED',
      preventedLossAmount: 3500.00,
      timestamp: new Date(Date.now() - 14400000).toISOString()
    },
    {
      id: 'tx-seed-4',
      request: {
        id: 'seed-gemini-leak',
        agentId: 'agent-devops',
        agentName: 'DevOps AutoScaler',
        taskGoal: 'Brute-force background cluster inference batching',
        targetMerchant: 'Google Cloud Platform',
        merchantDomain: 'cloud.google.com',
        category: 'Compute',
        amount: 82000.00,
        currency: 'USD',
        units: 1,
        unitPrice: 82000.00,
        itemDescription: 'Runaway Token Compute Consumption (48hr leak)',
        rawPromptExcerpt: 'Automated script loop attempting 10,000 parallel inference batches with leaked credentials.',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      },
      verification: {
        overallStatus: 'BLOCKED',
        riskScore: 98,
        checks: [
          { id: 'budget', name: 'Per-Task & Monthly Budget Cap', passed: false, score: 2, detail: 'Requested $82,000 exceeds monthly limit by $81,400.', anomalyDetected: true },
          { id: 'velocity', name: 'Loop & Velocity Circuit Breaker', passed: false, score: 5, detail: 'Massive parallel burst detected. Circuit breaker tripped.', anomalyDetected: true },
          { id: 'semantic', name: 'Semantic Intent & Injection Check', passed: false, score: 10, detail: 'Anomalous unconstrained compute burn.', anomalyDetected: true },
          { id: 'vendor', name: 'Vendor & Domain Allowlist', passed: true, score: 95, detail: 'Verified Merchant: GCP' }
        ],
        decisionReason: 'CRITICAL DEFENSE: Stopped $82,000 runaway compute leak before payment dispatch.',
        actionTaken: 'Zero dollars disbursed. Incident logged in security ledger.'
      },
      status: 'BLOCKED',
      preventedLossAmount: 82000.00,
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  // Aggregate System Stats
  const stats: SystemStats = {
    totalProcessedPayPal: transactions.filter(t => t.status === 'APPROVED').reduce((sum, t) => sum + t.request.amount, 0),
    totalPreventedLoss: transactions.filter(t => t.status === 'BLOCKED').reduce((sum, t) => sum + t.preventedLossAmount, 0),
    totalTransactionsCount: transactions.length,
    approvedCount: transactions.filter(t => t.status === 'APPROVED').length,
    blockedCount: transactions.filter(t => t.status === 'BLOCKED').length,
    escalatedCount: transactions.filter(t => t.status === 'REQUIRES_HUMAN_APPROVAL').length
  };

  /**
   * Runs a live purchase request simulation through the guardrail engine
   */
  const handleRunScenario = async (request: PurchaseRequest) => {
    setIsEvaluating(true);
    setCurrentRequest(request);
    setPaypalReceipt(null);

    await new Promise(resolve => setTimeout(resolve, 400));

    const result = guardrailEngine.evaluatePurchase(request, selectedAgent, policyConfig);
    setVerificationResult(result);

    let receipt: PayPalOrderReceipt | null = null;
    let preventedAmount = 0;

    if (result.overallStatus === 'APPROVED') {
      if (!result.isIdempotentReplay) {
        receipt = await paypalService.executeScopedSettlement(request);
        setPaypalReceipt(receipt);

        setAgents(prev => prev.map(ag => 
          ag.id === selectedAgent.id 
            ? { ...ag, spentThisMonth: ag.spentThisMonth + request.amount }
            : ag
        ));
      } else {
        // Reuse cached receipt for idempotent replay (Kleppmann DDIA)
        const prevTx = transactions.find(t => t.idempotencyKey === result.idempotencyKey);
        receipt = prevTx?.paypalReceipt || await paypalService.executeScopedSettlement(request);
        setPaypalReceipt(receipt);
      }
    } else if (result.overallStatus === 'BLOCKED') {
      preventedAmount = request.amount;
    } else if (result.overallStatus === 'REQUIRES_HUMAN_APPROVAL') {
      setIsApprovalModalOpen(true);
    }

    const newRecord: TransactionRecord = {
      id: 'tx-' + Date.now(),
      request,
      verification: result,
      paypalReceipt: receipt || undefined,
      status: result.overallStatus,
      preventedLossAmount: preventedAmount,
      timestamp: new Date().toISOString(),
      idempotencyKey: result.idempotencyKey,
      proofOfIntentHash: result.proofOfIntentHash,
      isIdempotentReplay: result.isIdempotentReplay
    };

    setTransactions(prev => [newRecord, ...prev]);
    setIsEvaluating(false);
  };

  /**
   * Human Approves an Escalated Transaction
   */
  const handleHumanApprove = async (request: PurchaseRequest) => {
    setIsApprovalModalOpen(false);
    setIsEvaluating(true);

    const supervisorSig = `SUP_ED25519_${Date.now().toString(36).toUpperCase()}_0x8f2d`;
    const receipt = await paypalService.executeScopedSettlement(request, undefined, undefined, supervisorSig);
    setPaypalReceipt(receipt);

    setTransactions(prev => prev.map(t => 
      t.request.id === request.id 
        ? { 
            ...t, 
            status: 'APPROVED', 
            paypalReceipt: receipt,
            supervisorSignature: supervisorSig,
            proofOfIntentHash: receipt.proofOfIntentHash
          }
        : t
    ));

    if (verificationResult) {
      setVerificationResult({
        ...verificationResult,
        overallStatus: 'APPROVED',
        decisionReason: `HUMAN COUNTERSIGN (Google SRE Dual-Custody): Countersigned by supervisor [${supervisorSig}]. Ephemeral token minted.`,
        actionTaken: 'Executed single-use PayPal settlement under verified human supervisory authority.',
        proofOfIntentHash: receipt.proofOfIntentHash
      });
    }

    setAgents(prev => prev.map(ag => 
      ag.id === selectedAgent.id 
        ? { ...ag, spentThisMonth: ag.spentThisMonth + request.amount }
        : ag
    ));

    setIsEvaluating(false);
  };

  /**
   * Human Rejects an Escalated Transaction
   */
  const handleHumanReject = (request: PurchaseRequest) => {
    setIsApprovalModalOpen(false);

    setTransactions(prev => prev.map(t => 
      t.request.id === request.id 
        ? { ...t, status: 'BLOCKED', preventedLossAmount: request.amount }
        : t
    ));

    if (verificationResult) {
      setVerificationResult({
        ...verificationResult,
        overallStatus: 'BLOCKED',
        decisionReason: 'SUPERVISORY REJECTION: Human administrator denied purchase request.',
        actionTaken: 'Transaction aborted. Zero funds transferred.'
      });
    }
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents(prev => prev.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    if (selectedAgent.id === updatedAgent.id) {
      setSelectedAgent(updatedAgent);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141413] flex flex-col font-sans selection:bg-[#003087]/15 selection:text-[#003087]">
      
      {/* Enterprise Multi-Tab Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        preventedLoss={stats.totalPreventedLoss}
        settledAmount={stats.totalProcessedPayPal}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* View 1: Executive Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            transactions={transactions}
            onNavigate={setActiveTab}
            onSelectTransaction={(rec) => setInspectedTransaction(rec)}
          />
        )}

        {/* View 2: Firewall Testing Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E8E3D9] pb-4">
              <div>
                <h1 className="text-xl font-serif font-bold text-[#141413] tracking-tight">
                  Deterministic Firewall Simulator Workbench
                </h1>
                <p className="text-xs text-[#8C8275] mt-0.5">
                  Inject benchmark attack vectors or custom instructions to verify semantic intent, domain authentication, and budget ceilings in milliseconds.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#433D35] bg-white border border-[#E8E3D9] px-3 py-1 rounded-lg shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  PayPal Orders v2 Sandboxed
                </span>
              </div>
            </div>

            {/* Full-Width Agent Swarm Hardware Rack */}
            <AgentSwarmRack
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
            />

            {/* Balanced 6-Col / 6-Col Dual Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left (6 Cols): Adversarial Attack Matrix & Custom Console */}
              <div className="lg:col-span-6 space-y-6">
                <AgentSimulator
                  selectedAgent={selectedAgent}
                  onRunScenario={handleRunScenario}
                  isEvaluating={isEvaluating}
                />
              </div>

              {/* Right (6 Cols): Real-time Verification Pipeline & Settlement Voucher */}
              <div className="lg:col-span-6 space-y-6">
                <VerificationPipeline
                  currentRequest={currentRequest}
                  verificationResult={verificationResult}
                  paypalReceipt={paypalReceipt}
                  isEvaluating={isEvaluating}
                  onOpenApprovalModal={() => setIsApprovalModalOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {/* View 3: Agent Fleet Management */}
        {activeTab === 'agents' && (
          <AgentFleetView
            agents={agents}
            onUpdateAgent={handleUpdateAgent}
          />
        )}

        {/* View 4: Full Audit Ledger & Receipts */}
        {activeTab === 'ledger' && (
          <LedgerView
            transactions={transactions}
            onSelectTransaction={(rec) => setInspectedTransaction(rec)}
          />
        )}

        {/* View 5: Security Policies */}
        {activeTab === 'policies' && (
          <PoliciesView 
            policyConfig={policyConfig}
            onUpdatePolicy={(newConfig) => setPolicyConfig(newConfig)}
          />
        )}

      </main>

      {/* Human-in-the-Loop Supervisory Modal */}
      <HumanApprovalModal
        request={currentRequest}
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onApprove={handleHumanApprove}
        onReject={handleHumanReject}
      />

      {/* Slide-over Transaction Detail Inspector Drawer */}
      <TransactionDrawer
        record={inspectedTransaction}
        onClose={() => setInspectedTransaction(null)}
      />

      {/* Institutional Enterprise Footer */}
      <footer className="border-t border-[#E8E3D9] py-8 text-center text-xs text-[#8C8275] bg-[#FAF9F5] mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-serif font-bold text-sm text-[#141413]">PayAgent AI</span>
            <span className="text-[#8C8275]">•</span>
            <span className="font-sans font-medium text-xs text-[#5F574D]">Autonomous Treasury & Pre-Execution Firewall</span>
          </div>
          <p className="text-[11px] text-[#8C8275] max-w-xl mx-auto">
            Engineered natively on PayPal Orders API v2, Ephemeral Scoped Vouchers, and 180-Day Purchase Protection.
          </p>
          <div className="flex items-center justify-center gap-3 pt-1 text-[10px] font-mono text-[#8C8275]">
            <span>ED25519 SIGNATURES</span>
            <span>•</span>
            <span>$0.00 SLIPPAGE GUARANTEE</span>
            <span>•</span>
            <span>ROLLING SMURFING CAP</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
