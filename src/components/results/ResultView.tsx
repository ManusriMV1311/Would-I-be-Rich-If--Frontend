'use client';

import ComparisonCard from '@/components/results/ComparisonCard';
import ResultChart from '@/components/results/ResultChart';
import ShareButton from '@/components/results/ShareButton';
import { formatCurrencyDirect, formatGrowth } from '@/utils/formatCurrency';
import { getCategoryMeta } from '@/utils/categories';
import { ArrowLeft, TrendingUp, TrendingDown, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ALL_SCENARIOS } from '@/data/scenarios';
import { Quote } from 'lucide-react';

interface ResultViewProps {
  data: any;
}

// ─── Performance Badge ────────────────────────────────────────────────────────
function PerformanceBadge({ label, isPositive }: { label: string; isPositive: boolean }) {
  const color = isPositive
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-red-500/10 text-red-400 border-red-500/20';

  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${color}`}>
      {label}
    </span>
  );
}

// ─── SPY Baseline Tooltip ─────────────────────────────────────────────────────
function BaselineTooltip() {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center ml-1">
      <button
        type="button"
        aria-label="Comparison baseline info"
        className="text-foreground/30 hover:text-brand transition-colors"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(v => !v)}
      >
        <Info size={13} />
      </button>

      {visible && (
        <span className="absolute left-6 -top-1 z-50 w-56 px-3 py-2 rounded-xl bg-card border border-border text-[11px] text-foreground/70 leading-snug shadow-xl whitespace-normal pointer-events-none">
          Baseline comparison: S&amp;P 500 (SPY). &quot;Real You&quot; represents how much capital you put in, not an active investment.
        </span>
      )}
    </span>
  );
}

// ─── Loss Insight Banner ──────────────────────────────────────────────────────
function LossInsightBanner({ growthPct, ticker }: { growthPct: number; ticker?: string }) {
  if (growthPct >= 0) return null;

  return (
    <div className="mb-8 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-4">
      <span className="text-2xl flex-shrink-0">📉</span>
      <div>
        <p className="text-amber-400 font-black text-sm uppercase tracking-widest mb-1">
          Market Insight — Loss Scenario
        </p>
        <p className="text-foreground/70 text-sm leading-relaxed">
          {ticker
            ? `${ticker} underperformed its benchmark during this period.`
            : 'This investment underperformed during this period.'}{' '}
          This is not a bug — it reflects real historical data. Even the best investors face periods of loss.
          The key is understanding <span className="text-foreground font-semibold">why</span> it happened and what it means for your strategy.
        </p>
      </div>
    </div>
  );
}

// ─── Main ResultView ──────────────────────────────────────────────────────────
export default function ResultView({ data }: ResultViewProps) {
  if (!data) {
    return (
      <main className="w-full flex items-center justify-center text-foreground py-20">
        No result data
      </main>
    );
  }

  const result = data;
  // Use the currency baked into the result (detected from asset ticker at simulation time)
  const displayCurrency: 'USD' | 'INR' = result.display_currency || 'USD';
  const scenarioInfo = ALL_SCENARIOS.find(s => s.uuid === result.scenario?.uuid);
  const ticker = result.alternate_you?.description?.split(' ')[0] || '';

  const meta = getCategoryMeta(result.scenario?.category || 'stocks');
  const GapIcon = result.is_positive ? TrendingUp : TrendingDown;
  const gapColor = result.is_positive ? 'text-emerald-400' : 'text-red-400';

  // Derive performance label if not supplied by hook (e.g. scenario-based flows)
  const performanceLabel: string =
    result.performance_label ||
    (result.growth_pct >= 50
      ? 'Outperformed Market 🚀'
      : result.growth_pct >= 0
      ? 'Matched Market 📊'
      : 'Underperformed Market 📉');

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
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${meta.bgColor} ${meta.color} shadow-lg shadow-brand/5`}>
              {meta.emoji} {meta.label}
            </span>
            {scenarioInfo?.region && (
              <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-foreground/5 text-foreground/50 border border-border">
                {scenarioInfo.region}
              </span>
            )}
            {/* Performance Badge */}
            <PerformanceBadge label={performanceLabel} isPositive={result.is_positive} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-4">
            {scenarioInfo?.name || result.scenario?.title}
          </h1>
          <p className="text-xl font-bold text-foreground/40 leading-tight">
            {result.scenario?.title}
          </p>
        </div>

        {/* Loss Insight Banner — shown only when negative */}
        <LossInsightBanner growthPct={result.growth_pct} ticker={ticker} />

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ComparisonCard
            label={result.alternate_you?.label || 'Alternate You'}
            description={result.alternate_you?.description || 'If you had invested'}
            value={result.alternate_you?.value || 0}
            variant="alternate"
            currency={displayCurrency}
          />

          <div className="flex flex-col gap-1">
            <ComparisonCard
              label={result.real_you?.label || 'Real You'}
              description={result.real_you?.description || 'Your original capital'}
              value={result.real_you?.value || 0}
              variant="real"
              currency={displayCurrency}
            />
            {/* Baseline note below the Real You card */}
            <p className="text-[10px] text-foreground/30 font-medium px-2 flex items-center gap-1">
              Baseline: cash invested (not reinvested)
              <BaselineTooltip />
            </p>
          </div>

          <div className="glass-card px-10 py-12 flex flex-col justify-center items-center text-center hover-lift border-white/50 shadow-2xl shadow-brand/5 overflow-hidden">
            <p className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] mb-4">The Wealth Gap</p>

            <div className={`flex items-center justify-center gap-3 ${gapColor} mb-4 w-full`}>
              <GapIcon size={24} className="animate-pulse flex-shrink-0" />
              <span className="text-3xl sm:text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand to-alternate leading-none">
                {formatCurrencyDirect(result.difference, displayCurrency, false)}
              </span>
            </div>

            <p className={`${gapColor} font-black text-xl tracking-tight`}>
              {formatGrowth(result.growth_pct)} Growth
            </p>

            {/* Performance classification pill */}
            <span className={`mt-3 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${result.is_positive ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-red-500/20 text-red-400 bg-red-500/5'}`}>
              {performanceLabel}
            </span>

            <p className="text-sm text-text-secondary mt-6 italic font-medium max-w-[200px] leading-relaxed">
              &ldquo;{result.commentary}&rdquo;
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
          <ResultChart chartData={result.chart_data} currency={displayCurrency} />
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