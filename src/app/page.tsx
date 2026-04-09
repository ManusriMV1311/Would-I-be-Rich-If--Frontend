import Link from 'next/link';
import type { Metadata } from 'next';
import { mockScenarios } from '@/services/mockData';
import { CATEGORY_META } from '@/utils/categories';
import { ArrowRight, TrendingUp, Zap, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Would I Be Rich If...? — Financial Time Machine',
  description:
    'Discover what your wealth could look like with real historical data. Explore 28+ "what if" financial scenarios — crypto, stocks, real estate and more.',
  openGraph: {
    title: 'Would I Be Rich If...?',
    description: 'A free financial time machine built on real data.',
    type: 'website',
  },
};

const features = [
  {
    icon: TrendingUp,
    title: 'Real Historical Data',
    description: 'Powered by actual market prices — no estimates, no guesses.',
  },
  {
    icon: Zap,
    title: 'Instant Simulations',
    description: 'Results in under 2 seconds with smart Redis caching.',
  },
  {
    icon: Share2,
    title: 'Share Your Reality',
    description: 'Every result gets a shareable link to shock your friends.',
  },
];

export default function Home() {
  const popularScenarios = mockScenarios.slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden transition-colors duration-500">
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        {/* Discrete Pulse glow behind headline */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[800px] rounded-full bg-brand/5 blur-[160px] animate-pulse" />
        </div>

        {/* Pill badge (Bold, Precise) */}
        <div className="relative mb-8 inline-flex items-center gap-3 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
          </span>
          Verified Real Data · No Sign-Up Required
        </div>

        {/* High-Impact Editorial Headline */}
        <h1 className="relative text-6xl sm:text-8xl font-black text-foreground leading-[1] tracking-tighter mb-8 max-w-4xl">
          Would I Be{' '}
          <span className="text-brand italic">
            Rich If
          </span>
          <span className="opacity-20 italic">...?</span>
        </h1>

        <p className="relative text-lg sm:text-2xl text-foreground/60 max-w-2xl mb-12 leading-tight font-light italic">
          A ruthless financial time machine that exposes the reality of your missed opportunities
          using <span className="text-foreground font-bold underline decoration-brand/30">bone-dry historical data</span>.
        </p>

        {/* High-Contrast CTAs */}
        <div className="relative flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/scenarios"
            className="
              inline-flex items-center gap-2 rounded-full bg-brand px-10 py-5
              text-background font-black text-sm uppercase tracking-widest
              hover:opacity-90 transition-all duration-300 translate-y-0 hover:-translate-y-1
              shadow-2xl shadow-brand/20 active:scale-95
            "
          >
            Explore Scenarios
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/custom"
            className="
              inline-flex items-center gap-2 rounded-full border-2 border-foreground/10 px-10 py-5
              text-foreground/80 font-black text-sm uppercase tracking-widest
              hover:border-brand hover:text-brand transition-all duration-300
              bg-card/30 backdrop-blur-sm translate-y-0 hover:-translate-y-1
            "
          >
            Build My Own
          </Link>
        </div>

        {/* Refined Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/20 text-[10px] uppercase font-bold tracking-widest">
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent" />
          Scroll
        </div>
      </section>

      {/* ═══════════════════════════════════════
          POPULAR SCENARIOS (MATTE GRID)
      ═══════════════════════════════════════ */}
      <section className="relative px-6 py-32 max-w-6xl mx-auto">
        {/* Decorative Aura Bloom */}
        <div className="aura-bloom absolute top-1/2 left-0 w-96 h-96 bg-turquoise-400 opacity-20 dark:bg-brand/10 -translate-x-1/2" />
        
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 gap-4">
          <div>
            <p className="text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              Regret Index: High
            </p>
            <h2 className="text-4xl font-black text-foreground tracking-tighter">
              Legacy Scenarios
            </h2>
          </div>
          <Link
            href="/scenarios"
            className="text-foreground/40 hover:text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            Browse the full archive <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {popularScenarios.map((s) => {
            const meta = CATEGORY_META.find((c) => c.id === s.category)!;
            return (
              <Link
                key={s.uuid}
                href={`/result/${s.uuid}`}
                className="
                  group flex flex-col gap-4 p-8 rounded-2xl
                  bg-card border border-border
                  hover:border-brand/40 hover:bg-brand/[0.02]
                  hover-lift transition-all duration-500
                  shadow-xl hover:shadow-brand/5
                "
              >
                <span className="text-3xl text-brand transition-transform duration-500 group-hover:scale-125" role="img" aria-label={meta.label}>
                  {meta.emoji}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <span className="text-xs text-foreground/40 font-medium italic">{s.description}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COLLECTIONS (CHIP LIST)
      ═══════════════════════════════════════ */}
      <section className="px-6 py-24 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-foreground/30 text-[10px] mb-12 font-black uppercase tracking-[0.4em]">
            Archived Across 8 Domains
          </p>
          <div className="aura-bloom absolute -top-20 -right-20 w-[400px] h-[400px] bg-amber-400 opacity-10 dark:bg-brand/5" />
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORY_META.filter((c) => c.id !== 'all').map((cat) => (
              <Link
                key={cat.id}
                href={`/scenarios?category=${cat.id}`}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest
                  border transition-all duration-300
                  ${cat.bgColor} ${cat.color} border-current/10
                  hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-current/20
                `}
              >
                <span role="img" aria-label={cat.label}>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CORE PHILOSOPHY
      ═══════════════════════════════════════ */}
      <section className="relative px-6 py-32 max-w-5xl mx-auto text-center">
        {/* Floating Bloom */}
        <div className="aura-bloom absolute bottom-0 right-0 w-80 h-80 bg-emerald-400 opacity-15 dark:bg-brand/10 translate-x-1/4" />
        
        <h2 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-[ -0.04em]">
          Precision matters.
        </h2>
        <p className="text-lg text-foreground/40 mb-20 max-w-xl mx-auto font-medium italic">
          We don't do estimates. We pull the actual clock ticks of the market.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-6 group">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/5 border border-brand/10 transition-all duration-500 group-hover:bg-brand/10 group-hover:rotate-12 group-hover:scale-110">
                <Icon size={28} className="text-brand" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground mb-2 uppercase tracking-tight">{title}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed max-w-[240px] font-medium">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA (THE LEDGER)
      ═══════════════════════════════════════ */}
      <section className="px-6 py-32 text-center bg-brand/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl sm:text-7xl font-black text-foreground mb-8 tracking-tighter">
            Face the ledger.
          </h2>
          <p className="text-xl text-foreground/40 mb-12 font-light italic">
            The data is waiting. The only thing missing is <span className="text-foreground font-bold">your courage</span>.
          </p>
          <Link
            href="/scenarios"
            className="
              inline-flex items-center gap-3 rounded-full bg-brand px-12 py-6
              text-background font-black text-xl uppercase tracking-widest
              hover:opacity-90 transition-all duration-300 shadow-2xl shadow-brand/30 animate-pulse
            "
          >
            Initialize
            <ArrowRight size={24} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Footer (Minimalist, Editorial) */}
      <footer className="border-t border-border px-6 py-12 text-center text-foreground/20 text-[10px] font-black uppercase tracking-[0.5em]">
        <p>
          Archive 001 · Open Protocol ·{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colors"
          >
            Source Alpha
          </a>
        </p>
      </footer>
    </main>
  );
}
