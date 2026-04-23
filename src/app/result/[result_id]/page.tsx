'use client';

import { useSearchParams } from 'next/navigation';
import ResultView from '@/components/results/ResultView';
import { useCustomSimulation } from '@/hooks/useSimulation';
import { useEffect } from 'react';

export default function ResultPage() {
  const params = useSearchParams();

  const asset = params.get('asset') || 'BTC-USD';
  const amount = Number(params.get('amount')) || 500;
  const start = params.get('start') || '2015-01-01';

  const { mutate, data, isPending, isError } = useCustomSimulation();

  useEffect(() => {
    mutate({
      sim_type: 'lump_sum',
      asset,
      initial_amount: amount,
      start_date: start,
    });
  }, [asset, amount, start, mutate]);

  if (isPending) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-foreground font-medium">
        Running simulation...
      </div>
    );
  }

  if (isError || !data?.data) {
    return <div className="text-red-400 text-center mt-20">Failed to load result</div>;
  }

  return <ResultView data={data.data} />;
}