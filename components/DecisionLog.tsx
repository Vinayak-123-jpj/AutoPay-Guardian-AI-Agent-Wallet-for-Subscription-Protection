
import React from 'react';
import { AgentDecision, DecisionStatus } from '../types';

interface DecisionLogProps {
  decisions: AgentDecision[];
}

const DecisionLog: React.FC<DecisionLogProps> = ({ decisions }) => {
  const getStatusStyle = (status: DecisionStatus) => {
    switch (status) {
      case DecisionStatus.APPROVE: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case DecisionStatus.BLOCK: return 'bg-rose-50 text-rose-700 border-rose-100';
      case DecisionStatus.PAUSE: return 'bg-amber-50 text-amber-700 border-amber-100';
      case DecisionStatus.ASK: return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Autonomous Decision Log</h2>
          <p className="text-slate-500">Every action the AI Agent takes is recorded with its reasoning.</p>
        </div>
        <button className="text-sm font-semibold text-indigo-600 hover:underline">Download Audit Log</button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Merchant</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Decision</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Reasoning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {decisions.map((decision) => (
              <tr key={decision.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-medium text-slate-700">
                    {new Date(decision.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(decision.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">{decision.merchantName}</p>
                  <p className="text-xs text-slate-500">${decision.amount}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(decision.status)}`}>
                    {decision.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                    {decision.reasoning}
                  </p>
                  {decision.policyViolated && (
                    <span className="text-[10px] text-rose-500 font-bold mt-1 block uppercase">
                      Policy: {decision.policyViolated}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {decisions.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 italic">No transactions processed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionLog;
