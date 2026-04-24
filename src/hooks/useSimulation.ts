import { useMutation } from '@tanstack/react-query';
import { simulateLumpSum, simulateDCA } from '@/services/api';
import { SimulationResultData } from '@/types/scenario.types';

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
        const alternateValue: number = Number(result.alternate_value) || 0;
        const realValue: number = Number(result.real_value) || 0;
        const difference: number = Number(result.difference) || (alternateValue - realValue);
        const growthPct: number = Number(result.growth_percentage) || 0;
        const isPositive: boolean = difference > 0;

        // Commentary comes from the backend commentary engine
        const commentary: string =
          result.commentary || 'Real simulation based on historical market data.';

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
                  ? `Cash left uninvested since ${params.start_date}`
                  : `Total invested: $${realValue.toLocaleString()}`,
            },
            difference,
            growth_pct: growthPct,
            is_positive: isPositive,
            chart_data: result.chart_data ?? [],
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