
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { db } from './services/db';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequestService from './pages/RequestService';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TechDashboard from './pages/TechDashboard';
import Careers from './pages/Careers';
import About from './pages/About';
import Contact from './pages/Contact';
import ServicesPage from './pages/ServicesPage';
import ProPlans from './pages/ProPlans';
import Coverage from './pages/Coverage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FleetSales from './pages/FleetSales';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    db.init();
    const savedUser = db.getCurrentUser();
    if (savedUser) setUser(savedUser);
    
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleLogout = () => {
    db.setCurrentUser(null);
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const navigateToPayment = (plan: any) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setSelectedPlan(plan);
    setCurrentPage('payment');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'login': return <Login onLogin={(u) => { setUser(u); setCurrentPage('dashboard'); }} onNavigate={setCurrentPage} />;
      case 'signup': return <Signup onLogin={(u) => { setUser(u); setCurrentPage('dashboard'); }} onNavigate={setCurrentPage} />;
      case 'services': return <ServicesPage onNavigate={setCurrentPage} />;
      case 'coverage': return <Coverage />;
      case 'request': return user ? <RequestService user={user} onComplete={() => setCurrentPage('dashboard')} /> : <Login onLogin={(u) => { setUser(u); setCurrentPage('request'); }} onNavigate={setCurrentPage} />;
      case 'dashboard': 
        if (!user) return <Login onLogin={(u) => { setUser(u); setCurrentPage('dashboard'); }} onNavigate={setCurrentPage} />;
        if (user.role === UserRole.ADMIN) return <AdminDashboard />;
        if (user.role === UserRole.TECHNICIAN) return <TechDashboard user={user} />;
        return <CustomerDashboard user={user} onNavigate={setCurrentPage} />;
      case 'profile': return user ? <Profile user={user} onUpdate={handleUpdateUser} /> : <Login onLogin={(u) => { setUser(u); setCurrentPage('profile'); }} onNavigate={setCurrentPage} />;
      case 'careers': return <Careers />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'pro': return <ProPlans onSubscribe={navigateToPayment} />;
      case 'payment': return <Payment plan={selectedPlan} user={user!} onComplete={() => setCurrentPage('dashboard')} />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfService />;
      case 'fleet': return <FleetSales onNavigate={setCurrentPage} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 animate-in fade-in duration-700">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={onNavigate => setCurrentPage(onNavigate)} 
        currentPage={currentPage}
      />
      <main className="flex-grow pt-20">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
