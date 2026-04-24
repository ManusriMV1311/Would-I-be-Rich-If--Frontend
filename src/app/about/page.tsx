import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Would I Be Rich If...?',
  description: 'Learn about the Would I Be Rich If platform, its data sources, methodology, and technology stack.',
};

const TECH_STACK = [
  { layer: 'Frontend', tech: 'Next.js 16 + TypeScript', purpose: 'Server-side rendered React application' },
  { layer: 'Styling', tech: 'Tailwind CSS + Framer Motion', purpose: 'Utility-first CSS with animations' },
  { layer: 'State', tech: 'TanStack React Query + Zustand', purpose: 'Server state + UI state management' },
  { layer: 'Forms', tech: 'React Hook Form + Zod', purpose: 'Validated, type-safe form handling' },
  { layer: 'Backend', tech: 'FastAPI (Python 3.11)', purpose: 'High-performance REST API' },
  { layer: 'Data', tech: 'yfinance (Yahoo Finance)', purpose: 'Real historical market data — no API key needed' },
  { layer: 'Charts', tech: 'Recharts', purpose: 'Responsive financial growth charts' },
  { layer: 'Hosting', tech: 'Vercel + Render', purpose: 'Zero-cost production deployment' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-brand text-sm font-bold uppercase tracking-[0.3em] mb-3">
            About This Project
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-6">
            Would I Be Rich If...?
          </h1>
          <p className="text-foreground/60 text-lg leading-relaxed italic font-light">
            A financial time machine. Powered by real data. Built for curiosity.
          </p>
        </div>

        {/* What It Does */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">What It Does</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            This platform answers the question everyone has had at least once: <em>"What if I had invested that money instead?"</em>
          </p>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Using real historical price data from Yahoo Finance, we calculate exactly what would have happened
            to your money if you had invested it in any stock, ETF, or cryptocurrency — from any date in the past.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            The results are real numbers, not estimates. We fetch actual historical closing prices and
            simulate the math precisely, so every output is verifiable against public market data.
          </p>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">Data Sources</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Historical Prices</p>
              <p className="text-sm text-foreground/60">
                All historical asset prices are sourced from <strong>Yahoo Finance</strong> via the open-source
                <code className="px-1.5 py-0.5 rounded bg-foreground/10 text-brand text-xs ml-1">yfinance</code> library.
                Data includes split-adjusted closing prices for stocks, ETFs, cryptocurrencies, commodities, and forex pairs.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Live Prices</p>
              <p className="text-sm text-foreground/60">
                Current asset values are fetched live from Yahoo Finance at simulation time to ensure
                the "Alternate You" value reflects today's actual market.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Data Coverage</p>
              <p className="text-sm text-foreground/60">
                Most assets support data going back to 2000. Cryptocurrencies typically start from their exchange listing date.
                Some tickers may have limited history on Yahoo Finance.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">Methodology</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <p className="text-sm font-black uppercase tracking-widest text-brand mb-2">Lump Sum</p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Your investment buys units of the asset at the historical price on the start date.
                The final value is calculated as: <em>units × current market price</em>.
                This reflects a one-time purchase held to the present day.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <p className="text-sm font-black uppercase tracking-widest text-brand mb-2">Dollar-Cost Averaging (DCA)</p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                A fixed dollar amount is invested on the last trading day of each month.
                Units accumulate over time at different prices. The final value is the total units × current price.
                This reflects the effect of consistent, automated investing.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">Technology Stack</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="text-left px-4 py-3 text-foreground/60 font-black uppercase tracking-widest text-[10px]">Layer</th>
                  <th className="text-left px-4 py-3 text-foreground/60 font-black uppercase tracking-widest text-[10px]">Technology</th>
                  <th className="text-left px-4 py-3 text-foreground/60 font-black uppercase tracking-widest text-[10px]">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {TECH_STACK.map((row, i) => (
                  <tr key={row.layer} className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-card/20'}`}>
                    <td className="px-4 py-3 font-bold text-foreground/80">{row.layer}</td>
                    <td className="px-4 py-3 text-brand font-mono text-xs">{row.tech}</td>
                    <td className="px-4 py-3 text-foreground/50">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/5">
            <p className="text-yellow-400 font-black uppercase tracking-widest text-xs mb-3">
              ⚠️ Important Disclaimer
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              All simulation results produced by this application are for <strong>educational and entertainment purposes only</strong>.
              They do not constitute financial advice, investment recommendations, or any form of professional guidance.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed mt-3">
              <strong>Past performance is not indicative of future results.</strong> The financial markets are
              inherently unpredictable. Historical returns — no matter how dramatic — provide no guarantee of
              similar future outcomes. Always consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/scenarios"
            className="px-6 py-3 bg-brand text-white rounded-full font-bold text-sm hover:bg-brand/90 transition-colors"
          >
            Explore Scenarios →
          </Link>
          <Link
            href="/custom"
            className="px-6 py-3 border border-border text-foreground/70 rounded-full font-bold text-sm hover:border-brand/40 hover:text-foreground transition-colors"
          >
            Build Your Own
          </Link>
        </div>

      </div>
    </main>
  );
}
