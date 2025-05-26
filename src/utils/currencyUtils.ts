
// Currency formatting utilities

export const formatCurrency = (currencyCode: string, amount: number): string => {
  try {
    const locale = getCurrencyLocale(currencyCode);
    
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: getCurrencyDecimals(currencyCode),
      maximumFractionDigits: getCurrencyDecimals(currencyCode),
    });
    
    return formatter.format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback formatting
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
};

const getCurrencyLocale = (currencyCode: string): string => {
  const localeMap: Record<string, string> = {
    'USD': 'en-US',
    'EUR': 'de-DE',
    'GBP': 'en-GB',
    'JPY': 'ja-JP',
    'BRL': 'pt-BR',
    'CAD': 'en-CA',
    'AUD': 'en-AU',
    'CHF': 'de-CH',
    'CNY': 'zh-CN',
    'INR': 'en-IN',
  };
  
  return localeMap[currencyCode] || 'en-US';
};

const getCurrencyDecimals = (currencyCode: string): number => {
  // Some currencies have different decimal places
  const decimalMap: Record<string, number> = {
    'JPY': 0, // Japanese Yen has no decimal places
    'KRW': 0, // Korean Won has no decimal places
  };
  
  return decimalMap[currencyCode] || 2;
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const symbolMap: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'BRL': 'R$',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'CHF',
    'CNY': '¥',
    'INR': '₹',
  };
  
  return symbolMap[currencyCode] || currencyCode;
};

export const formatExchangeRate = (rate: number, fromCurrency: string, toCurrency: string): string => {
  const decimals = rate < 1 ? 6 : 4;
  return `1 ${fromCurrency} = ${rate.toFixed(decimals)} ${toCurrency}`;
};
