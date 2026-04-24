'use client';

import { useSearchParams } from 'next/navigation';
import ResultView from '@/components/results/ResultView';
import { useCustomSimulation } from '@/hooks/useSimulation';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

function ResultContent() {
  const params = useSearchParams();
  const asset = params.get('asset');
  const amount = Number(params.get('amount'));
  const start = params.get('start');
  const simType = (params.get('sim') === 'dca' ? 'dca' : 'lump_sum') as 'lump_sum' | 'dca';

  const { mutate, data, isPending, isError } = useCustomSimulation();

  // Cold-start UX: show extra message after 3 seconds of loading
  const [isSlow, setIsSlow] = useState(false);
  useEffect(() => {
    if (!isPending) {
      setIsSlow(false);
      return;
    }
    const timer = setTimeout(() => setIsSlow(true), 3000);
    return () => clearTimeout(timer);
  }, [isPending]);

  useEffect(() => {
    if (asset && amount && start) {
      mutate({
        sim_type: simType,
        asset,
        initial_amount: simType === 'lump_sum' ? amount : undefined,
        monthly_investment: simType === 'dca' ? amount : undefined,
        start_date: start,
      });
    }
  }, [asset, amount, start, simType, mutate]);

  if (!asset || !amount || !start) {
    return (
      <div className="text-red-400 font-bold text-center mt-20 px-4">
        ⚠️ Simulation parameters missing from URL. Please{' '}
        <a href="/custom" className="underline text-brand">build a new simulation</a>.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4">
        <Loader2 size={32} className="animate-spin text-brand" aria-label="Loading" />
        <p className="text-foreground/70 font-medium text-sm">
          {isSlow
            ? 'Waking up the server... one moment ☕'
            : 'Running simulation...'}
        </p>
        {isSlow && (
          <p className="text-foreground/40 text-xs max-w-xs text-center">
            Free-tier servers sometimes take 20–30 seconds to wake up. Hang tight — it's worth the wait.
          </p>
        )}
      </div>
    );
  }

  if (isError || !data?.success || !data?.data) {
    const errMsg = data?.error instanceof Error
      ? data.error.message
      : typeof data?.error === 'string'
        ? data.error
        : 'The simulation failed — please check the ticker and try again.';
    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-20 px-4 text-center">
        <p className="text-red-400 font-bold text-lg">Simulation Failed</p>
        <p className="text-foreground/60 text-sm max-w-sm">{errMsg}</p>
        <a href="/custom" className="text-brand underline font-medium text-sm">
          ← Try a different asset or date
        </a>
      </div>
    );
  }

  return <ResultView data={data.data} />;
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[60vh] items-center justify-center gap-3">
        <Loader2 size={28} className="animate-spin text-brand" />
        <span className="text-foreground/70 font-medium text-sm">Loading result...</span>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}