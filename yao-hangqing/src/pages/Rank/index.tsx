import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Trophy, Medal, Award } from 'lucide-react';
import { marketPrices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import { formatPrice, formatChange } from '../../utils/format';

const TABS = [
  { key: 'rise', label: '涨幅排行' },
  { key: 'fall', label: '跌幅排行' },
  { key: 'query', label: '查询排行' },
  { key: 'bull', label: '牛气品种' },
];

const TIME_RANGES = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
];

const PAGE_SIZE = 20;

export default function RankPage() {
  const [activeTab, setActiveTab] = useState('rise');
  const [timeRange, setTimeRange] = useState('today');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedByRise = useMemo(() => {
    return [...marketPrices].sort((a, b) => b.monthlyChange - a.monthlyChange);
  }, []);

  const sortedByFall = useMemo(() => {
    return [...marketPrices].sort((a, b) => a.monthlyChange - b.monthlyChange);
  }, []);

  const bullHerbs = useMemo(() => {
    return marketPrices.filter(p => p.monthlyChange > 0.05);
  }, []);

  const hotHerbs = useMemo(() => {
    return herbs.slice(0, 15);
  }, []);

  const pagedRiseData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedByRise.slice(start, start + PAGE_SIZE);
  }, [sortedByRise, currentPage]);

  const pagedFallData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedByFall.slice(start, start + PAGE_SIZE);
  }, [sortedByFall, currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const renderPagination = (total: number) => {
    const pages = Math.ceil(total / PAGE_SIZE);
    if (pages <= 1) return null;

    const pageList: (number | string)[] = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) pageList.push(i);
    } else {
      pageList.push(1);
      if (currentPage > 3) pageList.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(pages - 1, currentPage + 1); i++) {
        pageList.push(i);
      }
      if (currentPage < pages - 2) pageList.push('...');
      pageList.push(pages);
    }

    return (
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <span className="text-xs text-text-tertiary">共 {total} 条</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 text-xs rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-raised transition-colors"
          >
            上一页
          </button>
          {pageList.map((p, i) =>
            typeof p === 'string' ? (
              <span key={`e-${i}`} className="px-1.5 text-text-tertiary text-xs">...</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  currentPage === p
                    ? 'bg-accent text-white border-accent'
                    : 'border-border hover:bg-surface-raised'
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(pages, p + 1))}
            disabled={currentPage === pages}
            className="px-2.5 py-1 text-xs rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-raised transition-colors"
          >
            下一页
          </button>
        </div>
      </div>
    );
  };

  const renderRankIcon = (idx: number) => {
    const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
    if (globalIdx === 0) return <Trophy className="w-4 h-4 text-rise" />;
    if (globalIdx === 1) return <Medal className="w-4 h-4 text-text-secondary" />;
    if (globalIdx === 2) return <Award className="w-4 h-4 text-accent" />;
    return <span className="text-text-tertiary text-xs pl-1">{globalIdx + 1}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl text-text mb-6">涨跌排行</h1>

      <div className="flex items-center justify-between mb-4 border-b border-border">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative -mb-px ${
              activeTab === tab.key
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {TIME_RANGES.map(range => (
          <button
            key={range.key}
            onClick={() => setTimeRange(range.key)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              timeRange === range.key
                ? 'bg-accent text-white border-accent'
                : 'border-border text-text-secondary hover:border-text-tertiary'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {activeTab === 'rise' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-3 py-2 text-left font-medium text-text-secondary w-16">排名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">品种</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">规格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">市场</th>
                <th className="px-3 py-2 text-right font-medium text-text-secondary">今日价</th>
                <th className="px-3 py-2 text-right font-medium text-text-secondary">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {pagedRiseData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                const isTop3 = globalIdx < 3;
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-border-subtle transition-colors ${
                      isTop3 ? 'bg-rise-muted/30' : 'hover:bg-surface-raised'
                    }`}
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center w-6 h-6">
                        {renderRankIcon(idx)}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <Link to={`/herb/${item.herbId}`} className="text-text hover:text-accent transition-colors font-medium">
                        {item.herbName}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary">{item.spec}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{item.market}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{formatPrice(item.currentPrice)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-rise font-bold">
                      <span className="flex items-center justify-end gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {formatChange(item.monthlyChange)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {renderPagination(marketPrices.length)}
        </div>
      )}

      {activeTab === 'fall' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-3 py-2 text-left font-medium text-text-secondary w-16">排名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">品种</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">规格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">市场</th>
                <th className="px-3 py-2 text-right font-medium text-text-secondary">今日价</th>
                <th className="px-3 py-2 text-right font-medium text-text-secondary">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {pagedFallData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                const isTop3 = globalIdx < 3;
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-border-subtle transition-colors ${
                      isTop3 ? 'bg-fall-muted/30' : 'hover:bg-surface-raised'
                    }`}
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center w-6 h-6">
                        {renderRankIcon(idx)}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <Link to={`/herb/${item.herbId}`} className="text-text hover:text-accent transition-colors font-medium">
                        {item.herbName}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary">{item.spec}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{item.market}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{formatPrice(item.currentPrice)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-fall font-bold">
                      <span className="flex items-center justify-end gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {formatChange(item.monthlyChange)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {renderPagination(marketPrices.length)}
        </div>
      )}

      {activeTab === 'query' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-3 py-2 text-left font-medium text-text-secondary w-16">排名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">品名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">搜索热度</th>
                <th className="px-3 py-2 text-right font-medium text-text-secondary">当前价</th>
                <th className="px-3 py-2 text-right font-medium text-text-secondary">今日涨跌</th>
              </tr>
            </thead>
            <tbody>
              {hotHerbs.map((herb, idx) => {
                const priceEntry = marketPrices.find(p => p.herbId === herb.id);
                const searchCount = Math.max(1, 100 - idx * 6);
                const isTop3 = idx < 3;
                return (
                  <tr
                    key={herb.id}
                    className={`border-b border-border-subtle transition-colors ${
                      isTop3 ? 'bg-accent-muted/30' : 'hover:bg-surface-raised'
                    }`}
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center w-6 h-6">
                        {renderRankIcon(idx)}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <Link to={`/herb/${herb.id}`} className="text-text hover:text-accent transition-colors font-medium">
                        {herb.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-border-subtle rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${searchCount}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-tertiary">{searchCount}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono">
                      {priceEntry ? formatPrice(priceEntry.currentPrice) : '-'}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono">
                      {priceEntry ? (
                        <span className={priceEntry.dailyChange > 0 ? 'text-rise font-bold' : priceEntry.dailyChange < 0 ? 'text-fall font-bold' : 'text-text-secondary'}>
                          {formatChange(priceEntry.dailyChange)}
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'bull' && (
        <>
          {bullHerbs.length === 0 ? (
            <div className="text-center py-12 text-text-tertiary text-sm">暂无牛气品种</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bullHerbs.map(item => (
                <Link
                  key={item.id}
                  to={`/herb/${item.herbId}`}
                  className="py-3 px-4 border-l-2 border-l-rise bg-rise-muted/20 hover:bg-rise-muted/40 transition flex items-center gap-3"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-rise-muted flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-rise" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-medium text-text">{item.herbName}</span>
                      <span className="text-[10px] text-text-tertiary">{item.spec}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-text-secondary">{formatPrice(item.currentPrice)}</span>
                      <span className="font-mono text-xs text-rise font-bold">{formatChange(item.monthlyChange)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
