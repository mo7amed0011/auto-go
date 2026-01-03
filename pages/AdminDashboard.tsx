
import React, { useState, useEffect } from 'react';
import { ServiceRequest, RequestStatus, User, UserRole } from '../types';
import { db } from '../services/db';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [techs, setTechs] = useState<User[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    setRequests(db.getRequests().reverse());
    setTechs(db.getUsers().filter(u => u.role === UserRole.TECHNICIAN));
  }, []);

  const stats = [
    { name: 'Pending', count: requests.filter(r => r.status === RequestStatus.PENDING).length, color: '#eab308' },
    { name: 'Active', count: requests.filter(r => r.status === RequestStatus.ASSIGNED || r.status === RequestStatus.IN_PROGRESS).length, color: '#3b82f6' },
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-brand mb-2">Operations Center</h1>
        <p className="text-zinc-500">Fleet management and system-wide monitoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="text-sm text-zinc-500 uppercase font-bold tracking-widest mb-1">Total Jobs</div>
            <div className="text-3xl font-black">{requests.length}</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="text-sm text-zinc-500 uppercase font-bold tracking-widest mb-1">Technicians</div>
            <div className="text-3xl font-black">{techs.length}</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="text-sm text-zinc-500 uppercase font-bold tracking-widest mb-1">Success Rate</div>
            <div className="text-3xl font-black text-emerald-500">92%</div>
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 min-h-[300px]">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Service Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" axisLine={false} tickLine={false} />
                <YAxis stroke="#52525b" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#18181b'}} contentStyle={{backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '10px'}} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <h2 className="text-lg font-bold font-brand">Live Requests</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-zinc-800 text-xs rounded-md hover:bg-zinc-700">Filter</button>
            <button className="px-3 py-1 bg-zinc-800 text-xs rounded-md hover:bg-zinc-700">Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950/30">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Request ID</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Issue</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Assigned To</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">#{req.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold">{req.customerName}</div>
                    <div className="text-xs text-zinc-500">{req.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{req.problemType}</div>
                    <div className="text-xs text-zinc-500">{req.vehicleInfo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter 
                      ${req.status === RequestStatus.PENDING ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                        req.status === RequestStatus.COMPLETED ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                        'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {req.technicianId ? techs.find(t => t.id === req.technicianId)?.name : 'Unassigned'}
                  </td>
                  <td className="px-6 py-4">
                    {req.status === RequestStatus.PENDING ? (
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                      >
                        Assign Tech
                      </button>
                    ) : (
                      <button className="text-zinc-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-brand">Assign Technician</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-zinc-500 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <p className="text-sm text-zinc-400 mb-6">Dispatching for request #{selectedRequest.id} in {selectedRequest.location}</p>
            <div className="space-y-3">
              {techs.map(tech => (
                <button 
                  key={tech.id}
                  onClick={() => handleAssign(selectedRequest.id, tech.id)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-user-gear text-zinc-400"></i>
                    </div>
                    <div className="text-left">
                      <div className="font-bold">{tech.name}</div>
                      <div className="text-xs text-zinc-500">Online & Ready</div>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-zinc-700"></i>
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
