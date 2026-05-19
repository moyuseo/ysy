import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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

const COLORS = ['#1B5E20', '#D32F2F', '#C9A96E', '#1565C0'];

export default function PriceChart({ history, specs, herbName }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState('1y');

  const filterByRange = (data: PriceHistoryPoint[]) => {
    if (timeRange === 'all') return data;
    const months = { '1m': 1, '3m': 3, '6m': 6, '1y': 12 }[timeRange] || 12;
    return data.slice(-months);
  };

  const filteredHistory = filterByRange(history);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-secondary">
          {herbName} 价格走势
        </h3>
        <div className="flex gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setTimeRange(r.key)}
              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                timeRange === r.key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={filteredHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#666' }}
            tickFormatter={(v: string) => v.slice(5)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#666' }}
            tickFormatter={(v: number) => `¥${v}`}
          />
          <Tooltip
            formatter={(value: number) => [`¥${value}`, herbName]}
            labelFormatter={(label: string) => `日期: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={COLORS[0]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name={herbName}
          />
          {specs?.map((s, i) => (
            <Line
              key={s.spec}
              type="monotone"
              data={filterByRange(s.history)}
              dataKey="price"
              stroke={COLORS[(i + 1) % COLORS.length]}
              strokeWidth={1.5}
              dot={false}
              name={s.spec}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
