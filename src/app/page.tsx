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
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ─────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Decorative glow element */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="w-96 h-96 rounded-full bg-gradient-to-r from-brand/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Pill Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md"
          variants={itemVariants}
        >
          <Sparkles size={16} className="text-brand" />
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
            Powered by Real Data
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 text-foreground"
          variants={itemVariants}
        >
          Would I Be{' '}
          <span className="bg-gradient-to-r from-brand via-cyan-400 to-brand bg-clip-text text-transparent">
            Rich If
          </span>
          <span className="text-foreground/30">...?</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          variants={itemVariants}
        >
          A ruthless financial time machine that exposes the reality of your missed opportunities
          using <span className="text-foreground font-semibold">bone-dry historical data</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          {/* Primary CTA */}
          <Link href="/scenarios">
            <motion.button
              className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider
                         bg-gradient-to-r from-brand to-purple-600
                         text-white shadow-2xl shadow-brand/30
                         hover:shadow-3xl hover:shadow-brand/40
                         transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="inline-flex items-center gap-2">
                Explore Scenarios <ArrowRight size={18} />
              </span>
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/custom">
            <motion.button
              className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider
                         bg-foreground/5 backdrop-blur-md border border-foreground/20
                         text-foreground hover:bg-foreground/10 hover:border-brand/50
                         transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="inline-flex items-center gap-2">
                Build My Own <ArrowRight size={18} />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">
            Scroll
          </div>
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-brand to-transparent" />
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
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 backdrop-blur-md
                   border border-foreground/10 rounded-2xl transition-all duration-300"
        style={{
          opacity: isHovered ? 0.8 : 0.5,
        }}
      />

      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent rounded-2xl opacity-0"
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Icon */}
        <motion.div
          className="mb-6 w-14 h-14 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotateZ: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-brand text-2xl">{icon}</div>
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>

        {/* Description */}
        <p className="text-sm text-foreground/60 leading-relaxed flex-1">{description}</p>

        {/* Bottom Border */}
        <motion.div
          className="mt-6 h-1 bg-gradient-to-r from-brand to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
        />
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
      title: 'Real Historical Data',
      description: 'Powered by actual market prices from 1990–today. No estimates, no guesses, no BS.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Simulations',
      description: 'Results in under 2 seconds. Smart caching ensures blazing-fast performance every time.',
    },
    {
      icon: <Share2 size={24} />,
      title: 'Share Your Reality',
      description: 'Every result gets a shareable link. Shock your friends with your missed opportunities.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Premium Insights',
      description: 'Deep analysis of 28+ financial scenarios. Crypto, stocks, real estate, and more.',
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">
            Premium Features,
            <br />
            <span className="bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent">
              Zero Fluff
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need to understand your financial past and dream about your future.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Glass Container */}
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/5 backdrop-blur-xl border border-foreground/20" />

          {/* Glow */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(600px at 0% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 80%)',
                'radial-gradient(600px at 100% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 80%)',
                'radial-gradient(600px at 0% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 80%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6">
              Stop wondering. Start calculating.
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-10">
              Join thousands of people who've discovered the harsh truth about their financial
              decisions. It's free, it's instant, and it's brutally honest.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/scenarios">
                <motion.button
                  className="px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider
                             bg-gradient-to-r from-brand to-purple-600
                             text-white shadow-2xl shadow-brand/30
                             hover:shadow-3xl hover:shadow-brand/40
                             transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="inline-flex items-center gap-2">
                    Get Started Now <ArrowRight size={18} />
                  </span>
                </motion.button>
              </Link>

              <Link href="/custom">
                <motion.button
                  className="px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider
                             text-foreground hover:text-brand transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Or Build Your Scenario →
                </motion.button>
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

