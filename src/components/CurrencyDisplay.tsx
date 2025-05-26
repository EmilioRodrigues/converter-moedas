
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/currencyUtils";

interface CurrencyDisplayProps {
  amount: number | null;
  currency: string;
  exchangeRate: number | null;
  fromCurrency: string;
  toCurrency: string;
  loading: boolean;
  lastUpdated: Date | null;
}

const CurrencyDisplay = ({
  amount,
  currency,
  exchangeRate,
  fromCurrency,
  toCurrency,
  loading,
  lastUpdated,
}: CurrencyDisplayProps) => {
  if (loading) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">Resultado</span>
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Resultado</span>
        {exchangeRate && (
          <span className="text-sm text-gray-500">
            1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
          </span>
        )}
      </div>
      
      <div className="text-3xl font-bold text-gray-800 mb-2">
        {amount !== null ? formatCurrency(currency, amount) : "Insira um valor"}
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-500">
          Última atualização: {lastUpdated.toLocaleDateString("pt-BR")} às{" "}
          {lastUpdated.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencyDisplay;
