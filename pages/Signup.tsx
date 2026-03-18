
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { notificationService } from '../services/notification';
import { User, UserRole } from '../types';
import { translations } from '../translations';

interface SignupProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin, onNavigate }) => {
  useEffect(() => {
    document.title = "AutoGo | Join the Fleet";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER,
    companyCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const authT = translations['en'].auth;

  const COMPANY_CODES = {
    [UserRole.TECHNICIAN]: 'TECH2024',
    [UserRole.ADMIN]: 'ADMIN2024'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate company code for staff roles
    if (formData.role !== UserRole.CUSTOMER) {
      const requiredCode = COMPANY_CODES[formData.role as keyof typeof COMPANY_CODES];
      if (formData.companyCode !== requiredCode) {
        setError(authT.invalidCode);
        setLoading(false);
        return;
      }
    }

    const cleanEmail = formData.email.trim();
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const user = db.registerUser({
        name: formData.name,
        email: cleanEmail,
        password: formData.password,
        role: formData.role
      });
      
      notificationService.notifyAdminOnRegistration(user).catch(() => {});
      db.setCurrentUser(user);
      onLogin(user);
    } catch (err: any) {
      if (err.message === 'EMAIL_EXISTS') {
        setError('This email is already registered. Please sign in or use another email.');
      } else {
        setError('System unavailable. Please try again.');
      }
      setLoading(false);
    }
  };

  const roles = [
    {
      id: UserRole.CUSTOMER,
      title: 'Driver (Client)',
      desc: 'Request roadside help',
      icon: 'fa-car-side'
    },
    {
      id: UserRole.TECHNICIAN,
      title: 'Expert Tech',
      desc: 'Join the repair fleet',
      icon: 'fa-screwdriver-wrench'
    },
    {
      id: UserRole.ADMIN,
      title: 'Mission Admin',
      desc: 'Control the network',
      icon: 'fa-shield-halved'
    }
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 animate-in fade-in zoom-in duration-500">
      <div className="bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-zinc-800 w-full max-w-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black font-brand mb-4 text-white tracking-tighter">
              Create <span className="text-blue-500">Account</span>
            </h2>
            <p className="text-zinc-500 font-medium">Choose your rank and join the revolution</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-sm font-bold flex items-center gap-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}
            
            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({...formData, role: role.id})}
                  className={`relative p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col items-center sm:items-start group ${
                    formData.role === role.id 
                      ? 'border-blue-600 bg-blue-600/5 shadow-xl shadow-blue-600/10' 
                      : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    formData.role === role.id ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-300'
                  }`}>
                    <i className={`fa-solid ${role.icon} text-xl`}></i>
                  </div>
                  <h4 className={`text-sm font-black uppercase tracking-tight mb-1 ${formData.role === role.id ? 'text-white' : 'text-zinc-400'}`}>
                    {role.title}
                  </h4>
                  <p className="text-[10px] text-zinc-600 font-bold leading-tight line-clamp-2">
                    {role.desc}
                  </p>
                  {formData.role === role.id && (
                    <div className="absolute top-4 right-4 text-blue-500 animate-in zoom-in">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-600 mb-3 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                  placeholder="Jane Cooper"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-600 mb-3 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-600 mb-3 ml-1">Secure Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {formData.role !== UserRole.CUSTOMER && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-600 mb-3 ml-1">
                  {authT.companyCode}
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-blue-600/5 border border-blue-600/20 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                  placeholder={authT.companyCodePlaceholder}
                  value={formData.companyCode}
                  onChange={e => setFormData({...formData, companyCode: e.target.value})}
                />
                <p className="text-[10px] text-zinc-500 mt-2 ml-1 font-bold">
                  {authT.staffOnly}
                </p>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/30 text-xl hover:-translate-y-1 active:scale-95 mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Syncing...</span>
                </div>
              ) : (
                'Initialize Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 font-medium">
              Already a member? 
              <button 
                onClick={() => onNavigate('login')} 
                className="text-blue-500 font-bold hover:underline ml-1"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
