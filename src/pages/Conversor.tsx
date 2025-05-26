
import CurrencyConverter from "@/components/CurrencyConverter";

const Conversor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Conversor de Moedas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Converta entre mais de 150 moedas com taxas atualizadas em tempo real
          </p>
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default Conversor;
