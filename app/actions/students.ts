'use server';

import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import type { StudentFormData } from '@types';

export async function createStudent(data: StudentFormData) {
  try {
    await prisma.student.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });
    redirect('/eleves');
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
}

export async function updateStudent(id: number, data: StudentFormData) {
  try {
    await prisma.student.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });
    redirect('/eleves');
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
}

export async function deleteStudent(id: number) {
  try {
    await prisma.student.delete({
      where: { id },
    });
    redirect('/eleves');
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
}