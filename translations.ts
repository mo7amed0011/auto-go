
export type Language = 'en';

export const translations: Record<Language, any> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      coverage: "Coverage",
      pro: "AutoGo PRO",
      about: "About",
      careers: "Careers",
      dashboard: "Dashboard",
      logout: "Logout",
      signIn: "Sign In",
      requestHelp: "Request Help"
    },
    auth: {
      google: "Continue with Google",
      apple: "Continue with Apple",
      or: "or use email",
      companyCode: "Company Verification Code",
      companyCodePlaceholder: "Enter staff code",
      staffOnly: "Required only for company staff members",
      invalidCode: "Invalid company code. Please verify your staff credentials."
    },
    payment: {
      title: "Complete Subscription",
      summary: "Plan Summary",
      method: "Select Payment Method",
      card: "Credit / Debit Card",
      wallet: "Digital Wallet (Vodafone Cash)",
      paypal: "PayPal Express",
      cardNumber: "Card Number",
      expiry: "Expiry Date",
      cvc: "CVC",
      phone: "Wallet Number (01x...)",
      payNow: "Confirm & Pay",
      success: "Payment Successful!",
      redirecting: "Redirecting to your dashboard..."
    },
    contact: {
      successTitle: "Message Received!",
      successDesc: "Your message has been sent to our support team. We'll get back to you within 2 hours.",
      sending: "Sending Message...",
      submit: "Send Message"
    },
    hero: {
      badge: "24/7 Roadside Excellence",
      headline: "Your Garage Comes To You.",
      subheadline: "Premium mobile mechanical and electrical repairs delivered directly to your location on the road. Don't tow it—fix it on the spot.",
      ctaRequest: "Request Service",
      ctaJoin: "Join AutoGo",
      stats: {
        units: "Mobile Units",
        drivers: "Happy Drivers",
        response: "Avg Response"
      }
    },
    request: {
      title: "Request Assistance",
      subtitle: "Tell us what's wrong and we'll dispatch the nearest unit.",
      vehicleLabel: "Vehicle Details",
      vehiclePlaceholder: "e.g. 2018 Toyota Camry, White",
      problemLabel: "Problem Category",
      descLabel: "Describe the Problem",
      descPlaceholder: "Describe noise, symptoms, or how it happened...",
      locationLabel: "Current Location",
      locationPlaceholder: "Enter address or landmark",
      aiAnalyzing: "Analyzing with AutoGo AI...",
      analyzeBtn: "Analyze Problem",
      diagnosisTitle: "AutoGo Smart Diagnosis",
      confirmBtn: "Confirm & Dispatch",
      editBtn: "Edit Details"
    },
    footer: {
      tagline: "Providing premium on-demand roadside assistance across Egypt's highways.",
      builtBy: "Built by mo7amed0011.",
      poweredBy: "Powered by AI Diagnostics",
      secure: "Secure & Encrypted"
    },
    tech: {
      finishTitle: "Mission Completion",
      finishDesc: "Please provide a brief summary of the work performed for the customer record.",
      summaryPlaceholder: "e.g. Replaced battery, checked alternator, tightened belt...",
      submitFinish: "Complete Mission",
      cancel: "Cancel",
      successMsg: "Mission Success • Session Logged",
      arrivalSignal: "Arrival Signal",
      customerNotified: "Customer Notified",
      startMission: "Acknowledge & Start",
      activeMissions: "MISSIONS ACTIVE",
      awaitingOrders: "Awaiting Dispatch Orders..."
    }
  }
};
