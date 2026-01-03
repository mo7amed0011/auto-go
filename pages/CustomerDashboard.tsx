
import React, { useState, useEffect } from 'react';
import { User, ServiceRequest, RequestStatus } from '../types';
import { db } from '../services/db';

interface CustomerDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, onNavigate }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const all = db.getRequests();
    setRequests(all.filter(r => r.customerId === user.id).reverse());
  }, [user.id]);

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.PENDING: return 'text-yellow-500 bg-yellow-500/10';
      case RequestStatus.ASSIGNED: return 'text-blue-500 bg-blue-500/10';
      case RequestStatus.IN_PROGRESS: return 'text-purple-500 bg-purple-500/10';
      case RequestStatus.COMPLETED: return 'text-emerald-500 bg-emerald-500/10';
      default: return 'text-zinc-500 bg-zinc-500/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold font-brand mb-2">Hello, {user.name}</h1>
          <p className="text-zinc-500">Manage your roadside assistance requests and subscriptions.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('request')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
          >
            Request New Help
          </button>
          {!user.isPro && (
            <button 
              onClick={() => onNavigate('pro')}
              className="bg-zinc-800 border border-amber-500/50 hover:bg-zinc-700 text-amber-500 px-6 py-3 rounded-xl font-bold transition-all"
            >
              Upgrade to PRO
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active/History Table */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold font-brand">Request History</h2>
          {requests.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
              <i className="fa-solid fa-clipboard-list text-zinc-700 text-5xl mb-4"></i>
              <p className="text-zinc-500">You haven't made any requests yet.</p>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-950/50 border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Vehicle</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {requests.map(req => (
                      <tr key={req.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm">{new Date(req.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs text-zinc-500">{new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-sm">{req.vehicleInfo}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(req.status)}`}>
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Status Card & Info */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h3 className="text-lg font-bold mb-6 font-brand">Account Status</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${user.isPro ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-500'}`}>
                  <i className={`fa-solid ${user.isPro ? 'fa-crown' : 'fa-user'}`}></i>
                </div>
                <div>
                  <div className="text-sm font-bold">{user.isPro ? 'AutoGo PRO Member' : 'Standard Member'}</div>
                  <div className="text-xs text-zinc-500">{user.isPro ? 'Next billing on May 1st' : 'Upgrade for priority service'}</div>
                </div>
              </div>
              <div className="h-px bg-zinc-800"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Total Requests</span>
                  <span className="font-bold">{requests.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Saved by AI</span>
                  <span className="font-bold text-emerald-500">{requests.filter(r => r.status === RequestStatus.COMPLETED).length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <i className="fa-solid fa-headset text-6xl"></i>
            </div>
            <h3 className="text-lg font-bold mb-4">Emergency Hotline</h3>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Stranded without internet? Our operators are standing by 24/7 to dispatch units manually.</p>
            <a href="tel:1234567" className="inline-flex items-center gap-3 text-blue-500 font-bold hover:gap-4 transition-all">
              <i className="fa-solid fa-phone"></i>
              <span>19000 - AutoGo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
