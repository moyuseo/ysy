import { useState, useMemo } from 'react';
import { prices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import RankTable from '../../components/RankTable/RankTable';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';

const TABS = [
  { key: 'rise', label: '涨幅排行' },
  { key: 'fall', label: '跌幅排行' },
  { key: 'query', label: '查询排行' },
  { key: 'bull', label: '牛气品种' },
];

const TIME_FILTERS = ['今日', '本周', '本月', '本季度'];

const PAGE_SIZE = 10;

export default function Rank() {
  const [activeTab, setActiveTab] = useState('rise');
  const [activeTime, setActiveTime] = useState('本月');
  const [currentPage, setCurrentPage] = useState(1);

  const items = useMemo(() => {
    switch (activeTab) {
      case 'rise':
        return [...prices]
          .sort((a, b) => b.monthlyChange - a.monthlyChange)
          .slice(0, 50)
          .map((p, i) => ({
            rank: i + 1,
            herbName: p.herbName,
            spec: p.spec,
            market: p.market,
            price: p.currentPrice,
            change: p.monthlyChange,
            trend: p.trend,
          }));

      case 'fall':
        return [...prices]
          .sort((a, b) => a.monthlyChange - b.monthlyChange)
          .slice(0, 50)
          .map((p, i) => ({
            rank: i + 1,
            herbName: p.herbName,
            spec: p.spec,
            market: p.market,
            price: p.currentPrice,
            change: p.monthlyChange,
            trend: p.trend,
          }));

      case 'query':
        return herbs
          .slice(0, 15)
          .map((h, i) => {
            const price = prices.find((p) => p.herbId === h.id);
            return {
              rank: i + 1,
              herbName: h.name,
              spec: h.spec[0],
              market: price?.market ?? '亳州',
              price: price?.currentPrice ?? 0,
              change: price?.monthlyChange ?? 0,
              trend: price?.trend ?? 'stable',
            };
          });

      case 'bull':
        return [...prices]
          .filter((p) => p.trend === 'up' && p.monthlyChange > 5)
          .sort((a, b) => b.monthlyChange - a.monthlyChange)
          .map((p, i) => ({
            rank: i + 1,
            herbName: p.herbName,
            spec: p.spec,
            market: p.market,
            price: p.currentPrice,
            change: p.monthlyChange,
            trend: p.trend,
          }));

      default:
        return [];
    }
  }, [activeTab]);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, currentPage]);

  function handleTabChange(key: string) {
    setActiveTab(key);
    setCurrentPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">涨跌排行</h1>
      </div>

      <TabNav tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />

      <div className="flex gap-2">
        {TIME_FILTERS.map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setActiveTime(tf)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTime === tf
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-text-secondary hover:text-text hover:border-primary'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <RankTable items={pagedItems} />

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
