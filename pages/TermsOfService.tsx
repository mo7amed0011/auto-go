
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold font-brand mb-8">Terms of Service</h1>
      <div className="prose prose-invert text-zinc-400 space-y-6">
        <p>By using the AutoGo platform, you agree to the following terms and conditions.</p>
        <h3 className="text-xl font-bold text-white mt-8">1. Service Availability</h3>
        <p>While we aim for 24/7 coverage, response times may vary based on weather, traffic, and high-demand periods on major highways.</p>
        <h3 className="text-xl font-bold text-white mt-8">2. Payment</h3>
        <p>Payments for spare parts and labor are due upon completion of the repair. AutoGo PRO members receive specialized billing cycles.</p>
        <h3 className="text-xl font-bold text-white mt-8">3. Liability</h3>
        <p>AutoGo units are fully insured. Our technicians are certified to handle emergency repairs, but we reserve the right to recommend towing if the vehicle cannot be safely repaired on-site.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
