"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, FileText, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Contract {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  value: number;
  status: string;
  createdAt: string;
  dueDate?: string;
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const response = await fetch('/api/contracts');
      if (response.ok) {
        const data = await response.json();
        setContracts(data.contracts || []);
      } else {
        // Se a API falhar, mostrar lista vazia
        setContracts([]);
      }
    } catch (error) {
      console.error('Erro ao carregar contratos:', error);
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (contractId: string) => {
    if (!confirm('Tem certeza que deseja deletar este contrato?')) {
      return;
    }

    setDeletingId(contractId);
    try {
      const response = await fetch(`/api/contracts/${contractId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setContracts(contracts.filter(c => c.id !== contractId));
      } else {
        alert('Erro ao deletar contrato');
      }
    } catch (error) {
      console.error('Erro ao deletar contrato:', error);
      alert('Erro ao deletar contrato');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (contractId: string) => {
    router.push(`/dashboard/contracts/${contractId}/edit`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT": return "bg-gray-100 text-gray-800";
      case "SENT": return "bg-blue-100 text-blue-800";
      case "SIGNED": return "bg-green-100 text-green-800";
      case "EXPIRED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "DRAFT": return "Rascunho";
      case "SENT": return "Enviado";
      case "SIGNED": return "Assinado";
      case "EXPIRED": return "Expirado";
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kiwi"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
              <p className="text-gray-600 mt-2">Gerencie todos os seus contratos em um só lugar</p>
            </div>
            <Link
              href="/dashboard/contracts/new"
              className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold hover-lift inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Contrato
            </Link>
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
              <div className="p-3 bg-kiwi/10 rounded-lg">
                <FileText className="w-6 h-6 text-kiwi" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === "DRAFT").length}
                </p>
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
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assinados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === "SIGNED").length}
                </p>
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
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {contracts.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contracts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Todos os Contratos</h2>
          </div>

          {contracts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum contrato encontrado</h3>
              <p className="text-gray-600 mb-6">Comece criando seu primeiro contrato</p>
              <Link
                href="/dashboard/contracts/new"
                className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold hover-lift inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Criar Primeiro Contrato
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {contracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                          {getStatusText(contract.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Cliente:</span> {contract.clientName}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {contract.clientEmail}
                        </div>
                        <div>
                          <span className="font-medium">Valor:</span> R$ {contract.value.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Criado em:</span> {new Date(contract.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => router.push(`/dashboard/contracts/${contract.id}`)}
                        className="p-2 text-gray-400 hover:text-kiwi transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleEdit(contract.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Editar"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(contract.id)}
                        disabled={deletingId === contract.id}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Deletar"
                      >
                        {deletingId === contract.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
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
