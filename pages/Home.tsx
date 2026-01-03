
import React from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Highway background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-8 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
              <i className="fa-solid fa-bolt mr-2"></i> 24/7 Roadside Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 font-brand">
              Your Garage <br />
              Comes <span className="text-blue-500">To You.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
              Premium mobile mechanical and electrical repairs delivered directly to your location on the road. Don't tow it—fix it on the spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => onNavigate('request')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/30 transition-all transform hover:-translate-y-1"
              >
                Request Service
              </button>
              <button 
                onClick={() => onNavigate('careers')}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-5 rounded-2xl font-bold text-lg border border-zinc-700 transition-all"
              >
                Join AutoGo
              </button>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center gap-10 border-t border-zinc-800 pt-10">
              <div className="group cursor-default">
                <div className="text-3xl font-bold group-hover:text-blue-500 transition-colors">150+</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Mobile Units</div>
              </div>
              <div className="h-10 w-px bg-zinc-800 hidden md:block"></div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold group-hover:text-blue-500 transition-colors">15k</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Happy Drivers</div>
              </div>
              <div className="h-10 w-px bg-zinc-800 hidden md:block"></div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold group-hover:text-blue-500 transition-colors">12m</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-8 font-brand">The Breakdown Crisis</h2>
            <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
              Highways are the most vulnerable places for a vehicle failure. Traditional towing means hours of waiting, high costs, and being stranded in remote locations.
            </p>
            <div className="space-y-5">
              {[
                'Expensive long-distance towing fees.',
                'Endless waiting for a tow truck to arrive.',
                'Insecurity while stranded on remote roads.'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <i className="fa-solid fa-xmark text-red-500 text-xs"></i>
                  </div>
                  <span className="text-zinc-300 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 bg-blue-600 rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <i className="fa-solid fa-screwdriver-wrench text-9xl text-white"></i>
            </div>
            <h3 className="text-4xl font-bold text-white mb-8">The AutoGo Solution</h3>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              We bring specialized tools, genuine parts, and expert mechanics directly to your GPS coordinates. 92% of our calls are resolved without needing a tow.
            </p>
            <button 
              onClick={() => onNavigate('services')}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-100 transition-all shadow-xl"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
