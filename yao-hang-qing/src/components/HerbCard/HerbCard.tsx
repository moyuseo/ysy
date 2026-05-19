import { Link } from 'react-router-dom';
import type { Herb } from '../../types';
import { formatPrice, formatChange } from '../../utils/format';
import { CATEGORY_LABELS } from '../../data/categories';

interface HerbCardProps {
  herb: Herb;
  price?: number;
  trend?: 'up' | 'down' | 'stable';
  monthlyChange?: number;
}

export default function HerbCard({ herb, price, trend, monthlyChange }: HerbCardProps) {
  function getChangeColor(t: 'up' | 'down' | 'stable') {
    switch (t) {
      case 'up': return 'text-up';
      case 'down': return 'text-down';
      case 'stable': return 'text-stable';
    }
  }

  return (
    <Link
      to={`/herb/${herb.id}`}
      className="block rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-base font-medium text-text">{herb.name}</h3>
        {herb.alias.length > 0 && (
          <span className="text-xs text-text-secondary">{herb.alias[0]}</span>
        )}
        <span className="rounded bg-bg px-1.5 py-0.5 text-xs text-text-secondary">
          {CATEGORY_LABELS[herb.category]}
        </span>
      </div>

      {price !== undefined && (
        <div className="flex items-baseline gap-2">
          <span className="font-data text-lg font-semibold text-text">
            {formatPrice(price)}
          </span>
          {trend && monthlyChange !== undefined && (
            <span className={`font-data text-sm ${getChangeColor(trend)}`}>
              {formatChange(monthlyChange)}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
