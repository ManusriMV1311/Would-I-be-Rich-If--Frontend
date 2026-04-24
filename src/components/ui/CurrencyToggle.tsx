'use client';

import { useUIStore } from '@/store/uiStore';
import { motion } from 'framer-motion';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useUIStore();

  return (
    <div className="flex items-center bg-card/50 border border-border rounded-full p-1 shadow-inner">
      {(['USD', 'INR'] as const).map((curr) => {
        const isActive = currency === curr;
        return (
          <button
            key={curr}
            onClick={() => setCurrency(curr)}
            className={`
              relative px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
              ${isActive ? 'text-white' : 'text-foreground/40 hover:text-foreground'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="currency-active-pill"
                className="absolute inset-0 bg-brand rounded-full shadow-lg shadow-brand/20"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{curr}</span>
          </button>
        );
      })}
    </div>
  );
}
