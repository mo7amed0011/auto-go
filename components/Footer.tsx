
import React from 'react';
import { translations, Language } from '../translations';

interface FooterProps {
  onNavigate: (page: string) => void;
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-car-side text-white text-xs"></i>
              </div>
              <span className="font-brand text-xl font-bold tracking-tighter text-white">
                Auto<span className="text-blue-500">Go</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">{lang === 'ar' ? 'المنصة' : 'Platform'}</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-500">{navT.home}</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-blue-500">{navT.services}</button></li>
              <li><button onClick={() => onNavigate('pro')} className="hover:text-blue-500">{navT.pro}</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-blue-500">{navT.careers}</button></li>
              <li><button onClick={() => onNavigate('fleet')} className="hover:text-blue-500">{lang === 'ar' ? 'مبيعات الأساطيل' : 'Fleet Sales'}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">{lang === 'ar' ? 'الشركة' : 'Company'}</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-500">{navT.about}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-500">{lang === 'ar' ? 'اتصل بنا' : 'Contact'}</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-blue-500">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-blue-500">{lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">{lang === 'ar' ? 'النشرة الإخبارية' : 'Newsletter'}</h4>
            <p className="text-zinc-500 text-sm mb-4">{lang === 'ar' ? 'ابق على اطلاع بتوسعاتنا.' : 'Stay updated with our coverage expansion.'}</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} 
                className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm w-full outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-600 text-xs">
            © 2025 AutoGo Mobile Garage. {t.builtBy}
          </div>
          <div className="flex gap-8 text-zinc-600 text-xs">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-blue-500"></i>
              {t.poweredBy}
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-blue-500"></i>
              {t.secure}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
