import { Scenario, SimulationResultData } from '../types/scenario.types';
import { SCENARIO_CONFIG } from '../data/scenarios';

export const mockScenarios: Scenario[] = SCENARIO_CONFIG.flatMap((group, index) => 
  group.scenarios.map((s, sIndex) => ({
    ...s,
    id: index * 100 + sIndex + 1,
    run_count: Math.floor(Math.random() * 50000) + 1000,
    is_active: true
  }))
);

export const mockCategories = SCENARIO_CONFIG.map(group => ({
  id: group.categoryId,
  name: group.name,
  scenarioCount: group.scenarios.length,
  icon: group.icon
}));

export const mockSimulationResult: SimulationResultData = {
  result_id: "res_7f3a2b",
  scenario: { 
    uuid: "uuid-btc-2015", 
    title: "What if I bought Bitcoin in 2015?", 
    category: "crypto" 
  },
  alternate_you: { 
    value: 287450.00, 
    label: "Alternate You", 
    description: "Bought 1 BTC at $500" 
  },
  real_you: { 
    value: 500.00, 
    label: "Real You", 
    description: "Spent it on... something else" 
  },
  difference: 286950.00, 
  growth_pct: 57390.0, 
  is_positive: true,
  chart_data: [
    { date: "2015-01", value: 500.0 }, 
    { date: "2018-01", value: 15000.0 }, 
    { date: "2021-01", value: 45000.0 }, 
    { date: "2024-01", value: 65000.0 }, 
    { date: "2026-04", value: 287450.0 }
  ],
  commentary: "You could've retired to a beach... but hey, at least you're caffeinated.",
  cached: true, 
  duration_ms: 45, 
  computed_at: new Date().toISOString()
};
