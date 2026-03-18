
import React, { useState, useRef, useEffect } from 'react';
import { db } from '../services/db';
import { User, UserRole } from '../types';
import { translations } from '../translations';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  useEffect(() => {
    document.title = "AutoGo | Login";
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const authT = translations['en'].auth;

  // Fixed Demo Credentials
  const DEMO_PASSWORDS: Record<string, string> = {
    'admin@autogo.com': 'admin123',
    'tech@autogo.com': 'tech123',
    'mohamed@autogo.com': 'user123'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = db.getUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && foundUser.password === password) {
      db.setCurrentUser(foundUser);
      onLogin(foundUser);
    } else {
      setError('Invalid credentials. Please check your email and password.');
      setIsLoading(false);
    }
  };

  const handleSelectRole = (role: UserRole) => {
    let demoEmail = '';

    switch(role) {
      case UserRole.ADMIN:
        demoEmail = 'admin@autogo.com';
        break;
      case UserRole.TECHNICIAN:
        demoEmail = 'tech@autogo.com';
        break;
      case UserRole.CUSTOMER:
        demoEmail = 'mohamed@autogo.com';
        break;
    }

    setEmail(demoEmail);
    setPassword(''); // Clear current password to force re-entry
    setError('');
    
    // Auto focus password field
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 100);
  };

  const demoRoles = [
    {
      id: UserRole.CUSTOMER,
      title: 'Driver',
      icon: 'fa-car-side',
      color: 'border-blue-500/20 hover:border-blue-500 hover:bg-blue-500/5'
    },
    {
      id: UserRole.TECHNICIAN,
      title: 'Tech',
      icon: 'fa-screwdriver-wrench',
      color: 'border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/5'
    },
    {
      id: UserRole.ADMIN,
      title: 'Admin',
      icon: 'fa-shield-halved',
      color: 'border-purple-500/20 hover:border-purple-500 hover:bg-purple-500/5'
    }
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 animate-in fade-in duration-500">
      <div className="bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-zinc-800 w-full max-w-4xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px]"></div>
        
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          
          {/* Quick Selection Side */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-zinc-800 pb-10 md:pb-0 md:pr-12">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-2xl font-black font-brand text-white tracking-tighter">Choose <span className="text-blue-500">Role</span></h2>
              <p className="text-zinc-500 text-sm font-medium">Select a role to auto-fill the form</p>
            </div>

            <div className="space-y-4">
              {demoRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleSelectRole(role.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border bg-zinc-950/50 transition-all group active:scale-95 ${
                    email.toLowerCase() === (role.id === UserRole.ADMIN ? 'admin@autogo.com' : role.id === UserRole.TECHNICIAN ? 'tech@autogo.com' : 'mohamed@autogo.com')
                    ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/50' 
                    : role.color
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors ${
                      email.toLowerCase() === (role.id === UserRole.ADMIN ? 'admin@autogo.com' : role.id === UserRole.TECHNICIAN ? 'tech@autogo.com' : 'mohamed@autogo.com')
                      ? 'text-blue-500 border-blue-500/30' : 'text-zinc-500 group-hover:text-inherit'
                    }`}>
                      <i className={`fa-solid ${role.icon} text-lg`}></i>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-black text-white group-hover:translate-x-1 transition-transform">{role.title}</div>
                      <div className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Select Role</div>
                    </div>
                  </div>
                  {email.toLowerCase() === (role.id === UserRole.ADMIN ? 'admin@autogo.com' : role.id === UserRole.TECHNICIAN ? 'tech@autogo.com' : 'mohamed@autogo.com') && (
                    <i className="fa-solid fa-circle-check text-blue-500 animate-in zoom-in"></i>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form Side */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-3xl font-black font-brand text-white tracking-tighter">Security <span className="text-emerald-500">Check</span></h2>
              <p className="text-zinc-500 text-sm font-medium">Enter password to authorize access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold flex items-center gap-2 animate-shake">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2 ml-1">Identity (Email)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2 ml-1">Access Key (Password)</label>
                <input 
                  ref={passwordInputRef}
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-5 rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-lg mt-4 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-shield-check"></i>
                    <span>Authorize Login</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-zinc-500 text-xs">
                New operative? <button onClick={() => onNavigate('signup')} className="text-blue-500 font-bold hover:underline">Join the Fleet</button>
              </p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default Login;
