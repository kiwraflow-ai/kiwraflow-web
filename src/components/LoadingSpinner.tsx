"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "kiwi" | "fluid" | "gray";
  text?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  color = "kiwi", 
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const colorClasses = {
    kiwi: "border-kiwi",
    fluid: "border-fluid",
    gray: "border-gray-400"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-4 border-t-transparent rounded-full
        `}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 dark:text-dark-muted font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
