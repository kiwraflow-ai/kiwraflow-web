"use client";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  UserGroupIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function WhyChooseSection() {
  const features = [
    {
      icon: CheckCircleIcon,
      title: "Interface simples",
      description: "Aprenda a usar em minutos, não em horas",
      color: "kiwi",
    },
    {
      icon: UserGroupIcon,
      title: "Tudo em um só painel",
      description: "Centralize todas as suas operações",
      color: "fluid",
    },
    {
      icon: PhoneIcon,
      title: "Suporte humano e ágil",
      description: "Nossa equipe está sempre pronta para ajudar",
      color: "kiwi",
    },
  ];

  return (
    <section className="py-20 section-light relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Por que escolher o KiwraFlow?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra os diferenciais que fazem do KiwraFlow a melhor escolha
            para sua empresa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white p-8 rounded-2xl card-elevated hover-lift border border-gray-100"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  feature.color === "kiwi" ? "bg-kiwi/10" : "bg-fluid/10"
                }`}
              >
                <feature.icon
                  className={`w-10 h-10 ${
                    feature.color === "kiwi" ? "text-kiwi" : "text-fluid"
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
