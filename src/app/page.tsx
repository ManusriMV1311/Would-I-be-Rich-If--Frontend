'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Share2, Sparkles } from 'lucide-react';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// ─────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <motion.section
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
        <div className="absolute top-20 left-0 w-72 h-72 bg-brand/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-alternate/10 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Pill Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-xl shadow-black/[0.02]"
          variants={itemVariants}
        >
          <Sparkles size={16} className="text-brand" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/80">
            Powered by Real Market Data
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-6xl sm:text-8xl lg:text-9xl font-black leading-[0.85] mb-8 text-foreground tracking-tighter"
          variants={itemVariants}
        >
          Would I Be <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-alternate to-real">
            Rich If
          </span>
          <span className="text-foreground/30">...?</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl sm:text-2xl text-foreground/80 max-w-2xl mx-auto mb-14 font-light leading-relaxed italic"
          variants={itemVariants}
        >
          A financial time machine that exposes the reality of your missed opportunities
          using <span className="text-foreground font-bold underline decoration-brand/30 underline-offset-4">bone-dry historical data</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <Link href="/scenarios" className="btn-primary py-5 px-12 text-sm shadow-2xl shadow-brand/20">
            Explore Scenarios <ArrowRight size={20} />
          </Link>

          <Link href="/custom" className="btn-secondary py-5 px-12 text-sm border-white/40 hover:bg-white/60">
            Build My Own <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FEATURE CARD COMPONENT
// ─────────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="glass-card p-10 h-full flex flex-col hover-lift group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <motion.div
        className="mb-8 w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotateZ: isHovered ? 5 : 0,
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-brand transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-text-secondary leading-relaxed flex-1 italic font-light">
        {description}
      </p>

      {/* Animated Arrow Indicator */}
      <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 transition-opacity">
        Learn More <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: 'Real Market Data',
      description: 'Powered by actual market prices from 1990–today. No estimates, no guesses, no BS.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Results',
      description: 'Results in under 2 seconds. Smart caching ensures blazing-fast performance every time.',
    },
    {
      icon: <Share2 size={24} />,
      title: 'Share Reality',
      description: 'Every result gets a shareable link. Shock your friends with your missed opportunities.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Deep Scenarios',
      description: 'Analysis of 60+ financial scenarios. Crypto, stocks, real estate, and more.',
    },
  ];

  return (
    <section className="relative py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-xl shadow-black/[0.02]">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/80">
              The WIBRI Protocol
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-foreground mb-8 tracking-tighter leading-tight">
            Premium Features, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-alternate">
              Ruthless Accuracy
            </span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto italic font-light">
            Everything you need to understand your financial past and dream about your future.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Glass Container */}
        <motion.div
          className="glass-card relative overflow-hidden p-16 sm:p-24 text-center border-white/50"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Animated Glow Background */}
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, #7c3aed 0%, transparent 70%)',
                'radial-gradient(circle at 100% 100%, #ec4899 0%, transparent 70%)',
                'radial-gradient(circle at 0% 0%, #7c3aed 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black text-foreground mb-8 tracking-tighter">
              Stop wondering. <br /> Start calculating.
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-14 font-light leading-relaxed italic">
              Join thousands who&apos;ve discovered the truth about their financial decisions. 
              It&apos;s free, instant, and brutally honest.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/scenarios" className="btn-primary py-5 px-14 shadow-2xl shadow-brand/20">
                Get Started Now <ArrowRight size={20} />
              </Link>

              <Link href="/custom" className="btn-secondary py-5 px-14 border-white/40 hover:bg-white/60">
                Build My Scenario →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-transparent">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}

