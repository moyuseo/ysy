import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TabNav from '../../components/TabNav/TabNav';
import FilterBar from '../../components/FilterBar/FilterBar';
import TradeCard from '../../components/TradeCard/TradeCard';
import Pagination from '../../components/Pagination/Pagination';
import { trades } from '../../data/trades';
import { CATEGORIES } from '../../utils/constants';

const TABS = [
  { key: 'supply', label: '供应信息' },
  { key: 'demand', label: '求购信息' },
  { key: 'bidding', label: '采购招标' },
  { key: 'direct', label: '产地直供' },
];

const CATEGORY_FILTER = [{ key: 'all', label: '全部分类' }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.label }))];
const PAGE_SIZE = 12;

export default function TradePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'supply';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrades = useMemo(() => {
    return trades.filter((t) => {
      if (t.type !== activeTab) return false;
      if (selectedCategory !== 'all' && t.herbId) {
        return true;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          t.herbName.toLowerCase().includes(q) ||
          t.spec.toLowerCase().includes(q) ||
          t.origin.toLowerCase().includes(q) ||
          (t.company && t.company.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeTab, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredTrades.length / PAGE_SIZE);
  const pagedTrades = filteredTrades.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key });
    setCurrentPage(1);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">供求信息</h1>
      </div>

      <TabNav tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />

      <div className="mt-4">
        <FilterBar
          categories={CATEGORY_FILTER}
          selectedCategory={selectedCategory}
          onCategoryChange={(key) => {
            setSelectedCategory(key);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="mt-4">
        {activeTab === 'supply' && (
          <div className="grid grid-cols-2 gap-4">
            {pagedTrades.map((trade) => (
              <Link key={trade.id} to={`/trade/${trade.id}`}>
                <TradeCard trade={trade} />
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'demand' && (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg">
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">品种</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">规格</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">产地</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">数量</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">报价数</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">剩余天数</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">操作</th>
                </tr>
              </thead>
              <tbody>
                {pagedTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-border last:border-b-0 hover:bg-bg/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-text">{trade.herbName}</td>
                    <td className="px-4 py-3 text-text-secondary">{trade.spec}</td>
                    <td className="px-4 py-3 text-text-secondary">{trade.origin}</td>
                    <td className="px-4 py-3 text-text">{trade.quantity}</td>
                    <td className="px-4 py-3 text-text-secondary">{trade.quoteCount ?? 0}条</td>
                    <td className="px-4 py-3 text-text-secondary">{trade.remainingDays ?? 0}天</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/trade/${trade.id}`}
                        className="rounded px-3 py-1 text-xs font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        抢先报价
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'bidding' && (
          <div className="space-y-3">
            {pagedTrades.map((trade) => (
              <Link
                key={trade.id}
                to={`/trade/${trade.id}`}
                className="block rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      招标
                    </span>
                    {trade.isPromoted && (
                      <span className="rounded bg-gold/20 px-1.5 py-0.5 text-xs font-medium text-gold">
                        推广
                      </span>
                    )}
                    <span className="font-medium text-text">{trade.company}</span>
                  </div>
                  <span className="text-xs text-text-secondary">{trade.createdAt}</span>
                </div>
                <div className="mt-2 text-sm text-text-secondary line-clamp-2">
                  {trade.description}
                </div>
                <div className="mt-2 flex gap-4 text-xs text-text-secondary">
                  <span>品种: {trade.herbName}</span>
                  <span>数量: {trade.quantity}</span>
                  <span>预算: {trade.price}</span>
                  <span>剩余: {trade.remainingDays}天</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'direct' && (
          <div className="grid grid-cols-2 gap-4">
            {pagedTrades.map((trade) => (
              <Link key={trade.id} to={`/trade/${trade.id}`}>
                <TradeCard trade={trade} />
              </Link>
            ))}
          </div>
        )}

        {pagedTrades.length === 0 && (
          <div className="py-12 text-center text-text-secondary">暂无数据</div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
