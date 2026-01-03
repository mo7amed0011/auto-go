
export enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
  CUSTOMER = 'CUSTOMER'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPro?: boolean;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  technicianId?: string;
  vehicleInfo: string;
  problemType: string;
  description: string;
  location: string;
  status: RequestStatus;
  createdAt: string;
  aiDiagnosis?: string;
}

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  status: 'PENDING' | 'REVIEWED' | 'HIRED' | 'REJECTED';
}
