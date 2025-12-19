
export enum DecisionStatus {
  APPROVE = 'APPROVE',
  BLOCK = 'BLOCK',
  PAUSE = 'PAUSE',
  ASK = 'ASK'
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'annually';
  category: string;
  lastUsed: string; // ISO Date
  status: 'active' | 'paused' | 'blocked';
  icon: string;
}

export interface SpendingPolicy {
  monthlyCap: number;
  maxPerSubscription: number;
  trustedMerchants: string[];
  autoBlockTrialConversion: boolean;
  inactivityThresholdDays: number;
}

export interface AgentDecision {
  id: string;
  timestamp: string;
  merchantName: string;
  amount: number;
  status: DecisionStatus;
  reasoning: string;
  policyViolated?: string;
}

export interface WalletStats {
  balance: number;
  totalMonthlySpent: number;
  activeSubscriptions: number;
  savedThisMonth: number;
}
