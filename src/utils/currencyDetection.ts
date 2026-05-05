export function detectCurrency(ticker?: string): 'USD' | 'INR' {
  if (!ticker) return 'USD'; // default
  
  // Indian stocks and specific Indian crypto pairs or ETFs
  if (
    ticker.endsWith('.NS') || 
    ticker.endsWith('-INR') || 
    ticker === '^NSEI'
  ) {
    return 'INR';
  }
  
  // Default for US stocks, global crypto, ETFs, etc.
  return 'USD';
}
