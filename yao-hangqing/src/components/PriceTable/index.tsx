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
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 font-medium">品种</th>
            <th className="py-3 pr-4 font-medium">规格</th>
            {showMarket && <th className="py-3 pr-4 font-medium">市场</th>}
            {showOrigin && <th className="py-3 pr-4 font-medium">产地</th>}
            <th className="py-3 pr-4 font-medium text-right">今日价</th>
            <th className="py-3 pr-4 font-medium text-right">月涨跌</th>
            <th className="py-3 font-medium text-center">走势</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr
              key={price.id}
              className="border-b border-border-subtle hover:bg-accent-muted transition-colors"
            >
              <td className="py-3 pr-4">
                <Link
                  to={`/herb/${price.herbId}`}
                  className="text-accent hover:underline font-medium"
                >
                  {price.herbName}
                </Link>
              </td>
              <td className="py-3 pr-4 text-text-secondary">{price.spec}</td>
              {showMarket && <td className="py-3 pr-4 text-text-secondary">{price.market}</td>}
              {showOrigin && <td className="py-3 pr-4 text-text-secondary">{price.origin}</td>}
              <td className="py-3 pr-4 text-right font-mono font-medium">
                {formatPrice(price.currentPrice)}
              </td>
              <td
                className={`py-3 pr-4 text-right font-mono font-medium ${
                  price.monthlyChange > 0
                    ? 'text-rise'
                    : price.monthlyChange < 0
                    ? 'text-fall'
                    : 'text-text-tertiary'
                }`}
              >
                {formatChange(price.monthlyChange)}
              </td>
              <td className="py-3 text-center">
                {price.trend === 'up' && <TrendingUp className="inline w-4 h-4 text-rise" />}
                {price.trend === 'down' && <TrendingDown className="inline w-4 h-4 text-fall" />}
                {price.trend === 'stable' && <Minus className="inline w-4 h-4 text-text-tertiary" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
