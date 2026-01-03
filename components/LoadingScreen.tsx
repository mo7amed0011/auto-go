
import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    "Warming up the engines...",
    "Calibrating smart diagnostics...",
    "Locating nearest mobile units...",
    "Syncing with highway patrol...",
    "AutoGo is ready for action."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 30);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className="relative mb-12">
          <div className="w-24 h-24 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-car-side text-3xl text-blue-500 animate-bounce"></i>
          </div>
        </div>

        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="font-brand text-4xl font-bold tracking-tighter text-white mb-2">
            Auto<span className="text-blue-500">Go</span>
          </h1>
          <div className="h-1 overflow-hidden w-48 bg-zinc-900 rounded-full mx-auto relative">
             <div 
               className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,0.8)]"
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>

        {/* Dynamic Messages */}
        <div className="h-6 overflow-hidden">
          <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase animate-pulse">
            {messages[messageIndex]}
          </p>
        </div>
      </div>

      {/* Speed Lines Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-32 animate-speed-line"
            style={{
              top: `${Math.random() * 100}%`,
              left: `-20%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
