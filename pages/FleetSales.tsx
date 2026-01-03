
import React from 'react';

const FleetSales: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-bold font-brand mb-8 leading-tight">AutoGo <span className="text-blue-500">Fleet</span></h1>
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
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">Request Fleet Quote</button>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[3rem]">
          <h3 className="text-2xl font-bold mb-8 font-brand">Fleet Inquiry Form</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Company Name" className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <input type="number" placeholder="Fleet Size" className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <input type="email" placeholder="Business Email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            <textarea rows={4} placeholder="Describe your fleet needs..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"></textarea>
            <button className="w-full bg-blue-600 py-4 rounded-xl font-bold">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FleetSales;
