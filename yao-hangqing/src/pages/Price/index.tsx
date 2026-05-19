import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
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

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-serif font-bold text-text mb-6">行情价格</h1>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
          className="border border-border rounded px-3 py-1.5 text-sm"
        >
          <option value="">全部品类</option>
          {CATEGORIES.map(c => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>

        {activeTab !== 'rank' && (
          <select
            value={market}
            onChange={e => { setMarket(e.target.value); setCurrentPage(1); }}
            className="border border-border rounded px-3 py-1.5 text-sm"
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
        )}

        <div className="flex items-center gap-2">
          {(['all', 'up', 'down'] as const).map(value => (
            <label key={value} className="flex items-center gap-1 text-sm cursor-pointer">
              <input
                type="radio"
                name="trend"
                value={value}
                checked={trendFilter === value}
                onChange={e => { setTrendFilter(e.target.value); setCurrentPage(1); }}
                className="accent-primary"
              />
              {value === 'all' ? '全部' : value === 'up' ? '上涨' : '下跌'}
            </label>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索药材名称"
            className="border border-border rounded pl-8 pr-3 py-1.5 text-sm"
          />
        </div>
      </div>

      <div className="mb-6">
        <PriceTable prices={pagedPrices} showMarket={showMarket} showOrigin />
      </div>

      <Pagination
        current={currentPage}
        total={filteredPrices.length}
        pageSize={PAGE_SIZE}
        onChange={setCurrentPage}
      />
    </div>
  );
}
