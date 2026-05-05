'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Suspense } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCustomSimulation } from '@/hooks/useSimulation';
import { useUIStore } from '@/store/uiStore';
import { TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USD_TO_INR } from '@/utils/formatCurrency';
import { detectCurrency } from '@/utils/currencyDetection';
import { generateScenarioText } from '@/utils/scenarioText';

// ─── Zod Validation Schema ────────────────────────────────────────────────────
const TICKER_REGEX = /^[A-Z0-9.\-=^]{1,15}$/;
const MIN_DATE = new Date('2000-01-01');
const MAX_DATE = new Date();
MAX_DATE.setDate(MAX_DATE.getDate() - 1); // yesterday max

const customSimSchema = z.object({
  asset: z
    .string()
    .min(1, 'Ticker is required')
    .max(15, 'Max 15 characters')
    .transform((v) => v.toUpperCase().trim())
    .refine((v) => TICKER_REGEX.test(v), {
      message: 'Only letters, numbers, dots, and dashes (e.g. AAPL, BTC-USD)',
    }),
  initial_amount: z.preprocess(
    (v) => (v === '' || v === null ? undefined : v),
    z.number().min(1, 'Minimum 1').max(1_000_000_000, 'Maximum 1 Billion').optional()
  ),
  monthly_investment: z.preprocess(
    (v) => (v === '' || v === null ? undefined : v),
    z.number().min(1, 'Minimum 1').max(100_000_000, 'Maximum 100 Million').optional()
  ),
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
  initial_amount?: number;
  monthly_investment?: number;
  start_date: string;
};

// ─── Input Component ──────────────────────────────────────────────────────────
function FormField({
  label,
  storyLabel,
  id,
  hint,
  error,
  children,
}: {
  label?: string;
  storyLabel?: string;
  id: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {storyLabel ? (
        <label htmlFor={id} className="text-xl md:text-2xl font-bold text-brand leading-tight mb-2">
          {storyLabel}
        </label>
      ) : label ? (
        <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest text-foreground/60">
          {label}
        </label>
      ) : null}
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
import { getAllDropdownGroups, ALL_SCENARIOS, ASSET_NAMES } from '@/data/scenarios';
const ASSET_GROUPS = getAllDropdownGroups();

function CustomAssetSelect({ value, onChange, hasError }: { 
  value: string; 
  onChange: (val: string) => void;
  hasError: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectedLabel = ASSET_GROUPS.flatMap(g => g.options).find(o => o.value === value)?.label || "Select an Asset...";
  
  const filteredGroups = ASSET_GROUPS.map(group => ({
    ...group,
    options: group.options.filter(opt => 
      opt.label.toLowerCase().includes(search.toLowerCase()) || 
      opt.value.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.options.length > 0);
  
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
            className="absolute z-50 top-full mt-2 w-full max-h-[320px] overflow-y-auto rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-2 scrollbar-thin scrollbar-thumb-foreground/10 hover:scrollbar-thumb-foreground/20 scrollbar-track-transparent"
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl pb-2 z-10 pt-1 px-1">
              <input
                type="text"
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-card/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-brand/40"
              />
            </div>
            {filteredGroups.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-foreground/40">No assets found</div>
            ) : filteredGroups.map((group, i) => (
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

// ─── Main Form Components ───────────────────────────────────────────────────
function CustomSimulatorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const { addToast } = useUIStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { mutate: runSimulation, isPending } = useCustomSimulation();

  const initialAsset = searchParams.get('asset') || '';
  const initialStart = searchParams.get('start') || '2015-01-01';
  const urlSim = searchParams.get('sim');
  const urlAmount = Number(searchParams.get('amount')) || undefined;
  const scenarioUuid = searchParams.get('scenario');

  const [simType, setSimType] = useState<'lump_sum' | 'dca'>(urlSim === 'dca' ? 'dca' : 'lump_sum');

  // Determine initial currency for URL params converting
  const initialCurrency = detectCurrency(initialAsset);
  const initialIsINR = initialCurrency === 'INR';

  // Convert incoming USD amount to local currency for display
  const displayAmount = urlAmount ? (initialIsINR ? urlAmount * USD_TO_INR : urlAmount) : undefined;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(customSimSchema) as any,
    mode: 'onChange',
    defaultValues: {
      asset: initialAsset,
      initial_amount: simType === 'lump_sum' ? displayAmount : undefined,
      monthly_investment: simType === 'dca' ? displayAmount : undefined,
      start_date: initialStart,
    },
  });

  // BUG FIX: Reset form state when scenario changes or is cleared
  useEffect(() => {
    if (!mounted) return;
    
    const newSimType = urlSim === 'dca' ? 'dca' : 'lump_sum';
    setSimType(newSimType);
    
    reset({
      asset: searchParams.get('asset') || '',
      start_date: searchParams.get('start') || '2015-01-01',
      initial_amount: newSimType === 'lump_sum' ? displayAmount : undefined,
      monthly_investment: newSimType === 'dca' ? displayAmount : undefined,
    });
  }, [searchParams, displayAmount, urlSim, reset, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  const watchedValues = watch();

  // Determine local currency based on asset
  const detectedCurrency = detectCurrency(watchedValues.asset || initialAsset);
  const isINR = detectedCurrency === 'INR';
  const currencySymbol = isINR ? '₹' : '$';

  // Dynamic scenario text logic
  const currentScenario = ALL_SCENARIOS.find(s => s.uuid === scenarioUuid);
  const isScenarioMode = !!currentScenario;
  const isDaily = currentScenario?.name.toLowerCase().includes('daily') || currentScenario?.title.toLowerCase().includes('daily');

  // Detect if the scenario is framed in yearly terms so we can show helpful context
  const isYearlyContext = !!(
    currentScenario?.title.toLowerCase().includes('year') ||
    currentScenario?.title.toLowerCase().includes('/year') ||
    currentScenario?.title.toLowerCase().includes('annual')
  );

  const dynamicSentence = generateScenarioText(currentScenario, watchedValues.asset, simType);

  // The submit button is active when the relevant amount field is filled
  // for the active sim type, plus asset and start date are present.
  const canSubmit = !isPending
    && !!watchedValues.asset
    && !!watchedValues.start_date
    && (simType === 'lump_sum'
      ? (!!watchedValues.initial_amount && watchedValues.initial_amount > 0)
      : (!!watchedValues.monthly_investment && watchedValues.monthly_investment > 0)
    );

  const onSubmit = (data: FormData) => {
    const isValid = simType === 'lump_sum'
      ? (data.initial_amount && data.initial_amount > 0)
      : (data.monthly_investment && data.monthly_investment > 0);

    if (!isValid) {
      addToast(
        simType === 'lump_sum' ? `Please enter an initial investment amount in ${currencySymbol}.` : `Please enter a monthly investment amount in ${currencySymbol}.`,
        'error'
      );
      return;
    }

    // Convert to USD for the backend
    const initialUSD = data.initial_amount && isINR ? data.initial_amount / USD_TO_INR : data.initial_amount;
    const monthlyUSD = data.monthly_investment && isINR ? data.monthly_investment / USD_TO_INR : data.monthly_investment;

    runSimulation(
      {
        sim_type: simType,
        asset: data.asset,
        initial_amount: initialUSD,
        monthly_investment: monthlyUSD,
        start_date: data.start_date,
      },
      {
        onSuccess: (res) => {
          if (res.success && res.data) {
            const amountParam = simType === 'lump_sum' ? initialUSD : monthlyUSD;
            router.push(`/result/${res.data.result_id}?asset=${data.asset}&amount=${amountParam}&start=${data.start_date}&sim=${simType}`);
          } else {
            const errMsg = res.error instanceof Error ? res.error.message : String(res.error || 'Simulation failed. Please try again.');
            addToast(errMsg, 'error');
          }
        },
        onError: (err) => {
          const errMsg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
          addToast(errMsg, 'error');
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
            We will show you exactly what would have happened, in real dollars.
          </p>
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="custom-simulator-form"
          noValidate
          className="flex flex-col gap-6"
        >

          {/* ── Simulation Type Toggle ── */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/60">Simulation Type</p>
            <div className="grid grid-cols-2 gap-2 p-1 bg-card/50 border border-border rounded-xl">
              {(['lump_sum', 'dca'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  id={`sim-type-${type}`}
                  onClick={() => {
                    if (isScenarioMode) {
                      // Kicking user out of scenario mode completely to prevent mixing states
                      router.push(`/custom?sim=${type}`);
                      return;
                    }

                    setSimType(type);
                    // Clear the other field to avoid hidden validation errors
                    if (type === 'lump_sum') {
                      setValue('monthly_investment', undefined);
                    } else {
                      setValue('initial_amount', undefined);
                    }
                  }}
                  className={`
                    py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200
                    ${simType === type
                      ? 'bg-brand text-white shadow-md shadow-brand/30'
                      : 'text-foreground/40 hover:text-foreground'
                    }
                  `}
                >
                  {type === 'lump_sum' ? '💰 Lump Sum' : '📅 Monthly DCA'}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-foreground/30 font-medium uppercase tracking-tight">
              {simType === 'lump_sum' ? 'One-time investment at the start date' : 'Fixed monthly contribution over time'}
            </p>
          </div>

          {/* Asset Section */}
          {isScenarioMode ? (
            <div className="flex flex-col gap-2 p-4 bg-brand/10 border border-brand/20 rounded-2xl items-start">
              <span className="px-2 py-1 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded">Scenario Active</span>
              <p className="text-sm text-foreground/80 font-medium">
                You are currently exploring a predefined story.
              </p>
              <button 
                type="button" 
                onClick={() => router.push('/custom')}
                className="text-brand text-xs font-bold hover:underline"
              >
                Exit to Custom Build Mode →
              </button>
            </div>
          ) : (
            <FormField
              label="Asset"
              id="asset"
              hint="Select your targeted asset"
              error={errors.asset?.message}
            >
              <CustomAssetSelect
                value={watchedValues.asset}
                onChange={(val) => {
                  setValue('asset', val, { shouldValidate: true });
                  // Reset dependent amount state when asset changes to prevent stale data
                  setValue('initial_amount', undefined);
                  setValue('monthly_investment', undefined);
                }}
                hasError={!!errors.asset}
              />
            </FormField>
          )}

          {/* Amount — conditional on sim type */}
          {simType === 'lump_sum' ? (
            <FormField
              storyLabel={dynamicSentence || undefined}
              label={!dynamicSentence ? "Initial Amount" : undefined}
              id="initial_amount"
              hint={`Between ${currencySymbol}1 and ${currencySymbol}${isINR ? '830,000,000' : '10,000,000'}`}
              error={errors.initial_amount?.message}
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">{currencySymbol}</span>
                <input
                  id="initial_amount"
                  type="number"
                  min={1}
                  max={isINR ? 830000000 : 10000000}
                  step={1}
                  aria-describedby={errors.initial_amount ? 'initial_amount-error' : 'initial_amount-hint'}
                  aria-invalid={!!errors.initial_amount}
                  placeholder={dynamicSentence ? "Investment amount" : (isINR ? "83000" : "1000")}
                  className={`${inputClass(!!errors.initial_amount)} pl-8`}
                  {...register('initial_amount', { valueAsNumber: true })}
                />
              </div>
            </FormField>
          ) : (
            <FormField
              storyLabel={dynamicSentence || undefined}
              label={!dynamicSentence ? (isDaily ? "Daily spending" : "Monthly contribution") : undefined}
              id="monthly_investment"
              hint={`Amount added every month (between ${currencySymbol}1 and ${currencySymbol}${isINR ? '83,000,000' : '1,000,000'})`}
              error={errors.monthly_investment?.message}
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">{currencySymbol}</span>
                <input
                  id="monthly_investment"
                  type="number"
                  min={1}
                  max={isINR ? 83000000 : 1000000}
                  step={1}
                  aria-describedby={errors.monthly_investment ? 'monthly_investment-error' : 'monthly_investment-hint'}
                  aria-invalid={!!errors.monthly_investment}
                  placeholder={dynamicSentence ? (isDaily ? "Daily amount" : "Monthly amount") : (isINR ? "16600" : "200")}
                  className={`${inputClass(!!errors.monthly_investment)} pl-8`}
                  {...register('monthly_investment', { valueAsNumber: true })}
                />
              </div>
              {/* Yearly context note — shown when the scenario is framed in yearly terms */}
              {isYearlyContext && watchedValues.monthly_investment && watchedValues.monthly_investment > 0 && (
                <p className="text-[11px] text-brand/80 font-semibold mt-1.5">
                  {currencySymbol}{watchedValues.monthly_investment.toLocaleString()}/month
                  {' '}≈{' '}
                  {currencySymbol}{Math.round(watchedValues.monthly_investment * 12).toLocaleString()}/year
                </p>
              )}
            </FormField>
          )}

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
          {watchedValues.asset && watchedValues.start_date && (
            (simType === 'lump_sum' && watchedValues.initial_amount && watchedValues.initial_amount > 0) ||
            (simType === 'dca' && watchedValues.monthly_investment && watchedValues.monthly_investment > 0)
          ) && (
            <div
              aria-live="polite"
              className="rounded-xl border border-brand/25 bg-brand/10 px-5 py-4"
            >
              <p className="text-sm text-brand font-semibold mb-1">✅ Ready to simulate</p>
              <p className="text-xs text-foreground/60">
                {simType === 'lump_sum' ? (
                  <>Investing{' '}
                    <strong className="text-foreground/90">{currencySymbol}{watchedValues.initial_amount?.toLocaleString()}</strong>
                    {' '}in{' '}
                    <strong className="text-foreground/90">{ASSET_NAMES[watchedValues.asset || ''] || watchedValues.asset?.toUpperCase()}</strong>
                    {' '}starting{' '}
                    <strong className="text-foreground/90">{watchedValues.start_date}</strong>
                  </>
                ) : (
                  <>Investing{' '}
                    <strong className="text-foreground/90">
                      {currencySymbol}{watchedValues.monthly_investment?.toLocaleString()}/month
                      {isYearlyContext && ` (${currencySymbol}${Math.round((watchedValues.monthly_investment || 0) * 12).toLocaleString()}/year)`}
                    </strong>
                    {' '}in{' '}
                    <strong className="text-foreground/90">{ASSET_NAMES[watchedValues.asset || ''] || watchedValues.asset?.toUpperCase()}</strong>
                    {' '}starting{' '}
                    <strong className="text-foreground/90">{watchedValues.start_date}</strong>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            id="custom-simulator-submit"
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            className={`
              w-full flex items-center justify-center gap-3
              rounded-full py-4 font-bold text-base
              transition-all duration-300
              ${!canSubmit
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

export default function CustomSimulatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-brand" /></div>}>
      <CustomSimulatorForm />
    </Suspense>
  );
}
