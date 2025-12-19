
import React from 'react';
import { SpendingPolicy } from '../types';

interface PolicyViewProps {
  policy: SpendingPolicy;
}

const PolicyView: React.FC<PolicyViewProps> = ({ policy }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Wallet Protection Policies</h2>
        <p className="text-slate-500">The core ruleset used by the AI Agent to make autonomous decisions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending Rules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">🔒</div>
            <h3 className="text-lg font-bold text-slate-800">Spending Rules</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-600">Monthly Spending Cap</span>
              <span className="font-bold text-slate-800">${policy.monthlyCap}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-600">Max per Individual Sub</span>
              <span className="font-bold text-slate-800">${policy.maxPerSubscription}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">Strict Enforcement</span>
              <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Active</span>
            </div>
          </div>
        </div>

        {/* Inactivity Detection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">⏳</div>
            <h3 className="text-lg font-bold text-slate-800">Inactivity Detection</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">Identify services that aren't being used to save money automatically.</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500">THRESHOLD</span>
              <span className="text-xs font-bold text-slate-800">{policy.inactivityThresholdDays} DAYS</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Merchant Control */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">🏷️</div>
            <h3 className="text-lg font-bold text-slate-800">Merchant Control</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {policy.trustedMerchants.map((m, i) => (
              <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600">
                {m}
              </span>
            ))}
            <button className="px-3 py-1 border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-colors">
              + Add Trusted
            </button>
          </div>
        </div>

        {/* Trial Protection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">🚨</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Trial-to-Paid Protection</h3>
              <p className="text-sm text-slate-500">Block silent trial conversions automatically.</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${policy.autoBlockTrialConversion ? 'bg-indigo-600' : 'bg-slate-200'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${policy.autoBlockTrialConversion ? 'translate-x-6' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyView;
