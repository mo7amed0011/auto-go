
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold font-brand mb-8">Privacy Policy</h1>
      <div className="prose prose-invert text-zinc-400 space-y-6">
        <p>At AutoGo, we take your privacy seriously. This policy describes how we collect, use, and handle your data when you use our mobile auto garage services.</p>
        <h3 className="text-xl font-bold text-white mt-8">1. Data Collection</h3>
        <p>We collect your name, email, vehicle details, and precise geolocation when you request assistance to ensure our mobile units can find you on the road.</p>
        <h3 className="text-xl font-bold text-white mt-8">2. Use of Information</h3>
        <p>Your data is used solely for service delivery, quality control, and periodic maintenance reminders.</p>
        <h3 className="text-xl font-bold text-white mt-8">3. Third Parties</h3>
        <p>We do not sell your data. We only share location data with the assigned technician for the duration of the service.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
