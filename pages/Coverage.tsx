
import React from 'react';

const Coverage: React.FC = () => {
  const regions = [
    { 
      name: "Cairo-Alexandria Desert Road", 
      status: "Full Coverage", 
      time: "15 min avg",
      icon: "fa-road"
    },
    { 
      name: "Ain Sokhna Road", 
      status: "High Priority", 
      time: "20 min avg",
      icon: "fa-sun"
    },
    { 
      name: "El Gouna & Hurghada", 
      status: "Full Coverage", 
      time: "12 min avg",
      icon: "fa-umbrella-beach"
    },
    { 
      name: "North Coast (Sahel)", 
      status: "Full Coverage", 
      time: "15 min avg",
      icon: "fa-water"
    },
    { 
      name: "Suez Road", 
      status: "Expanding", 
      time: "25 min avg",
      icon: "fa-truck-fast"
    },
    { 
      name: "South Sinai Roads", 
      status: "On-Call Only", 
      time: "45 min avg",
      icon: "fa-mountain"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold font-brand mb-6">Network <span className="text-blue-500">Coverage</span></h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          We focus on the most critical highways and remote routes where traditional services fail to reach in time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {regions.map((region, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-blue-500 text-2xl border border-zinc-800">
                <i className={`fa-solid ${region.icon}`}></i>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                region.status === 'Expanding' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              }`}>
                {region.status}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 font-brand">{region.name}</h3>
            <p className="text-zinc-500 text-sm mb-6">Active mobile units patrolling 24/7 to ensure rapid arrival.</p>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
              <i className="fa-solid fa-clock"></i>
              <span>{region.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 font-brand">Expansion Roadmap 2024</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Our goal is to cover 100% of Egypt's major travel highways by the end of this year. We are currently adding 15 new mobile garages every month.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">1</div>
                <span className="font-bold">Q2: Upper Egypt Highway (Cairo-Asyut)</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">2</div>
                <span className="font-bold">Q3: Red Sea Coastal Road (Safaqa-Marsa Alam)</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">3</div>
                <span className="font-bold">Q4: Western Desert Road expansion</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950/20 backdrop-blur-md border border-white/20 p-8 rounded-3xl h-[400px] flex items-center justify-center">
             <div className="text-center">
                <i className="fa-solid fa-map-marked-alt text-8xl text-white/50 mb-6"></i>
                <p className="text-white font-bold">Interactive Coverage Map Loading...</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
