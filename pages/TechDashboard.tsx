
import React, { useState, useEffect } from 'react';
import { User, ServiceRequest, RequestStatus } from '../types';
import { db } from '../services/db';

interface TechDashboardProps {
  user: User;
}

const TechDashboard: React.FC<TechDashboardProps> = ({ user }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const all = db.getRequests();
    setRequests(all.filter(r => r.technicianId === user.id).reverse());
  }, [user.id]);

  const updateStatus = (id: string, newStatus: RequestStatus) => {
    db.updateRequest(id, { status: newStatus });
    setRequests(db.getRequests().filter(r => r.technicianId === user.id).reverse());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-brand">{user.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-emerald-500 font-bold uppercase">Active Duty</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Jobs Done Today</div>
          <div className="text-2xl font-black">4</div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold font-brand mb-4">Your Assignments</h2>
        {requests.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
            No active jobs assigned yet.
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/30">
                <div>
                  <div className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter">Job ID</div>
                  <div className="font-mono text-sm">#{req.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter">Status</div>
                  <div className="text-xs font-bold text-blue-500">{req.status}</div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter mb-1">Customer</div>
                    <div className="text-sm font-bold">{req.customerName}</div>
                  </div>
                  <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                    <div className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter mb-1">Vehicle</div>
                    <div className="text-sm font-bold">{req.vehicleInfo}</div>
                  </div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter mb-2">Issue & AI Analysis</div>
                  <div className="text-sm text-zinc-300 font-medium mb-2">{req.description}</div>
                  <div className="text-xs text-blue-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 italic">
                    "{req.aiDiagnosis}"
                  </div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter mb-1">Location</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold">{req.location}</div>
                    <button className="text-blue-500 flex items-center gap-2 text-xs font-bold">
                      <i className="fa-solid fa-map-location-dot"></i> Open Maps
                    </button>
                  </div>
                </div>

                {req.status === RequestStatus.ASSIGNED && (
                  <button 
                    onClick={() => updateStatus(req.id, RequestStatus.IN_PROGRESS)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                  >
                    Start Repair Job
                  </button>
                )}
                
                {req.status === RequestStatus.IN_PROGRESS && (
                  <button 
                    onClick={() => updateStatus(req.id, RequestStatus.COMPLETED)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                  >
                    Mark Job as Complete
                  </button>
                )}

                {req.status === RequestStatus.COMPLETED && (
                  <div className="w-full bg-emerald-500/10 text-emerald-500 text-center py-4 rounded-2xl border border-emerald-500/20 font-bold">
                    <i className="fa-solid fa-check-circle mr-2"></i> Completed
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TechDashboard;
