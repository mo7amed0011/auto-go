
import React from 'react';
import { PRO_PLANS } from '../constants';

const ProPlans: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold font-brand mb-6">AutoGo <span className="text-blue-500">PRO</span></h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          Upgrade your driving experience with priority response and exclusive roadside benefits.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PRO_PLANS.map((plan, idx) => (
          <div key={idx} className={`bg-zinc-900 rounded-[2rem] p-8 border-2 ${plan.color} relative overflow-hidden transition-transform hover:-translate-y-2`}>
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                Best Value
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2 font-brand">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black">{plan.price}</span>
              {plan.price !== 'Free' && <span className="text-zinc-500 text-sm">/month</span>}
            </div>
            
            <ul className="space-y-4 mb-10">
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-zinc-400 text-sm">
                  <i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.recommended 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30' 
                : 'bg-zinc-800 hover:bg-zinc-700 text-white'
            }`}>
              {plan.price === 'Free' ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-24 grid md:grid-cols-2 gap-12 items-center bg-zinc-900/50 rounded-[3rem] p-12 md:p-20 border border-zinc-800">
        <div>
          <h2 className="text-3xl font-bold font-brand mb-6">Why go PRO?</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-blue-500 border border-zinc-800">
                <i className="fa-solid fa-clock-rotate-left text-2xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Priority Routing</h4>
                <p className="text-zinc-500">Your requests are moved to the front of the queue, ensuring the fastest possible arrival.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-blue-500 border border-zinc-800">
                <i className="fa-solid fa-money-bill-trend-up text-2xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Parts Discount</h4>
                <p className="text-zinc-500">Save up to 15% on any replacement parts needed during on-site repairs.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl" alt="Premium Service" />
          <div className="absolute -bottom-6 -left-6 bg-blue-600 p-8 rounded-2xl hidden md:block">
            <div className="text-4xl font-black text-white">100%</div>
            <div className="text-xs font-bold text-blue-100 uppercase tracking-widest">Peace of mind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlans;
