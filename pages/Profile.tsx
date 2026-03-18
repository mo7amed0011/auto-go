
import React, { useState, useRef } from 'react';
import { User } from '../types';
import { db } from '../services/db';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || '',
    avatar: user.avatar || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Short artificial delay for UX feel
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const updated = db.updateUser(user.id, formData);
      if (updated) {
        onUpdate(updated);
        setMessage({ 
          type: 'success', 
          text: 'Your profile has been updated!' 
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Update failed.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600 bg-size-200 animate-gradient"></div>
        
        <div className="px-8 md:px-12 pb-12 -mt-20">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2rem] bg-zinc-800 border-8 border-zinc-900 overflow-hidden shadow-2xl transition-transform group-hover:scale-105 duration-500">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-zinc-700 bg-zinc-800">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl hover:bg-blue-700 transition-all hover:rotate-12"
              >
                <i className="fa-solid fa-camera text-lg"></i>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
            
            <div className="flex-grow mb-4">
              <h1 className="text-4xl font-black font-brand text-white tracking-tighter">{user.name}</h1>
              <p className="text-zinc-500 font-medium">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            {message && (
              <div className={`md:col-span-2 p-5 rounded-2xl text-sm font-bold flex items-center gap-4 animate-in zoom-in duration-300 ${
                message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} text-lg`}></i>
                {message.text}
              </div>
            )}

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-zinc-500 mb-3 ml-1 group-focus-within:text-blue-500 transition-colors">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-zinc-500 mb-3 ml-1 group-focus-within:text-blue-500 transition-colors">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-zinc-500 mb-3 ml-1 group-focus-within:text-blue-500 transition-colors">
                  Primary Location
                </label>
                <textarea 
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-white transition-all shadow-inner"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/30 text-lg hover:-translate-y-1 active:scale-95"
              >
                {isSaving ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Saving Changes...</span>
                  </div>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
