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
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary-50 text-text">
            <th className="px-3 py-3 text-left font-semibold font-serif">品种</th>
            <th className="px-3 py-3 text-left font-semibold font-serif">规格</th>
            {showMarket && <th className="px-3 py-3 text-left font-semibold font-serif">市场</th>}
            {showOrigin && <th className="px-3 py-3 text-left font-semibold font-serif">产地</th>}
            <th className="px-3 py-3 text-right font-semibold font-serif">今日价</th>
            <th className="px-3 py-3 text-right font-semibold font-serif">月涨跌</th>
            <th className="px-3 py-3 text-center font-semibold font-serif">走势</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, idx) => (
            <tr
              key={price.id}
              className={`border-t border-border-light hover:bg-primary-50/50 transition-colors ${
                idx % 2 === 1 ? 'bg-bg-alt/30' : ''
              }`}
            >
              <td className="px-3 py-3.5">
                <Link
                  to={`/herb/${price.herbId}`}
                  className="text-text hover:text-primary font-medium transition-colors"
                >
                  {price.herbName}
                </Link>
              </td>
              <td className="px-3 py-3.5 text-text-muted">{price.spec}</td>
              {showMarket && <td className="px-3 py-3.5 text-text-muted">{price.market}</td>}
              {showOrigin && <td className="px-3 py-3.5 text-text-muted">{price.origin}</td>}
              <td className="px-3 py-3.5 text-right font-mono font-semibold text-text">
                {formatPrice(price.currentPrice)}
              </td>
              <td
                className={`px-3 py-3.5 text-right font-mono font-semibold ${
                  price.monthlyChange > 0
                    ? 'text-rise'
                    : price.monthlyChange < 0
                    ? 'text-fall'
                    : 'text-text-muted'
                }`}
              >
                {price.monthlyChange > 0 ? '+' : ''}{formatChange(price.monthlyChange)}
              </td>
              <td className="px-3 py-3.5 text-center">
                {price.trend === 'up' && <TrendingUp className="inline w-4 h-4 text-rise" />}
                {price.trend === 'down' && <TrendingDown className="inline w-4 h-4 text-fall" />}
                {price.trend === 'stable' && <Minus className="inline w-4 h-4 text-text-muted" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
