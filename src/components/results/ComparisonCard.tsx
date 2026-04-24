import { formatCurrency } from '@/utils/formatCurrency';
import { useUIStore } from '@/store/uiStore';

interface ComparisonCardProps {
  label: string;
  description: string;
  value: number;
  variant: 'alternate' | 'real';
}

export default function ComparisonCard({ label, description, value, variant }: ComparisonCardProps) {
  const { currency } = useUIStore();
  const isAlternate = variant === 'alternate';

  const labelColor  = isAlternate ? 'text-alternate' : 'text-real';
  const icon        = isAlternate ? '✧'              : '◌';

  return (
    <div
      className={`
        glass-card p-10 flex flex-col gap-4 hover-lift border-white/50
        ${isAlternate ? 'shadow-xl shadow-brand/5 ring-1 ring-brand/10' : 'shadow-xl shadow-black/[0.02]'}
      `}
      role="region"
      aria-label={label}
    >
      <div className="flex items-center gap-3">
        <span className={`text-2xl ${labelColor}`} role="img" aria-label={label}>{icon}</span>
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${labelColor}`}>{label}</p>
      </div>
      <p
        className="text-4xl font-black text-foreground tabular-nums tracking-tighter"
        aria-live="polite"
      >
        {formatCurrency(value, currency)}
      </p>
      <p className="text-sm text-text-secondary leading-relaxed mt-auto italic font-light">
        {description}
      </p>
    </div>
  );
}
