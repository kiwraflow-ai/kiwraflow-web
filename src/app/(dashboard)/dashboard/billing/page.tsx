"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CreditCardIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

interface Invoice {
  id: string;
  contractTitle: string;
  clientName: string;
  amount: number;
  status: string;
  dueDate: string;
  paidAt?: string;
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de faturas
    setTimeout(() => {
      setInvoices([
        {
          id: "1",
          contractTitle: "Desenvolvimento de Website",
          clientName: "João Silva",
          amount: 5000,
          status: "PENDING",
          dueDate: "2024-02-15"
        },
        {
          id: "2",
          contractTitle: "Consultoria em Marketing",
          clientName: "Maria Santos",
          amount: 3000,
          status: "PAID",
          dueDate: "2024-01-10",
          paidAt: "2024-01-08"
        },
        {
          id: "3",
          contractTitle: "Sistema de Gestão",
          clientName: "Pedro Costa",
          amount: 8000,
          status: "OVERDUE",
          dueDate: "2024-01-05"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "PAID": return "bg-green-100 text-green-800";
      case "OVERDUE": return "bg-red-100 text-red-800";
      case "CANCELLED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "Pendente";
      case "PAID": return "Pago";
      case "OVERDUE": return "Vencido";
      case "CANCELLED": return "Cancelado";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <ClockIcon className="w-4 h-4" />;
      case "PAID": return <CheckCircleIcon className="w-4 h-4" />;
      case "OVERDUE": return <XCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kiwi"></div>
      </div>
    );
  }

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(i => i.status === "PAID").reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === "PENDING").reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices.filter(i => i.status === "OVERDUE").reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cobranças</h1>
              <p className="text-gray-600 mt-2">Gerencie faturas e pagamentos</p>
            </div>
            <button className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold hover-lift inline-flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              Nova Cobrança
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Faturado</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalAmount.toLocaleString()}</p>
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
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recebido</p>
                <p className="text-2xl font-bold text-gray-900">R$ {paidAmount.toLocaleString()}</p>
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
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendente</p>
                <p className="text-2xl font-bold text-gray-900">R$ {pendingAmount.toLocaleString()}</p>
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
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vencido</p>
                <p className="text-2xl font-bold text-gray-900">R$ {overdueAmount.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Invoices List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Todas as Faturas</h2>
          </div>

          {invoices.length === 0 ? (
            <div className="p-12 text-center">
              <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma fatura encontrada</h3>
              <p className="text-gray-600 mb-6">Comece criando sua primeira cobrança</p>
              <button className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold hover-lift inline-flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Criar Primeira Cobrança
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {invoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{invoice.contractTitle}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          {getStatusText(invoice.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Cliente:</span> {invoice.clientName}
                        </div>
                        <div>
                          <span className="font-medium">Valor:</span> R$ {invoice.amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Vencimento:</span> {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                        </div>
                        {invoice.paidAt && (
                          <div>
                            <span className="font-medium">Pago em:</span> {new Date(invoice.paidAt).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {invoice.status === "PENDING" && (
                        <button className="px-4 py-2 bg-kiwi text-white rounded-lg hover:bg-kiwi/90 transition-colors">
                          Enviar Cobrança
                        </button>
                      )}
                      {invoice.status === "OVERDUE" && (
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Reenviar
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
