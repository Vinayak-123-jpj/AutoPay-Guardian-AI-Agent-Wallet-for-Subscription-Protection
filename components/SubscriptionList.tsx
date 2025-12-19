
import React from 'react';
import { Subscription } from '../types';

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions }) => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Active Subscriptions</h2>
          <p className="text-slate-500">Currently monitored and protected by AutoPay Guardian.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
          Connect Service
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-50 transition-colors">
                {sub.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border mb-1 ${
                  sub.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {sub.status}
                </span>
                <p className="text-xs text-slate-400">Next billing: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-slate-800 text-lg">{sub.name}</h3>
              <p className="text-sm text-slate-500 capitalize">{sub.category}</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Monthly Cost</p>
                <p className="text-xl font-bold text-slate-800">${sub.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Last Usage</p>
                <p className="text-sm font-semibold text-slate-600">{sub.lastUsed}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 text-xs font-bold border border-slate-100 rounded-lg hover:bg-slate-50 text-slate-600">
                Details
              </button>
              <button className="flex-1 py-2 text-xs font-bold border border-rose-100 rounded-lg hover:bg-rose-50 text-rose-600">
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;
