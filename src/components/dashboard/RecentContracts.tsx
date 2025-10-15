"use client";

import { motion } from "framer-motion";
import { DocumentTextIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

const contracts = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços - Cliente A",
    client: "João Silva",
    status: "signed",
    value: "R$ 2.500,00",
    dueDate: "2024-02-15",
  },
  {
    id: "2",
    title: "Contrato de Consultoria - Empresa B",
    client: "Maria Santos",
    status: "pending",
    value: "R$ 1.800,00",
    dueDate: "2024-02-20",
  },
  {
    id: "3",
    title: "Contrato de Desenvolvimento - Startup C",
    client: "Pedro Costa",
    status: "draft",
    value: "R$ 5.200,00",
    dueDate: "2024-02-25",
  },
];

const statusConfig = {
  signed: {
    label: "Assinado",
    className: "bg-green-100 text-green-800",
  },
  pending: {
    label: "Pendente",
    className: "bg-yellow-100 text-yellow-800",
  },
  draft: {
    label: "Rascunho",
    className: "bg-gray-100 text-gray-800",
  },
};

export default function RecentContracts() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Contratos Recentes
          </h3>
          <a
            href="/dashboard/contracts"
            className="text-sm font-medium text-kiwi hover:text-fluid transition-colors"
          >
            Ver todos
          </a>
        </div>

        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {contracts.map((contract, index) => (
              <motion.li
                key={contract.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="py-5"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-kiwi/10 rounded-lg flex items-center justify-center">
                      <DocumentTextIcon className="w-5 h-5 text-kiwi" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contract.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[contract.status as keyof typeof statusConfig].className}`}
                        >
                          {statusConfig[contract.status as keyof typeof statusConfig].label}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-sm text-gray-500">{contract.client}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {contract.value}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Vencimento: {new Date(contract.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
