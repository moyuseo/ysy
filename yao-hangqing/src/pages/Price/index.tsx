import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { marketPrices, originPrices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import { CATEGORIES, MARKETS } from '../../utils/constants';
import PriceTable from '../../components/PriceTable/PriceTable';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';

const TABS = [
  { key: 'market', label: '市场价格' },
  { key: 'origin', label: '产地价格' },
  { key: 'rank', label: '涨跌排行' },
];

const PAGE_SIZE = 20;

const herbCategoryMap = new Map(herbs.map(h => [h.id, h.category]));

const ORIGINS = [...new Set(originPrices.map(p => p.origin))].sort();

export default function PricePage() {
  const [activeTab, setActiveTab] = useState('market');
  const [category, setCategory] = useState('');
  const [market, setMarket] = useState('');
  const [trendFilter, setTrendFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const basePrices = useMemo(() => {
    if (activeTab === 'market') return marketPrices;
    if (activeTab === 'origin') return originPrices;
    return [...marketPrices, ...originPrices];
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

    if (activeTab === 'rank') {
      result = [...result].sort((a, b) => b.monthlyChange - a.monthlyChange);
    }

    return result;
  }, [basePrices, category, market, trendFilter, searchQuery, activeTab]);

  const pagedPrices = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPrices.slice(start, start + PAGE_SIZE);
  }, [filteredPrices, currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCategory('');
    setMarket('');
    setTrendFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const showMarket = activeTab !== 'origin';

  const rankMedals = ['🥇', '🥈', '🥉'];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-text">行情价格</h1>
        <p className="text-sm text-text-secondary mt-1">实时掌握中药材市场价格动态与涨跌趋势</p>
      </div>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none" />
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
            className="appearance-none border border-border rounded pl-7 pr-6 py-1.5 text-sm bg-card text-text cursor-pointer hover:border-primary-light transition-colors"
          >
            <option value="">全部品类</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        {activeTab !== 'rank' && (
          <div className="relative">
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none" />
            <select
              value={market}
              onChange={e => { setMarket(e.target.value); setCurrentPage(1); }}
              className="appearance-none border border-border rounded pl-7 pr-6 py-1.5 text-sm bg-card text-text cursor-pointer hover:border-primary-light transition-colors"
            >
              <option value="">{activeTab === 'origin' ? '全部产地' : '全部市场'}</option>
              {activeTab === 'origin'
                ? ORIGINS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))
                : MARKETS.map(m => (
                    <option key={m.key} value={m.key}>{m.label}</option>
                  ))
              }
            </select>
          </div>
        )}

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
                      ? 'bg-rise-bg text-rise border-rise'
                      : item.key === 'down'
                      ? 'bg-fall-bg text-fall border-fall'
                      : 'bg-primary text-white border-primary'
                    : 'bg-card text-text-secondary border-border hover:border-primary-light'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索药材名称"
            className="border border-border rounded pl-8 pr-3 py-1.5 text-sm bg-card text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary-light transition-colors w-48"
          />
        </div>
      </div>

      {activeTab === 'rank' ? (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-3 py-2.5 text-center font-medium w-16">排名</th>
                <th className="px-3 py-2.5 text-left font-medium">品种</th>
                <th className="px-3 py-2.5 text-left font-medium">规格</th>
                <th className="px-3 py-2.5 text-left font-medium">市场</th>
                <th className="px-3 py-2.5 text-left font-medium">产地</th>
                <th className="px-3 py-2.5 text-right font-medium">今日价</th>
                <th className="px-3 py-2.5 text-right font-medium">月涨跌</th>
                <th className="px-3 py-2.5 text-center font-medium">走势</th>
              </tr>
            </thead>
            <tbody>
              {pagedPrices.map((price, idx) => {
                const globalIndex = (currentPage - 1) * PAGE_SIZE + idx;
                return (
                  <tr
                    key={price.id}
                    className={`border-b border-divider hover:bg-row-hover transition-colors ${
                      idx % 2 === 1 ? 'bg-row-alt' : 'bg-card'
                    }`}
                  >
                    <td className="px-3 py-2.5 text-center">
                      {globalIndex < 3 ? (
                        <span className="text-lg">{rankMedals[globalIndex]}</span>
                      ) : (
                        <span className="text-text-secondary font-mono">{globalIndex + 1}</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 font-medium text-text">{price.herbName}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{price.spec}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{price.market}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{price.origin}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-medium text-text">
                      {price.currentPrice}元
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right font-mono font-medium ${
                        price.monthlyChange > 0
                          ? 'text-rise'
                          : price.monthlyChange < 0
                          ? 'text-fall'
                          : 'text-stable'
                      }`}
                    >
                      {price.monthlyChange > 0 ? '+' : ''}{(price.monthlyChange * 100).toFixed(2)}%
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {price.trend === 'up' && <span className="inline-block w-2 h-2 rounded-full bg-rise" />}
                      {price.trend === 'down' && <span className="inline-block w-2 h-2 rounded-full bg-fall" />}
                      {price.trend === 'stable' && <span className="inline-block w-2 h-2 rounded-full bg-stable" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mb-6">
          <PriceTable prices={pagedPrices} showMarket={showMarket} showOrigin />
        </div>
      )}

      <Pagination
        current={currentPage}
        total={filteredPrices.length}
        pageSize={PAGE_SIZE}
        onChange={setCurrentPage}
      />
    </div>
  );
}
