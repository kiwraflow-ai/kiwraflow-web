"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditContractPage() {
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    value: "",
    dueDate: "",
    content: "",
    status: "DRAFT"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const contractId = params.id as string;

  useEffect(() => {
    loadContract();
  }, [contractId]);

  const loadContract = async () => {
    try {
      const response = await fetch(`/api/contracts/${contractId}`);
      if (response.ok) {
        const data = await response.json();
        const contract = data.contract;
        setFormData({
          title: contract.title || "",
          clientName: contract.clientName || "",
          clientEmail: contract.clientEmail || "",
          clientPhone: contract.clientPhone || "",
          value: contract.value?.toString() || "",
          dueDate: contract.dueDate ? new Date(contract.dueDate).toISOString().split('T')[0] : "",
          content: contract.content || "",
          status: contract.status || "DRAFT"
        });
      } else {
        setError("Contrato não encontrado");
      }
    } catch (error) {
      console.error('Erro ao carregar contrato:', error);
      setError("Erro ao carregar contrato");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push("/dashboard/contracts");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao atualizar contrato");
      }
    } catch (error) {
      setError("Erro ao atualizar contrato");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kiwi"></div>
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
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Editar Contrato</h1>
              <p className="text-gray-600 mt-2">Atualize as informações do contrato</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações Básicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Contrato *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Desenvolvimento de Website"
                  />
                </div>

                <div>
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                    Valor (R$) *
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    required
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            {/* Informações do Cliente */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="João Silva"
                  />
                </div>

                <div>
                  <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    required
                    value={formData.clientEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="joao@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Vencimento
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Status do Contrato */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Status do Contrato</h2>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status Atual
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                >
                  <option value="DRAFT">Rascunho</option>
                  <option value="SENT">Enviado</option>
                  <option value="SIGNED">Assinado</option>
                  <option value="EXPIRED">Expirado</option>
                </select>
              </div>
            </div>

            {/* Conteúdo do Contrato */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Conteúdo do Contrato</h2>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição e Termos *
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={8}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                  placeholder="Descreva os serviços, prazos, condições de pagamento e outros termos importantes..."
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Botões */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/dashboard/contracts"
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gradient text-white px-8 py-3 rounded-xl font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <DocumentTextIcon className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
