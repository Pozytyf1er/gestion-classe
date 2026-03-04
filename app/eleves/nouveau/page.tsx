import { prisma } from '@/lib/db';
import StudentForm from '@/components/StudentForm';

export default async function NewStudentPage() {
  const classes = await prisma.class.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ajouter un élve</h1>
        <p className="text-gray-500 mt-1">Remplicez le formulaire pour ajouter un nouveau eleve</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <StudentForm classes={classe} />
      </div>
    </div>
  );
}