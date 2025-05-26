
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { convertCurrency } from "@/services/exchangeService";

interface PopularCurrenciesProps {
  exchangeRates: Record<string, number>;
  onCurrencyPairSelect: (from: string, to: string) => void;
  loading: boolean;
}

const POPULAR_PAIRS = [
  { from: "BRL", to: "USD", label: "BRL → USD", flag: "🇧🇷→🇺🇸" },
  { from: "USD", to: "BRL", label: "USD → BRL", flag: "🇺🇸→🇧🇷" },
  { from: "EUR", to: "USD", label: "EUR → USD", flag: "🇪🇺→🇺🇸" },
  { from: "USD", to: "EUR", label: "USD → EUR", flag: "🇺🇸→🇪🇺" },
  { from: "GBP", to: "USD", label: "GBP → USD", flag: "🇬🇧→🇺🇸" },
  { from: "USD", to: "JPY", label: "USD → JPY", flag: "🇺🇸→🇯🇵" },
];

const PopularCurrencies = ({ exchangeRates, onCurrencyPairSelect, loading }: PopularCurrenciesProps) => {
  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Moedas Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Moedas Populares</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {POPULAR_PAIRS.map((pair) => {
            let rate = 0;
            try {
              const result = convertCurrency(1, pair.from, pair.to, exchangeRates);
              rate = result.convertedAmount;
            } catch (error) {
              console.error(`Error converting ${pair.from} to ${pair.to}:`, error);
            }

            return (
              <div
                key={`${pair.from}-${pair.to}`}
                className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md border hover:border-blue-200"
                onClick={() => onCurrencyPairSelect(pair.from, pair.to)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{pair.flag}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">{pair.label}</div>
                  <div className="text-lg font-bold text-gray-800">
                    {rate > 0 ? rate.toFixed(rate < 1 ? 6 : 2) : "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularCurrencies;
