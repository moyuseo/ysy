import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Price } from '../../types';
import { formatPrice, formatChange } from '../../utils/format';
import { Link } from 'react-router-dom';

interface PriceTableProps {
  prices: Price[];
  showMarket?: boolean;
  showOrigin?: boolean;
}

export default function PriceTable({ prices, showMarket = true, showOrigin = true }: PriceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="px-3 py-2.5 text-left font-medium">品种</th>
            <th className="px-3 py-2.5 text-left font-medium">规格</th>
            {showMarket && <th className="px-3 py-2.5 text-left font-medium">市场</th>}
            {showOrigin && <th className="px-3 py-2.5 text-left font-medium">产地</th>}
            <th className="px-3 py-2.5 text-right font-medium">今日价</th>
            <th className="px-3 py-2.5 text-right font-medium">月涨跌</th>
            <th className="px-3 py-2.5 text-center font-medium">走势</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, idx) => (
            <tr
              key={price.id}
              className={`border-b border-border/50 hover:bg-fall-bg/50 transition-colors ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <td className="px-3 py-2.5">
                <Link
                  to={`/herb/${price.herbId}`}
                  className="text-primary hover:underline font-medium"
                >
                  {price.herbName}
                </Link>
              </td>
              <td className="px-3 py-2.5 text-text-secondary">{price.spec}</td>
              {showMarket && <td className="px-3 py-2.5 text-text-secondary">{price.market}</td>}
              {showOrigin && <td className="px-3 py-2.5 text-text-secondary">{price.origin}</td>}
              <td className="px-3 py-2.5 text-right font-mono font-medium">
                {formatPrice(price.currentPrice)}
              </td>
              <td
                className={`px-3 py-2.5 text-right font-mono font-medium ${
                  price.monthlyChange > 0
                    ? 'text-red-600'
                    : price.monthlyChange < 0
                    ? 'text-green-600'
                    : 'text-text-secondary'
                }`}
              >
                {formatChange(price.monthlyChange)}
              </td>
              <td className="px-3 py-2.5 text-center">
                {price.trend === 'up' && <TrendingUp className="inline w-4 h-4 text-red-600" />}
                {price.trend === 'down' && <TrendingDown className="inline w-4 h-4 text-green-600" />}
                {price.trend === 'stable' && <Minus className="inline w-4 h-4 text-text-secondary" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
