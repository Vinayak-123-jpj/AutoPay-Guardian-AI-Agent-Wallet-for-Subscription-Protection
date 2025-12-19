
import React, { useState } from 'react';
import { analyzeTransaction } from '../services/geminiService';
import { SpendingPolicy, Subscription, DecisionStatus, AgentDecision } from '../types';

interface AgentSimulatorProps {
  policy: SpendingPolicy;
  subscriptions: Subscription[];
  onNewDecision: (decision: AgentDecision) => void;
}

const AgentSimulator: React.FC<AgentSimulatorProps> = ({ policy, subscriptions, onNewDecision }) => {
  const [merchant, setMerchant] = useState('Netflix');
  const [amount, setAmount] = useState(15.99);
  const [isTrial, setIsTrial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');

  const handleSimulate = async () => {
    setLoading(true);
    setThinkingStep('Analyzing merchant reputation...');
    
    setTimeout(() => setThinkingStep('Checking spending limits...'), 800);
    setTimeout(() => setThinkingStep('Evaluating usage patterns...'), 1600);

    const result = await analyzeTransaction(merchant, amount, policy, subscriptions, isTrial);
    
    const newDecision: AgentDecision = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      merchantName: merchant,
      amount: amount,
      status: result.status as DecisionStatus,
      reasoning: result.reasoning,
      policyViolated: result.policyViolated
    };

    onNewDecision(newDecision);
    setLoading(false);
    setThinkingStep('');
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-slate-700/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 className="text-lg font-bold">Guardian Engine</h3>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded-md border border-slate-700">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Incoming Request</label>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Merchant"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
            />
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isTrial" 
              checked={isTrial}
              onChange={(e) => setIsTrial(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
            <label htmlFor="isTrial" className="text-xs text-slate-400 font-medium cursor-pointer">Trial Conversion</label>
          </div>
          <div className="text-[10px] text-slate-500 italic">Policy Auto-Block</div>
        </div>

        <button 
          onClick={handleSimulate}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            loading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Thinking...
            </>
          ) : 'Run Autonomous Analysis'}
        </button>

        {loading && (
          <div className="text-center animate-pulse">
            <p className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase">{thinkingStep}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentSimulator;
