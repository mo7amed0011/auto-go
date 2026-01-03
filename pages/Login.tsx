
import React, { useState } from 'react';
import { db } from '../services/db';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = db.getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      db.setCurrentUser(foundUser);
      onLogin(foundUser);
    } else {
      setError('Invalid credentials. Check your email or sign up.');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    const users = db.getUsers();
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      db.setCurrentUser(demoUser);
      onLogin(demoUser);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-brand mb-2">Welcome Back</h2>
          <p className="text-zinc-500">Sign in to manage your AutoGo account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Don't have an account? <button onClick={() => onNavigate('signup')} className="text-blue-500 font-bold hover:underline">Register Now</button>
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-800">
          <p className="text-[10px] text-center text-zinc-500 uppercase tracking-widest font-bold mb-6">Quick Access (Demo)</p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleQuickLogin(UserRole.ADMIN)} className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl text-[10px] font-bold transition-colors">Admin</button>
            <button onClick={() => handleQuickLogin(UserRole.TECHNICIAN)} className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl text-[10px] font-bold transition-colors">Tech</button>
            <button onClick={() => handleQuickLogin(UserRole.CUSTOMER)} className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl text-[10px] font-bold transition-colors">Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
