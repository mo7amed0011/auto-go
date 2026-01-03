
import React from 'react';

export const SERVICES = [
  {
    id: 'mech',
    title: 'Mechanical Repairs',
    description: 'Engine diagnostics, transmission fixes, and suspension repairs on-site.',
    icon: <i className="fa-solid fa-gears text-blue-500 text-3xl"></i>
  },
  {
    id: 'elec',
    title: 'Electrical Repairs',
    description: 'Battery replacement, alternator testing, and complex wiring diagnostics.',
    icon: <i className="fa-solid fa-bolt text-yellow-500 text-3xl"></i>
  },
  {
    id: 'tire',
    title: 'Tires & Wheels',
    description: 'Puncture repair, tire swapping, and mobile balancing.',
    icon: <i className="fa-solid fa-circle-notch text-zinc-400 text-3xl"></i>
  },
  {
    id: 'fluid',
    title: 'Oil & Fluids',
    description: 'On-the-spot oil changes and critical fluid top-ups.',
    icon: <i className="fa-solid fa-droplet text-red-500 text-3xl"></i>
  },
  {
    id: 'diag',
    title: 'Smart Diagnostics',
    description: 'Advanced computer scanning to identify hidden vehicle faults.',
    icon: <i className="fa-solid fa-microchip text-emerald-500 text-3xl"></i>
  },
  {
    id: 'fleet',
    title: 'Fleet Support',
    description: 'Dedicated roadside solutions for commercial vehicle networks.',
    icon: <i className="fa-solid fa-truck-moving text-purple-500 text-3xl"></i>
  }
];

export const PRO_PLANS = [
  {
    name: 'AutoGo Basic',
    price: 'Free',
    features: ['Standard response time', 'Standard labor rates', 'App support'],
    color: 'border-zinc-700'
  },
  {
    name: 'AutoGo PRO',
    price: '$19.99/mo',
    features: ['Priority roadside routing', '15% discount on parts', 'Free monthly diagnosis', 'Dedicated support line'],
    recommended: true,
    color: 'border-blue-600 shadow-lg shadow-blue-900/20'
  },
  {
    name: 'Fleet Elite',
    price: '$89.99/mo',
    features: ['Up to 5 vehicles', 'Zero diagnostic fees', 'Monthly health reports', 'B2B billing portal'],
    color: 'border-emerald-600'
  }
];

export const JOB_CATEGORIES = [
  "Mobile Technician",
  "Recovery Driver",
  "Software Engineer",
  "Operations Manager",
  "Customer Support",
  "Logistics Coordinator"
];
