"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UserIcon, 
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  KeyIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "profile", name: "Perfil", icon: UserIcon },
    { id: "notifications", name: "Notificações", icon: BellIcon },
    { id: "security", name: "Segurança", icon: ShieldCheckIcon },
    { id: "billing", name: "Cobrança", icon: CreditCardIcon },
    { id: "preferences", name: "Preferências", icon: GlobeAltIcon },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-kiwi/10 text-kiwi"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Perfil</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          defaultValue="João Silva"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="joao@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue="Minha Empresa LTDA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        defaultValue="(11) 99999-9999"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferências de Notificação</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Email de Novos Contratos</h3>
                        <p className="text-sm text-gray-500">Receber notificações quando novos contratos forem criados</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-kiwi">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Lembretes de Pagamento</h3>
                        <p className="text-sm text-gray-500">Receber lembretes de faturas próximas do vencimento</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-kiwi">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Relatórios Semanais</h3>
                        <p className="text-sm text-gray-500">Receber relatórios de performance semanalmente</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Segurança da Conta</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Alterar Senha</h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Senha atual"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="password"
                          placeholder="Nova senha"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="password"
                          placeholder="Confirmar nova senha"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-green-900">Autenticação de Dois Fatores</h3>
                          <p className="text-sm text-green-700">Ativada</p>
                        </div>
                      </div>
                      <button className="text-sm text-green-600 hover:text-green-700">
                        Gerenciar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações de Cobrança</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <CreditCardIcon className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-blue-900">Plano Atual</h3>
                          <p className="text-sm text-blue-700">Starter - R$ 29/mês</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Método de Pagamento</h3>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                              <CreditCardIcon className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">**** **** **** 1234</p>
                              <p className="text-sm text-gray-500">Visa • Expira em 12/25</p>
                            </div>
                          </div>
                          <button className="text-sm text-kiwi hover:text-kiwi/80">
                            Alterar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferências Gerais</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200">
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuso Horário
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200">
                        <option value="America/Sao_Paulo">Brasília (UTC-3)</option>
                        <option value="America/New_York">New York (UTC-5)</option>
                        <option value="Europe/London">London (UTC+0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formato de Data
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-end gap-4">
                  <button className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                    Cancelar
                  </button>
                  <motion.button
                    onClick={handleSave}
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
                        <CheckIcon className="w-5 h-5" />
                        Salvar Alterações
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
