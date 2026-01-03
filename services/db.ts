
import { User, UserRole, ServiceRequest, RequestStatus, JobApplication } from '../types';

const KEYS = {
  USERS: 'autogo_users',
  REQUESTS: 'autogo_requests',
  APPLICATIONS: 'autogo_applications',
  CURRENT_USER: 'autogo_current_user'
};

const DEFAULT_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@autogo.com', role: UserRole.ADMIN },
  { id: '2', name: 'John Tech', email: 'tech@autogo.com', role: UserRole.TECHNICIAN },
  { id: '3', name: 'Mohamed Ahmed', email: 'mohamed@autogo.com', role: UserRole.CUSTOMER, isPro: true }
];

export const db = {
  init: () => {
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(KEYS.REQUESTS)) {
      localStorage.setItem(KEYS.REQUESTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
    }
  },

  getUsers: (): User[] => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  
  registerUser: (userData: Omit<User, 'id'>) => {
    const users = db.getUsers();
    // التحقق من عدم وجود البريد مسبقاً
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  getRequests: (): ServiceRequest[] => JSON.parse(localStorage.getItem(KEYS.REQUESTS) || '[]'),
  
  addRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => {
    const requests = db.getRequests();
    const newRequest: ServiceRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: RequestStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(requests));
    return newRequest;
  },

  updateRequest: (id: string, updates: Partial<ServiceRequest>) => {
    const requests = db.getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      localStorage.setItem(KEYS.REQUESTS, JSON.stringify(requests));
    }
  },

  getApplications: (): JobApplication[] => JSON.parse(localStorage.getItem(KEYS.APPLICATIONS) || '[]'),

  addApplication: (app: Omit<JobApplication, 'id' | 'status'>) => {
    const apps = db.getApplications();
    const newApp: JobApplication = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      status: 'PENDING'
    };
    apps.push(newApp);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    return newApp;
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(KEYS.CURRENT_USER);
  }
};
