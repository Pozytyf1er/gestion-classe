import { prisma } from '@/lib/db';
import StatCard from '@/components/StatCard';
import { Users, BookOpen, ClipboardList, FileText } from 'lucide-react';

export default async function DashboardPage() {
  const [totalStudents, totalClasses, todayPresence, totalGrades] = await Promise.all([
    prisma.student.count(),
    prisma.class.count(),
    prisma.attendance.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        },
        status: 'PRESENT'
      }
    }),
    prisma.grade.count(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb--2 font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500">Bunjour à la gestion de votre classe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Eleves"
          value={totalStudents}
          icon={Users}
          description="Eleves inscrits"
          href="/eleves"
        />
        <StatCard
          title="Classes"
          value={totalClasses}
          icon={BookOpen}
          description="Classes actives"
          href="/classes"
        />
        <StatCard
          title="Presence Aujourdhui"
          value={todayPresence}
          icon={ClipboardList}
          description="Présents aujourdhui"
          href="/presence"
        />
        <StatCard
          title="Notes"
          value={totalGrades}
          icon={FileText}
          description="Notes entregistrees"
          href="/notes"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Acces rapides</h2>
          <div className="space-y-3">
            <a href="/eleves/nouveau" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="font-medium text-blue-700">+ Ajouter un éleve</span>
            </a>
            <a href="/classes/nouveau" className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="font-medium text-green-700">+ Créeer une classe</span>
            </a>
            <a href="/presence" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="font-medium text-purple-700">+ Faire l'atppel</span>
            </a>
            <a href="/notes/nouveau" className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <span className="font-medium text-orange-700">+ Ajouter une note</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Derniers éleves</h2>
          <p className="text-gray-500">Fonctionnalités disponibles aujourdhui:</p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
            <li>Gestion des éleves (ajout, modifier)</li>
            <li>Cahier de présence quotidien</li>
            <li>Attribution des notes</li>
            <li>Calcul automatique des moyennes (mensuel, trimestrel, annuel)</li>
            <li>Système d'oservations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}