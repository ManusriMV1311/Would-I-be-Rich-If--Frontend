'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { ScenarioCategory } from '@/types/scenario.types';
import CategoryFilter from '@/components/scenarios/CategoryFilter';
import ScenarioGrid from '@/components/scenarios/ScenarioGrid';

import { ALL_SCENARIOS } from '@/data/scenarios';
import { useUIStore } from '@/store/uiStore';
import { detectCurrency } from '@/utils/currencyDetection';
import { USD_TO_INR } from '@/utils/formatCurrency';

export default function ScenariosPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { region } = useUIStore();
  const [selectedCategory, setSelectedCategory] =
    useState<ScenarioCategory | 'all'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['scenarios', selectedCategory, region],
    queryFn: async () => {
      // Simulate API delay (optional, for UX consistency)
      await new Promise((r) => setTimeout(r, 300));

      // Categories that are lifestyle/habitual — not strictly region-locked
      const UNIVERSAL_CATEGORIES: (ScenarioCategory | 'all')[] = [
        'govt_schemes', 'cultural', 'career', 'spending', 'life', 'debt'
      ];

      const isUniversalCategory =
        selectedCategory !== 'all' &&
        UNIVERSAL_CATEGORIES.includes(selectedCategory);

      let filtered: typeof ALL_SCENARIOS;

      if (selectedCategory === 'all') {
        // Show everything: region-specific + universal lifestyle scenarios
        filtered = ALL_SCENARIOS.filter(
          s => s.region === region || UNIVERSAL_CATEGORIES.includes(s.category)
        );
      } else if (isUniversalCategory) {
        // Universal categories: skip region filter entirely
        filtered = ALL_SCENARIOS.filter(s => s.category === selectedCategory);
      } else {
        // Region-locked categories (crypto, stocks, real_estate, macro)
        filtered = ALL_SCENARIOS.filter(
          s => s.region === region && s.category === selectedCategory
        );
      }

      return filtered;
    },
    staleTime: 5 * 60 * 1000,
  });

  const scenarios = data ?? [];

  const handleSelectScenario = (uuid: string) => {
    const scenario = scenarios.find((s) => s.uuid === uuid);
    if (!scenario) return;
    
    const asset = scenario.params?.asset || scenario.params?.investment_asset || 'BTC-USD';
    const rawAmount = scenario.params?.initial_amount || scenario.params?.monthly_amount || 500;
    const start = scenario.params?.start_date || '2015-01-01';
    const sim = scenario.sim_type === 'recurring_dca' ? 'dca' : 'lump_sum';

    // URL amounts are always in USD. If the scenario amount is in INR, convert to USD first.
    // custom/page.tsx will then convert back to INR for display.
    const scenarioCurrency = detectCurrency(asset);
    const amountInUSD = scenarioCurrency === 'INR'
      ? rawAmount / USD_TO_INR
      : rawAmount;

    router.push(`/custom?asset=${asset}&start=${start}&amount=${amountInUSD}&sim=${sim}&scenario=${scenario.uuid}`);
  };

  return (
    <main className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
      {/* Page header */}
      <div className="max-w-6xl mx-auto mb-10">
        <p className="text-brand text-sm font-black uppercase tracking-[0.4em] mb-3">
          Archive Records
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
          Explore Scenarios
        </h1>
        <p className="text-foreground/80 text-lg max-w-2xl leading-relaxed italic font-light">
          Pick a "what if" moment and discover how it would have changed your life.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto mb-8">
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Error state */}
      {isError && (
        <div className="max-w-6xl mx-auto mb-8 p-4 rounded-xl bg-red-900/30 border border-red-800 text-red-300 text-sm">
          ⚠️ Couldn't load scenarios. Please try again.
        </div>
      )}

      {/* Scenario grid */}
      <div className="max-w-6xl mx-auto">
        {!mounted ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand" />
          </div>
        ) : (
          <ScenarioGrid
            scenarios={scenarios}
            isLoading={isLoading}
            onSelectScenario={handleSelectScenario}
          />
        )}
      </div>
    </main>
  );
}