'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  History, 
  User, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Globe, 
  BarChart3, 
  Layers, 
  Target,
  ArrowDownCircle
} from 'lucide-react';
import React from 'react';

// Using a separate client component for the layout to keep metadata in page.tsx if needed
// But since we need 'use client' for animations, we'll keep it here.
// Note: Next.js metadata doesn't work in 'use client' files, so we usually export it from a layout or separate file.
// For now, let's prioritize the UI.

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 }
};

export default function AboutPage() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-transparent overflow-hidden">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative h-[90vh] flex items-center justify-center px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-alternate/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              The Financial Time Machine
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-8">
              Rewrite Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-400">Financial Past</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light italic mb-12 max-w-2xl mx-auto">
              A financial time machine that shows what could have been, powered by real market history.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/scenarios"
                className="group px-8 py-4 bg-brand text-white rounded-full font-bold text-base hover:shadow-[0_0_40px_rgba(22,163,74,0.4)] transition-all duration-500 flex items-center gap-2"
              >
                Try a Scenario
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-foreground/40 hover:text-foreground font-bold text-sm tracking-widest uppercase flex items-center gap-2 transition-colors"
              >
                Learn More <ArrowDownCircle size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. CONCEPT SECTION (INTERACTIVE CARDS) ── */}
      <section id="concept" className="py-32 px-4 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">The Three Pillars</h2>
            <p className="text-foreground/50 max-w-xl mx-auto italic">Understanding the impact of every financial decision you've ever made.</p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Alternate You",
                description: "The version of you that took the leap. See how your wealth would have scaled if you had taken this path instead of spent.",
                icon: <Zap className="text-brand" />,
                color: "bg-brand/10",
                border: "border-brand/20"
              },
              {
                title: "Real You",
                description: "The reality of today. A baseline of your actual financial path, serving as the constant in our simulations.",
                icon: <User className="text-alternate" />,
                color: "bg-alternate/10",
                border: "border-alternate/20"
              },
              {
                title: "The Gap",
                description: "The opportunity cost. The delta between your reality and your potential. This is where the magic (or regret) happens.",
                icon: <History className="text-real" />,
                color: "bg-real/10",
                border: "border-real/20"
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-10 rounded-[40px] bg-card/50 backdrop-blur-md border ${card.border} transition-all duration-500 shadow-2xl shadow-black/20`}
              >
                <div className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mb-8`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{card.title}</h3>
                <p className="text-foreground/70 leading-relaxed italic font-light">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">The Protocol</h2>
            <p className="text-foreground/70 italic font-light">Simple steps to reveal your alternate future.</p>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-brand/20 to-transparent hidden md:block" />

            <div className="space-y-20">
              {[
                { step: "01", title: "Pick a Scenario", desc: "Choose from our curated list of crypto, stocks, or lifestyle spending habits." },
                { step: "02", title: "Simulate Your Decision", desc: "Input your investment amount and the exact date the choice was made." },
                { step: "03", title: "See the Outcome", desc: "Watch our engine process real historical data to generate your results instantly." }
              ].map((item, i) => (
                <motion.div 
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-12 relative"
                >
                  <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(22,163,74,0.4)] relative z-10 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-3 text-foreground">{item.title}</h3>
                    <p className="text-lg text-foreground/70 italic font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHY IT MATTERS ── */}
      <section className="py-32 px-4 bg-brand/[0.03]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none mb-8">
                Why Curiosity <br />
                <span className="text-brand">Changes Everything</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand/10 text-brand mt-1"><Target size={20} /></div>
                  <div>
                    <p className="font-bold text-lg mb-1">Opportunity Cost</p>
                    <p className="text-foreground/70 italic text-sm">Every dollar spent is a dollar that could have been working for you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand/10 text-brand mt-1"><TrendingUp size={20} /></div>
                  <div>
                    <p className="font-bold text-lg mb-1">Power of Compounding</p>
                    <p className="text-foreground/70 italic text-sm">Time is the most powerful asset in the world of finance.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-[40px] bg-card/50 backdrop-blur-md border border-border p-8 flex flex-col justify-end shadow-2xl"
              >
                <p className="text-4xl font-black text-brand mb-2">60+</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-foreground/60">Real Scenarios</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-[40px] bg-brand text-white p-8 flex flex-col justify-end shadow-2xl shadow-brand/20"
              >
                <p className="text-4xl font-black mb-2 text-white">100%</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/80">Historical Accuracy</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-[40px] bg-card/50 backdrop-blur-md border border-border p-8 flex flex-col justify-end shadow-2xl"
              >
                <p className="text-4xl font-black text-brand mb-2">∞</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-foreground/60">Possibilities</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-[40px] bg-real text-white p-8 flex flex-col justify-end shadow-2xl shadow-real/20"
              >
                <p className="text-4xl font-black mb-2 text-white">Real</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/80">Market Data</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURE HIGHLIGHTS ── */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Precision Engineering</h2>
            <p className="text-foreground/70 italic font-light">The features that power your financial time travel.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Real-time Data", desc: "Live market prices synced with historical archives.", icon: <Globe size={24} /> },
              { title: "Historical Simulations", desc: "Deep-dive into decades of market volatility.", icon: <BarChart3 size={24} /> },
              { title: "Multi-Asset Classes", desc: "Crypto, Stocks, ETFs, Govt Schemes, and Lifestyle.", icon: <Layers size={24} /> },
              { title: "Custom Scenarios", desc: "Build any simulation with your specific variables.", icon: <Target size={24} /> }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-card border border-border group hover:border-brand/40 transition-colors"
              >
                <div className="text-brand mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-foreground/70 font-light italic">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto rounded-[60px] bg-gradient-to-br from-brand to-emerald-600 p-16 text-center text-white relative overflow-hidden shadow-[0_0_100px_rgba(22,163,74,0.2)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-white">
              Start Exploring Your <br /> Alternate Future
            </h2>
            <Link
              href="/scenarios"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Explore Now
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center opacity-70 text-[10px] font-bold uppercase tracking-widest space-y-4">
          <p className="text-foreground">Educational and entertainment purposes only. Not financial advice.</p>
          <p className="text-foreground">© {mounted ? new Date().getFullYear() : '2026'} Would I Be Rich If...? All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}

