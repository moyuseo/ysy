import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { marketPrices, originPrices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import { CATEGORIES, MARKETS } from '../../utils/constants';
import { formatPrice, formatChange } from '../../utils/format';

const PAGE_SIZE = 20;

const herbCategoryMap = new Map(herbs.map(h => [h.id, h.category]));

export default function PricePage() {
  const [activeTab, setActiveTab] = useState<'market' | 'origin'>('market');
  const [category, setCategory] = useState('');
  const [market, setMarket] = useState('');
  const [trendFilter, setTrendFilter] = useState<'all' | 'up' | 'down'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const basePrices = useMemo(() => {
    return activeTab === 'market' ? marketPrices : originPrices;
  }, [activeTab]);

  const filteredPrices = useMemo(() => {
    let result = basePrices;

    if (category) {
      result = result.filter(p => herbCategoryMap.get(p.herbId) === category);
    }

    if (market) {
      if (activeTab === 'origin') {
        result = result.filter(p => p.origin === market);
      } else {
        const marketLabel = MARKETS.find(m => m.key === market)?.label;
        if (marketLabel) {
          result = result.filter(p => p.market.includes(marketLabel));
        }
      }
    }

    if (trendFilter === 'up') {
      result = result.filter(p => p.trend === 'up');
    } else if (trendFilter === 'down') {
      result = result.filter(p => p.trend === 'down');
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.herbName.toLowerCase().includes(query));
    }

    return result;
  }, [basePrices, category, market, trendFilter, searchQuery, activeTab]);

  const pagedPrices = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPrices.slice(start, start + PAGE_SIZE);
  }, [filteredPrices, currentPage]);

  const totalPages = Math.ceil(filteredPrices.length / PAGE_SIZE);

  const origins = useMemo(() => {
    return [...new Set(originPrices.map(p => p.origin))].sort();
  }, []);

  const handleTabChange = (tab: 'market' | 'origin') => {
    setActiveTab(tab);
    setCategory('');
    setMarket('');
    setTrendFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl text-text">行情价格</h1>
        <p className="text-sm text-text-secondary mt-1">实时市场价格与产地行情</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none" />
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
            className="appearance-none border border-border rounded pl-7 pr-6 py-1.5 text-sm bg-surface-raised text-text cursor-pointer hover:border-accent transition-colors"
          >
            <option value="">全部品类</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={market}
            onChange={e => { setMarket(e.target.value); setCurrentPage(1); }}
            className="appearance-none border border-border rounded px-3 py-1.5 text-sm bg-surface-raised text-text cursor-pointer hover:border-accent transition-colors"
          >
            <option value="">{activeTab === 'origin' ? '全部产地' : '全部市场'}</option>
            {activeTab === 'origin'
              ? origins.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))
              : MARKETS.map(m => (
                  <option key={m.key} value={m.key}>{m.label}</option>
                ))
            }
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          {([
            { key: 'all', label: '全部' },
            { key: 'up', label: '上涨' },
            { key: 'down', label: '下跌' },
          ] as const).map(item => {
            const active = trendFilter === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setTrendFilter(item.key); setCurrentPage(1); }}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  active
                    ? item.key === 'up'
                      ? 'bg-rise-muted text-rise border-rise'
                      : item.key === 'down'
                      ? 'bg-fall-muted text-fall border-fall'
                      : 'bg-accent text-surface-raised border-accent'
                    : 'bg-surface-raised text-text-secondary border-border hover:border-accent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索药材名称"
            className="border border-border rounded pl-8 pr-3 py-1.5 text-sm bg-surface-raised text-text placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors w-48"
          />
        </div>
      </div>

      <div className="flex border-b border-border mb-0">
        <button
          onClick={() => handleTabChange('market')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'market'
              ? 'text-accent border-b-2 border-accent'
              : 'text-text-secondary hover:text-accent'
          }`}
        >
          市场价格
        </button>
        <button
          onClick={() => handleTabChange('origin')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'origin'
              ? 'text-accent border-b-2 border-accent'
              : 'text-text-secondary hover:text-accent'
          }`}
        >
          产地价格
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface">
              <th className="px-3 py-2.5 text-left font-medium">品种</th>
              <th className="px-3 py-2.5 text-left font-medium">规格</th>
              <th className="px-3 py-2.5 text-left font-medium">{activeTab === 'origin' ? '产地' : '市场'}</th>
              <th className="px-3 py-2.5 text-right font-medium">今日价</th>
              <th className="px-3 py-2.5 text-right font-medium">月涨跌</th>
              <th className="px-3 py-2.5 text-center font-medium">走势</th>
            </tr>
          </thead>
          <tbody>
            {pagedPrices.map(price => (
              <tr
                key={price.id}
                className="border-b border-border-subtle hover:bg-accent-muted transition-colors"
              >
                <td className="px-3 py-2.5">
                  <Link
                    to={`/herb/${price.herbId}`}
                    className="text-accent hover:underline font-medium"
                  >
                    {price.herbName}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-text-secondary">{price.spec}</td>
                <td className="px-3 py-2.5 text-text-secondary">
                  {activeTab === 'origin' ? price.origin : price.market}
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-medium text-text">
                  {formatPrice(price.currentPrice)}
                </td>
                <td
                  className={`px-3 py-2.5 text-right font-mono font-medium ${
                    price.monthlyChange > 0
                      ? 'text-rise'
                      : price.monthlyChange < 0
                      ? 'text-fall'
                      : 'text-text-secondary'
                  }`}
                >
                  {formatChange(price.monthlyChange)}
                </td>
                <td className="px-3 py-2.5 text-center">
                  {price.trend === 'up' && <span className="inline-block w-2 h-2 rounded-full bg-rise" />}
                  {price.trend === 'down' && <span className="inline-block w-2 h-2 rounded-full bg-fall" />}
                  {price.trend === 'stable' && <span className="inline-block w-2 h-2 rounded-full bg-text-tertiary" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-muted transition-colors"
          >
            上一页
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let page: number;
            if (totalPages <= 5) {
              page = i + 1;
            } else if (currentPage <= 3) {
              page = i + 1;
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i;
            } else {
              page = currentPage - 2 + i;
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                  currentPage === page
                    ? 'bg-accent text-surface-raised border-accent'
                    : 'border-border hover:bg-accent-muted'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-muted transition-colors"
          >
            下一页
          </button>
          <span className="ml-3 text-xs text-text-secondary">
            共 {filteredPrices.length} 条
          </span>
        </div>
      )}
    </div>
  );
}
