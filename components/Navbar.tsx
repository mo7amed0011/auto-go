
import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentPage }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Service request accepted', time: '2m ago', icon: 'fa-check-circle', color: 'text-emerald-500' },
    { id: 2, text: 'Tech "John" is en-route', time: '15m ago', icon: 'fa-truck-fast', color: 'text-blue-500' },
    { id: 3, text: 'PRO Offer: 15% off parts', time: '1h ago', icon: 'fa-gem', color: 'text-amber-500' },
  ]);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  
  const t = translations['en'].nav;

  const navLinks = [
    { id: 'home', label: t.home },
    { id: 'services', label: t.services },
    { id: 'pro', label: t.pro },
    { id: 'coverage', label: t.coverage },
    { id: 'fleet', label: 'Fleet' },
    { id: 'careers', label: t.careers },
    { id: 'about', label: t.about },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) && 
        mobileToggleRef.current && 
        !mobileToggleRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications([]);
  };

  const handleMobileNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 nav-glass bg-zinc-950/80 border-b border-zinc-900 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex items-center shrink-0">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
                <i className="fa-solid fa-bolt-lightning text-white"></i>
              </div>
              <span className="font-brand text-2xl font-black tracking-tighter text-white">
                Auto<span className="text-blue-500">Go</span>
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)} 
                className={`text-[11px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${currentPage === link.id ? 'text-blue-500' : 'text-zinc-500 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Tools Area */}
          <div className="flex items-center gap-3">
            
            {/* Notifications Button */}
            {user && (
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center transition-all active:scale-90 relative"
                >
                  <i className="fa-solid fa-bell text-lg text-zinc-400"></i>
                  {notifications.length > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-zinc-900 animate-pulse"></span>
                  )}
                </button>
                
                {isNotifOpen && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-3xl py-4 animate-in slide-in-from-top-2 z-[1100]">
                    <div className="px-5 pb-3 border-b border-zinc-800 flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-widest text-white">Notifications</span>
                      {notifications.length > 0 && (
                        <button 
                          onClick={handleClearNotifications}
                          className="text-[10px] text-blue-500 font-bold hover:underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? notifications.map(notif => (
                        <div key={notif.id} className="px-5 py-4 hover:bg-zinc-800/50 transition-colors flex gap-4 border-b border-zinc-800/50 last:border-0">
                          <i className={`fa-solid ${notif.icon} ${notif.color} mt-1`}></i>
                          <div>
                            <p className="text-xs font-bold text-zinc-300 leading-tight mb-1">{notif.text}</p>
                            <span className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter">{notif.time}</span>
                          </div>
                        </div>
                      )) : (
                        <div className="px-5 py-10 text-center">
                           <i className="fa-solid fa-bell-slash text-zinc-800 text-3xl mb-3 block"></i>
                           <p className="text-zinc-600 text-xs font-bold">No new notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile & Logout - MODIFIED SECTION */}
            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('profile')} 
                  className="w-10 h-10 rounded-xl border-2 border-zinc-800 overflow-hidden hover:border-blue-500 transition-all shadow-lg active:scale-95"
                >
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=18181b&color=3b82f6`} 
                    alt="profile" 
                    className="w-full h-full object-cover" 
                  />
                </button>
                <button 
                  onClick={onLogout}
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all active:scale-90"
                  title="Logout"
                >
                  <i className="fa-solid fa-right-from-bracket text-lg"></i>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')} 
                className="btn-signin-nav px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-user-circle"></i>
                <span className="hidden xs:inline">{t.signIn}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              ref={mobileToggleRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 transition-all"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="xl:hidden absolute top-20 left-0 right-0 bg-zinc-950 border-b border-zinc-900 shadow-3xl animate-in slide-in-from-top-5 duration-300 z-[900]"
        >
          <div className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleMobileNav(link.id)} 
                className={`w-full text-left px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest ${currentPage === link.id ? 'bg-blue-600/10 text-blue-500' : 'text-zinc-400 hover:bg-zinc-900/50'}`}
              >
                {link.label}
              </button>
            ))}
            {user && (
              <button 
                onClick={onLogout} 
                className="w-full text-left px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest text-red-500 mt-2"
              >
                <i className="fa-solid fa-right-from-bracket mr-3"></i> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
