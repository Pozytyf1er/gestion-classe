'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Student, Class, StudentFormData } from '@types';
import { createStudent, updateStudent } from '@`/app/actions/students';

interface StudentFormProps {
  student?: Student;
  classes: Class[];
  onSubmit?: () => void;
}

export default function StudentForm({ student, classes, onSubmit }: StudentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: StudentFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string || undefined,
      dateOfBirth: formData.get('dateOfBirth') as string || undefined,
      gender: formData.get('gender') as string || undefined,
      classId: parseInt(formData.get('classId') as string),
    };

    try {
      if (student) {
        await updateStudent(student.id, data);
      } else {
        await createStudent(data);
      }
      onComplete?();
    } catch (err) {
      setError('Une erreur est survenue');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error &&(
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prenom
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            defaultValue={student?.firstName}
            required
            className="wfull px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={student?.lastName}
            required
            className="wfull px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={student?.email}
          className="wfull px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            defaultValue={student?.dateOfBirth?.toISOString().split('T')[0]}
            className="wfull px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            name="gender"
            id="gender"
            defaultValue={student?.gender}
            className="wfull px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner...</option>
            <option value="Masculin">Masculin</option>
            <option value="Femaline">Femaline</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="classId" className="block text-sm font-medium text-gray-700 mb-1">
          Classe
        </label>
        <select
          name="classId"
          id="classId"
          defaultValue={student?.classId}
          required
          className="wfull px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner une classe...</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} ({cls.level})
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.push('/eleves')}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Encours...' : student ? 'Modifier' : 'Créeer'}
        </button>
      </div>
    </form>
  );
}