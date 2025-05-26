
// Exchange rate service
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<Record<string, number>> => {
  try {
    console.log(`Fetching exchange rates for base currency: ${baseCurrency}`);
    const response = await fetch(`${BASE_URL}${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.rates) {
      throw new Error('Invalid API response: missing rates');
    }
    
    console.log('Exchange rates fetched successfully:', data.rates);
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: Record<string, number>
): { convertedAmount: number; rate: number } => {
  if (fromCurrency === toCurrency) {
    return { convertedAmount: amount, rate: 1 };
  }

  if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
    throw new Error('Exchange rates not available');
  }

  let rate: number;
  
  // The API returns rates with USD as base, so we need to handle conversions properly
  if (fromCurrency === 'USD') {
    rate = exchangeRates[toCurrency];
    if (!rate) {
      throw new Error(`Exchange rate not found for ${toCurrency}`);
    }
  } else if (toCurrency === 'USD') {
    rate = 1 / exchangeRates[fromCurrency];
    if (!exchangeRates[fromCurrency]) {
      throw new Error(`Exchange rate not found for ${fromCurrency}`);
    }
  } else {
    // Convert from non-USD to non-USD via USD
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    if (!fromRate || !toRate) {
      throw new Error(`Exchange rates not found for ${fromCurrency} or ${toCurrency}`);
    }
    
    rate = toRate / fromRate;
  }

  const convertedAmount = amount * rate;
  
  console.log(`Converted ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency} (rate: ${rate})`);
  
  return {
    convertedAmount,
    rate
  };
};
