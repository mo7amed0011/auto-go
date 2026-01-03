
import React, { useState } from 'react';
import { JOB_CATEGORIES } from '../constants';
import { db } from '../services/db';

const Careers: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-bold font-brand mb-6">Join the Revolution</h1>
        <p className="text-zinc-400 text-xl leading-relaxed">
          We're looking for problem solvers, road warriors, and innovators to build the future of mobile automotive infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-brand">Why AutoGo?</h3>
            <p className="text-zinc-500 mb-8">Work at the intersection of technology and mechanical engineering.</p>
            <div className="space-y-6">
              {[
                { title: 'Innovation First', desc: 'Use AI and advanced diagnostics to solve complex problems.' },
                { title: 'Flexibility', desc: 'Choose your shifts and own your territory.' },
                { title: 'Great Pay', desc: 'Competitive salaries and performance-based bonuses.' },
                { title: 'Training', desc: 'Regular workshops on the latest automotive electronics and systems.' }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 flex-shrink-0">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">{benefit.title}</h4>
                    <p className="text-sm text-zinc-500">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Open Roles</h3>
            <div className="divide-y divide-zinc-800">
              {JOB_CATEGORIES.map((role, idx) => (
                <div key={idx} className="py-4 flex justify-between items-center group cursor-pointer">
                  <span className="text-zinc-300 group-hover:text-blue-500 transition-colors">{role}</span>
                  <i className="fa-solid fa-arrow-right text-zinc-700 group-hover:text-blue-500 transition-all"></i>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-zinc-900 border border-emerald-500/20 p-12 rounded-3xl text-center space-y-6 animate-in zoom-in">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 text-3xl">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              <h2 className="text-3xl font-bold font-brand text-emerald-500">Application Sent!</h2>
              <p className="text-zinc-400">Thank you for your interest in AutoGo. Our operations team will review your application and get back to you within 3 business days.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-xl font-bold"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 font-brand">Apply Now</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Interested Role</label>
                  <select 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    {JOB_CATEGORIES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Experience Summary</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Briefly tell us about your background..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
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
