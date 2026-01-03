
import React, { useState } from 'react';
import { db } from '../services/db';
import { notificationService } from '../services/notification';
import { User, UserRole } from '../types';

interface SignupProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newUser = db.registerUser({
        name: formData.name,
        email: formData.email,
        role: formData.role
      });
      
      // إرسال التنبيه للإيميل المطلوب mo7amed0839@gmail.com
      await notificationService.notifyAdminOnRegistration(newUser);
      
      db.setCurrentUser(newUser);
      onLogin(newUser);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 w-full max-w-lg shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold font-brand mb-3">Join Auto<span className="text-blue-500">Go</span></h2>
            <p className="text-zinc-500">Create an account and get back on the road faster.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Ali Ahmed"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">I am a...</label>
                <select 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                >
                  <option value={UserRole.CUSTOMER}>Driver (Customer)</option>
                  <option value={UserRole.TECHNICIAN}>Technician (Mechanic)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="ali@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Create Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/30 text-lg"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : 'Register Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              Already have an account? <button onClick={() => onNavigate('login')} className="text-blue-500 font-bold hover:underline">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
