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
          <tr className="bg-jade-muted">
            <th className="py-3 px-4 font-medium">品种</th>
            <th className="py-3 px-4 font-medium">规格</th>
            {showMarket && <th className="py-3 px-4 font-medium">市场</th>}
            {showOrigin && <th className="py-3 px-4 font-medium">产地</th>}
            <th className="py-3 px-4 font-medium text-right">今日价</th>
            <th className="py-3 px-4 font-medium text-right">月涨跌</th>
            <th className="py-3 px-4 font-medium text-center">走势</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr
              key={price.id}
              className="border-b border-paper-dark hover:bg-jade-muted/30 transition-colors"
            >
              <td className="py-3 px-4">
                <Link
                  to={`/herb/${price.herbId}`}
                  className="text-jade hover:underline font-medium font-serif"
                >
                  {price.herbName}
                </Link>
              </td>
              <td className="py-3 px-4 text-ink-light">{price.spec}</td>
              {showMarket && <td className="py-3 px-4 text-ink-light">{price.market}</td>}
              {showOrigin && <td className="py-3 px-4 text-ink-light">{price.origin}</td>}
              <td className="py-3 px-4 text-right font-mono font-semibold">
                {formatPrice(price.currentPrice)}
              </td>
              <td
                className={`py-3 px-4 text-right font-mono font-semibold ${
                  price.monthlyChange > 0
                    ? 'text-cinnabar'
                    : price.monthlyChange < 0
                    ? 'text-jade'
                    : 'text-ink-muted'
                }`}
              >
                {formatChange(price.monthlyChange)}
              </td>
              <td className="py-3 px-4 text-center">
                {price.trend === 'up' && <span className="seal seal-rise"><TrendingUp className="w-3 h-3" /></span>}
                {price.trend === 'down' && <span className="seal seal-fall"><TrendingDown className="w-3 h-3" /></span>}
                {price.trend === 'stable' && <Minus className="inline w-4 h-4 text-ink-muted" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
