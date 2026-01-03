
import { User } from '../types';

export const notificationService = {
  /**
   * إرسال تنبيه حقيقي للمسؤول عند تسجيل مستخدم جديد
   */
  notifyAdminOnRegistration: async (user: User) => {
    const payload = {
      user_name: user.name,
      user_email: user.email,
      role: user.role,
      timestamp: new Date().toLocaleString('ar-EG')
    };

    console.log(`[AutoGo] Triggering email to mo7amed0839@gmail.com for: ${user.email}`);
    
    try {
      // استهداف ملف PHP على السيرفر المحلي
      const response = await fetch('./api/notify.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      console.log("PHP Response:", result);

      if (result.status === 'success') {
        alert(`تم التسجيل بنجاح! تم إرسال بياناتك للمسؤول على: mo7amed0839@gmail.com`);
      } else {
        console.warn("Mail server issue:", result.message);
        // في حالة فشل الإرسال الفعلي (XAMPP غير معدل للسيرفر)، نظهر تنبيه محاكي
        alert(`تم التسجيل بنجاح! بياناتك مسجلة في قاعدة البيانات.\n(تنبيه: إرسال الإيميل يتطلب تفعيل SMTP في XAMPP)`);
      }
      
      return true;
    } catch (error) {
      console.error("Email API failed:", error);
      // هذا يحدث غالباً في بيئة الـ Preview أو إذا كان السيرفر مغلقاً
      alert(`مرحباً ${user.name}!\nتم إنشاء حسابك بنجاح. سنقوم بإرسال إشعار للمسؤول فور تفعيل الاتصال بالسيرفر.`);
      return false;
    }
  }
};
