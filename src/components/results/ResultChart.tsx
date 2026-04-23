'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ChartDataPoint } from '@/types/scenario.types';
import { formatCurrency } from '@/utils/formatCurrency';

interface ResultChartProps {
  chartData: ChartDataPoint[];
}

interface TooltipPayloadEntry {
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

// Custom tooltip for accessibility + style
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = typeof payload[0].value === 'number' ? payload[0].value : 0;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-foreground/50 mb-1">{label}</p>
      <p className="text-emerald-400 font-bold text-base">
        {formatCurrency(val)}
      </p>
    </div>
  );
}

export default function ResultChart({ chartData }: ResultChartProps) {
  const startValue = chartData[0]?.value ?? 0;

  return (
    <div
      className="rounded-2xl border border-border bg-card p-4 sm:p-6"
      role="img"
      aria-label="Investment growth chart over time"
    >
      <p className="text-sm font-semibold text-foreground/50 mb-6 uppercase tracking-widest">
        📈 Growth Over Time
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--foreground)" strokeOpacity={0.1} vertical={false} />

          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--foreground)', fontWeight: 600, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatCurrency(v, true)}
            tick={{ fill: 'var(--foreground)', fontWeight: 600, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={80}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Baseline: initial investment */}
          <ReferenceLine
            y={startValue}
            stroke="#d97706"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ value: 'Invested', fill: '#d97706', fontSize: 10, position: 'top', offset: 8 }}
          />

          <Line
            type="monotoneX"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#34d399', stroke: '#0f172a', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
