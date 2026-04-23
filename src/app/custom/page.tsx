'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCustomSimulation } from '@/hooks/useSimulation';
import { useUIStore } from '@/store/uiStore';
import { TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Zod Validation Schema ────────────────────────────────────────────────────
const TICKER_REGEX = /^[A-Z0-9.\-]{1,10}$/;
const MIN_DATE = new Date('2000-01-01');
const MAX_DATE = new Date();
MAX_DATE.setDate(MAX_DATE.getDate() - 1); // yesterday max

// Use z.preprocess for the number field so that RHF's inferred
// FormData type stays { asset: string; initial_amount: number; start_date: string }
// while still coercing string→number from the HTML input.
const customSimSchema = z.object({
  asset: z
    .string()
    .min(1, 'Ticker is required')
    .max(10, 'Max 10 characters')
    .transform((v) => v.toUpperCase().trim())
    .refine((v) => TICKER_REGEX.test(v), {
      message: 'Only letters, numbers, dots, and dashes (e.g. AAPL, BTC-USD)',
    }),
  initial_amount: z
    .number()
    .min(1, 'Minimum $1')
    .max(10_000_000, 'Maximum $10,000,000'),
  start_date: z
    .string()
    .min(1, 'Start date is required')
    .refine((d) => {
      const date = new Date(d);
      return !isNaN(date.getTime()) && date >= MIN_DATE && date <= MAX_DATE;
    }, {
      message: 'Date must be between Jan 2000 and yesterday',
    }),
});

type FormData = {
  asset: string;
  initial_amount: number;
  start_date: string;
};

// ─── Input Component ──────────────────────────────────────────────────────────
function FormField({
  label,
  id,
  hint,
  error,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest text-foreground/60">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[10px] text-foreground/30 font-medium uppercase tracking-tight">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError: boolean) => `
  w-full px-4 py-3 rounded-xl
  bg-card/50 border text-foreground text-sm font-medium
  placeholder:text-foreground/20
  focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40
  transition-all duration-300
  ${hasError
    ? 'border-red-600/50 focus:ring-red-500/20'
    : 'border-border hover:border-brand/30'
  }
`;

// ─── Custom UI Components ─────────────────────────────────────────────────────
const ASSET_GROUPS = [
  {
    label: "Cryptocurrency",
    options: [
      { value: "BTC-USD", label: "Bitcoin (BTC-USD)" },
      { value: "ETH-USD", label: "Ethereum (ETH-USD)" },
      { value: "SOL-USD", label: "Solana (SOL-USD)" },
      { value: "DOGE-USD", label: "Dogecoin (DOGE-USD)" },
    ]
  },
  {
    label: "Stocks (Equities)",
    options: [
      { value: "AAPL", label: "Apple (AAPL)" },
      { value: "MSFT", label: "Microsoft (MSFT)" },
      { value: "NVDA", label: "NVIDIA (NVDA)" },
      { value: "TSLA", label: "Tesla (TSLA)" },
      { value: "AMZN", label: "Amazon (AMZN)" },
      { value: "META", label: "Meta (META)" },
      { value: "GOOGL", label: "Alphabet (GOOGL)" },
    ]
  },
  {
    label: "Index ETFs",
    options: [
      { value: "SPY", label: "S&P 500 ETF (SPY)" },
      { value: "QQQ", label: "Nasdaq 100 ETF (QQQ)" },
      { value: "VTI", label: "Total Stock Market ETF (VTI)" },
      { value: "VOO", label: "Vanguard S&P 500 (VOO)" },
    ]
  }
];

function CustomAssetSelect({ value, onChange, hasError }: { 
  value: string; 
  onChange: (val: string) => void;
  hasError: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = ASSET_GROUPS.flatMap(g => g.options).find(o => o.value === value)?.label || "Select an Asset...";
  
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div 
        className={`${inputClass(hasError)} flex items-center justify-between cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-foreground" : "text-foreground/40"}>
          {selectedLabel}
        </span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          className="w-4 h-4 fill-current text-foreground/50 transition-colors" 
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </motion.svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full mt-2 w-full max-h-[320px] overflow-y-auto rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {ASSET_GROUPS.map((group, i) => (
              <div key={group.label} className={i > 0 ? "mt-4" : ""}>
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand mb-1">
                  {group.label}
                </div>
                {group.options.map(opt => (
                  <div
                    key={opt.value}
                    className={`
                      px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200
                      ${value === opt.value ? 'bg-brand/20 text-brand' : 'text-foreground/80 hover:bg-foreground/5 hover:text-foreground hover:translate-x-1'}
                    `}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CustomSimulatorPage() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const { mutate: runSimulation, isPending } = useCustomSimulation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(customSimSchema) as any,
    mode: 'onChange',
    defaultValues: {
      asset: '',
      initial_amount: 1000,
      start_date: '2015-01-01',
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: FormData) => {
    runSimulation(
      { sim_type: 'lump_sum', ...data },
      {
        onSuccess: (res) => {
          if (res.success && res.data) {
            router.push(`/result/${res.data.result_id}`);
          } else {
            addToast('Simulation failed — try again.', 'error');
          }
        },
        onError: () => {
          addToast('Something went wrong. Please try again.', 'error');
        },
      }
    );
  };

  return (
    <main className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-brand text-xs font-black uppercase tracking-[0.3em] mb-3">
            Custom Build Protocol
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
            Build Your Own "What If"
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed italic font-light max-w-xl">
            Pick any stock, ETF, or crypto. Set your amount and start date.
            We'll show you what would have happened — in cold, hard dollars.
          </p>
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="custom-simulator-form"
          noValidate
          className="flex flex-col gap-6"
        >

          {/* Ticker */}
          <FormField
            label="Asset"
            id="asset"
            hint="Select your targeted asset"
            error={errors.asset?.message}
          >
            <CustomAssetSelect
              value={watchedValues.asset}
              onChange={(val) => setValue('asset', val, { shouldValidate: true })}
              hasError={!!errors.asset}
            />
          </FormField>

          {/* Amount */}
          <FormField
            label="Initial Investment"
            id="initial_amount"
            hint="Between $1 and $10,000,000"
            error={errors.initial_amount?.message}
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">$</span>
              <input
                id="initial_amount"
                type="number"
                min={1}
                max={10000000}
                step={1}
                aria-describedby={errors.initial_amount ? 'initial_amount-error' : 'initial_amount-hint'}
                aria-invalid={!!errors.initial_amount}
                placeholder="1000"
                className={`${inputClass(!!errors.initial_amount)} pl-8`}
                {...register('initial_amount', { valueAsNumber: true })}
              />
            </div>
          </FormField>

          {/* Start Date */}
          <FormField
            label="Start Date"
            id="start_date"
            hint="Any date from January 2000 to yesterday"
            error={errors.start_date?.message}
          >
            <input
              id="start_date"
              type="date"
              min="2000-01-01"
              max={MAX_DATE.toISOString().split('T')[0]}
              aria-describedby={errors.start_date ? 'start_date-error' : 'start_date-hint'}
              aria-invalid={!!errors.start_date}
              className={`${inputClass(!!errors.start_date)} [color-scheme:dark]`}
              {...register('start_date')}
            />
          </FormField>

          {/* Live preview */}
          {isValid && watchedValues.asset && watchedValues.initial_amount && (
            <div
              aria-live="polite"
              className="rounded-xl border border-brand/25 bg-brand/10 px-5 py-4"
            >
              <p className="text-sm text-brand font-semibold mb-1">✅ Ready to simulate</p>
              <p className="text-xs text-foreground/60">
                Investing{' '}
                <strong className="text-foreground/90">
                  ${watchedValues.initial_amount?.toLocaleString()}
                </strong>
                {' '}in{' '}
                <strong className="text-foreground/90">
                  {watchedValues.asset?.toUpperCase()}
                </strong>
                {' '}starting{' '}
                <strong className="text-foreground/90">{watchedValues.start_date}</strong>
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            id="custom-simulator-submit"
            type="submit"
            disabled={isPending || !isValid}
            aria-disabled={isPending || !isValid}
            className={`
              w-full flex items-center justify-center gap-3
              rounded-full py-4 font-bold text-base
              transition-all duration-300
              ${isPending || !isValid
                ? 'bg-foreground/10 text-foreground/40 cursor-not-allowed'
                : 'bg-brand text-white hover:bg-brand/90 shadow-lg shadow-brand/25 hover:shadow-brand/40'
              }
            `}
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                Running simulation...
              </>
            ) : (
              <>
                <TrendingUp size={18} aria-hidden="true" />
                Show Me The Money
              </>
            )}
          </button>

        </form>

        {/* Tips */}
        <div className="mt-12 p-8 rounded-2xl bg-brand/[0.02] border border-border">
          <p className="text-[10px] font-black text-brand uppercase tracking-[0.4em] mb-4">
            Custom Build Options
          </p>
          <ul className="text-xs text-foreground/40 space-y-2.5 font-medium italic">
            {[
              'You can accurately backtest against the exact daily closing prices',
              'We cross-reference the exact split-adjusted values for accurate outcomes',
              'Dates automatically map to the closest valid trading session',
              'ETFs provide standard index benchmarking without direct ticker lookup',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="text-brand" aria-hidden="true">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}
