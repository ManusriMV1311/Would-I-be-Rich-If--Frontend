'use client';

import { Globe, Flag } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { motion } from 'framer-motion';

export default function RegionToggle() {
  const { region, setRegion } = useUIStore();

  const isGlobal = region === 'global';

  return (
    <div className="flex items-center p-1 bg-foreground/5 backdrop-blur-md rounded-full border border-foreground/10 h-10">
      <button
        onClick={() => setRegion('global')}
        className={`
          relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
          ${isGlobal ? 'text-background' : 'text-foreground/50 hover:text-foreground'}
        `}
        aria-label="Switch to Global scenarios"
      >
        {isGlobal && (
          <motion.div
            layoutId="region-active"
            className="absolute inset-0 bg-brand rounded-full -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Globe size={14} />
        <span className="hidden xs:inline">Global</span>
      </button>

      <button
        onClick={() => setRegion('india')}
        className={`
          relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
          ${!isGlobal ? 'text-background' : 'text-foreground/50 hover:text-foreground'}
        `}
        aria-label="Switch to India scenarios"
      >
        {!isGlobal && (
          <motion.div
            layoutId="region-active"
            className="absolute inset-0 bg-brand rounded-full -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Flag size={14} />
        <span className="hidden xs:inline">India</span>
      </button>
    </div>
  );
}
