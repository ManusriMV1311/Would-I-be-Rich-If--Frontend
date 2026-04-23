'use client';

import ComparisonCard from '@/components/results/ComparisonCard';
import ResultChart from '@/components/results/ResultChart';
import ShareButton from '@/components/results/ShareButton';
import { formatCurrency, formatGrowth } from '@/utils/formatCurrency';
import { getCategoryMeta } from '@/utils/categories';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface ResultViewProps {
  data: any;
}

export default function ResultView({ data }: ResultViewProps) {
  if (!data) {
    return (
      <main className="w-full flex items-center justify-center text-foreground py-20">
        No result data
      </main>
    );
  }

  const result = data;

  const meta = getCategoryMeta(result.scenario.category);
  const GapIcon = result.is_positive ? TrendingUp : TrendingDown;
  const gapColor = result.is_positive ? 'text-emerald-400' : 'text-red-400';

  return (
    <main className="w-full px-4 py-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto pb-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/scenarios">Scenarios</Link>
          <span>/</span>
          <span>Result</span>
        </nav>

        {/* Title */}
        <div className="mb-4">
          <span className={`px-3 py-0.5 rounded-full text-[10px] ${meta.bgColor} ${meta.color}`}>
            {meta.emoji} {meta.label}
          </span>

          <h1 className="text-3xl font-bold text-foreground mt-3">
            {result.scenario.title}
          </h1>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <ComparisonCard
            label={result.alternate_you.label}
            description={result.alternate_you.description}
            value={result.alternate_you.value}
            variant="alternate"
          />

          <ComparisonCard
            label={result.real_you.label}
            description={result.real_you.description}
            value={result.real_you.value}
            variant="real"
          />

          <div className="p-5 rounded-2xl bg-card border border-border flex flex-col gap-1">
            <p className="text-[10px] text-foreground/50 uppercase">The Gap</p>

            <div className={`flex items-center gap-2 ${gapColor}`}>
              <GapIcon size={18} />
              <span className="text-2xl font-bold">
                {formatCurrency(result.difference, true)}
              </span>
            </div>

            <p className={gapColor}>
              {formatGrowth(result.growth_pct)} growth
            </p>

            <p className="text-xs text-foreground/50 mt-2 italic">
              "{result.commentary}"
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6">
          <ResultChart chartData={result.chart_data} />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <ShareButton resultId={result.result_id} />

          <Link href="/scenarios" className="text-foreground/50 hover:text-foreground flex items-center gap-2">
            <ArrowLeft size={14} /> Back
          </Link>

          <Link href="/custom" className="text-brand font-medium">
            Build My Own →
          </Link>
        </div>

      </div>
    </main>
  );
}