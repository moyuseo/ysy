import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { prices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import { CATEGORIES, MARKETS } from '../../utils/constants';
import TabNav from '../../components/TabNav/TabNav';
import FilterBar from '../../components/FilterBar/FilterBar';
import PriceTable from '../../components/PriceTable/PriceTable';
import Pagination from '../../components/Pagination/Pagination';

const TABS = [
  { key: 'market', label: '市场价格' },
  { key: 'origin', label: '产地价格' },
  { key: 'history', label: '历史价格' },
  { key: 'rank', label: '涨跌排行' },
];

const PAGE_SIZE = 20;

const categoryFilters = [{ key: 'all', label: '全部分类' }, ...CATEGORIES.map(c => ({ key: c.key, label: c.label }))];
const marketFilters = [{ key: 'all', label: '全部市场' }, ...MARKETS.map(m => ({ key: m.label, label: m.label }))];

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'change-asc' | 'change-desc';

export default function PricePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'market';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [trendFilter, setTrendFilter] = useState<'all' | 'up' | 'down' | 'stable'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [currentPage, setCurrentPage] = useState(1);

  const herbMap = useMemo(() => {
    const map = new Map<string, typeof herbs[number]>();
    for (const herb of herbs) {
      map.set(herb.id, herb);
    }
    return map;
  }, []);

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key });
    setCurrentPage(1);
  };

  const filteredPrices = useMemo(() => {
    let result = [...prices];

    if (activeTab === 'origin') {
      result = result.filter(p => p.origin && p.origin.trim() !== '');
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => {
        const herb = herbMap.get(p.herbId);
        return herb?.category === selectedCategory;
      });
    }

    if (selectedMarket !== 'all') {
      result = result.filter(p => p.market === selectedMarket);
    }

    if (trendFilter !== 'all') {
      result = result.filter(p => p.trend === trendFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.herbName.toLowerCase().includes(q));
    }

    if (activeTab === 'rank') {
      result.sort((a, b) => Math.abs(b.monthlyChange) - Math.abs(a.monthlyChange));
    } else {
      switch (sortKey) {
        case 'price-asc':
          result.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case 'price-desc':
          result.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case 'change-asc':
          result.sort((a, b) => a.monthlyChange - b.monthlyChange);
          break;
        case 'change-desc':
          result.sort((a, b) => b.monthlyChange - a.monthlyChange);
          break;
        default:
          result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
          break;
      }
    }

    return result;
  }, [activeTab, selectedCategory, selectedMarket, trendFilter, searchQuery, sortKey, herbMap]);

  const totalPages = Math.ceil(filteredPrices.length / PAGE_SIZE);
  const pagedPrices = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPrices.slice(start, start + PAGE_SIZE);
  }, [filteredPrices, currentPage]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text">行情价格</h1>

      <TabNav tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />

      <FilterBar
        categories={categoryFilters}
        selectedCategory={selectedCategory}
        onCategoryChange={(key) => { setSelectedCategory(key); setCurrentPage(1); }}
        markets={marketFilters}
        selectedMarket={selectedMarket}
        onMarketChange={(key) => { setSelectedMarket(key); setCurrentPage(1); }}
        trendFilter={trendFilter}
        onTrendFilterChange={(val) => { setTrendFilter(val); setCurrentPage(1); }}
        searchQuery={searchQuery}
        onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
      />

      {activeTab !== 'rank' && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">排序:</span>
          <select
            value={sortKey}
            onChange={(e) => { setSortKey(e.target.value as SortKey); setCurrentPage(1); }}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-text outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
          >
            <option value="default">最新</option>
            <option value="price-asc">价格升序</option>
            <option value="price-desc">价格降序</option>
            <option value="change-asc">涨跌升序</option>
            <option value="change-desc">涨跌降序</option>
          </select>
        </div>
      )}

      <PriceTable prices={pagedPrices} />

      {activeTab === 'history' && (
        <div className="flex justify-end">
          {pagedPrices.map(p => (
            <Link
              key={`link-${p.id}`}
              to={`/herb/${p.herbId}`}
              className="text-sm text-primary hover:underline"
            >
              {p.herbName} 查看走势
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
