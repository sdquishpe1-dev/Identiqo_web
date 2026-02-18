"use client";

import AdminLayout from "../components/admin/AdminLayout";
import KpiCard from "../components/admin/KpiCard";
import { motion } from "framer-motion";

export default function AdminDashboard() {

  // 🔥 Estos luego vendrán del backend
  const data = {
    users: 1284,
    cardsToday: 342,
    totalCards: 8921,
    aiUsage: 12903,
  };

  return (
    <AdminLayout>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Vista general del sistema Digitar Cards
          </p>
        </div>

        {/* KPI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <KpiCard
            title="Usuarios Totales"
            value={data.users.toLocaleString()}
            change="+12% este mes"
          />

          <KpiCard
            title="Tarjetas Hoy"
            value={data.cardsToday.toLocaleString()}
            change="+5% vs ayer"
          />

          <KpiCard
            title="Tarjetas Totales"
            value={data.totalCards.toLocaleString()}
          />

          <KpiCard
            title="Créditos AI Usados"
            value={data.aiUsage.toLocaleString()}
          />
        </div>

        {/* ACTIVIDAD RECIENTE */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Actividad Reciente
          </h2>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>• Usuario juan@email.com creó una tarjeta.</p>
            <p>• María actualizó su plan a Premium.</p>
            <p>• Se generaron 23 tarjetas con IA hoy.</p>
            <p>• Nuevo template publicado.</p>
          </div>
        </div>

      </motion.div>

    </AdminLayout>
  );
}
