"use client";

import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-light dark:bg-dark-bg flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <LoadingSpinner size="lg" color="kiwi" text="Carregando..." />
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="mt-4 h-1 bg-gradient-to-r from-kiwi to-fluid rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
