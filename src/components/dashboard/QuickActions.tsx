"use client";

import { motion } from "framer-motion";
import {
  PlusIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CreditCardIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    name: "Novo Contrato",
    description: "Criar um novo contrato",
    href: "/dashboard/contracts/new",
    icon: DocumentTextIcon,
    color: "kiwi",
  },
  {
    name: "Ver Relatórios",
    description: "Analisar performance",
    href: "/dashboard/reports",
    icon: ChartBarIcon,
    color: "fluid",
  },
  {
    name: "Cobranças",
    description: "Gerenciar pagamentos",
    href: "/dashboard/billing",
    icon: CreditCardIcon,
    color: "kiwi",
  },
  {
    name: "Configurações",
    description: "Personalizar conta",
    href: "/dashboard/settings",
    icon: CogIcon,
    color: "fluid",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ações Rápidas
        </h3>

        <div className="space-y-3">
          {actions.map((action, index) => (
            <motion.a
              key={action.name}
              href={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block p-4 rounded-lg border border-gray-200 hover:border-kiwi/50 hover:bg-kiwi/5 transition-all duration-200 group"
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    action.color === "kiwi" ? "bg-kiwi/10" : "bg-fluid/10"
                  } group-hover:${
                    action.color === "kiwi" ? "bg-kiwi/20" : "bg-fluid/20"
                  } transition-colors`}
                >
                  <action.icon
                    className={`w-5 h-5 ${
                      action.color === "kiwi" ? "text-kiwi" : "text-fluid"
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-kiwi transition-colors">
                    {action.name}
                  </p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
                <div className="ml-auto">
                  <PlusIcon className="w-4 h-4 text-gray-400 group-hover:text-kiwi transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-gradient text-white py-2 px-4 rounded-lg font-medium hover-lift"
          >
            Criar Novo Contrato
          </motion.button>
        </div>
      </div>
    </div>
  );
}
