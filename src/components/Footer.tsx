
import { Link } from "react-router-dom";
import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Conversor de Moedas</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Sua ferramenta confiável para conversões de moedas com taxas atualizadas em tempo real.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/conversor" className="text-gray-400 hover:text-white transition-colors">
                  Conversor
                </Link>
              </li>
              <li>
                <Link to="/taxas" className="text-gray-400 hover:text-white transition-colors">
                  Taxas de Câmbio
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Moedas populares */}
          <div>
            <h4 className="font-semibold mb-4">Moedas Populares</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>USD - Dólar Americano</li>
              <li>EUR - Euro</li>
              <li>BRL - Real Brasileiro</li>
              <li>GBP - Libra Esterlina</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>www.olliverdigital.com.br</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Fortaleza, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Conversor de Moedas. Todos os direitos reservados. Made for <a href="https://www.olliverdigital.com.br" target="_blank" rel="noopener noreferrer">Olliver Digital</a>
          </p>
          <div className="flex space-x-6">
            <Link to="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
