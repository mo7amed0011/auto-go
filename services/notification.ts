
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

    console.log(`[AutoGo] Notifying mo7amed0839@gmail.com for: ${user.email}`);
    
    try {
      // Simulate/Trigger API call
      const response = await fetch('./api/notify.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json().catch(() => ({ status: 'error' }));
      console.log("PHP Response:", result);
      
      return true;
    } catch (error) {
      console.debug("Notification suppressed (Dev environment)");
      return false;
    }
  }
};
