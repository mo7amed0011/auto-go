
import React, { useState } from 'react';
import { User } from '../types';
import { translations } from '../translations';

interface PaymentProps {
  plan: any;
  user: User;
  onComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ plan, user, onComplete }) => {
  const [method, setMethod] = useState<'card' | 'wallet' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = translations['en'].payment;

  if (!plan) return <div className="p-20 text-center">No plan selected.</div>;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-5xl mb-8 shadow-2xl shadow-emerald-500/40">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-4xl font-bold mb-4 font-brand">{t.success}</h2>
          <p className="text-zinc-500">{t.redirecting}</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] sticky top-32">
              <h3 className="text-xl font-bold mb-6 font-brand">{t.summary}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400">{plan.name}</span>
                <span className="font-bold">{plan.price}</span>
              </div>
              <div className="h-px bg-zinc-800 my-6"></div>
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Total</span>
                <span className="font-brand text-blue-500 font-bold">{plan.price}</span>
              </div>
              <p className="text-[10px] text-zinc-600 mt-6 leading-relaxed">
                By completing this purchase, you agree to our terms of service and periodic billing cycles.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 font-brand">{t.title}</h2>
              
              <div className="space-y-8">
                {/* Method Selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setMethod('card')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${method === 'card' ? 'border-blue-600 bg-blue-600/5' : 'border-zinc-800 hover:border-zinc-700'}`}
                  >
                    <i className="fa-solid fa-credit-card text-2xl"></i>
                    <span className="text-xs font-bold">{t.card}</span>
                  </button>
                  <button 
                    onClick={() => setMethod('wallet')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${method === 'wallet' ? 'border-blue-600 bg-blue-600/5' : 'border-zinc-800 hover:border-zinc-700'}`}
                  >
                    <i className="fa-solid fa-mobile-screen text-2xl"></i>
                    <span className="text-xs font-bold">{t.wallet}</span>
                  </button>
                  <button 
                    onClick={() => setMethod('paypal')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${method === 'paypal' ? 'border-blue-600 bg-blue-600/5' : 'border-zinc-800 hover:border-zinc-700'}`}
                  >
                    <i className="fa-brands fa-paypal text-2xl"></i>
                    <span className="text-xs font-bold">{t.paypal}</span>
                  </button>
                </div>

                <div className="h-px bg-zinc-800"></div>

                {/* Form Fields Based on Method */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {method === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-500 mb-2">{t.cardNumber}</label>
                        <div className="relative">
                          <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <i className="fa-brands fa-cc-visa text-xl text-zinc-700"></i>
                            <i className="fa-brands fa-cc-mastercard text-xl text-zinc-700"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-500 mb-2">{t.expiry}</label>
                        <input type="text" placeholder="MM / YY" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-500 mb-2">{t.cvc}</label>
                        <input type="text" placeholder="***" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  )}

                  {method === 'wallet' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-500 mb-2">{t.phone}</label>
                        <input type="text" placeholder="010xxxxxxx" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs text-zinc-400 flex gap-3 italic">
                        <i className="fa-solid fa-circle-info text-blue-500 text-sm"></i>
                        You will receive an OTP or a USSD prompt on your phone to authorize this transaction.
                      </div>
                    </div>
                  )}

                  {method === 'paypal' && (
                    <div className="text-center py-10 space-y-6">
                      <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto text-blue-500 text-3xl">
                        <i className="fa-brands fa-paypal"></i>
                      </div>
                      <p className="text-zinc-500 max-w-sm mx-auto">
                        Clicking the button below will securely open a PayPal window to complete your subscription.
                      </p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/30 transition-all text-lg relative overflow-hidden group"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <i className="fa-solid fa-lock text-sm opacity-50"></i>
                      <span>{t.payNow}</span>
                    </div>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-6 opacity-30 grayscale contrast-150">
                  <i className="fa-brands fa-cc-visa text-3xl"></i>
                  <i className="fa-brands fa-cc-mastercard text-3xl"></i>
                  <i className="fa-brands fa-cc-apple-pay text-3xl"></i>
                  <i className="fa-brands fa-cc-stripe text-3xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
