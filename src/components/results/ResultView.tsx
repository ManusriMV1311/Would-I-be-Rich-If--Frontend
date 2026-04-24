'use client';

import ComparisonCard from '@/components/results/ComparisonCard';
import ResultChart from '@/components/results/ResultChart';
import ShareButton from '@/components/results/ShareButton';
import { formatCurrency, formatGrowth } from '@/utils/formatCurrency';
import { getCategoryMeta } from '@/utils/categories';
import { useUIStore } from '@/store/uiStore';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

import { ALL_SCENARIOS } from '@/data/scenarios';
import { Quote } from 'lucide-react';

interface ResultViewProps {
  data: any;
}

export default function ResultView({ data }: ResultViewProps) {
  const { currency } = useUIStore();
  if (!data) {
    return (
      <main className="w-full flex items-center justify-center text-foreground py-20">
        No result data
      </main>
    );
  }

  const result = data;
  const scenarioInfo = ALL_SCENARIOS.find(s => s.uuid === result.scenario?.uuid);

  const meta = getCategoryMeta(result.scenario?.category || 'stocks');
  const GapIcon = result.is_positive ? TrendingUp : TrendingDown;
  const gapColor = result.is_positive ? 'text-emerald-400' : 'text-red-400';

  return (
    <main className="w-full px-4 py-4 md:px-8 lg:px-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-5xl mx-auto pb-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/scenarios" className="hover:text-brand transition-colors">Scenarios</Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground">Result</span>
        </nav>

        {/* Title & Metadata */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${meta.bgColor} ${meta.color} shadow-lg shadow-brand/5`}>
              {meta.emoji} {meta.label}
            </span>
            {scenarioInfo?.region && (
              <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-foreground/5 text-foreground/50 border border-border">
                {scenarioInfo.region}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-4">
            {scenarioInfo?.name || result.scenario?.title}
          </h1>
          <p className="text-xl font-bold text-foreground/40 leading-tight">
            {result.scenario?.title}
          </p>
        </div>

        {/* Story Section (Contextual Intelligence) */}
        {scenarioInfo?.context && (
          <div className="mb-10 p-8 rounded-3xl bg-brand/5 border border-brand/10 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-brand/20 text-brand">
                  <Quote size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight mb-2 italic">
                    The Story Behind This...
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl">
                    {scenarioInfo.context.story}
                  </p>
                </div>
              </div>
              <div className="pl-16">
                <p className="text-brand font-black text-xl tracking-tight uppercase">
                  {scenarioInfo.context.hook}
                </p>
              </div>
            </div>
            
            {/* Tags in Story */}
            {scenarioInfo.tags && (
              <div className="absolute top-6 right-8 flex flex-wrap gap-2 justify-end max-w-[200px]">
                {scenarioInfo.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-background/50 text-foreground/40 border border-border backdrop-blur-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-colors duration-1000" />
          </div>
        )}

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <ComparisonCard
            label={result.alternate_you?.label || "Alternate You"}
            description={result.alternate_you?.description || "If you had invested"}
            value={result.alternate_you?.value || 0}
            variant="alternate"
          />

          <ComparisonCard
            label={result.real_you?.label || "Real You"}
            description={result.real_you?.description || "In the real world"}
            value={result.real_you?.value || 0}
            variant="real"
          />

          <div className="glass-card p-10 flex flex-col justify-center items-center text-center hover-lift border-white/50 shadow-2xl shadow-brand/5">
            <p className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] mb-6">The Wealth Gap</p>

            <div className={`flex items-center gap-4 ${gapColor} mb-3`}>
              <GapIcon size={32} className="animate-pulse" />
              <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand to-alternate">
                {formatCurrency(result.difference, currency, true)}
              </span>
            </div>

            <p className={`${gapColor} font-black text-xl tracking-tight`}>
              {formatGrowth(result.growth_pct)} Growth
            </p>

            <p className="text-sm text-text-secondary mt-8 italic font-medium max-w-[200px] leading-relaxed">
              "{result.commentary}"
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="glass-card mb-16 overflow-hidden p-8 border-white/50 shadow-2xl shadow-black/[0.02]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/40 flex items-center gap-3">
              <TrendingUp size={20} className="text-brand" /> Asset Growth Visualization
            </h3>
          </div>
          <ResultChart chartData={result.chart_data} />
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-border">
          <ShareButton resultId={result.result_id} />

          <Link href="/scenarios" className="group text-foreground/50 hover:text-foreground flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Scenarios
          </Link>

          <Link href="/custom" className="ml-auto px-8 py-4 rounded-full bg-brand text-background font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform shadow-xl shadow-brand/20">
            Build My Own Simulation →
          </Link>
        </div>

      </div>
    </main>
  );
}