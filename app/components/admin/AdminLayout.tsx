"use client";

import { ReactNode } from "react";
import { LayoutDashboard, Users, CreditCard, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      {/* SIDEBAR */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
        <h2 className="text-xl font-bold mb-8">Digitar Admin</h2>

        <nav className="space-y-4 text-sm">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <Users size={18} /> Usuarios
          </Link>
          <Link
            href="/admin/templates"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <Users size={18} /> Plantillas
          </Link>
          <Link
            href="/admin/plans"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <CreditCard size={18} /> Planes
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <Settings size={18} /> Configuración
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
