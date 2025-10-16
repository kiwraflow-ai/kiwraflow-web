"use client";

import { motion } from "framer-motion";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Produto",
      links: [
        { name: "Funcionalidades", href: "#solucoes" },
        { name: "Preços", href: "#planos" },
        { name: "Demo", href: "#demo" },
        { name: "Integrações", href: "#integracoes" },
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nós", href: "#sobre" },
        { name: "Blog", href: "/blog" },
        { name: "Carreiras", href: "/carreiras" },
        { name: "Imprensa", href: "/imprensa" },
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "/ajuda" },
        { name: "Documentação", href: "/docs" },
        { name: "Status", href: "/status" },
        { name: "Comunidade", href: "/comunidade" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Termos de Uso", href: "/termos" },
        { name: "Política de Privacidade", href: "/privacidade" },
        { name: "LGPD", href: "/lgpd" },
        { name: "Cookies", href: "/cookies" },
      ]
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/kiwraflow", icon: "💼" },
    { name: "Twitter", href: "https://twitter.com/kiwraflow", icon: "🐦" },
    { name: "Instagram", href: "https://instagram.com/kiwraflow", icon: "📸" },
    { name: "YouTube", href: "https://youtube.com/@kiwraflow", icon: "📺" },
  ];

  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-dark-bg font-bold text-lg">K</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    <span className="text-primary">Kiwra</span>Flow
          </h3>
                </div>
                
                <p className="text-text-secondary mb-6 max-w-sm">
                  Simplifique contratos, relatórios e cobranças em um só painel. 
                  Gestão fluida e inteligente para pequenas empresas.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-text-secondary">
                    <EnvelopeIcon className="w-5 h-5 mr-3 text-primary" />
                    <span>contato@kiwraflow.com</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <PhoneIcon className="w-5 h-5 mr-3 text-primary" />
                    <span>+55 (11) 99999-9999</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <MapPinIcon className="w-5 h-5 mr-3 text-primary" />
                    <span>São Paulo, SP - Brasil</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-text-primary font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-text-secondary hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-dark-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-text-primary font-semibold mb-2">
                Receba nossas novidades
              </h4>
              <p className="text-text-secondary text-sm">
                Dicas, atualizações e ofertas especiais direto no seu e-mail.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 md:w-80 px-4 py-3 bg-dark-card border border-dark-border rounded-l-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="btn-primary rounded-l-none">
                Inscrever
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-text-secondary text-sm">
                © {currentYear} KiwraFlow. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4 text-xs text-text-muted">
                <span>CNPJ: 12.345.678/0001-90</span>
                <span>•</span>
                <span>IE: 123.456.789.012</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-text-secondary text-sm mr-2">Siga-nos:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Security Badges */}
          <div className="mt-6 pt-6 border-t border-dark-border">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-xs text-text-muted">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-2 text-primary" />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center">
                <DocumentTextIcon className="w-4 h-4 mr-2 text-primary" />
                <span>LGPD Compliant</span>
              </div>
              <div className="flex items-center">
                <GlobeAltIcon className="w-4 h-4 mr-2 text-primary" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Made with Love */}
          <div className="mt-4 text-center">
            <p className="text-text-muted text-xs flex items-center justify-center">
              Feito com <HeartIcon className="w-3 h-3 mx-1 text-red-500" /> no Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
