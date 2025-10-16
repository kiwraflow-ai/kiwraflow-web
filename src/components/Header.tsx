'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Planos', href: '#planos' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <a href="#inicio" className="text-2xl font-bold">
              <span className="text-kiwi">Kiwra</span>
              <span className="text-fluid">Flow</span>
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="text-dark hover:text-kiwi transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              className="text-dark hover:text-kiwi transition-colors duration-300 font-medium"
            >
              Entrar
            </motion.a>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Cadastrar
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark hover:text-kiwi transition-colors duration-300"
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsMenuOpen(false)}
                className="block text-dark hover:text-kiwi transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-4 space-y-3">
              {/* <div className="flex items-center justify-center">
                <ThemeToggle />
              </div> */}
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                className="block text-dark hover:text-kiwi transition-colors duration-300 font-medium"
              >
                Entrar
              </motion.a>
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block btn-primary text-center"
              >
                Cadastrar
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
