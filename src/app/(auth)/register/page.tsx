"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "STARTER", // Plano padrão
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const plans = [
    {
      id: "STARTER",
      name: "Starter",
      price: "R$ 29",
      period: "/mês",
      description: "Perfeito para começar",
      features: ["Gestão de contratos", "Relatórios básicos", "Suporte via e-mail"],
      popular: false,
    },
    {
      id: "PRO",
      name: "Pro",
      price: "R$ 49",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: ["Tudo do Starter", "Cobranças automáticas", "Relatórios avançados", "Suporte prioritário"],
      popular: true,
    },
    {
      id: "BUSINESS",
      name: "Business",
      price: "R$ 79",
      period: "/mês",
      description: "Para grandes empresas",
      features: ["Tudo do Pro", "Personalização de marca", "Integrações extras (API, IA)"],
      popular: false,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % plans.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    // Atualiza o plano baseado no slide atual
    const selectedPlan = plans[currentSlide];
    setFormData({ ...formData, plan: selectedPlan.id });

    // Simulação de cadastro - sempre funciona
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-background">
      {/* Header com botão voltar */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-dark hover:text-kiwi transition-colors group"
        >
          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao site</span>
        </Link>
      </div>

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

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto h-16 w-16 flex items-center justify-center mb-6"
            >
              <span className="text-4xl font-bold">
                <span className="text-kiwi">Kiwra</span>
                <span className="text-fluid">Flow</span>
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-2">
              Crie sua conta
            </h2>
            <p className="text-lg text-gray-600">
              Comece sua jornada de gestão empresarial
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark mb-2">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all duration-200"
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Seleção de Plano - Slider */}
              <div className="space-y-6">
                <label className="block text-sm font-medium text-dark mb-4">
                  Escolha seu plano
                </label>
                
                {/* Container do Slider */}
                <div className="relative">
                  {/* Botões de Navegação */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:border-kiwi transition-colors"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-600 hover:text-kiwi" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:border-kiwi transition-colors"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-600 hover:text-kiwi" />
                  </button>

                  {/* Card do Plano Atual */}
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="relative cursor-pointer rounded-2xl border-2 p-8 transition-all duration-200 border-kiwi bg-kiwi/5 hover:bg-kiwi/10"
                    onClick={() => setFormData({ ...formData, plan: plans[currentSlide].id })}
                  >
                    {plans[currentSlide].popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-kiwi text-white text-sm px-4 py-2 rounded-full font-medium">
                          Mais Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-dark mb-3">{plans[currentSlide].name}</h3>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-kiwi">{plans[currentSlide].price}</span>
                        <span className="text-gray-500 text-xl ml-2">{plans[currentSlide].period}</span>
                      </div>
                      <p className="text-lg text-gray-600 mb-6 font-medium">{plans[currentSlide].description}</p>
                      
                      <ul className="text-base text-gray-600 space-y-3 max-w-md mx-auto">
                        {plans[currentSlide].features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-3 h-3 bg-kiwi rounded-full mr-4 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <div className="w-8 h-8 rounded-full border-4 border-kiwi bg-kiwi">
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Indicadores de Slide */}
                <div className="flex justify-center space-x-2">
                  {plans.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide 
                          ? "bg-kiwi scale-125" 
                          : "bg-gray-300 hover:bg-kiwi/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Informação do Plano Selecionado */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Plano selecionado: <span className="font-semibold text-kiwi">{plans[currentSlide].name}</span>
                  </p>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-kiwi focus:ring-kiwi border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  Eu aceito os{" "}
                  <a href="#" className="text-kiwi hover:text-fluid transition-colors">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-kiwi hover:text-fluid transition-colors">
                    Política de Privacidade
                  </a>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-gradient text-white py-3 px-4 rounded-xl font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Criando conta..." : `Criar conta - ${plans[currentSlide].name}`}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Já tem uma conta?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Fazer login
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
