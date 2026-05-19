import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
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
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.herbName.toLowerCase().includes(q));
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
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">行情价格</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              实时追踪全国主要中药材交易市场价格走势，掌握市场动态
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Filter Section */}
        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-text">筛选条件</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm text-text-secondary font-medium">品类</label>
              <select
                value={category}
                onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
                className="w-full border border-border-light rounded-xl px-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              >
                <option value="">全部品类</option>
                {CATEGORIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Market/Origin Filter */}
            {activeTab !== 'rank' && (
              <div className="space-y-2">
                <label className="text-sm text-text-secondary font-medium">
                  {activeTab === 'origin' ? '产地' : '市场'}
                </label>
                <select
                  value={market}
                  onChange={e => { setMarket(e.target.value); setCurrentPage(1); }}
                  className="w-full border border-border-light rounded-xl px-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
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

            {/* Trend Filter */}
            <div className="space-y-2">
              <label className="text-sm text-text-secondary font-medium">涨跌</label>
              <div className="flex gap-2 bg-bg p-1 rounded-xl">
                {([
                  { key: 'all', label: '全部' },
                  { key: 'up', label: '上涨' },
                  { key: 'down', label: '下跌' },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => { setTrendFilter(key); setCurrentPage(1); }}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                      trendFilter === key
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm text-text-secondary font-medium">搜索</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="搜索药材名称"
                  className="w-full border border-border-light rounded-xl pl-10 pr-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 text-sm text-text-muted">
          共找到 <span className="text-primary font-semibold">{filteredPrices.length}</span> 条价格数据
        </div>

        {/* Price Table */}
        <div className="mb-8">
          <PriceTable prices={pagedPrices} showMarket={showMarket} showOrigin />
        </div>

        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={filteredPrices.length}
          pageSize={PAGE_SIZE}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
