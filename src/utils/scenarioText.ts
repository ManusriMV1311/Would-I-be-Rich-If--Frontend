import { Scenario } from '@/types/scenario.types';
import { ASSET_NAMES } from '@/data/scenarios';

/**
 * Dynamically generates a humanized, story-driven sentence for a given scenario or generic asset selection.
 * Removes the boring "Initial Investment" form feel.
 */
export function generateScenarioText(
  scenario: Scenario | undefined,
  assetTicker: string | undefined,
  simType: 'lump_sum' | 'dca'
): string | null {
  // 1. SCENARIO MODE: Strict adherence to the scenario's title
  if (scenario) {
    return scenario.title;
  }

  // 2. CUSTOM MODE: Generate text based on asset and simulation type
  if (assetTicker) {
    const assetLabel = ASSET_NAMES[assetTicker] || assetTicker;
    if (simType === 'dca') {
      return `What if my monthly contribution went into ${assetLabel}?`;
    }
    return `What if you had invested in ${assetLabel} back then?`;
  }

  return null;
}
