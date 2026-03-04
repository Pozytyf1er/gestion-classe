import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  href: string;
}

export default function StatCard({ title, value, icon: Icon, description, href }: StatCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Icon className="wh-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </Link>
  );
}