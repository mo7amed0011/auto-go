
import React, { useState } from 'react';
import { User, RequestStatus } from '../types';
import { db } from '../services/db';
import { diagnoseProblem } from '../services/gemini';
import { SERVICES } from '../constants';

interface RequestServiceProps {
  user: User;
  onComplete: () => void;
}

const RequestService: React.FC<RequestServiceProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleInfo: '',
    problemType: 'Mechanical',
    description: '',
    location: ''
  });
  const [diagnosis, setDiagnosis] = useState('');

  const handleNext = async () => {
    if (step === 1) {
      setIsLoading(true);
      const res = await diagnoseProblem(formData.problemType, formData.description);
      setDiagnosis(res);
      setIsLoading(false);
      setStep(2);
    } else {
      submitRequest();
    }
  };

  const submitRequest = () => {
    db.addRequest({
      customerId: user.id,
      customerName: user.name,
      vehicleInfo: formData.vehicleInfo,
      problemType: formData.problemType,
      description: formData.description,
      location: formData.location,
      aiDiagnosis: diagnosis
    });
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Progress Bar */}
        <div className="h-2 bg-zinc-800">
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right">
              <div>
                <h2 className="text-3xl font-bold font-brand mb-2">Request Assistance</h2>
                <p className="text-zinc-500">Tell us what's wrong and we'll dispatch the nearest unit.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Vehicle Details</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2018 Toyota Camry, White"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.vehicleInfo}
                    onChange={e => setFormData({...formData, vehicleInfo: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Problem Category</label>
                  <select 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                    value={formData.problemType}
                    onChange={e => setFormData({...formData, problemType: e.target.value})}
                  >
                    <option>Mechanical</option>
                    <option>Electrical</option>
                    <option>Tires/Wheels</option>
                    <option>Battery/Starting</option>
                    <option>Fluid Leak</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Describe the Problem</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe noise, symptoms, or how it happened..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Current Location</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter address or landmark"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                    <button 
                      onClick={() => {
                        navigator.geolocation.getCurrentPosition((pos) => {
                          setFormData({...formData, location: `${pos.coords.latitude}, ${pos.coords.longitude}`});
                        });
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400"
                    >
                      <i className="fa-solid fa-location-crosshairs text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.vehicleInfo || !formData.description || !formData.location || isLoading}
                className="w-full bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                {isLoading ? (
                  <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Analyzing with AutoGo AI...</>
                ) : 'Analyze Problem'}
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right">
              <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-brain text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 font-brand">AutoGo Smart Diagnosis</h3>
                </div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "{diagnosis}"
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-zinc-500">Request Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-500">Vehicle:</span> <span>{formData.vehicleInfo}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Problem:</span> <span>{formData.problemType}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Location:</span> <span>{formData.location}</span></div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all"
                >
                  Edit Details
                </button>
                <button 
                  onClick={submitRequest}
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestService;
