
import React from 'react';
import { SERVICES } from '../constants';
import { Language } from '../translations';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold font-brand mb-6 text-white">Our Capabilities</h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          We bring the entire garage infrastructure to your location, equipped for advanced repairs that others can't handle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:border-blue-500/50 transition-all group">
            <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 font-brand text-white">{service.title}</h3>
            <p className="text-zinc-500 leading-relaxed mb-6">
              {service.description}
            </p>
            <ul className="space-y-3 mb-8">
              <li className="text-sm text-zinc-400 flex items-center gap-2">
                <i className="fa-solid fa-circle text-[6px] text-blue-500"></i>
                Advanced Equipment
              </li>
              <li className="text-sm text-zinc-400 flex items-center gap-2">
                <i className="fa-solid fa-circle text-[6px] text-blue-500"></i>
                Certified Technicians
              </li>
              <li className="text-sm text-zinc-400 flex items-center gap-2">
                <i className="fa-solid fa-circle text-[6px] text-blue-500"></i>
                Warranty on Parts
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* Visual Break - High-quality automotive images */}
      <div className="my-24 grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?q=80&w=500&auto=format&fit=crop" className="h-64 w-full object-cover rounded-2xl border border-zinc-800 shadow-lg" alt="Brake Work" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=500&auto=format&fit=crop" className="h-64 w-full object-cover rounded-2xl border border-zinc-800 shadow-lg" alt="Engine Tools" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1615859131861-052f0641a60e?q=80&w=500&auto=format&fit=crop" className="h-64 w-full object-cover rounded-2xl border border-zinc-800 shadow-lg" alt="Van Interior" loading="lazy" />
        <img src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?q=80&w=500&auto=format&fit=crop" className="h-64 w-full object-cover rounded-2xl border border-zinc-800 shadow-lg" alt="Engine Bay" loading="lazy" />
      </div>

      <div className="p-12 md:p-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] text-center text-white shadow-2xl shadow-blue-600/20">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-brand">Fleet Management Solutions</h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
          Keep your business moving with AutoGo Enterprise. We manage your entire vehicle fleet's maintenance and emergency needs on the road.
        </p>
        <button 
          onClick={() => onNavigate('contact')}
          className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-zinc-100 transition-colors shadow-xl"
        >
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default ServicesPage;
