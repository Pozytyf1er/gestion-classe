export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  dateOfBirth?: Date | null;
  gender?: string | null;
  classId: number;
  class?: {
    id: number;
    name: string;
    level: string;
    year: number;
  };
  attendances?: Attendance[];
  grades?: Grade[];
  observations?: Observation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  classId: number;
}

export interface Attendance {
  id: number;
  studentId: number;
  student?: Student;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  reason?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  id: number;
  studentId: number;
  student?: Student;
  subject: string;
  value: number;
  coefficient: number;
  date: Date;
  comment?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Observation {
  id: number;
  studentId: number;
  student?: Student;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: number;
  name: string;
  level: string;
  year: number;
  students?: Student[];
  createdAt: Date;
  updatedAt: Date;
}
