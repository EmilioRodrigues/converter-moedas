
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchExchangeRates } from "@/services/exchangeService";
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

const Taxas = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      try {
        const data = await fetchExchangeRates(baseCurrency);
        setRates(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error loading rates:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRates();
  }, [baseCurrency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Taxas de Câmbio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acompanhe as taxas de câmbio atualizadas em tempo real
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-center">Selecione a moeda base</CardTitle>
            <div className="flex justify-center">
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className="w-64">
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
            {lastUpdated && (
              <p className="text-center text-sm text-gray-500">
                Última atualização: {lastUpdated.toLocaleDateString("pt-BR")} às{" "}
                {lastUpdated.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CURRENCIES.filter(currency => currency.code !== baseCurrency).map((currency) => (
                <div
                  key={currency.code}
                  className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{currency.flag}</span>
                      <div>
                        <div className="font-semibold">{currency.code}</div>
                        <div className="text-sm text-gray-500">{currency.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {loading ? (
                      <Skeleton className="h-6 w-20 ml-auto" />
                    ) : (
                      <div className="text-lg font-bold text-gray-800">
                        {rates[currency.code] ? rates[currency.code].toFixed(4) : "—"}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      1 {baseCurrency} = ? {currency.code}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Taxas;
