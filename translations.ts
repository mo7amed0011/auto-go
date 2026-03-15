
export type Language = 'en' | 'ar' | 'fr' | 'de' | 'es';

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
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      coverage: "مناطق التغطية",
      pro: "أوتوجو برو",
      about: "من نحن",
      careers: "وظائف",
      dashboard: "لوحة التحكم",
      logout: "خروج",
      signIn: "تسجيل الدخول",
      requestHelp: "طلب مساعدة"
    },
    auth: {
      google: "الدخول بواسطة جوجل",
      apple: "الدخول بواسطة آبل",
      or: "أو بواسطة البريد الإلكتروني",
      companyCode: "كود تأكيد الشركة",
      companyCodePlaceholder: "أدخل كود الموظف",
      staffOnly: "مطلوب فقط لموظفي الشركة",
      invalidCode: "كود الشركة غير صحيح. يرجى التأكد من الكود الخاص برتبتك."
    },
    payment: {
      title: "إتمام الاشتراك",
      summary: "ملخص الخطة",
      method: "اختر طريقة الدفع",
      card: "بطاقة ائتمان",
      wallet: "محفظة إلكترونية (فودافون كاش)",
      paypal: "بايبال",
      cardNumber: "رقم البطاقة",
      expiry: "تاريخ الانتهاء",
      cvc: "رمز الأمان (CVC)",
      phone: "رقم المحفظة (01x...)",
      payNow: "تأكيد والدفع الآن",
      success: "تمت عملية الدفع بنجاح!",
      redirecting: "جاري توجيهك للوحة التحكم..."
    },
    contact: {
      successTitle: "تم استلام رسالتك!",
      successDesc: "تم إرسال رسالتك لفريق الدعم بنجاح. سنرد عليك خلال ساعتين كحد أقصى.",
      sending: "جاري الإرسال...",
      submit: "إرسال الرسالة"
    },
    hero: {
      badge: "خدمة طرق متميزة 24/7",
      headline: "الورشة بتجيلك لحد عندك.",
      subheadline: "إصلاحات ميكانيكية وكهربائية متنقلة تصلك أينما كنت على الطريق. لا داعي للونش—بنصلحها في مكانها.",
      ctaRequest: "اطلب خدمة",
      ctaJoin: "انضم إلينا",
      stats: {
        units: "وحدة متنقلة",
        drivers: "سائق سعيد",
        response: "متوسط الاستجابة"
      }
    },
    request: {
      title: "طلب المساعدة",
      subtitle: "أخبرنا بالمشكلة وسنقوم بإرسال أقرب وحدة إليك.",
      vehicleLabel: "تفاصيل السيارة",
      vehiclePlaceholder: "مثال: تويوتا كامري 2018، بيضاء",
      problemLabel: "فئة المشكلة",
      descLabel: "وصف المشكلة",
      descPlaceholder: "صف الصوت، الأعراض، أو كيف حدثت...",
      locationLabel: "الموقع الحالي",
      locationPlaceholder: "أدخل العنوان أو علامة مميزة",
      aiAnalyzing: "جاري التحليل بذكاء أوتوجو الاصطناعي...",
      analyzeBtn: "تحليل المشكلة",
      diagnosisTitle: "تشخيص أوتوجو الذكي",
      confirmBtn: "تأكيد وإرسال الفني",
      editBtn: "تعديل التفاصيل"
    },
    footer: {
      tagline: "نقدم خدمة مساعدة متميزة على الطرق السريعة في مصر.",
      builtBy: "تم التطوير بواسطة mo7amed0011.",
      poweredBy: "مدعوم بالتشخيص الذكي",
      secure: "آمن ومشفر"
    },
    tech: {
      finishTitle: "إتمام المهمة",
      finishDesc: "يرجى تقديم ملخص موجز للعمل الذي تم تنفيذه لسجل العميل.",
      summaryPlaceholder: "مثال: تم تغيير البطارية، فحص الدينامو، شد السير...",
      submitFinish: "إتمام المهمة بنجاح",
      cancel: "إلغاء",
      successMsg: "تمت المهمة بنجاح • تم تسجيل الجلسة",
      arrivalSignal: "إشارة الوصول",
      customerNotified: "تم إخطار العميل",
      startMission: "تأكيد وبدء المهمة",
      activeMissions: "مهمات نشطة",
      awaitingOrders: "في انتظار أوامر الإرسال..."
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      coverage: "Couverture",
      pro: "AutoGo PRO",
      about: "À propos",
      careers: "Carrières",
      dashboard: "Tableau de bord",
      logout: "Déconnexion",
      signIn: "Se connecter",
      requestHelp: "Demander de l'aide"
    },
    auth: {
      google: "Continuer avec Google",
      apple: "Continuer avec Apple",
      or: "ou utiliser l'e-mail"
    },
    payment: {
      title: "Compléter l'abonnement",
      summary: "Résumé du forfait",
      method: "Sélectionnez le mode de paiement",
      card: "Carte de crédit",
      wallet: "Portefeuille numérique",
      paypal: "PayPal",
      cardNumber: "Numéro de carte",
      expiry: "Date d'expiration",
      cvc: "CVC",
      phone: "Numéro de téléphone",
      payNow: "Confirmer et payer",
      success: "Paiement réussi!",
      redirecting: "Redirection vers votre tableau de bord..."
    },
    contact: {
      successTitle: "Message reçu !",
      successDesc: "Votre message a été envoyé à notre équipe d'assistance. Nous vous répondrons dans les 2 heures.",
      sending: "Envoi en cours...",
      submit: "Envoyer le message"
    },
    hero: {
      badge: "Excellence routière 24/7",
      headline: "Votre garage vient à vous.",
      subheadline: "Réparations mécaniques et électriques mobiles haut de gamme directement sur place. Ne remorquez pas—réparez sur place.",
      ctaRequest: "Demander un service",
      ctaJoin: "Rejoindre AutoGo",
      stats: {
        units: "Unités mobiles",
        drivers: "Conducteurs heureux",
        response: "Réponse moy."
      }
    },
    request: {
      title: "Demander de l'assistance",
      subtitle: "Dites-nous ce qui ne va pas et nous enverrons l'unité la plus proche.",
      vehicleLabel: "Détails du véhicule",
      vehiclePlaceholder: "ex: Toyota Camry 2018, Blanche",
      problemLabel: "Catégorie de problème",
      descLabel: "Décrivez le problème",
      descPlaceholder: "Décrivez les bruits, les symptômes...",
      locationLabel: "Emplacement actuel",
      locationPlaceholder: "Entrez l'adresse ou le point de repère",
      aiAnalyzing: "Analyse avec AutoGo AI...",
      analyzeBtn: "Analyser le problème",
      diagnosisTitle: "Diagnostic Intelligent AutoGo",
      confirmBtn: "Confirmer et envoyer",
      editBtn: "Modifier les détails"
    },
    footer: {
      tagline: "Fournir une assistance routière premium sur les autoroutes d'Égypte.",
      builtBy: "Développé par mo7amed0011.",
      poweredBy: "Propulsé par le diagnostic AI",
      secure: "Sécurisé et crypté"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      coverage: "Abdeckung",
      pro: "AutoGo PRO",
      about: "Über uns",
      careers: "Karriere",
      dashboard: "Dashboard",
      logout: "Abmelden",
      signIn: "Anmelden",
      requestHelp: "Hilfe anfordern"
    },
    auth: {
      google: "Mit Google fortfahren",
      apple: "Mit Apple fortfahren",
      or: "oder E-Mail verwenden"
    },
    payment: {
      title: "Abonnement abschließen",
      summary: "Zusammenfassung",
      method: "Zahlungsmethode wählen",
      card: "Kreditkarte",
      wallet: "Digitale Brieftasche",
      paypal: "PayPal",
      cardNumber: "Kartennummer",
      expiry: "Ablaufdatum",
      cvc: "CVC",
      phone: "Telefonnummer",
      payNow: "Bestätigen & Bezahlen",
      success: "Zahlung erfolgreich!",
      redirecting: "Weiterleitung zum Dashboard..."
    },
    contact: {
      successTitle: "Nachricht erhalten!",
      successDesc: "Ihre Nachricht wurde an unser Support-Team gesendet. Wir melden uns innerhalb von 2 Stunden bei Ihnen.",
      sending: "Nachricht wird gesendet...",
      submit: "Nachricht senden"
    },
    hero: {
      badge: "24/7 Pannen-Exzellenz",
      headline: "Ihre Werkstatt kommt zu Ihnen.",
      subheadline: "Premium mobile mechanische und elektrische Reparaturen direkt an Ihren Standort. Nicht abschleppen—vor Ort reparieren.",
      ctaRequest: "Service anfordern",
      ctaJoin: "AutoGo beitreten",
      stats: {
        units: "Mobile Einheiten",
        drivers: "Zufriedene Fahrer",
        response: "Ø Reaktionszeit"
      }
    },
    request: {
      title: "Hilfe anfordern",
      subtitle: "Sagen Sie uns, was los ist, und wir schicken die nächste Einheit.",
      vehicleLabel: "Fahrzeugdetails",
      vehiclePlaceholder: "z.B. 2018 Toyota Camry, Weiß",
      problemLabel: "Problemkategorie",
      descLabel: "Problem beschreiben",
      descPlaceholder: "Beschreiben Sie Geräusche, Symptome...",
      locationLabel: "Aktueller Standort",
      locationPlaceholder: "Adresse oder Orientierungspunkt eingeben",
      aiAnalyzing: "Analyse mit AutoGo KI...",
      analyzeBtn: "Problem analysieren",
      diagnosisTitle: "AutoGo Intelligente Diagnose",
      confirmBtn: "Bestätigen & Entsenden",
      editBtn: "Details bearbeiten"
    },
    footer: {
      tagline: "Premium-Pannenhilfe auf Ägyptens Autobahnen.",
      builtBy: "Erstellt von mo7amed0011.",
      poweredBy: "Unterstützt durch KI-Diagnose",
      secure: "Sicher & Verschlüsselt"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      coverage: "Cobertura",
      pro: "AutoGo PRO",
      about: "Nosotros",
      careers: "Carreras",
      dashboard: "Panel",
      logout: "Cerrar sesión",
      signIn: "Iniciar sesión",
      requestHelp: "Pedir ayuda"
    },
    auth: {
      google: "Continuar con Google",
      apple: "Continuar con Apple",
      or: "o usar correo electrónico"
    },
    payment: {
      title: "Completar suscripción",
      summary: "Resumen del plan",
      method: "Seleccione el método de pago",
      card: "Tarjeta de crédito",
      wallet: "Billetera digital",
      paypal: "PayPal",
      cardNumber: "Número de tarjeta",
      expiry: "Fecha de vencimiento",
      cvc: "CVC",
      phone: "Número de teléfono",
      payNow: "Confirmar y pagar",
      success: "¡Pago exitoso!",
      redirecting: "Redirigiendo a su panel..."
    },
    contact: {
      successTitle: "¡Mensaje recibido!",
      successDesc: "Tu mensaje ha sido enviado a nuestro equipo de soporte. Te responderemos en un plazo de 2 horas.",
      sending: "Enviando mensaje...",
      submit: "Enviar mensaje"
    },
    hero: {
      badge: "Excelencia en carretera 24/7",
      headline: "Tu taller va hacia ti.",
      subheadline: "Reparaciones mecánicas y eléctricas móviles premium entregadas directamente en tu ubicación. No remolques—repara en el acto.",
      ctaRequest: "Solicitar servicio",
      ctaJoin: "Unirse a AutoGo",
      stats: {
        units: "Unidades móviles",
        drivers: "Conductores felices",
        response: "Respuesta prom."
      }
    },
    request: {
      title: "Solicitar asistencia",
      subtitle: "Cuéntanos qué pasa y enviaremos la unidad más cercana.",
      vehicleLabel: "Detalles del vehículo",
      vehiclePlaceholder: "ej: 2018 Toyota Camry, Blanco",
      problemLabel: "Categoría del problema",
      descLabel: "Describe el problema",
      descPlaceholder: "Describe ruidos, síntomas...",
      locationLabel: "Ubicación actual",
      locationPlaceholder: "Ingresa dirección o referencia",
      aiAnalyzing: "Analizando con AutoGo AI...",
      analyzeBtn: "Analizar problema",
      diagnosisTitle: "Diagnóstico Inteligente AutoGo",
      confirmBtn: "Confirmar y despachar",
      editBtn: "Editar detalles"
    },
    footer: {
      tagline: "Brindando asistencia en carretera premium en las autopistas de Egipto.",
      builtBy: "Desarrollado por mo7amed0011.",
      poweredBy: "Impulsado por diagnóstico de IA",
      secure: "Seguro y encriptado"
    }
  }
};
