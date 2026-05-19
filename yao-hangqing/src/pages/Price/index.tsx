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
    <div className="container py-10">
      <div className="mb-10 anim-up">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="section-title">行情价格</h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            <RefreshCw className="w-3 h-3" />
            <span>实时更新</span>
          </div>
        </div>
        <p className="text-slate-500">实时市场价格与产地行情，精准把握药材走势</p>
      </div>

      <div className="tab-bar mb-8 anim-up d1">
        <button
          onClick={() => handleTabChange('market')}
          className={`tab ${activeTab === 'market' ? 'on' : ''}`}
        >
          市场价格
        </button>
        <button
          onClick={() => handleTabChange('origin')}
          className={`tab ${activeTab === 'origin' ? 'on' : ''}`}
        >
          产地价格
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 items-center anim-up d2">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
            className="sel pl-9"
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
          className="sel"
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
                className={`btn ${active ? 'btn-p' : 'btn-s'}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索药材名称"
            className="inp pl-10 w-60"
          />
        </div>
      </div>

      <div className="card overflow-hidden anim-up d3">
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead>
              <tr>
                <th>品种</th>
                <th>规格</th>
                <th>{activeTab === 'origin' ? '产地' : '市场'}</th>
                <th className="text-right">今日价</th>
                <th className="text-right">月涨跌</th>
                <th className="text-center">走势</th>
              </tr>
            </thead>
            <tbody>
              {pagedPrices.map((price, idx) => (
                <tr key={price.id} className="anim-fade" style={{ animationDelay: `${idx * 0.03}s` }}>
                  <td>
                    <Link
                      to={`/herb/${price.herbId}`}
                      className="text-green-700 font-semibold hover:text-green-600 transition-colors"
                    >
                      {price.herbName}
                    </Link>
                  </td>
                  <td className="text-slate-500">{price.spec}</td>
                  <td className="text-slate-500">
                    {activeTab === 'origin' ? price.origin : price.market}
                  </td>
                  <td className="text-right">
                    <span className={`prc ${price.monthlyChange > 0 ? 'prc-up' : price.monthlyChange < 0 ? 'prc-down' : 'text-slate-800'}`}>
                      {formatPrice(price.currentPrice)}
                    </span>
                  </td>
                  <td className="text-right">
                    <span className={`chg ${price.monthlyChange > 0 ? 'chg-up' : price.monthlyChange < 0 ? 'chg-down' : ''}`}>
                      {formatChange(price.monthlyChange)}
                    </span>
                  </td>
                  <td className="text-center">
                    {price.trend === 'up' && (
                      <span className="badge badge-up">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {price.trend === 'down' && (
                      <span className="badge badge-down">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {price.trend === 'stable' && (
                      <span className="badge badge-flat">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 anim-up d4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn btn-s disabled:opacity-40 disabled:cursor-not-allowed"
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
                className={`btn ${currentPage === page ? 'btn-p' : 'btn-s'}`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-s disabled:opacity-40 disabled:cursor-not-allowed"
          >
            下一页
          </button>
          <span className="ml-4 text-sm text-slate-400">
            共 <span className="font-semibold text-slate-700">{filteredPrices.length}</span> 条
          </span>
        </div>
      )}
    </div>
  );
}
