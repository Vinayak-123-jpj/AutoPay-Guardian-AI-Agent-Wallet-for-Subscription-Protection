
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SubscriptionList from './components/SubscriptionList';
import PolicyView from './components/PolicyView';
import DecisionLog from './components/DecisionLog';
import AgentSimulator from './components/AgentSimulator';
import { Subscription, SpendingPolicy, WalletStats, AgentDecision, DecisionStatus } from './types';

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  { id: '1', name: 'Netflix', amount: 19.99, frequency: 'monthly', category: 'Entertainment', lastUsed: '2 days ago', status: 'active', icon: '📺' },
  { id: '2', name: 'Spotify', amount: 9.99, frequency: 'monthly', category: 'Music', lastUsed: 'Today', status: 'active', icon: '🎵' },
  { id: '3', name: 'AWS Cloud', amount: 45.00, frequency: 'monthly', category: 'DevOps', lastUsed: '14 days ago', status: 'active', icon: '☁️' },
  { id: '4', name: 'Midjourney', amount: 30.00, frequency: 'monthly', category: 'AI Tools', lastUsed: '32 days ago', status: 'paused', icon: '🎨' },
];

const INITIAL_POLICY: SpendingPolicy = {
  monthlyCap: 150,
  maxPerSubscription: 50,
  trustedMerchants: ['Netflix', 'Spotify', 'AWS Cloud', 'Apple', 'Google', 'Hulu', 'Disney+', 'Claude'],
  autoBlockTrialConversion: true,
  inactivityThresholdDays: 30,
};

const INITIAL_STATS: WalletStats = {
  balance: 4250.75,
  totalMonthlySpent: 104.98,
  activeSubscriptions: 3,
  savedThisMonth: 30.00,
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [policy, setPolicy] = useState<SpendingPolicy>(INITIAL_POLICY);
  const [stats, setStats] = useState<WalletStats>(INITIAL_STATS);
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);
  const [showSimulator, setShowSimulator] = useState(false);

  // Synchronize stats whenever subscriptions or decisions change
  useEffect(() => {
    const activeSubs = subscriptions.filter(s => s.status === 'active');
    const monthlyTotal = activeSubs.reduce((acc, s) => acc + s.amount, 0);
    
    setStats(prev => ({
      ...prev,
      totalMonthlySpent: Number(monthlyTotal.toFixed(2)),
      activeSubscriptions: activeSubs.length
    }));
  }, [subscriptions]);

  const handleNewDecision = (decision: AgentDecision) => {
    setDecisions(prev => [decision, ...prev]);

    // Update subscription list if an existing sub was affected
    setSubscriptions(prev => {
      return prev.map(sub => {
        if (sub.name.toLowerCase() === decision.merchantName.toLowerCase()) {
          if (decision.status === DecisionStatus.BLOCK) return { ...sub, status: 'blocked' as const };
          if (decision.status === DecisionStatus.PAUSE) return { ...sub, status: 'paused' as const };
          if (decision.status === DecisionStatus.APPROVE) return { ...sub, status: 'active' as const };
        }
        return sub;
      });
    });

    // Update savings if the agent blocked or paused a transaction
    if (decision.status === DecisionStatus.BLOCK || decision.status === DecisionStatus.PAUSE) {
      setStats(prev => ({
        ...prev,
        savedThisMonth: Number((prev.savedThisMonth + decision.amount).toFixed(2))
      }));
    }
    
    // Switch to logs to show the result
    setTimeout(() => {
      setActiveTab('logs');
      setShowSimulator(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 pb-24 relative overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
          {activeTab === 'dashboard' && <Dashboard stats={stats} subscriptions={subscriptions} />}
          {activeTab === 'subscriptions' && <SubscriptionList subscriptions={subscriptions} />}
          {activeTab === 'policies' && <PolicyView policy={policy} />}
          {activeTab === 'logs' && <DecisionLog decisions={decisions} />}
        </div>
      </main>

      {/* Floating Simulator Toggle */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {showSimulator && (
          <div className="w-80 animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => setShowSimulator(false)}
                className="bg-slate-200 text-slate-500 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors shadow-sm"
              >
                ✕
              </button>
            </div>
            <AgentSimulator 
              policy={policy} 
              subscriptions={subscriptions} 
              onNewDecision={handleNewDecision}
            />
          </div>
        )}
        
        {!showSimulator && (
          <button 
            onClick={() => setShowSimulator(true)}
            className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 group border border-slate-700"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute"></div>
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="font-bold tracking-tight">Agent Sandbox</span>
          </button>
        )}
      </div>

      {/* Bottom Guardian Status Banner */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-2 text-center z-40">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Guardian</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            MONTHLY BUDGET: <span className="text-slate-900">${policy.monthlyCap}</span> | 
            SPENT: <span className="text-slate-900">${stats.totalMonthlySpent}</span> | 
            AVAILABLE: <span className="text-emerald-600">${(policy.monthlyCap - stats.totalMonthlySpent).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
