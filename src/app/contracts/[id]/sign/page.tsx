"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import { useParams } from "next/navigation";

interface Contract {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  value: number;
  content: string;
  status: string;
  createdAt: string;
  dueDate?: string;
}

export default function ContractSignPage() {
  const params = useParams();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      loadContract();
    }
  }, [params.id]);

  const loadContract = async () => {
    try {
      const response = await fetch(`/api/contracts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setContract(data.contract);
      } else {
        setError('Contrato não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar contrato:', error);
      setError('Erro ao carregar contrato');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = async () => {
    if (!contract) return;

    setIsSigning(true);
    try {
      const response = await fetch(`/api/contracts/${contract.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'SIGNED',
          signedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSigned(true);
        // Atualizar status local
        setContract(prev => prev ? { ...prev, status: 'SIGNED' } : null);
      } else {
        setError('Erro ao assinar contrato');
      }
    } catch (error) {
      console.error('Erro ao assinar:', error);
      setError('Erro ao assinar contrato');
    } finally {
      setIsSigning(false);
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
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro</h2>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (signed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contrato Assinado!</h2>
          <p className="text-gray-600 mb-6">
            O contrato foi assinado com sucesso. Você receberá uma cópia por email.
          </p>
          <button
            onClick={() => window.print()}
            className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold hover-lift inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Baixar Contrato
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-kiwi/10 rounded-lg">
              <FileText className="w-8 h-8 text-kiwi" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{contract.title}</h1>
              <p className="text-gray-600">Para: {contract.clientName} ({contract.clientEmail})</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Valor</span>
              <p className="text-lg font-semibold text-gray-900">
                R$ {contract.value.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Status</span>
              <p className="text-lg font-semibold text-gray-900">
                {contract.status === 'SIGNED' ? 'Assinado' : 'Pendente'}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Vencimento</span>
              <p className="text-lg font-semibold text-gray-900">
                {contract.dueDate ? new Date(contract.dueDate).toLocaleDateString('pt-BR') : 'Não definido'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contract Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Conteúdo do Contrato</h2>
          <div className="prose max-w-none">
            <div 
              className="text-gray-700 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: contract.content }}
            />
          </div>
        </motion.div>

        {/* Sign Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Assinar Contrato
          </h3>
          <p className="text-gray-600 mb-6">
            Ao clicar em "Assinar", você concorda com todos os termos e condições deste contrato.
          </p>
          
          <button
            onClick={handleSign}
            disabled={isSigning || contract.status === 'SIGNED'}
            className="btn-gradient text-white px-8 py-4 rounded-xl font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {isSigning ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Assinando...
              </>
            ) : contract.status === 'SIGNED' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Já Assinado
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Assinar Contrato
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
