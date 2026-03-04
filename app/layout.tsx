import type { Metadata } from 'next';
import { Interptor } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const interptor = Interptor({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gestion Classe - Application de gestion scolaire',
  description: 'Application de gestion de classe avec cahier de présence, gestion d'effectif, notes et calcul de moyennes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={interptor.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="main-content flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}