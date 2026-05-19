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
  specs?: { spec: string; history: PriceHistoryPoint[] }[];
  herbName: string;
}

const TIME_RANGES = [
  { key: '1m', label: '1月' },
  { key: '3m', label: '3月' },
  { key: '6m', label: '6月' },
  { key: '1y', label: '1年' },
  { key: 'all', label: '全部' },
];

const COLORS = ['#0F5132', '#DC2626', '#B45309', '#1565C0'];

export default function PriceChart({ history, specs, herbName }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState('1y');

  const filterByRange = (data: PriceHistoryPoint[]) => {
    if (timeRange === 'all') return data;
    const months = { '1m': 1, '3m': 3, '6m': 6, '1y': 12 }[timeRange] || 12;
    return data.slice(-months);
  };

  const filteredHistory = filterByRange(history);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border-light shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg font-semibold text-text">
          {herbName} 价格走势
        </h3>
        <div className="flex gap-2 bg-bg-alt p-1 rounded-xl">
          {TIME_RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setTimeRange(r.key)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-300 ${
                timeRange === r.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredHistory}>
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'system-ui' }}
            tickFormatter={(v: string) => v.slice(5)}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'system-ui' }}
            tickFormatter={(v: number) => `¥${v}`}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              padding: '12px',
            }}
            formatter={(value: unknown) => [`¥${value}`, herbName]}
            labelFormatter={(label: unknown) => `日期: ${String(label)}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={COLORS[0]}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS[0], strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 6, fill: COLORS[0], strokeWidth: 2, stroke: '#FFFFFF' }}
            name={herbName}
          />
          {specs?.map((s, i) => (
            <Line
              key={s.spec}
              type="monotone"
              data={filterByRange(s.history)}
              dataKey="price"
              stroke={COLORS[(i + 1) % COLORS.length]}
              strokeWidth={2}
              dot={false}
              name={s.spec}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
