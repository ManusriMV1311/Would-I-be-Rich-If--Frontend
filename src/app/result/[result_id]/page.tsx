'use client';

import { useSearchParams } from 'next/navigation';
import ResultView from '@/components/results/ResultView';
import { useCustomSimulation } from '@/hooks/useSimulation';
import { useEffect } from 'react';

export default function ResultPage() {
  const params = useSearchParams();

  const asset = params.get('asset');
  const amount = Number(params.get('amount'));
  const start = params.get('start');

  const { mutate, data, isPending, isError } = useCustomSimulation();

  useEffect(() => {
    if (asset && amount && start) {
      mutate({
        sim_type: 'lump_sum',
        asset,
        initial_amount: amount,
        start_date: start,
      });
    }
  }, [asset, amount, start, mutate]);

  if (!asset || !amount || !start) {
    return <div className="text-red-400 font-bold text-center mt-20">Simulation parameters missing from URL boundary!</div>;
  }

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