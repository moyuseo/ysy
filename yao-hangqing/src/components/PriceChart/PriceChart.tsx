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
        <h3 className="text-sm font-medium text-ink-light font-serif">
          {herbName} 价格走势
        </h3>
        <div className="flex gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setTimeRange(r.key)}
              className={`px-3 py-1.5 text-xs rounded transition-all ${
                timeRange === r.key
                  ? 'bg-jade text-white'
                  : 'text-ink-light hover:bg-jade-muted'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={filteredHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDE9E0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#5A5A5A' }}
            tickFormatter={(v: string) => v.slice(5)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#5A5A5A' }}
            tickFormatter={(v: number) => `¥${v}`}
          />
          <Tooltip
            formatter={(value: unknown) => [`¥${value}`, herbName]}
            labelFormatter={(label: unknown) => `日期: ${String(label)}`}
            contentStyle={{
              backgroundColor: '#F5F3EE',
              border: '1px solid #EDE9E0',
              borderRadius: '8px'
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2D5A4A"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#2D5A4A' }}
            name={herbName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
