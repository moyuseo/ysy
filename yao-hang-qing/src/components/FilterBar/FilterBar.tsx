import { Search } from 'lucide-react';

interface FilterGroup {
  key: string;
  label: string;
}

interface FilterBarProps {
  categories: FilterGroup[];
  selectedCategory: string;
  onCategoryChange: (key: string) => void;
  markets?: FilterGroup[];
  selectedMarket?: string;
  onMarketChange?: (key: string) => void;
  trendFilter?: 'all' | 'up' | 'down' | 'stable';
  onTrendFilterChange?: (value: 'all' | 'up' | 'down' | 'stable') => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const TREND_OPTIONS: { key: 'all' | 'up' | 'down' | 'stable'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'up', label: '上涨' },
  { key: 'down', label: '下跌' },
  { key: 'stable', label: '持平' },
];

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  markets,
  selectedMarket,
  onMarketChange,
  trendFilter,
  onTrendFilterChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-text outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
      >
        {categories.map((cat) => (
          <option key={cat.key} value={cat.key}>
            {cat.label}
          </option>
        ))}
      </select>

      {markets && onMarketChange && (
        <select
          value={selectedMarket ?? ''}
          onChange={(e) => onMarketChange(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-text outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
        >
          {markets.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>
      )}

      {trendFilter !== undefined && onTrendFilterChange && (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
          {TREND_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onTrendFilterChange(opt.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                trendFilter === opt.key
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {searchQuery !== undefined && onSearchChange && (
        <div className="flex items-center rounded-lg border border-border bg-card px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-shadow">
          <Search className="h-3.5 w-3.5 text-text-secondary shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索品种"
            className="ml-2 w-28 bg-transparent text-sm outline-none text-text placeholder:text-text-secondary"
          />
        </div>
      )}
    </div>
  );
}
