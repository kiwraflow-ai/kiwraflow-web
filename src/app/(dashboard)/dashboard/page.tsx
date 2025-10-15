"use client";

import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ChartBarIcon,
  CreditCardIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentContracts from "@/components/dashboard/RecentContracts";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const stats = [
    {
      name: "Contratos Ativos",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: DocumentTextIcon,
    },
    {
      name: "Receita do Mês",
      value: "R$ 15.420",
      change: "+12%",
      changeType: "positive" as const,
      icon: CreditCardIcon,
    },
    {
      name: "Taxa de Conversão",
      value: "68%",
      change: "+5%",
      changeType: "positive" as const,
      icon: ChartBarIcon,
    },
    {
      name: "Clientes Ativos",
      value: "24",
      change: "+3",
      changeType: "positive" as const,
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral do seu negócio
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <DashboardStats stats={stats} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Contracts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RecentContracts />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <QuickActions />
        </motion.div>
      </div>
    </div>
  );
}
