import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Trophy, Medal, Flame, Crown } from 'lucide-react';
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
      <div className="flex items-center justify-between pt-6 border-t-2 border-paper-dark">
        <span className="text-sm text-ink-muted">共 <span className="font-semibold text-ink">{total}</span> 条</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm font-medium rounded border-2 border-paper-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo hover:text-indigo transition-colors bg-paper"
          >
            上一页
          </button>
          {pageList.map((p, i) =>
            typeof p === 'string' ? (
              <span key={`e-${i}`} className="px-2 text-ink-muted text-sm">...</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1.5 text-sm font-medium rounded border-2 transition-all ${
                  currentPage === p
                    ? 'bg-indigo text-white border-indigo shadow-md'
                    : 'border-paper-dark hover:border-indigo hover:text-indigo bg-paper'
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(pages, p + 1))}
            disabled={currentPage === pages}
            className="px-3 py-1.5 text-sm font-medium rounded border-2 border-paper-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo hover:text-indigo transition-colors bg-paper"
          >
            下一页
          </button>
        </div>
      </div>
    );
  };

  const renderRankIcon = (idx: number, type: 'rise' | 'fall') => {
    const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
    if (globalIdx === 0) return <Crown className="w-5 h-5 text-ochre" />;
    if (globalIdx === 1) return <Trophy className="w-5 h-5 text-ink-light" />;
    if (globalIdx === 2) return <Medal className="w-5 h-5 text-ochre-dark" />;
    return (
      <span className={`seal ${type === 'rise' ? 'seal-rise' : 'seal-fall'}`}>
        {globalIdx + 1}
      </span>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-ink tracking-wide mb-2">涨跌排行</h1>
        <p className="text-ink-light">实时追踪药材价格涨跌，把握市场风向</p>
      </div>

      <div className="flex border-b-2 border-paper-dark mb-8">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`tab-antique ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-8">
        {TIME_RANGES.map(range => (
          <button
            key={range.key}
            onClick={() => setTimeRange(range.key)}
            className={`px-4 py-2 text-sm font-medium rounded transition-all ${
              timeRange === range.key
                ? 'bg-indigo text-white shadow-md'
                : 'bg-paper-warm text-ink-light border border-paper-dark hover:border-indigo hover:text-ink'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {activeTab === 'rise' && (
        <div className="paper-card p-6 overflow-x-auto">
          <table className="table-antique">
            <thead>
              <tr>
                <th className="px-4 py-3 w-20">排名</th>
                <th className="px-4 py-3">品种</th>
                <th className="px-4 py-3">规格</th>
                <th className="px-4 py-3">市场</th>
                <th className="px-4 py-3 text-right">今日价</th>
                <th className="px-4 py-3 text-right">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {pagedRiseData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                const isTop3 = globalIdx < 3;
                return (
                  <tr 
                    key={item.id} 
                    className={`animate-fade-in ${isTop3 ? 'bg-cinnabar-muted/30' : ''}`}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        {renderRankIcon(idx, 'rise')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/herb/${item.herbId}`} className="text-indigo hover:text-indigo-dark font-semibold transition-colors">
                        {item.herbName}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-ink-light">{item.spec}</td>
                    <td className="px-4 py-4 text-ink-light">{item.market}</td>
                    <td className="px-4 py-4 text-right font-mono font-semibold">{formatPrice(item.currentPrice)}</td>
                    <td className="px-4 py-4 text-right">
                      <span className="change-badge rise flex items-center justify-end gap-1">
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
        <div className="paper-card p-6 overflow-x-auto">
          <table className="table-antique">
            <thead>
              <tr>
                <th className="px-4 py-3 w-20">排名</th>
                <th className="px-4 py-3">品种</th>
                <th className="px-4 py-3">规格</th>
                <th className="px-4 py-3">市场</th>
                <th className="px-4 py-3 text-right">今日价</th>
                <th className="px-4 py-3 text-right">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {pagedFallData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                const isTop3 = globalIdx < 3;
                return (
                  <tr 
                    key={item.id} 
                    className={`animate-fade-in ${isTop3 ? 'bg-jade-muted/30' : ''}`}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        {renderRankIcon(idx, 'fall')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/herb/${item.herbId}`} className="text-indigo hover:text-indigo-dark font-semibold transition-colors">
                        {item.herbName}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-ink-light">{item.spec}</td>
                    <td className="px-4 py-4 text-ink-light">{item.market}</td>
                    <td className="px-4 py-4 text-right font-mono font-semibold">{formatPrice(item.currentPrice)}</td>
                    <td className="px-4 py-4 text-right">
                      <span className="change-badge fall flex items-center justify-end gap-1">
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
        <div className="paper-card p-6 overflow-x-auto">
          <table className="table-antique">
            <thead>
              <tr>
                <th className="px-4 py-3 w-20">排名</th>
                <th className="px-4 py-3">品名</th>
                <th className="px-4 py-3">搜索热度</th>
                <th className="px-4 py-3 text-right">当前价</th>
                <th className="px-4 py-3 text-right">今日涨跌</th>
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
                    className={`animate-fade-in ${isTop3 ? 'bg-indigo-muted/30' : ''}`}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        {renderRankIcon(idx, 'rise')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/herb/${herb.id}`} className="text-indigo hover:text-indigo-dark font-semibold transition-colors">
                          {herb.name}
                        </Link>
                        {idx < 3 && <Flame className="w-4 h-4 text-cinnabar animate-pulse" />}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-28 h-2 bg-paper-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo to-cinnabar rounded-full transition-all duration-500"
                            style={{ width: `${searchCount}%` }}
                          />
                        </div>
                        <span className="text-sm text-ink-muted font-mono">{searchCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-mono font-semibold">
                      {priceEntry ? formatPrice(priceEntry.currentPrice) : '-'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {priceEntry ? (
                        <span className={`font-mono font-semibold ${priceEntry.dailyChange > 0 ? 'text-cinnabar' : priceEntry.dailyChange < 0 ? 'text-jade' : 'text-ink-light'}`}>
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
        <div className="paper-card p-6">
          {bullHerbs.length === 0 ? (
            <div className="text-center py-16 text-ink-muted">暂无牛气品种</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bullHerbs.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/herb/${item.herbId}`}
                  className="p-5 border-l-4 border-l-cinnabar bg-cinnabar-muted/20 hover:bg-cinnabar-muted/40 transition-all flex items-center gap-4 rounded-r animate-fade-in group"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-cinnabar-muted flex items-center justify-center group-hover:bg-cinnabar group-hover:text-white transition-colors">
                    <TrendingUp className="w-6 h-6 text-cinnabar group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-lg text-ink group-hover:text-cinnabar transition-colors font-semibold">{item.herbName}</span>
                      <span className="text-xs text-ink-muted">{item.spec}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-ink-light">{formatPrice(item.currentPrice)}</span>
                      <span className="font-mono text-sm text-cinnabar font-bold">{formatChange(item.monthlyChange)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
