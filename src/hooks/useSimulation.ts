import { useMutation } from '@tanstack/react-query';
import { simulateLumpSum, simulateDCA } from '@/services/api';
import { SimulationResultData } from '@/types/scenario.types';
import { detectCurrency } from '@/utils/currencyDetection';
import { USD_TO_INR } from '@/utils/formatCurrency';

/**
 * Custom simulation input (matches backend)
 */
export interface CustomSimulationParams {
  sim_type: 'lump_sum' | 'dca';
  asset: string;
  initial_amount?: number;
  monthly_investment?: number;
  start_date: string;
}

/**
 * Placeholder for scenario-based simulation (if needed later)
 */
export function useSimulation() {
  return useMutation({
    mutationFn: async (_uuid: string) => {
      throw new Error('Scenario-based simulation not implemented yet');
    },
    onError: (err) => {
      console.error('[useSimulation] failed:', err);
    },
  });
}

/**
 * REAL custom simulation — connected to backend.
 * Both lump_sum and dca now return the same normalized shape:
 *   { result_id, alternate_value, real_value, difference, growth_percentage, chart_data, commentary }
 */
export function useCustomSimulation() {
  return useMutation<
    { success: boolean; data: SimulationResultData | null; error: unknown },
    Error,
    CustomSimulationParams
  >({
    mutationFn: async (params: CustomSimulationParams) => {
      console.log('[useCustomSimulation] running with:', params);
      try {
        let result: any;

        if (params.sim_type === 'lump_sum') {
          result = await simulateLumpSum({
            ticker: params.asset,
            start_date: params.start_date,
            amount: Number(params.initial_amount) || 0,
          });
        } else {
          result = await simulateDCA({
            ticker: params.asset,
            start_date: params.start_date,
            monthly_investment: Number(params.monthly_investment) || 0,
          });
        }

        // Both endpoints now return the same normalized shape from backend
        const displayCurrency = detectCurrency(params.asset);
        const isINR = displayCurrency === 'INR';
        const rate = isINR ? USD_TO_INR : 1;

        // Backend always returns USD values — convert to INR if the asset is Indian
        const alternateValue: number = (Number(result.alternate_value) || 0) * rate;
        const realValue: number = (Number(result.real_value) || 0) * rate;
        const difference: number = (Number(result.difference) || (Number(result.alternate_value) - Number(result.real_value))) * rate;
        const growthPct: number = Number(result.growth_percentage) || 0; // % is unchanged
        const isPositive: boolean = difference > 0;

        // Scale chart data to INR as well
        const rawChartData: typeof result.chart_data = result.chart_data ?? [];
        const chartData = isINR
          ? rawChartData.map((p: { date: string; value: number }) => ({ ...p, value: Math.round(p.value * rate) }))
          : rawChartData;

        // Classify performance
        // If positive and strong → Outperformed; weak positive = matched; negative = Underperformed
        const performanceLabel: string = growthPct >= 50
          ? 'Outperformed Market 🚀'
          : growthPct >= 0
          ? 'Matched Market 📊'
          : 'Underperformed Market 📉';

        // Enrich commentary
        const rawCommentary: string = result.commentary ||
          'Real simulation based on historical market data.';
        const enrichedCommentary: string = growthPct < 0
          ? `This investment underperformed the broader market average. ${rawCommentary}`
          : growthPct >= 100
          ? `This investment significantly outperformed the market! ${rawCommentary}`
          : rawCommentary;

        const commentary: string = enrichedCommentary;

        const resultId: string =
          result.result_id || `res_${Date.now()}`;

        return {
          success: true,
          data: {
            result_id: resultId,
            scenario: {
              uuid: 'custom',
              title: `What if I invested in ${params.asset}?`,
              category: 'stocks',
            },
            alternate_you: {
              value: alternateValue,
              label: 'Alternate You',
              description: `${params.asset} investment since ${params.start_date}`,
            },
            real_you: {
              value: realValue,
              label: 'Real You',
              description:
                params.sim_type === 'lump_sum'
                  ? `If you kept your money in cash (baseline)`
                  : `Total cash you contributed over time (baseline)`,
            },
            difference,
            growth_pct: growthPct,
            is_positive: isPositive,
            performance_label: performanceLabel,
            display_currency: displayCurrency,
            chart_data: chartData,
            commentary,
            cached: false,
            duration_ms: 0,
            computed_at: new Date().toISOString(),
          },
          error: null,
        };
      } catch (err) {
        console.error('[useCustomSimulation] catch block:', err);
        return {
          success: false,
          data: null,
          error: err,
        };
      }
    },

    onError: (err) => {
      console.error('[useCustomSimulation] failed:', err);
    },
  });
}