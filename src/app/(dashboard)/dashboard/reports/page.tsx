"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  FileText, 
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface ReportData {
  totalRevenue: number;
  totalContracts: number;
  signedContracts: number;
  pendingContracts: number;
  monthlyRevenue: number[];
  contractStatus: {
    draft: number;
    sent: number;
    signed: number;
    expired: number;
  };
  topClients: Array<{
    name: string;
    value: number;
    contracts: number;
  }>;
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setReportData({
        totalRevenue: 45000,
        totalContracts: 12,
        signedContracts: 8,
        pendingContracts: 4,
        monthlyRevenue: [5000, 8000, 12000, 15000, 18000, 22000, 25000, 28000, 32000, 36000, 40000, 45000],
        contractStatus: {
          draft: 2,
          sent: 2,
          signed: 8,
          expired: 0
        },
        topClients: [
          { name: "João Silva", value: 15000, contracts: 3 },
          { name: "Maria Santos", value: 12000, contracts: 2 },
          { name: "Pedro Costa", value: 8000, contracts: 2 },
          { name: "Ana Oliveira", value: 5000, contracts: 1 }
        ]
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kiwi"></div>
      </div>
    );
  }

  if (!reportData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
              <p className="text-gray-600 mt-2">Acompanhe o desempenho do seu negócio</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent"
              >
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="365">Último ano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {reportData.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5%
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contratos</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.totalContracts}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3 este mês
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((reportData.signedContracts / reportData.totalContracts) * 100)}%
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5.2%
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.topClients.length}</p>
                <div className="flex items-center text-sm text-yellow-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2 novos
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Evolução da Receita</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {reportData.monthlyRevenue.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-kiwi rounded-t-lg w-8 transition-all duration-500 hover:bg-fluid"
                    style={{ height: `${(value / Math.max(...reportData.monthlyRevenue)) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contract Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Status dos Contratos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Rascunhos</span>
                </div>
                <span className="font-semibold">{reportData.contractStatus.draft}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Enviados</span>
                </div>
                <span className="font-semibold">{reportData.contractStatus.sent}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Assinados</span>
                </div>
                <span className="font-semibold">{reportData.contractStatus.signed}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Expirados</span>
                </div>
                <span className="font-semibold">{reportData.contractStatus.expired}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Principais Clientes</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {reportData.topClients.map((client, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.contracts} contratos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ {client.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Valor total</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
