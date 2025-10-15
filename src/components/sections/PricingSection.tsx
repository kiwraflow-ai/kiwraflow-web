"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "R$ 29",
      period: "/mês",
      features: [
        "Gestão de contratos",
        "Relatórios básicos",
        "Suporte via e-mail",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "R$ 49",
      period: "/mês",
      features: [
        "Tudo do Starter",
        "Cobranças automáticas",
        "Relatórios avançados",
        "Suporte prioritário",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "R$ 79",
      period: "/mês",
      features: [
        "Tudo do Pro",
        "Personalização de marca",
        "Integrações extras (API, IA)",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="planos"
      className="py-20 section-accent relative overflow-hidden"
    >
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 pattern-grid"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
            Planos de Assinatura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a simplificar
            sua gestão hoje
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift relative ${
                plan.popular ? "ring-2 ring-kiwi" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-kiwi text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-dark mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-kiwi">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-kiwi mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-gradient text-white py-3 rounded-2xl font-semibold inline-block text-center"
              >
                Assinar agora
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
