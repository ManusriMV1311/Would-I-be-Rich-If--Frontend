/**
 * Exchange rate fallback (1 USD = 83 INR)
 */
export const USD_TO_INR = 83;

/**
 * Format a number as a currency string (USD or INR).
 * Handles conversion if currency is INR.
 */
/**
 * Format a number as a currency string.
 * INPUT: value is in USD. If currency is 'INR', converts USD → INR automatically.
 * Use this for values coming straight from the backend without prior conversion.
 */
export function formatCurrency(
  value: number, 
  currency: 'USD' | 'INR' = 'USD', 
  compact = false
): string {
  const isINR = currency === 'INR';
  // This function assumes the value is in USD; it converts to INR if needed
  const convertedValue = isINR ? value * USD_TO_INR : value;
  return _formatNumber(convertedValue, currency, compact);
}

/**
 * Format a number that is ALREADY in the target currency.
 * Use this for values that have already been converted (e.g. from useSimulation hook).
 * Does NOT multiply by exchange rate.
 */
export function formatCurrencyDirect(
  value: number,
  currency: 'USD' | 'INR' = 'USD',
  compact = false
): string {
  return _formatNumber(value, currency, compact);
}

function _formatNumber(value: number, currency: 'USD' | 'INR', compact: boolean): string {
  const isINR = currency === 'INR';
  const locale = isINR ? 'en-IN' : 'en-US';
  const currencyCode = isINR ? 'INR' : 'USD';

  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: isINR ? 0 : 2,
    maximumFractionDigits: isINR ? 0 : 2,
  }).format(value);
}

/**
 * Format a growth percentage.
 * e.g. 57390 → "+57,390%"
 */
export function formatGrowth(pct: number): string {
  const sign = pct > 0 ? '+' : '';
  return `${sign}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(pct)}%`;
}

/**
 * Format a run count for display.
 * e.g. 54320 → "54.3K runs"
 */
export function formatRunCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M runs`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K runs`;
  return `${count} runs`;
}
