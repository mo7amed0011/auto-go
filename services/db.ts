
import { User, UserRole, ServiceRequest, RequestStatus, JobApplication } from '../types';

const KEYS = {
  USERS: 'autogo_users',
  REQUESTS: 'autogo_requests',
  APPLICATIONS: 'autogo_applications',
  CURRENT_USER: 'autogo_current_user'
};

const DEFAULT_USERS: User[] = [
  { id: '1', name: 'Admin Operative', email: 'admin@autogo.com', role: UserRole.ADMIN, password: 'admin123' },
  { id: '2', name: 'Expert Technician', email: 'tech@autogo.com', role: UserRole.TECHNICIAN, password: 'tech123' },
  { id: '3', name: 'Mohamed Customer', email: 'mohamed@autogo.com', role: UserRole.CUSTOMER, isPro: true, password: 'user123' }
];

export const db = {
  init: () => {
    try {
      if (!localStorage.getItem(KEYS.USERS)) {
        localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
      }
      if (!localStorage.getItem(KEYS.REQUESTS)) {
        localStorage.setItem(KEYS.REQUESTS, JSON.stringify([]));
      }
      if (!localStorage.getItem(KEYS.APPLICATIONS)) {
        localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
      }
    } catch (e) {
      console.warn('LocalStorage is not available:', e);
    }
  },

  getUsers: (): User[] => {
    try {
      const data = localStorage.getItem(KEYS.USERS);
      return data ? JSON.parse(data) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  },
  
  registerUser: (userData: Omit<User, 'id'>) => {
    const users = db.getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingUser) {
      throw new Error('EMAIL_EXISTS');
    }
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    users.push(newUser);
    try {
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
    return newUser;
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      const updatedUser = { ...users[index], ...updates };
      users[index] = updatedUser;
      try {
        localStorage.setItem(KEYS.USERS, JSON.stringify(users));
      } catch (e) {
        console.error('Failed to update user in localStorage:', e);
      }
      
      const current = db.getCurrentUser();
      if (current && current.id === id) {
        db.setCurrentUser(updatedUser);
      }
      return updatedUser;
    }
    return null;
  },

  getRequests: (): ServiceRequest[] => {
    try {
      const data = localStorage.getItem(KEYS.REQUESTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  
  addRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => {
    const requests = db.getRequests();
    const newRequest: ServiceRequest = {
      ...request,
      id: 'atg-' + Math.random().toString(36).substr(2, 5),
      status: RequestStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    try {
      localStorage.setItem(KEYS.REQUESTS, JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save request to localStorage:', e);
    }
    return newRequest;
  },

  updateRequest: (id: string, updates: Partial<ServiceRequest>) => {
    const requests = db.getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      try {
        localStorage.setItem(KEYS.REQUESTS, JSON.stringify(requests));
      } catch (e) {
        console.error('Failed to update request in localStorage:', e);
      }
    }
  },

  addApplication: (application: Omit<JobApplication, 'id' | 'status'>) => {
    let applications: JobApplication[] = [];
    try {
      applications = JSON.parse(localStorage.getItem(KEYS.APPLICATIONS) || '[]');
    } catch {
      applications = [];
    }
    
    const newApplication: JobApplication = {
      ...application,
      id: 'app-' + Math.random().toString(36).substr(2, 5),
      status: 'PENDING'
    };
    
    applications.push(newApplication);
    try {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to save application to localStorage:', e);
    }
    return newApplication;
  },

  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem(KEYS.CURRENT_USER);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User | null) => {
    try {
      if (user) localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
      else localStorage.removeItem(KEYS.CURRENT_USER);
    } catch (e) {
      console.error('Failed to set current user in localStorage:', e);
    }
  }
};
