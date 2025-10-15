export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-kiwi">Kiwra</span>
            <span className="text-fluid">Flow</span>
          </h3>
          <p className="text-gray-400 mb-6">
            Gestão fluida e inteligente para pequenas empresas
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-kiwi transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-kiwi transition-colors"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-kiwi transition-colors"
            >
              Contato
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2024 KiwraFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
