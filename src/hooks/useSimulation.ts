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
    mutationFn: async (uuid: string) => {
      throw new Error('Scenario-based simulation not implemented yet');
    },
    onError: (err) => {
      console.error('[useSimulation] failed:', err);
    },
  });
}

/**
 * REAL custom simulation (connected to backend)
 */
export function useCustomSimulation() {
  return useMutation<
    { success: boolean; data: SimulationResultData | null; error: unknown },
    Error,
    CustomSimulationParams
  >({
    mutationFn: async (params: CustomSimulationParams) => {
      try {
        let result;

        if (params.sim_type === 'lump_sum') {
          result = await simulateLumpSum({
            ticker: params.asset,
            start_date: params.start_date,
            amount: params.initial_amount || 0,
          });
        } else {
          result = await simulateDCA({
            ticker: params.asset,
            start_date: params.start_date,
            monthly_investment: params.monthly_investment || 0,
          });
        }

        // 🔥 Transform backend → frontend format
        return {
          success: true,
          data: {
            result_id: `res_${Date.now()}`,
            scenario: {
              uuid: 'custom',
              title: `What if I invested in ${params.asset}?`,
              category: 'stocks',
            },

            alternate_you: {
              value:
                params.sim_type === 'lump_sum'
                  ? result.final
                  : result.data[result.data.length - 1].portfolio,
              label: 'Alternate You',
              description: `${params.asset} investment since ${params.start_date}`,
            },

            real_you: {
              value:
                params.sim_type === 'lump_sum'
                  ? result.initial
                  : result.data[result.data.length - 1].invested,
              label: 'Real You',
              description: 'No investment',
            },

            difference:
              params.sim_type === 'lump_sum'
                ? result.profit
                : result.data[result.data.length - 1].portfolio -
                result.data[result.data.length - 1].invested,

            growth_pct:
              params.sim_type === 'lump_sum'
                ? result.growth_percent
                : (
                  ((result.data[result.data.length - 1].portfolio -
                    result.data[result.data.length - 1].invested) /
                    result.data[result.data.length - 1].invested) *
                  100
                ),

            is_positive:
              params.sim_type === 'lump_sum'
                ? result.profit > 0
                : result.data[result.data.length - 1].portfolio >
                result.data[result.data.length - 1].invested,

            chart_data:
              params.sim_type === 'lump_sum'
                ? result.chart_data
                : result.data.map((d: any) => ({
                  date: d.date,
                  value: d.portfolio,
                })),

            commentary: 'Real simulation based on historical market data.',
            cached: false,
            duration_ms: 0,
            computed_at: new Date().toISOString(),
          },
          error: null,
        };
      } catch (err) {
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