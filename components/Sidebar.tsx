
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
    { id: 'policies', label: 'Wallet Policies', icon: '🛡️' },
    { id: 'logs', label: 'Decision Log', icon: '📝' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            A
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">AutoPay</h1>
            <p className="text-xs text-indigo-600 font-semibold tracking-wider uppercase">Guardian</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-tighter">Agent Active</p>
          </div>
          <p className="text-xs text-slate-500">Autonomous protection enabled since Oct 2023</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
