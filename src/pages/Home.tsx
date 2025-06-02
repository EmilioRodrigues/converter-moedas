
import { Link } from "react-router-dom";
import { ArrowRight, Globe, TrendingUp, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const Home = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Taxas em Tempo Real",
      description: "Cotações atualizadas constantemente para conversões precisas"
    },
    {
      icon: Globe,
      title: "150+ Moedas",
      description: "Suporte para mais de 150 moedas de todo o mundo"
    },
    {
      icon: Shield,
      title: "Dados Confiáveis",
      description: "Informações de fontes seguras e verificadas"
    },
    {
      icon: Clock,
      title: "Rápido e Fácil",
      description: "Interface intuitiva para conversões instantâneas"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Conversor de <span className="text-blue-600">Moedas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A ferramenta mais confiável para conversões de moedas com taxas atualizadas em tempo real.
            Rápido, preciso e fácil de usar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/conversor">
                Converter Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/taxas">Ver Taxas de Câmbio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Por que escolher nosso conversor?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência em conversão de moedas com tecnologia de ponta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que confiam em nosso conversor para suas necessidades de câmbio
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/conversor">
              Usar Conversor Gratuito <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
