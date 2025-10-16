"use client";

import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ChartBarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function SolutionsSection() {
  const solutions = [
    {
      icon: DocumentTextIcon,
      title: "Contratos e Assinaturas",
      description: "Tudo automatizado, sem planilhas",
      color: "kiwi",
    },
    {
      icon: ChartBarIcon,
      title: "Relatórios Inteligentes",
      description: "Visualize seus resultados em segundos",
      color: "fluid",
    },
    {
      icon: CreditCardIcon,
      title: "Cobranças Automáticas",
      description: "Menos tempo com boletos, mais tempo com clientes",
      color: "kiwi",
    },
  ];

  return (
    <section
      id="solucoes"
      className="py-20 bg-dark-surface relative overflow-hidden"
    >
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 pattern-dots"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Nossas Soluções
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ferramentas poderosas para simplificar sua gestão empresarial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-primary/50 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  solution.color === "kiwi" ? "bg-kiwi/10" : "bg-fluid/10"
                }`}
              >
                <solution.icon
                  className={`w-8 h-8 ${
                    solution.color === "kiwi" ? "text-kiwi" : "text-fluid"
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {solution.title}
              </h3>
              <p className="text-text-secondary">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
