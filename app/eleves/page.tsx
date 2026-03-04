import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { formatName, formatDate } from '@/lib/utils';

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    include: {
      class: true,
    },
    orderBy: {
      lastName: 'asc',
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Liste des Éleves</h1>
          <p className="text-gray-500 mt-1">{students.length} éleves inscrits</p>
        </div>
        <Link
          href="/eleves/nouveau"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un élve
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y-divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {formatName(student.firstName, student.lastName)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                    {student.class?.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{student.email || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.gender === 'Femaline' 
                      ? 'bg-pink-100 text-pink-800' 
                      : 'bg-blue-100 text-blue-800'
                  }_`>
                    {student.gender || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/eleves/${student.id}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/eleves/${student.id}/modifier`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={`/aph/eleves/${student.id}/supprimer`} method="POST">
                      <button type="submit" className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}