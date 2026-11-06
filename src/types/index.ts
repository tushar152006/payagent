export type VerificationStatus = 'APPROVED' | 'BLOCKED' | 'REQUIRES_HUMAN_APPROVAL';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  maxPerTxLimit: number;
  monthlyBudget: number;
  spentThisMonth: number;
  allowedVendors: string[];
  allowedCategories: string[];
}

export interface PurchaseRequest {
  id: string;
  agentId: string;
  agentName: string;
  taskGoal: string;
  targetMerchant: string;
  merchantDomain: string;
  category: string;
  amount: number;
  currency: string;
  units: number;
  unitPrice: number;
  itemDescription: string;
  rawPromptExcerpt: string;
  timestamp: string;
  idempotencyKey?: string; // Kleppmann DDIA Ch. 9 / Stripe Idempotency Key
}

export interface SecurityCheckItem {
  id: 'semantic' | 'vendor' | 'budget' | 'velocity';
  name: string;
  passed: boolean;
  score: number; // 0 - 100 confidence
  detail: string;
  anomalyDetected?: boolean;
}

export interface VerificationResult {
  overallStatus: VerificationStatus;
  riskScore: number; // 0 (safe) to 100 (critical danger)
  checks: SecurityCheckItem[];
  decisionReason: string;
  actionTaken: string;
  idempotencyKey?: string;
  isIdempotentReplay?: boolean; // True if served from Kleppmann DDIA idempotency cache
  proofOfIntentHash?: string; // Canonical SHA-256 Merkle root
}

export interface PayPalOrderReceipt {
  orderId: string;
  captureId: string;
  amount: number;
  currency: string;
  merchant: string;
  buyerProtectionEligible: boolean;
  protectionWindowDays: number; // 180
  transactionHash: string;
  skuHashLock: string;
  slippageTolerance: string; // "$0.00 (Strict Zero Slippage)"
  burnStatus: 'ACTIVE_UNTIL_CAPTURED' | 'BURNED';
  status: 'COMPLETED' | 'SIMULATED_MOCK';
  timestamp: string;
  idempotencyKey?: string;
  proofOfIntentHash?: string;
}

export interface SecurityPolicyConfig {
  velocityLimitPerMin: number;
  maxRollingSpend10Min: number;
  semanticSensitivity: 'strict' | 'balanced' | 'permissive';
  vendorQuarantineMode: 'escalate' | 'block';
  enforce180DayProtection: boolean;
}

export const DEFAULT_POLICY_CONFIG: SecurityPolicyConfig = {
  velocityLimitPerMin: 5,
  maxRollingSpend10Min: 300,
  semanticSensitivity: 'strict',
  vendorQuarantineMode: 'escalate',
  enforce180DayProtection: true,
};

export interface TransactionRecord {
  id: string;
  request: PurchaseRequest;
  verification: VerificationResult;
  paypalReceipt?: PayPalOrderReceipt;
  status: VerificationStatus;
  preventedLossAmount: number;
  timestamp: string;
  idempotencyKey?: string;
  proofOfIntentHash?: string;
  supervisorSignature?: string; // Google SRE Dual-Custody signature
  isIdempotentReplay?: boolean;
}

export interface SystemStats {
  totalProcessedPayPal: number;
  totalPreventedLoss: number;
  totalTransactionsCount: number;
  approvedCount: number;
  blockedCount: number;
  escalatedCount: number;
}

