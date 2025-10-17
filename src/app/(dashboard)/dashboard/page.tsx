"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, DollarSign, BarChart3, Users, TrendingUp, Bell } from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentContracts from "@/components/dashboard/RecentContracts";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

interface DashboardData {
  totalContracts: number;
  totalRevenue: number;
  conversionRate: number;
  activeClients: number;
  contractsChange: number;
  revenueChange: number;
  conversionChange: number;
  clientsChange: number;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Carregar dados reais das APIs
      const contractsResponse = await fetch('/api/contracts');
      const contracts = contractsResponse.ok ? await contractsResponse.json() : { contracts: [] };

      // Calcular métricas
      const totalContracts = contracts.contracts?.length || 0;
      const signedContracts = contracts.contracts?.filter((c: any) => c.status === 'SIGNED').length || 0;
      const totalRevenue = contracts.contracts?.reduce((sum: number, c: any) => sum + (c.value || 0), 0) || 0;
      const activeClients = new Set(contracts.contracts?.map((c: any) => c.clientEmail)).size || 0;
      const conversionRate = totalContracts > 0 ? Math.round((signedContracts / totalContracts) * 100) : 0;

      setDashboardData({
        totalContracts,
        totalRevenue,
        conversionRate,
        activeClients,
        contractsChange: 2, // Simulado por enquanto
        revenueChange: 12,
        conversionChange: 5,
        clientsChange: 3
      });
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      // Dados de fallback
      setDashboardData({
        totalContracts: 0,
        totalRevenue: 0,
        conversionRate: 0,
        activeClients: 0,
        contractsChange: 0,
        revenueChange: 0,
        conversionChange: 0,
        clientsChange: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kiwi"></div>
      </div>
    );
  }

  const stats = dashboardData ? [
    {
      name: "Contratos Ativos",
      value: dashboardData.totalContracts.toString(),
      change: `+${dashboardData.contractsChange}`,
      changeType: "positive" as const,
      icon: FileText,
    },
    {
      name: "Receita Total",
      value: `R$ ${dashboardData.totalRevenue.toLocaleString()}`,
      change: `+${dashboardData.revenueChange}%`,
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      name: "Taxa de Conversão",
      value: `${dashboardData.conversionRate}%`,
      change: `+${dashboardData.conversionChange}%`,
      changeType: "positive" as const,
      icon: BarChart3,
    },
    {
      name: "Clientes Ativos",
      value: dashboardData.activeClients.toString(),
      change: `+${dashboardData.clientsChange}`,
      changeType: "positive" as const,
      icon: Users,
    },
  ] : [];

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
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

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </div>
  );
}
