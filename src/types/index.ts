export interface User {
  _id: string;
  phone: string;
  role: 'student' | 'warden' | 'admin';
  name: string;
  dateOfBirth?: Date;
  password?: string;
  hostelId?: string;
  createdAt: Date;
}

export interface Hostel {
  _id: string;
  name: string;
  location: string;
  totalCapacity: number;
  currentOccupancy: number;
  wardenId?: string;
  createdAt: Date;
}

export interface Issue {
  _id: string;
  studentId: string;
  hostelId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Menu {
  _id: string;
  date: Date;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  hostelId?: string;
}