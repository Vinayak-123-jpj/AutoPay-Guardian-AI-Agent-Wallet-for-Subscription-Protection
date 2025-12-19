
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WalletStats, Subscription } from '../types';

interface DashboardProps {
  stats: WalletStats;
  subscriptions: Subscription[];
}

const data = [
  { name: 'Mon', spent: 40 },
  { name: 'Tue', spent: 40 },
  { name: 'Wed', spent: 55 },
  { name: 'Thu', spent: 55 },
  { name: 'Fri', spent: 75 },
  { name: 'Sat', spent: 75 },
  { name: 'Sun', spent: 92 },
];

const Dashboard: React.FC<DashboardProps> = ({ stats, subscriptions }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Financial Overview</h2>
        <p className="text-slate-500">Real-time subscription monitoring and protection metrics.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Wallet Balance', value: `$${stats.balance.toLocaleString()}`, color: 'text-indigo-600', icon: '💰' },
          { label: 'Monthly Spent', value: `$${stats.totalMonthlySpent}`, color: 'text-slate-800', icon: '📉' },
          { label: 'Active Services', value: stats.activeSubscriptions, color: 'text-slate-800', icon: '🔄' },
          { label: 'AI Savings', value: `$${stats.savedThisMonth}`, color: 'text-emerald-600', icon: '🛡️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-[10px] font-bold bg-slate-50 text-slate-400 px-2 py-1 rounded">LIVE</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="spent" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Top Merchants</h3>
          <div className="space-y-4">
            {subscriptions.slice(0, 4).map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg">{sub.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{sub.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{sub.category}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-800">${sub.amount}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-indigo-600 border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-colors">
            View All Merchants
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
