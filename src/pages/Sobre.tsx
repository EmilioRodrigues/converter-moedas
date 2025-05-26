
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Shield, Globe } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Sobre Nós
            </h1>
            <p className="text-gray-600 text-lg">
              Conheça mais sobre nossa missão e valores
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-full">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Nossa Missão
              </h2>
              <p className="text-gray-600 text-center leading-relaxed">
                Fornecer a ferramenta de conversão de moedas mais confiável e precisa do mercado, 
                oferecendo taxas atualizadas em tempo real para facilitar transações financeiras 
                globais e decisões de investimento informadas.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Milhares de Usuários
                </h3>
                <p className="text-gray-600">
                  Confiança de usuários em todo o mundo para suas necessidades de conversão
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Dados Seguros
                </h3>
                <p className="text-gray-600">
                  Informações protegidas com os mais altos padrões de segurança
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Cobertura Global
                </h3>
                <p className="text-gray-600">
                  Suporte para mais de 150 moedas de países ao redor do mundo
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Por que escolher nosso serviço?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Precisão:</strong> Utilizamos APIs confiáveis e verificadas para garantir 
                  que você tenha sempre as taxas mais atualizadas e precisas.
                </p>
                <p>
                  <strong>Velocidade:</strong> Nossa plataforma é otimizada para oferecer conversões 
                  instantâneas, sem demoras ou complicações.
                </p>
                <p>
                  <strong>Facilidade:</strong> Interface intuitiva e amigável, projetada para ser 
                  utilizada por qualquer pessoa, independente do nível técnico.
                </p>
                <p>
                  <strong>Confiabilidade:</strong> Milhares de usuários confiam em nosso serviço 
                  diariamente para suas necessidades de conversão de moedas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
