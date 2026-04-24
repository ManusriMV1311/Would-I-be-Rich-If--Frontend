'use client';

import Link from 'next/link';
import { Scenario } from '@/types/scenario.types';
import { formatRunCount } from '@/utils/formatCurrency';
import { getCategoryMeta } from '@/utils/categories';
import { TrendingUp, Users, ArrowRight, Globe, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface ScenarioCardProps {
  scenario: Scenario;
  /** Slot for triggering a simulation; parent is in charge of navigation */
  onSelect?: (uuid: string) => void;
}

export default function ScenarioCard({ scenario, onSelect }: ScenarioCardProps) {
  const meta = getCategoryMeta(scenario.category);

  const handleClick = () => {
    if (onSelect) onSelect(scenario.uuid);
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      role="button"
      tabIndex={0}
      id={`scenario-card-${scenario.uuid}`}
      aria-label={`Simulate: ${scenario.title}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="
        glass-card p-8 h-full flex flex-col hover-lift group cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
      "
    >
      {/* Category Badge + Region + Trending */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`
              inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full
              ${meta.bgColor} ${meta.color} shadow-sm backdrop-blur-sm
            `}
          >
            <span role="img" aria-label={meta.label}>{meta.emoji}</span>
            {meta.label}
          </span>

          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-foreground/5 text-foreground/70 border border-border">
            {scenario.region === 'global' ? <Globe size={10} /> : <Flag size={10} />}
            {scenario.region}
          </span>

          {scenario.trending && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand/20 text-brand border border-brand/30 animate-pulse">
              🔥 Hot
            </span>
          )}
        </div>

        {/* Popularity indicator */}
        <span className="hidden xs:flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-foreground/60">
          <Users size={12} aria-hidden="true" />
          {formatRunCount(scenario.run_count)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-black text-foreground tracking-tight group-hover:text-brand transition-colors duration-300 mb-1">
          {scenario.name}
        </h3>
        <p className="text-sm font-bold text-foreground/90 leading-tight mb-2">
          {scenario.title}
        </p>
        <p className="text-xs text-foreground/70 leading-relaxed italic font-light line-clamp-2">
          {scenario.description}
        </p>
      </div>

      {/* Tags */}
      {scenario.tags && scenario.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {scenario.tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-foreground/10 text-foreground/70 border border-foreground/5">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA Row */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
          <TrendingUp size={12} aria-hidden="true" />
          {scenario.sim_type.replace('_', ' ')}
        </span>
        <span className="
          flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-brand
          group-hover:translate-x-1 transition-transform duration-300
        ">
          Simulate
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>

      {/* Subtle mechanical border pulse on hover */}
      <div className="
        absolute inset-0 rounded-2xl border-2 border-brand/0 group-hover:border-brand/10 transition-colors duration-700 pointer-events-none
      " />
    </motion.div>
  );
}
