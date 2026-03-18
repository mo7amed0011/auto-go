
import React, { useState } from 'react';

interface FleetSalesProps {
  onNavigate: (page: string) => void;
}

const FleetSales: React.FC<FleetSalesProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-bold font-brand mb-8 leading-tight text-white">AutoGo <span className="text-blue-500">Fleet</span></h1>
          <p className="text-zinc-400 text-xl mb-8 leading-relaxed">
            Enterprise-grade roadside infrastructure for logistics companies, car rentals, and corporate fleets. Keep your business moving with zero downtime.
          </p>
          <div className="space-y-6 mb-10">
            {[
              { title: 'Zero Towing Fees', desc: 'We fix your commercial trucks and vans on the spot.' },
              { title: 'Centralized Billing', desc: 'One invoice for your entire fleet at the end of the month.' },
              { title: 'Priority Dispatch', desc: 'Enterprise units are always reserved for fleet partners.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-white"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => document.getElementById('fleet-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            Request Fleet Quote
          </button>
        </div>
        
        <div id="fleet-form" className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-20 animate-in zoom-in">
               <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 text-3xl mb-6">
                  <i className="fa-solid fa-check"></i>
               </div>
               <h3 className="text-2xl font-bold mb-2 text-white">Quote Requested!</h3>
               <p className="text-zinc-500">Our B2B team will contact you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-8 font-brand text-white">Fleet Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required placeholder="Company Name" className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-white" />
                  <input type="number" required placeholder="Fleet Size" className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-white" />
                </div>
                <input type="email" required placeholder="Business Email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-white" />
                <textarea required rows={4} placeholder="Describe your fleet needs..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none text-sm text-white"></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold transition-all text-white">Submit Application</button>
              </form>
            </>
          )}
        </div>
      </div>
      
      {/* Fleet Visualization */}
      <div className="mt-24 grid md:grid-cols-3 gap-8">
         <img src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-64 w-full object-cover grayscale hover:grayscale-0 transition-all border border-zinc-800 shadow-xl" alt="Delivery fleet" loading="lazy" referrerPolicy="no-referrer" />
         <img src="https://images.unsplash.com/photo-1519003300449-424ad040507b?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-64 w-full object-cover grayscale hover:grayscale-0 transition-all border border-zinc-800 shadow-xl" alt="Truck fleet maintenance" loading="lazy" referrerPolicy="no-referrer" />
         <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-64 w-full object-cover grayscale hover:grayscale-0 transition-all border border-zinc-800 shadow-xl" alt="Corporate B2B support" loading="lazy" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
};

export default FleetSales;
