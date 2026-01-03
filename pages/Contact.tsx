
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold font-brand mb-6">Get in Touch</h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          Need immediate help or have a question about our services? We're here 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-6 font-brand">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Hotline</div>
                  <div className="font-bold">19000 - AutoGo</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">WhatsApp</div>
                  <div className="font-bold">+20 123 456 7890</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Email</div>
                  <div className="font-bold">support@autogo.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4 font-brand">Coverage Map</h3>
            <p className="text-blue-100 text-sm mb-6">
              Currently covering Cairo-Alex Desert Road, Gouna, Sokhna, and expanding across Sinai this quarter.
            </p>
            <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-all">
              View Detailed Roadmap
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 font-brand">Send a Message</h3>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="John"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <div className="col-span-2">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
