import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { marketPrices, originPrices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import { CATEGORIES, MARKETS } from '../../utils/constants';
import { formatPrice, formatChange } from '../../utils/format';

const PAGE_SIZE = 20;

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
      result = result.filter(p => {
        const herb = herbs.find(h => h.id === p.herbId);
        return herb?.category === category;
      });
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="section-title">行情价格</h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-forest-muted text-forest text-xs rounded-full">
            <RefreshCw className="w-3 h-3" />
            <span>实时更新</span>
          </div>
        </div>
        <p className="section-subtitle">实时市场价格与产地行情，精准把握药材走势</p>
      </div>

      <div className="flex border-b border-cream-dark mb-8">
        <button
          onClick={() => handleTabChange('market')}
          className={`tab-item ${activeTab === 'market' ? 'active' : ''}`}
        >
          市场价格
        </button>
        <button
          onClick={() => handleTabChange('origin')}
          className={`tab-item ${activeTab === 'origin' ? 'active' : ''}`}
        >
          产地价格
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted pointer-events-none" />
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
            className="select-field pl-9"
          >
            <option value="">全部品类</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        <select
          value={market}
          onChange={e => { setMarket(e.target.value); setCurrentPage(1); }}
          className="select-field"
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

        <div className="flex items-center gap-2">
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
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  active
                    ? item.key === 'up'
                      ? 'bg-coral text-white'
                      : item.key === 'down'
                      ? 'bg-forest text-white'
                      : 'bg-forest text-white'
                    : 'bg-cream text-slate-light border border-cream-dark hover:border-forest hover:text-forest'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索药材名称"
            className="input-field pl-10 w-60"
          />
        </div>
      </div>

      <div className="card-flat overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th className="px-5 py-4">品种</th>
                <th className="px-5 py-4">规格</th>
                <th className="px-5 py-4">{activeTab === 'origin' ? '产地' : '市场'}</th>
                <th className="px-5 py-4 text-right">今日价</th>
                <th className="px-5 py-4 text-right">月涨跌</th>
                <th className="px-5 py-4 text-center">走势</th>
              </tr>
            </thead>
            <tbody>
              {pagedPrices.map((price, idx) => (
                <tr key={price.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.03}s` }}>
                  <td className="px-5 py-4">
                    <Link
                      to={`/herb/${price.herbId}`}
                      className="text-forest hover:text-forest-light font-semibold transition-colors"
                    >
                      {price.herbName}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate-light">{price.spec}</td>
                  <td className="px-5 py-4 text-slate-light">
                    {activeTab === 'origin' ? price.origin : price.market}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="price-text text-slate">{formatPrice(price.currentPrice)}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={`change-tag ${price.monthlyChange > 0 ? 'up' : price.monthlyChange < 0 ? 'down' : ''}`}>
                      {formatChange(price.monthlyChange)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {price.trend === 'up' && (
                      <span className="badge badge-rise">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {price.trend === 'down' && (
                      <span className="badge badge-fall">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {price.trend === 'stable' && (
                      <span className="badge badge-neutral">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-cream-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-forest hover:text-forest transition-colors bg-white"
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
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                  currentPage === page
                    ? 'bg-forest text-white border-forest'
                    : 'border-cream-dark hover:border-forest hover:text-forest bg-white'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-cream-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-forest hover:text-forest transition-colors bg-white"
          >
            下一页
          </button>
          <span className="ml-4 text-sm text-slate-muted">
            共 <span className="font-semibold text-slate">{filteredPrices.length}</span> 条
          </span>
        </div>
      )}
    </div>
  );
}
