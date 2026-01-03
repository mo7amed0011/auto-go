
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h1 className="text-5xl font-bold font-brand mb-8 leading-tight">Revolutionizing the Roadside Experience</h1>
          <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
            Founded by <span className="text-white font-bold">Mohamed Ahmed</span>, AutoGo was born from a simple realization: in the age of on-demand everything, why is car repair still stuck in the 20th century?
          </p>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Broken down on a desert highway or a remote mountain road? You shouldn't have to wait for a tow truck just to wait again at a garage. AutoGo brings the solution directly to your GPS coordinates.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-black text-blue-500 mb-1">Vision</div>
              <p className="text-sm text-zinc-500">To create a world where mechanical failures are mere speedbumps, not roadblocks.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-500 mb-1">Mission</div>
              <p className="text-sm text-zinc-500">Deploying a dense network of mobile garages to provide instant, high-quality car repair everywhere.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Workshop" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-900 border border-zinc-800 rounded-3xl hidden xl:flex items-center justify-center p-6 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-500">10k+</div>
              <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Repairs Completed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-24 text-center">
        <h2 className="text-3xl font-bold font-brand mb-16">The AutoGo Pillars</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: 'fa-truck-fast', title: 'Agility', desc: 'Lightweight, rapid-deployment mobile units that reach you faster than a heavy tow truck.' },
            { icon: 'fa-microchip', title: 'Intelligence', desc: 'Leveraging AI diagnosis and real-time logistics to optimize every single dispatch.' },
            { icon: 'fa-handshake', title: 'Transparency', desc: 'Upfront pricing, live tech tracking, and complete digital service reports.' }
          ].map((pillar, idx) => (
            <div key={idx} className="space-y-4">
              <div className="w-20 h-20 bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto text-blue-500 text-3xl border border-zinc-800">
                <i className={`fa-solid ${pillar.icon}`}></i>
              </div>
              <h4 className="text-xl font-bold">{pillar.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
