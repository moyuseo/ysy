import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatPrice, formatDate } from '../../utils/format';

interface PriceChartProps {
  history: { date: string; price: number }[];
  title?: string;
}

type Range = '1m' | '3m' | '6m' | '1y' | 'all';

const RANGE_OPTIONS: { key: Range; label: string }[] = [
  { key: '1m', label: '1月' },
  { key: '3m', label: '3月' },
  { key: '6m', label: '6月' },
  { key: '1y', label: '1年' },
  { key: 'all', label: '全部' },
];

function filterByRange(history: { date: string; price: number }[], range: Range) {
  if (range === 'all') return history;
  const now = new Date();
  const days: Record<Range, number> = { '1m': 30, '3m': 90, '6m': 180, '1y': 365, all: 0 };
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days[range]);
  return history.filter((h) => new Date(h.date) >= cutoff);
}

export default function PriceChart({ history, title }: PriceChartProps) {
  const [range, setRange] = useState<Range>('6m');

  const data = useMemo(() => filterByRange(history, range), [history, range]);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        {title && <h3 className="text-sm font-medium text-text">{title}</h3>}
        <div className="flex items-center gap-1">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setRange(opt.key)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                range === opt.key
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text hover:bg-bg'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 11, fill: '#666' }}
              axisLine={{ stroke: '#E0E0E0' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `¥${v}`}
              tick={{ fontSize: 11, fill: '#666' }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              formatter={(value: unknown) => [formatPrice(Number(value)), '价格']}
              labelFormatter={(label: unknown) => `日期: ${String(label)}`}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #E0E0E0',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1B5E20"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#1B5E20' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
