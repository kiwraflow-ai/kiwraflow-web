"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Pencil, Trash2, Share } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Contract {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  value: number;
  status: string;
  content: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContractDetailsPage() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const router = useRouter();
  const contractId = params.id as string;

  useEffect(() => {
    loadContract();
  }, [contractId]);

  const loadContract = async () => {
    try {
      const response = await fetch(`/api/contracts/${contractId}`);
      if (response.ok) {
        const data = await response.json();
        setContract(data.contract);
      } else {
        setError("Contrato não encontrado");
      }
    } catch (error) {
      console.error('Erro ao carregar contrato:', error);
      setError("Erro ao carregar contrato");
    } finally {
      setIsLoading(false);
    }
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

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este contrato?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contracts/${contractId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push("/dashboard/contracts");
      } else {
        alert('Erro ao deletar contrato');
      }
    } catch (error) {
      console.error('Erro ao deletar contrato:', error);
      alert('Erro ao deletar contrato');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kiwi"></div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contrato não encontrado</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/dashboard/contracts"
            className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold hover-lift inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Contratos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard/contracts"
              className="p-2 text-gray-400 hover:text-kiwi transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{contract.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                  {getStatusText(contract.status)}
                </span>
              </div>
              <p className="text-gray-600">Criado em {new Date(contract.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Compartilhar">
                <Share className="w-5 h-5" />
              </button>
              <Link
                href={`/dashboard/contracts/${contract.id}/edit`}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Editar"
              >
                <Pencil className="w-5 h-5" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Deletar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Conteúdo do Contrato</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {contract.content}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contract Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Contrato</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Valor</label>
                  <p className="text-lg font-semibold text-gray-900">R$ {contract.value.toLocaleString()}</p>
                </div>
                {contract.dueDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Data de Vencimento</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(contract.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                    {getStatusText(contract.status)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Client Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Cliente</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nome</label>
                  <p className="text-lg font-semibold text-gray-900">{contract.clientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg font-semibold text-gray-900">{contract.clientEmail}</p>
                </div>
                {contract.clientPhone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Telefone</label>
                    <p className="text-lg font-semibold text-gray-900">{contract.clientPhone}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações</h3>
              <div className="space-y-3">
                {contract.status === "DRAFT" && (
                  <button className="w-full btn-gradient text-white py-3 px-4 rounded-xl font-semibold hover-lift">
                    Enviar Contrato
                  </button>
                )}
                {contract.status === "SENT" && (
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Reenviar Contrato
                  </button>
                )}
                <Link
                  href={`/dashboard/contracts/${contract.id}/edit`}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Editar Contrato
                </Link>
                <button
                  onClick={handleDelete}
                  className="w-full py-3 px-4 border border-red-300 rounded-xl text-red-700 font-medium hover:bg-red-50 transition-colors"
                >
                  Deletar Contrato
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
