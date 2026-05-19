import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PriceHistoryPoint } from '../../types';

interface PriceChartProps {
  history: PriceHistoryPoint[];
  herbName: string;
}

const TIME_RANGES = [
  { key: '1m', label: '1月' },
  { key: '3m', label: '3月' },
  { key: '6m', label: '6月' },
  { key: '1y', label: '1年' },
  { key: 'all', label: '全部' },
];

export default function PriceChart({ history, herbName }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState('1y');

  const filterByRange = (data: PriceHistoryPoint[]) => {
    if (timeRange === 'all') return data;
    const months = { '1m': 1, '3m': 3, '6m': 6, '1y': 12 }[timeRange] || 12;
    return data.slice(-months);
  };

  const filteredHistory = filterByRange(history);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-secondary">
          {herbName} 价格走势
        </h3>
        <div className="flex gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setTimeRange(r.key)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                timeRange === r.key
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-accent-muted'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={filteredHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#737373' }}
            tickFormatter={(v: string) => v.slice(5)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#737373' }}
            tickFormatter={(v: number) => `¥${v}`}
          />
          <Tooltip
            formatter={(value: unknown) => [`¥${value}`, herbName]}
            labelFormatter={(label: unknown) => `日期: ${String(label)}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#059669"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name={herbName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
