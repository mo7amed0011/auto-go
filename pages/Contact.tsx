
import React, { useState } from 'react';
import { translations } from '../translations';

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = translations['en'].contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold font-brand mb-6 text-white">Get in Touch</h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          Need immediate help or have a question about our services? We're here 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-6 font-brand text-white">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Hotline</div>
                  <div className="font-bold text-white">19000 - AutoGo</div>
                </div>
              </div>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="flex gap-4 hover:bg-zinc-800/50 p-2 -m-2 rounded-xl transition-all group">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">WhatsApp</div>
                  <div className="font-bold text-white">+20 123 456 7890</div>
                </div>
              </a>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Email</div>
                  <div className="font-bold text-white">support@autogo.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 font-brand">Coverage Map</h3>
              <p className="text-blue-100 text-sm mb-6">
                Currently covering Cairo-Alex Desert Road, Gouna, Sokhna, and expanding across Sinai this quarter.
              </p>
              <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-all">
                View Detailed Roadmap
              </button>
            </div>
            <i className="fa-solid fa-map-location-dot absolute -bottom-4 -right-4 text-white/10 text-9xl"></i>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl min-h-[400px] flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-5xl mx-auto shadow-2xl shadow-emerald-500/30">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h2 className="text-3xl font-bold font-brand text-white">{t.successTitle}</h2>
                <p className="text-zinc-500 max-w-sm mx-auto">{t.successDesc}</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-500 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-8 font-brand text-white">Send a Message</h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
                      placeholder="John"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-white"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>{t.sending}</span>
                        </div>
                      ) : (
                        t.submit
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
