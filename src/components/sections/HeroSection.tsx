"use client";

import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16 bg-dark-bg"
    >
      {/* Efeito de ondas fluídas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-kiwi/10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-fluid/10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-kiwi/10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-fluid/10 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Title */}
          <h1 className="text-display text-gradient text-balance mb-8">
            Gestão fluida e inteligente para pequenas empresas
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body text-xl sm:text-2xl text-text-secondary mb-12 max-w-4xl mx-auto text-balance"
          >
            Simplifique contratos, relatórios e cobranças em um só painel
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o KiwraFlow"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 btn-primary text-lg"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
            Fale com um especialista →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
