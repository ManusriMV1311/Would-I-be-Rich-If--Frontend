/**
 * Exchange rate fallback (1 USD = 83 INR)
 */
export const USD_TO_INR = 83;

/**
 * Format a number as a currency string (USD or INR).
 * Handles conversion if currency is INR.
 */
export function formatCurrency(
  value: number, 
  currency: 'USD' | 'INR' = 'USD', 
  compact = false
): string {
  const isINR = currency === 'INR';
  const convertedValue = isINR ? value * USD_TO_INR : value;
  const locale = isINR ? 'en-IN' : 'en-US';
  const currencyCode = isINR ? 'INR' : 'USD';

  if (compact && Math.abs(convertedValue) >= 1_000_000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(convertedValue);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: isINR ? 0 : 2,
    maximumFractionDigits: isINR ? 0 : 2,
  }).format(convertedValue);
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
