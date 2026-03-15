
import React, { useState, useRef } from 'react';
import { JOB_CATEGORIES } from '../constants';
import { db } from '../services/db';

const Careers: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: JOB_CATEGORIES[0],
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.addApplication(formData);
    setSubmitted(true);
  };

  const selectRole = (role: string) => {
    setFormData(prev => ({ ...prev, role }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Add a temporary highlight effect to the select input if possible, 
    // but the smooth scroll and pre-select are the main UX wins.
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top-10 duration-700">
        <h1 className="text-6xl font-black font-brand mb-6 text-white tracking-tighter">Join the <span className="text-blue-500">Revolution</span></h1>
        <p className="text-zinc-400 text-xl leading-relaxed">
          We're looking for problem solvers, road warriors, and innovators to build the future of mobile automotive infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-black mb-6 font-brand tracking-tight text-white">Why AutoGo?</h3>
            <div className="space-y-6">
              {[
                { title: 'Innovation First', desc: 'Use AI and advanced diagnostics to solve complex problems.', icon: 'fa-brain' },
                { title: 'Flexibility', desc: 'Choose your shifts and own your territory.', icon: 'fa-calendar-check' },
                { title: 'Great Pay', desc: 'Competitive salaries and performance-based bonuses.', icon: 'fa-hand-holding-dollar' },
                { title: 'Training', desc: 'Regular workshops on the latest automotive electronics.', icon: 'fa-graduation-cap' }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <i className={`fa-solid ${benefit.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{benefit.title}</h4>
                    <p className="text-sm text-zinc-500">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <i className="fa-solid fa-briefcase text-8xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-6 font-brand text-white">Open Roles</h3>
            <div className="divide-y divide-zinc-800/50">
              {JOB_CATEGORIES.map((role, idx) => (
                <div 
                  key={idx} 
                  onClick={() => selectRole(role)}
                  className="py-5 flex justify-between items-center group cursor-pointer hover:px-2 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-zinc-400 group-hover:text-white font-bold transition-colors">{role}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 opacity-0 group-hover:opacity-100 transition-all">Apply Now</span>
                    <i className="fa-solid fa-arrow-right text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-2 transition-all"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={formRef}>
          {submitted ? (
            <div className="bg-zinc-900 border border-emerald-500/20 p-16 rounded-[3rem] text-center space-y-8 animate-in zoom-in shadow-2xl">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 text-4xl shadow-inner">
                <i className="fa-solid fa-paper-plane animate-bounce"></i>
              </div>
              <div>
                <h2 className="text-3xl font-black font-brand text-white mb-2">Application Sent!</h2>
                <p className="text-zinc-500 leading-relaxed">Thank you for your interest in AutoGo. Our talent team will review your profile and reach out within 48 hours.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-4 rounded-2xl font-black transition-all"
              >
                Send Another Application
              </button>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-50"></div>
              <h3 className="text-3xl font-black mb-10 font-brand text-white tracking-tight">Apply for <span className="text-blue-500">{formData.role}</span></h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Selected Role</label>
                  <select 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-white shadow-inner cursor-pointer"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    {JOB_CATEGORIES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Experience Summary</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Tell us about your background and why you're a fit for AutoGo..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-white shadow-inner"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/30 text-xl hover:-translate-y-1 active:scale-95"
                >
                  Submit Application
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
