
import React, { useState, useEffect, useRef } from 'react';
import { User, ServiceRequest, RequestStatus } from '../types';
import { db } from '../services/db';

interface CustomerDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, onNavigate }) => {
  useEffect(() => {
    document.title = "AutoGo | Customer Dashboard";
  }, []);

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'tech', text: 'Hello! I am on my way to your location.', time: '2m ago' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRequests = () => {
      const all = db.getRequests();
      setRequests(all.filter(r => r.customerId === user.id).reverse());
    };
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [user.id]);

  useEffect(() => {
    let interval: any;
    if (isCalling) {
      interval = setInterval(() => setCallTimer(prev => prev + 1), 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const activeRequest = requests.find(r => r.status === RequestStatus.ASSIGNED || r.status === RequestStatus.IN_PROGRESS);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg = { sender: 'user', text: newMessage, time: 'Just now' };
    setChatMessages([...chatMessages, msg]);
    setNewMessage('');

    // Simulate tech response after 1.5s
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'tech', 
        text: 'Received! Checking your location details now.', 
        time: 'Just now' 
      }]);
    }, 1500);
  };

  const getStatusStyle = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.PENDING: return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case RequestStatus.ASSIGNED: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case RequestStatus.IN_PROGRESS: return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
      case RequestStatus.COMPLETED: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-black font-brand text-white tracking-tighter">
            Control <span className="text-blue-500">Center</span>
          </h1>
          <p className="text-zinc-500 text-lg mt-2 font-medium">Hello, {user.name.split(' ')[0]}! Your fleet is under protection.</p>
        </div>
        <button 
          onClick={() => onNavigate('request')}
          className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-3 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
          <i className="fa-solid fa-plus"></i> New Request
        </button>
      </div>

      {/* Hero Section for Active Missions */}
      {activeRequest ? (
        <div className="mb-16 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="p-10 md:p-14 space-y-10">
              <div className="flex items-center gap-3 bg-blue-600/10 w-fit px-4 py-1.5 rounded-full border border-blue-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-500 font-black uppercase tracking-widest text-[10px]">Mission Live Tracking</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black font-brand text-white leading-tight">
                Unit En-Route <br /><span className="text-blue-500">To Your GPS</span>
              </h2>

              <div className="flex flex-wrap gap-4">
                <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 flex-1 min-w-[150px]">
                  <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Estimated ETA</div>
                  <div className="text-2xl font-black text-white">12-15 Min</div>
                </div>
                <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 flex-1 min-w-[150px]">
                  <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Technician</div>
                  <div className="text-xl font-black text-blue-500">John Smith</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setIsCalling(true)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all border border-zinc-700 shadow-lg shadow-black/20 active:scale-95">
                  <i className="fa-solid fa-phone text-emerald-500"></i> Call Tech
                </button>
                <button onClick={() => setIsChatOpen(true)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all border border-zinc-700 shadow-lg shadow-black/20 active:scale-95">
                  <i className="fa-solid fa-message text-blue-500"></i> Chat
                </button>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block overflow-hidden">
               <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-10 grayscale" alt="Map Overlay" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-900"></div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="fa-solid fa-bolt-lightning text-8xl group-hover:scale-110 transition-transform duration-700"></i>
            </div>
            <div>
              <h3 className="text-2xl font-black font-brand text-white mb-2">Request Details</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Ticket #{activeRequest.id.toUpperCase()}</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-600">
                    <i className="fa-solid fa-car"></i>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-bold">{activeRequest.vehicleInfo}</div>
                    <div className="text-[10px] text-zinc-600 font-black uppercase">{activeRequest.problemType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-600">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="text-xs text-zinc-400 font-bold truncate max-w-[150px]">{activeRequest.location}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
               <p className="text-[11px] text-blue-400 italic leading-relaxed">
                 "Our technician is equipped with the necessary tools for your {activeRequest.problemType.toLowerCase()} issue."
               </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-16 p-20 bg-zinc-900/30 border-2 border-dashed border-zinc-900 rounded-[3rem] text-center group transition-colors hover:border-zinc-800">
           <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform">
             <i className="fa-solid fa-satellite-dish text-zinc-800 text-4xl group-hover:text-blue-500"></i>
           </div>
           <h3 className="text-2xl font-black text-white mb-2">Ready for Missions</h3>
           <p className="text-zinc-600 max-w-xs mx-auto text-sm">You haven't requested help recently. Stay safe out there!</p>
        </div>
      )}

      {/* History & Status Grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black font-brand text-white">Activity History</h2>
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{requests.length} Records Found</span>
          </div>
          <div className="space-y-4">
            {requests.length > 0 ? requests.map(req => (
              <div key={req.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition-all group">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl border ${getStatusStyle(req.status)}`}>
                    <i className={`fa-solid ${req.status === RequestStatus.COMPLETED ? 'fa-check' : 'fa-wrench'}`}></i>
                  </div>
                  <div>
                    <div className="font-black text-white text-lg">{req.vehicleInfo}</div>
                    <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">
                      {new Date(req.createdAt).toLocaleDateString()} • {req.problemType}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(req.status)}`}>
                    {req.status}
                  </span>
                  <button onClick={() => setSelectedReq(req)} className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-500 transition-colors">
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-zinc-900 italic text-zinc-600">
                No past records available.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-2xl font-black font-brand text-white">Account Status</h2>
           <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 <i className="fa-solid fa-crown text-8xl"></i>
              </div>
              <h3 className="text-xl font-black text-white mb-8">Membership</h3>
              <div className="space-y-8">
                 <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 ${user.isPro ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-950 text-zinc-500'} rounded-2xl flex items-center justify-center text-2xl border border-zinc-800`}>
                       <i className="fa-solid fa-gem"></i>
                    </div>
                    <div>
                       <div className="font-black text-white text-lg">AutoGo {user.isPro ? 'PRO' : 'Basic'}</div>
                       <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Active Member</div>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                       <span className="text-zinc-500 font-bold uppercase tracking-tighter">Support Level</span>
                       <span className="text-white font-black">{user.isPro ? 'Priority 24/7' : 'Standard'}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                       <div className={`h-full bg-blue-600 ${user.isPro ? 'w-full' : 'w-1/3'}`}></div>
                    </div>
                 </div>

                 {!user.isPro && (
                   <button 
                    onClick={() => onNavigate('pro')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95"
                   >
                     Upgrade to PRO
                   </button>
                 )}
              </div>
           </div>
           
           <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center text-2xl">
                 <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                 <div className="text-white font-black">Roadside Shield</div>
                 <p className="text-zinc-600 text-[10px] font-bold uppercase">Active and Protecting</p>
              </div>
           </div>
        </div>
      </div>

      {/* CALLING OVERLAY */}
      {isCalling && (
        <div className="fixed inset-0 z-[1000] bg-zinc-950/95 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300 backdrop-blur-md">
           <div className="relative mb-12">
              <div className="w-40 h-40 rounded-full bg-blue-600/20 flex items-center justify-center animate-pulse">
                 <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=John+Smith&background=18181b&color=3b82f6" alt="Tech" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="absolute -bottom-2 right-4 bg-emerald-500 w-8 h-8 rounded-full border-4 border-zinc-950 flex items-center justify-center">
                 <i className="fa-solid fa-signal text-[10px] text-white"></i>
              </div>
           </div>
           
           <h2 className="text-3xl font-black text-white mb-2 font-brand">John Smith</h2>
           <p className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-8">Connected • Secure Line</p>
           
           <div className="text-6xl font-black text-white font-mono mb-20">{formatTime(callTimer)}</div>
           
           <div className="flex gap-8">
              <button className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-white text-xl hover:bg-zinc-700 transition-all">
                 <i className="fa-solid fa-microphone-slash"></i>
              </button>
              <button 
                onClick={() => setIsCalling(false)}
                className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl shadow-red-600/40 hover:bg-red-700 transition-all active:scale-90"
              >
                 <i className="fa-solid fa-phone-slash"></i>
              </button>
              <button className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-white text-xl hover:bg-zinc-700 transition-all">
                 <i className="fa-solid fa-volume-high"></i>
              </button>
           </div>
        </div>
      )}

      {/* CHAT OVERLAY */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300 backdrop-blur-sm">
           <div className="bg-zinc-900 w-full max-w-lg h-[100vh] sm:h-[80vh] flex flex-col rounded-t-[2.5rem] sm:rounded-[2.5rem] border-t sm:border border-zinc-800 shadow-3xl overflow-hidden animate-in slide-in-from-bottom-10">
              {/* Chat Header */}
              <div className="p-6 bg-zinc-950/50 border-b border-zinc-800 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 relative">
                       <i className="fa-solid fa-user-gear text-xl"></i>
                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950"></span>
                    </div>
                    <div>
                       <div className="font-black text-white">Tech Support • John</div>
                       <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active Now</div>
                    </div>
                 </div>
                 <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-500 transition-colors"
                 >
                    <i className="fa-solid fa-xmark text-lg"></i>
                 </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                 {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[80%] p-4 rounded-2xl ${
                         msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10' 
                          : 'bg-zinc-800 text-zinc-300 rounded-tl-none border border-zinc-700'
                       }`}>
                          <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                          <div className={`text-[9px] mt-2 font-bold uppercase tracking-widest ${msg.sender === 'user' ? 'text-blue-100' : 'text-zinc-500'}`}>
                             {msg.time}
                          </div>
                       </div>
                    </div>
                 ))}
                 <div ref={chatEndRef}></div>
              </div>

              {/* Chat Input */}
              <div className="p-6 bg-zinc-950 border-t border-zinc-800">
                 <form onSubmit={handleSendMessage} className="flex gap-4">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-all shadow-inner"
                    />
                    <button 
                      type="submit"
                      className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                    >
                       <i className="fa-solid fa-paper-plane"></i>
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
