
import React, { useState, useEffect } from 'react';
import { User, ServiceRequest, RequestStatus } from '../types';
import { db } from '../services/db';
import { translations } from '../translations';

interface TechDashboardProps {
  user: User;
}

const TechDashboard: React.FC<TechDashboardProps> = ({ user }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [notifiedArrival, setNotifiedArrival] = useState<Record<string, boolean>>({});
  const [completingRequest, setCompletingRequest] = useState<string | null>(null);
  const [techNotes, setTechNotes] = useState('');
  const t = translations['en'].tech;

  useEffect(() => {
    const fetchRequests = () => {
      const all = db.getRequests();
      setRequests(all.filter(r => r.technicianId === user.id).reverse());
    };
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [user.id]);

  const updateStatus = (id: string, newStatus: RequestStatus, notes?: string) => {
    db.updateRequest(id, { status: newStatus, techNotes: notes });
    const all = db.getRequests();
    setRequests(all.filter(r => r.technicianId === user.id).reverse());
    if (newStatus === RequestStatus.COMPLETED) {
      setCompletingRequest(null);
      setTechNotes('');
    }
  };

  const handleNotifyArrival = (reqId: string) => {
    setNotifiedArrival(prev => ({ ...prev, [reqId]: true }));
  };

  const currentJobs = requests.filter(r => r.status !== RequestStatus.COMPLETED);
  const completedCount = requests.filter(r => r.status === RequestStatus.COMPLETED).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-700 pb-32">
      {/* Completion Modal */}
      {completingRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-3xl font-black font-brand text-white mb-4">{t.finishTitle}</h3>
            <p className="text-zinc-400 mb-8">{t.finishDesc}</p>
            
            <textarea
              value={techNotes}
              onChange={(e) => setTechNotes(e.target.value)}
              placeholder={t.summaryPlaceholder}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none mb-8"
              rows={4}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setCompletingRequest(null)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => updateStatus(completingRequest, RequestStatus.COMPLETED, techNotes)}
                className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95"
              >
                {t.submitFinish}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tech Status Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 mb-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <span className="flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
           </span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 rounded-[2rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center text-4xl text-blue-500 relative">
             {user.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover rounded-[2rem]" alt="Avatar" />
             ) : (
                <i className="fa-solid fa-user-gear"></i>
             )}
             <div className="absolute -bottom-2 -right-2 bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs border-4 border-zinc-900">
                <i className="fa-solid fa-check"></i>
             </div>
          </div>
          <div>
            <h1 className="text-4xl font-black font-brand tracking-tighter text-white">{user.name}</h1>
            <div className="flex items-center gap-4 mt-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20">System Online</span>
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Zone Delta-44</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 text-right">
          <div>
            <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Today's Jobs</div>
            <div className="text-3xl font-black text-white">{completedCount}</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Performance</div>
            <div className="text-3xl font-black text-amber-500">5.0 <i className="fa-solid fa-star text-xs"></i></div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex justify-between items-center px-4">
           <h2 className="text-2xl font-black font-brand tracking-tight">Deployment Queue</h2>
           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{currentJobs.length} {t.activeMissions}</span>
        </div>

        {requests.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-32 text-center group transition-all hover:bg-zinc-900/50">
            <div className="w-24 h-24 bg-zinc-950 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-zinc-800 group-hover:rotate-12 transition-transform">
               <i className="fa-solid fa-satellite-dish text-zinc-800 text-4xl"></i>
            </div>
            <p className="text-zinc-500 font-black uppercase tracking-widest text-sm">{t.awaitingOrders}</p>
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:border-zinc-700 animate-in slide-in-from-bottom-10 duration-500">
              <div className="p-10 space-y-10">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-600/20">
                         <i className="fa-solid fa-truck-pickup"></i>
                      </div>
                      <div>
                         <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-1">Mission Identifier</div>
                         <div className="text-2xl font-black text-white uppercase font-mono tracking-tighter">#{req.id.toUpperCase()}</div>
                      </div>
                   </div>
                   <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${req.status === RequestStatus.COMPLETED ? 'border-emerald-500/20 text-emerald-500' : 'border-blue-500/20 text-blue-500'}`}>
                      {req.status}
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-800">
                    <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-4">Target Intel</div>
                    <div className="text-2xl font-black text-white mb-1">{req.customerName}</div>
                    <div className="text-sm text-blue-500 font-bold uppercase tracking-widest">{req.vehicleInfo}</div>
                  </div>
                  <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-800 relative group overflow-hidden">
                    <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-4">Route Info</div>
                    <div className="text-lg font-bold text-white mb-4 truncate">{req.location}</div>
                    <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all">
                       <i className="fa-solid fa-location-arrow text-blue-500"></i> Open Navigator
                    </button>
                  </div>
                </div>

                <div className="bg-blue-600/5 p-8 rounded-[2.5rem] border border-blue-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <i className="fa-solid fa-brain text-7xl"></i>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-blue-500">
                    <i className="fa-solid fa-clipboard-check"></i>
                    <span className="text-[11px] font-black uppercase tracking-widest">Smart Diagnostic Audit</span>
                  </div>
                  <p className="text-zinc-300 text-sm italic leading-relaxed font-medium">
                    "{req.aiDiagnosis}"
                  </p>
                </div>

                {/* Mission Control Actions */}
                <div className="flex flex-col md:flex-row gap-5 pt-4">
                  {req.status === RequestStatus.ASSIGNED && (
                    <button 
                      onClick={() => updateStatus(req.id, RequestStatus.IN_PROGRESS)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[1.5rem] shadow-2xl shadow-blue-600/30 transition-all active:scale-95 text-xl relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      {t.startMission}
                    </button>
                  )}
                  
                  {req.status === RequestStatus.IN_PROGRESS && (
                    <>
                      <button 
                        onClick={() => setCompletingRequest(req.id)}
                        className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-black py-6 rounded-[1.5rem] shadow-2xl shadow-emerald-600/30 transition-all active:scale-95 text-xl"
                      >
                        {t.submitFinish}
                      </button>
                      <button 
                        onClick={() => handleNotifyArrival(req.id)}
                        disabled={notifiedArrival[req.id]}
                        className={`flex-1 ${notifiedArrival[req.id] ? 'bg-zinc-800 text-emerald-500 border-emerald-500/20' : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'} font-black py-6 rounded-[1.5rem] border transition-all active:scale-95 text-lg`}
                      >
                        {notifiedArrival[req.id] ? t.customerNotified : t.arrivalSignal}
                      </button>
                    </>
                  )}

                  {req.status === RequestStatus.COMPLETED && (
                    <div className="w-full bg-emerald-500/10 text-emerald-500 text-center py-8 rounded-[1.5rem] border border-emerald-500/20 font-black uppercase tracking-widest text-lg animate-in zoom-in">
                      <i className="fa-solid fa-circle-check mr-3"></i> {t.successMsg}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TechDashboard;
