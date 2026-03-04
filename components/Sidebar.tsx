'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  MessageSquare,
  FileText,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/eleves', label: 'Eleves', icon: Users },
  { href: '/classes', label: 'Classes', icon: BookOpen },
  { href: '/presence', label: 'Presence', icon: ClipboardList },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/moyennes', label: 'Moyennes', icon: MessageSquare },
  { href: '/observations', label: 'Observations', icon: MessageSquare },];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Gestion Classe
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Is Active = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-border'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="wh-5 font-bold" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}