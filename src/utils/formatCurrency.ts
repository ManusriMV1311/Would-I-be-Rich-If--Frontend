/**
 * Format a number as a USD currency string.
 * e.g. 287450 → "$287,450.00"
 */
export function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
