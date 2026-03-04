export interface Student {
  id: number
  firstName: string
  lastName: string
  email?: string
  dateOfBirth?: Date
  gender?: string
  classId: number
  class?: Class
  createdAt: Date
  updatedAt: Date
}

export interface Class {
  id: number
  name: string
  level: string
  year: number
  students?: Student[]
  createdAt: Date
  updatedAt: Date
}

export interface Attendance {
  id: number
  studentId: number
  student?: Student
  date: Date
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'JUSTIFIED'
  reason?: string
  createdAt: Date
  updatedAt: Date
}

export interface Grade {
  id: number
  studentId: number
  student?: Student
  subject: string
  type: 'DETWORK' | 'PARTICIPATION' | 'QUIZ' | 'ORAL' | 'PROJECT'
  value: number
  coefficient: number
  date: Date
  period: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  comment?: string
  createdAt: Date
  updatedAt: Date
}

export interface Observation {
  id: number
  studentId: number
  student?: Student
  content: string
  category: 'GENERAL' | 'BEHAVIOR' | 'ACADEMIC' | 'SOCIAL' | 'OTHER'
  date: Date
  createdAt: Date
  updatedAt: Date
}

// Form data types
export interface StudentFormData {
  firstName: string
  lastName: string
  email?: string
  dateOfBirth?: string
  gender?: string
  classId: number
}

export interface ClassFormData {
  name: string
  level: string
  year: number
}

export interface AttendanceFormData {
  studentId: number
  date: string
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'JUSTIFIED'
  reason?: string
}

export interface GradeFormData {
  studentId: number
  subject: string
  type: 'DETWORK' | 'PARTICIPATION' | 'QUIZ' | 'ORAL' | 'PROJECT'
  value: number
  coefficient: number
  date: string
  period: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  comment?: string
}

export interface ObservationFormData {
  studentId: number
  content: string
  category: 'GENERAL' | 'BEHAVIOR' | 'ACADEMIC' | 'SOCIAL' | 'OTHER'
  date: string
}

// Average calculation types
(
    type Period = 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
    
    export interface AverageResult {
      studentId: number
      student: Student
      subject: string
      period: Period
      periodValue: string // e.g. "2024-01" for monthly, "Q1" for quarterly
      average: number
      grades: Grade[]
      coefficientSum: number
    }
    
    export interface StudentAverages {
      student: Student
      averages: AverageResult[]
      generalAverage: number
    }