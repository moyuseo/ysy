import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Flame, Trophy, Medal, Award } from 'lucide-react';
import { marketPrices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';
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
  { key: 'quarter', label: '本季度' },
];

const PAGE_SIZE = 20;

const RANK_ICONS = [
  { icon: Trophy, cls: 'text-gold bg-gold/10' },
  { icon: Medal, cls: 'text-gray-400 bg-gray-100' },
  { icon: Award, cls: 'text-amber-700 bg-amber-50' },
];

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

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="font-serif text-2xl font-bold text-text mb-6">涨跌排行</h1>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex gap-2 mb-6">
        {TIME_RANGES.map(range => (
          <button
            key={range.key}
            onClick={() => setTimeRange(range.key)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
              timeRange === range.key
                ? 'bg-primary text-white border-primary'
                : 'border-border text-text-secondary hover:border-primary hover:text-primary'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {activeTab === 'rise' && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary w-20">排名</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">品种</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">规格</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">市场</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">今日价</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">涨跌幅</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">走势</th>
              </tr>
            </thead>
            <tbody>
              {pagedRiseData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                const isTop3 = globalIdx < 3;
                const RankIcon = isTop3 ? RANK_ICONS[globalIdx].icon : null;
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-divider hover:bg-row-hover transition-colors ${
                      isTop3 ? RANK_ICONS[globalIdx].cls : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      {isTop3 && RankIcon ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/80">
                          <RankIcon className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-text-secondary pl-1.5">{globalIdx + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/herb/${item.herbId}`} className="text-text hover:text-primary transition-colors font-medium">
                        {item.herbName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{item.spec}</td>
                    <td className="px-4 py-3 text-text-secondary">{item.market}</td>
                    <td className="px-4 py-3 text-right font-mono">{formatPrice(item.currentPrice)}</td>
                    <td className="px-4 py-3 text-right font-mono text-rise font-bold">{formatChange(item.monthlyChange)}</td>
                    <td className="px-4 py-3 text-center">
                      <TrendingUp className="w-4 h-4 text-rise inline" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            current={currentPage}
            total={sortedByRise.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>
      )}

      {activeTab === 'fall' && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary w-20">排名</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">品种</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">规格</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">市场</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">今日价</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">涨跌幅</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">走势</th>
              </tr>
            </thead>
            <tbody>
              {pagedFallData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                const isTop3 = globalIdx < 3;
                const RankIcon = isTop3 ? RANK_ICONS[globalIdx].icon : null;
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-divider hover:bg-row-hover transition-colors ${
                      isTop3 ? RANK_ICONS[globalIdx].cls : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      {isTop3 && RankIcon ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/80">
                          <RankIcon className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-text-secondary pl-1.5">{globalIdx + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/herb/${item.herbId}`} className="text-text hover:text-primary transition-colors font-medium">
                        {item.herbName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{item.spec}</td>
                    <td className="px-4 py-3 text-text-secondary">{item.market}</td>
                    <td className="px-4 py-3 text-right font-mono">{formatPrice(item.currentPrice)}</td>
                    <td className="px-4 py-3 text-right font-mono text-fall font-bold">{formatChange(item.monthlyChange)}</td>
                    <td className="px-4 py-3 text-center">
                      <TrendingDown className="w-4 h-4 text-fall inline" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            current={currentPage}
            total={sortedByFall.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>
      )}

      {activeTab === 'query' && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary w-20">排名</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">品名</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">搜索热度</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">当前价</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">今日涨跌</th>
              </tr>
            </thead>
            <tbody>
              {hotHerbs.map((herb, idx) => {
                const priceEntry = marketPrices.find(p => p.herbId === herb.id);
                const fireCount = Math.max(1, 5 - Math.floor(idx / 3));
                const isTop3 = idx < 3;
                const RankIcon = isTop3 ? RANK_ICONS[idx].icon : null;
                return (
                  <tr
                    key={herb.id}
                    className={`border-b border-divider hover:bg-row-hover transition-colors ${
                      isTop3 ? RANK_ICONS[idx].cls : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      {isTop3 && RankIcon ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/80">
                          <RankIcon className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-text-secondary pl-1.5">{idx + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/herb/${herb.id}`} className="text-text hover:text-primary transition-colors font-medium">
                        {herb.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: fireCount }).map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 text-rise" />
                        ))}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {priceEntry ? formatPrice(priceEntry.currentPrice) : '-'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
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
            <div className="text-center py-12 text-text-secondary">暂无牛气品种</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {bullHerbs.map(item => (
                <Link
                  key={item.id}
                  to={`/herb/${item.herbId}`}
                  className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition flex items-center gap-4 border-l-4 border-l-primary"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-rise-bg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-rise" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-text">{item.herbName}</span>
                      <span className="text-xs text-text-secondary">{item.spec}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-text">{formatPrice(item.currentPrice)}</span>
                      <span className="font-mono text-sm text-rise font-bold">{formatChange(item.monthlyChange)}</span>
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
