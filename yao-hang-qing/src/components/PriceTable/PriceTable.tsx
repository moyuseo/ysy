import { useNavigate } from 'react-router-dom';
import type { Price } from '../../types';
import { formatPrice, formatChange, getTrendIcon } from '../../utils/format';

interface PriceTableProps {
  prices: Price[];
}

export default function PriceTable({ prices }: PriceTableProps) {
  const navigate = useNavigate();

  function getChangeColor(trend: 'up' | 'down' | 'stable') {
    switch (trend) {
      case 'up': return 'text-up';
      case 'down': return 'text-down';
      case 'stable': return 'text-stable';
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="px-4 py-3 text-left font-medium">品种</th>
            <th className="px-4 py-3 text-left font-medium">规格</th>
            <th className="px-4 py-3 text-left font-medium">市场/产地</th>
            <th className="px-4 py-3 text-right font-medium">今日价</th>
            <th className="px-4 py-3 text-right font-medium">月涨跌</th>
            <th className="px-4 py-3 text-center font-medium">走势</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, idx) => (
            <tr
              key={p.id}
              className={`${idx % 2 === 0 ? 'bg-card' : 'bg-[#FAFAF5]'} hover:bg-bg transition-colors`}
            >
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => navigate(`/herb/${p.herbId}`)}
                  className="text-primary hover:underline font-medium"
                >
                  {p.herbName}
                </button>
              </td>
              <td className="px-4 py-3 text-text-secondary">{p.spec}</td>
              <td className="px-4 py-3 text-text-secondary">{p.market}/{p.origin}</td>
              <td className="px-4 py-3 text-right font-data text-text">{formatPrice(p.currentPrice)}</td>
              <td className={`px-4 py-3 text-right font-data ${getChangeColor(p.trend)}`}>
                {formatChange(p.monthlyChange)}
              </td>
              <td className={`px-4 py-3 text-center ${getChangeColor(p.trend)}`}>
                {getTrendIcon(p.trend)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
