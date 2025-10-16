"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      title: "Contratos Inteligentes",
      description: "Crie e gerencie contratos com templates personalizáveis",
      icon: "📄",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Relatórios Automáticos", 
      description: "Gere relatórios detalhados automaticamente",
      icon: "📊",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Cobranças Eficientes",
      description: "Automatize o processo de cobrança",
      icon: "💰",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl mb-6">
            Veja o <span className="text-gradient">KiwraFlow</span> em ação
          </h2>
          <p className="text-body text-xl text-text-secondary max-w-3xl mx-auto">
            Experimente nossa plataforma e descubra como ela pode transformar sua gestão empresarial
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video/Animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-8 shadow-2xl">
              <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-primary text-dark-bg rounded-full hover:bg-primary/90 transition-colors"
                    aria-label={isPlaying ? "Pausar demo" : "Reproduzir demo"}
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-dark-border rounded animate-pulse"></div>
                  <div className="h-4 bg-dark-border rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-dark-border rounded w-1/2 animate-pulse"></div>
                </div>

                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20"
                  >
                    <p className="text-sm text-primary font-medium">
                      🎉 Demo em execução! Veja como é fácil gerenciar sua empresa.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4 p-6 rounded-xl hover:bg-dark-card transition-colors border border-dark-border"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-body text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center btn-primary text-lg"
              >
                Começar Agora →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
