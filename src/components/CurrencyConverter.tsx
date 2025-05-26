
import { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import CurrencyDisplay from "./CurrencyDisplay";
import PopularCurrencies from "./PopularCurrencies";
import { fetchExchangeRates, convertCurrency } from "@/services/exchangeService";
import { formatCurrency } from "@/utils/currencyUtils";

const CURRENCIES = [
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "BRL", name: "Real Brasileiro", flag: "🇧🇷" },
  { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "JPY", name: "Iene Japonês", flag: "🇯🇵" },
  { code: "CAD", name: "Dólar Canadense", flag: "🇨🇦" },
  { code: "AUD", name: "Dólar Australiano", flag: "🇦🇺" },
  { code: "CHF", name: "Franco Suíço", flag: "🇨🇭" },
  { code: "CNY", name: "Yuan Chinês", flag: "🇨🇳" },
  { code: "INR", name: "Rupia Indiana", flag: "🇮🇳" },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadExchangeRates = async (baseCurrency: string) => {
    setLoading(true);
    try {
      const rates = await fetchExchangeRates(baseCurrency);
      setExchangeRates(rates);
      setLastUpdated(new Date());
      console.log("Exchange rates loaded:", rates);
    } catch (error) {
      console.error("Failed to load exchange rates:", error);
      toast.error("Erro ao carregar taxas de câmbio. Usando taxas aproximadas.");
      
      // Fallback rates
      const fallbackRates = {
        USD: 1, EUR: 0.93, BRL: 5.20, GBP: 0.80, JPY: 151.5,
        CAD: 1.36, AUD: 1.52, CHF: 0.92, CNY: 7.23, INR: 83.12
      };
      setExchangeRates(fallbackRates);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }

    try {
      const result = convertCurrency(numAmount, fromCurrency, toCurrency, exchangeRates);
      setConvertedAmount(result.convertedAmount);
      setExchangeRate(result.rate);
      console.log("Conversion result:", result);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Erro na conversão. Tente novamente.");
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount(null);
    setExchangeRate(null);
  };

  const handleCurrencyPairSelect = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
    setConvertedAmount(null);
    setExchangeRate(null);
  };

  useEffect(() => {
    loadExchangeRates("USD");
  }, []);

  useEffect(() => {
    if (exchangeRates && Object.keys(exchangeRates).length > 0) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                <span className="text-blue-600">Conversor</span> de Moedas
              </h1>
              <p className="text-gray-600 text-sm">Taxas de câmbio atualizadas em tempo real</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Converter Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-800">
                Conversor de Moedas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="text-lg h-12"
                />
              </div>

              {/* Currency Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    De
                  </label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                            <span className="text-gray-500">- {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center md:justify-start mb-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapCurrencies}
                    className="h-12 w-12 rounded-full border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Para
                  </label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                            <span className="text-gray-500">- {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result Display */}
              <CurrencyDisplay
                amount={convertedAmount}
                currency={toCurrency}
                exchangeRate={exchangeRate}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                loading={loading}
                lastUpdated={lastUpdated}
              />
            </CardContent>
          </Card>

          {/* Popular Currencies */}
          <PopularCurrencies
            exchangeRates={exchangeRates}
            onCurrencyPairSelect={handleCurrencyPairSelect}
            loading={loading}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2024 Conversor de Moedas. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Contato
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">
            As taxas de câmbio são fornecidas por APIs de câmbio gratuitas e são atualizadas regularmente.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CurrencyConverter;
