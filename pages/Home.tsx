
import React, { useEffect } from 'react';
import { translations } from '../translations';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = "AutoGo | Home";
  }, []);

  const t = translations['en'].hero;

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden py-12 md:py-20 animate-in fade-in duration-1000">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50 scale-110 animate-float"
            alt="Luxury Sport Car"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-10">
              <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase bg-blue-600/10 border border-blue-400/20 rounded-full animate-pulse">
                <i className="fa-solid fa-satellite-dish mr-2"></i> {t.badge}
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black leading-[0.9] mb-12 font-brand text-white tracking-tighter">
              The Garage <br/><span className="text-blue-500">Comes to You.</span>
            </h1>
            <p className="text-2xl text-zinc-400 mb-16 leading-relaxed font-medium max-w-xl">
              {t.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => onNavigate('request')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl shadow-blue-600/40 transition-all transform hover:-translate-y-2 active:scale-95"
              >
                {t.ctaRequest}
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="bg-zinc-900/50 backdrop-blur-xl hover:bg-zinc-800 text-white px-12 py-6 rounded-3xl font-black text-xl border border-zinc-800 transition-all hover:border-zinc-600"
              >
                {t.ctaJoin}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-zinc-900 py-16">
          {[
            { label: 'Mobile Units', val: '150+' },
            { label: 'Happy Drivers', val: '12K+' },
            { label: 'Avg Arrival', val: '15m' },
            { label: 'Certified Techs', val: '400+' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-white mb-1 font-brand">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-40">
          <div className="order-1">
            <h2 className="text-6xl font-black mb-10 font-brand text-white tracking-tighter leading-tight">
              Highway Freedom <br/>Starts <span className="text-blue-500">Here</span>
            </h2>
            <p className="text-zinc-400 mb-12 text-xl leading-relaxed">
              We don’t just fix cars; we rescue your schedule. AutoGo units are moving workshops patrolling the major highways, equipped with expert tech and high-end tools.
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="group overflow-hidden rounded-[2.5rem] border border-zinc-800 shadow-2xl h-56 relative">
                 <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt="Tech at work" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-blue-600/10 group-hover:opacity-0 transition-opacity"></div>
               </div>
               <div className="group overflow-hidden rounded-[2.5rem] border border-zinc-800 shadow-2xl h-56 relative">
                 <img src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=800&auto=format&fit=crop" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt="Tools" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-blue-600/10 group-hover:opacity-0 transition-opacity"></div>
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-zinc-900 border border-zinc-800 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[80px]"></div>
            <h3 className="text-4xl font-black text-white mb-8 font-brand tracking-tighter">Pro Maintenance</h3>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Our mobile units carry full diagnostic computers, nitrogen inflators, and specialized electrical testing rigs. We bring the garage to your exact coordinates.
            </p>
            <div className="h-80 w-full rounded-3xl overflow-hidden border border-zinc-800 relative shadow-inner">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:rotate-2 group-hover:scale-110 transition-transform duration-1000" alt="Mobile Workshop" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Feature Experience */}
        <div className="grid md:grid-cols-3 gap-10">
           {[
             { title: 'Night Guardians', img: 'https://images.unsplash.com/photo-1534093607318-f025413f49cb?q=80&w=800&auto=format&fit=crop', icon: 'fa-moon' },
             { title: 'Remote Precision', img: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=800&auto=format&fit=crop', icon: 'fa-crosshairs' },
             { title: 'Expert Hands', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop', icon: 'fa-wrench' }
           ].map((item, i) => (
             <div key={i} className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-zinc-800 hover:border-blue-500 transition-all duration-500 shadow-2xl">
               <img src={item.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-100" alt={item.title} referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent p-12 flex flex-col justify-end">
                 <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-2xl -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <i className={`fa-solid ${item.icon}`}></i>
                 </div>
                 <h4 className="text-4xl font-black font-brand text-white tracking-tighter mb-2">{item.title}</h4>
                 <div className="w-12 h-1 bg-blue-500 group-hover:w-full transition-all duration-700"></div>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
