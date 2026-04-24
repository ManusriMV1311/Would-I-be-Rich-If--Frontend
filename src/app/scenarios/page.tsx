'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ScenarioCategory } from '@/types/scenario.types';
import CategoryFilter from '@/components/scenarios/CategoryFilter';
import ScenarioGrid from '@/components/scenarios/ScenarioGrid';

// ✅ Use real scenario configuration
import { ALL_SCENARIOS } from '@/data/scenarios';

export default function ScenariosPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ScenarioCategory | 'all'>('all');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['scenarios', selectedCategory],
    queryFn: async () => {
      // Simulate API delay (optional, for UX consistency)
      await new Promise((r) => setTimeout(r, 300));

      // Filter scenarios locally
      if (selectedCategory === 'all') {
        return ALL_SCENARIOS;
      }

      return ALL_SCENARIOS.filter(
        (s) => s.category === selectedCategory
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const scenarios = data ?? [];

  const handleSelectScenario = (uuid: string) => {
    const scenario = scenarios.find((s) => s.uuid === uuid);
    if (!scenario) return;
    
    const asset = scenario.params?.asset || scenario.params?.investment_asset || 'BTC-USD';
    const amount = scenario.params?.initial_amount || scenario.params?.monthly_amount || 500;
    const start = scenario.params?.start_date || '2015-01-01';

    router.push(`/custom?asset=${asset}&start=${start}`);
  };

  return (
    <main className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
      {/* Page header */}
      <div className="max-w-6xl mx-auto mb-10">
        <p className="text-brand text-sm font-bold uppercase tracking-[0.3em] mb-3">
          Archive Records
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
          Explore Scenarios
        </h1>
        <p className="text-foreground/60 text-lg max-w-2xl leading-relaxed italic font-light">
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
        <ScenarioGrid
          scenarios={scenarios}
          isLoading={isLoading}
          onSelectScenario={handleSelectScenario}
        />
      </div>
    </main>
  );
}