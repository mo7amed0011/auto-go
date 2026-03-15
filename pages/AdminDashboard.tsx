
import React, { useState, useEffect } from 'react';
import { ServiceRequest, RequestStatus, User, UserRole } from '../types';
import { db } from '../services/db';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [techs, setTechs] = useState<User[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setRequests(db.getRequests().reverse());
      setTechs(db.getUsers().filter(u => u.role === UserRole.TECHNICIAN));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const statsData = [
    { name: 'Mon', jobs: 12 }, { name: 'Tue', jobs: 19 }, { name: 'Wed', jobs: 15 },
    { name: 'Thu', jobs: 22 }, { name: 'Fri', jobs: 30 }, { name: 'Sat', jobs: 45 },
    { name: 'Sun', jobs: 38 }
  ];

  const statusCounts = [
    { name: 'Pending', count: requests.filter(r => r.status === RequestStatus.PENDING).length, color: '#eab308' },
    { name: 'En-Route', count: requests.filter(r => r.status === RequestStatus.ASSIGNED).length, color: '#3b82f6' },
    { name: 'Working', count: requests.filter(r => r.status === RequestStatus.IN_PROGRESS).length, color: '#6366f1' },
    { name: 'Done', count: requests.filter(r => r.status === RequestStatus.COMPLETED).length, color: '#10b981' },
  ];

  const handleAssign = (requestId: string, techId: string) => {
    db.updateRequest(requestId, { 
      status: RequestStatus.ASSIGNED, 
      technicianId: techId 
    });
    setRequests(db.getRequests().reverse());
    setSelectedRequest(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black font-brand text-white tracking-tighter">Ops <span className="text-blue-500">Center</span></h1>
          <p className="text-zinc-500 font-medium mt-2 uppercase tracking-widest text-xs">Real-time Network Monitoring</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-800 flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-xs font-black text-white uppercase tracking-widest">Active Units: {techs.length}</span>
           </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <i className="fa-solid fa-hashtag text-5xl"></i>
            </div>
            <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Total Network Load</div>
            <div className="text-4xl font-black text-white">{requests.length}</div>
            <div className="text-[9px] text-emerald-500 font-bold mt-2">+14% from yesterday</div>
          </div>
          <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <i className="fa-solid fa-clock text-5xl"></i>
            </div>
            <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Avg Response Time</div>
            <div className="text-4xl font-black text-blue-500">14.2<span className="text-xs">m</span></div>
            <div className="text-[9px] text-zinc-600 font-bold mt-2">Optimal range</div>
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-zinc-900 p-10 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <h3 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-8">Service Traffic Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statsData}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" axisLine={false} tickLine={false} />
                <YAxis stroke="#52525b" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '15px'}}
                  itemStyle={{color: '#3b82f6', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="jobs" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorJobs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Operations Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <h2 className="text-xl font-black font-brand text-white">Live Operations Flow</h2>
          <div className="flex gap-4">
            {statusCounts.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: s.color}}></div>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{s.name}: {s.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/40 border-b border-zinc-800">
                <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Job ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Emergency Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Deployment</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-8 py-6 font-mono text-xs text-zinc-600">#{req.id.toUpperCase()}</td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-white group-hover:text-blue-500 transition-colors">{req.customerName}</div>
                    <div className="text-[10px] text-zinc-600 font-bold truncate max-w-[120px]">{req.location}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xs font-bold text-zinc-300">{req.problemType}</div>
                    <div className="text-[9px] text-zinc-600 uppercase tracking-tighter">{req.vehicleInfo}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-current 
                      ${req.status === RequestStatus.PENDING ? 'text-yellow-500' : 
                        req.status === RequestStatus.COMPLETED ? 'text-emerald-500' : 
                        'text-blue-500'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-zinc-400 font-medium">
                    {req.technicianId ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-blue-500">
                           <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <span className="text-xs font-bold">{techs.find(t => t.id === req.technicianId)?.name}</span>
                      </div>
                    ) : (
                      <span className="text-zinc-800 italic text-xs animate-pulse">Pending Dispatch</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {req.status === RequestStatus.PENDING ? (
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
                      >
                        Dispatch Unit
                      </button>
                    ) : (
                      <button className="text-zinc-800 hover:text-zinc-500 transition-colors p-2">
                        <i className="fa-solid fa-gear"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-[3rem] p-12 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <i className="fa-solid fa-satellite text-9xl"></i>
            </div>
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="text-3xl font-black font-brand text-white">Select Deployment</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-zinc-600 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {techs.map(tech => (
                <button 
                  key={tech.id}
                  onClick={() => handleAssign(selectedRequest.id, tech.id)}
                  className="w-full flex items-center justify-between p-6 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-3xl transition-all group active:scale-95"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-500 transition-colors border border-zinc-800">
                      <i className="fa-solid fa-user-gear text-2xl"></i>
                    </div>
                    <div className="text-left">
                      <div className="font-black text-white text-lg">{tech.name}</div>
                      <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                         Active Unit • Standby
                      </div>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-zinc-800 group-hover:text-blue-500 transition-colors"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
