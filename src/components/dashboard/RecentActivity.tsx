"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  UserPlus,
  Clock,
  TrendingUp
} from "lucide-react";

interface Activity {
  id: string;
  type: 'contract_created' | 'contract_signed' | 'payment_received' | 'client_added' | 'reminder';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      // Simular atividades por enquanto
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'contract_signed',
          title: 'Contrato Assinado',
          description: 'João Silva assinou o contrato de desenvolvimento web',
          timestamp: '2 min atrás',
          icon: CheckCircle,
          color: 'text-green-500'
        },
        {
          id: '2',
          type: 'payment_received',
          title: 'Pagamento Recebido',
          description: 'R$ 5.000,00 recebido de Maria Santos',
          timestamp: '1 hora atrás',
          icon: DollarSign,
          color: 'text-green-500'
        },
        {
          id: '3',
          type: 'contract_created',
          title: 'Novo Contrato',
          description: 'Contrato de consultoria criado para Pedro Costa',
          timestamp: '3 horas atrás',
          icon: FileText,
          color: 'text-blue-500'
        },
        {
          id: '4',
          type: 'client_added',
          title: 'Novo Cliente',
          description: 'Ana Oliveira se cadastrou na plataforma',
          timestamp: '5 horas atrás',
          icon: UserPlus,
          color: 'text-purple-500'
        },
        {
          id: '5',
          type: 'reminder',
          title: 'Lembrete',
          description: 'Fatura #1234 vence em 2 dias',
          timestamp: '1 dia atrás',
          icon: AlertCircle,
          color: 'text-yellow-500'
        }
      ];

      setActivities(mockActivities);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
        <TrendingUp className="w-5 h-5 text-kiwi" />
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma atividade recente</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-kiwi hover:text-kiwi/80 font-medium">
            Ver todas as atividades
          </button>
        </div>
      )}
    </motion.div>
  );
}
