import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
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

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

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
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">涨跌排行</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              掌握市场热点品种，发现投资机会
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Time Range Filter */}
        {(activeTab === 'rise' || activeTab === 'fall') && (
          <div className="flex gap-3 mb-8 flex-wrap bg-card rounded-2xl border border-border-light shadow-sm p-3">
            {TIME_RANGES.map(range => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key)}
                className={`px-6 py-2.5 text-sm rounded-xl transition-all duration-300 font-medium ${
                  timeRange === range.key
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-text hover:bg-bg'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}

        {/* Rise/Fall Table */}
        {(activeTab === 'rise' || activeTab === 'fall') && (
          <div className="mb-8">
            <div className="bg-card rounded-2xl border border-border-light shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-bg border-b border-border-light">
                      <th className="text-left px-6 py-4 font-medium text-text-secondary w-20">排名</th>
                      <th className="text-left px-6 py-4 font-medium text-text-secondary">品种</th>
                      <th className="text-left px-6 py-4 font-medium text-text-secondary">规格</th>
                      <th className="text-left px-6 py-4 font-medium text-text-secondary">市场</th>
                      <th className="text-right px-6 py-4 font-medium text-text-secondary">今日价</th>
                      <th className="text-right px-6 py-4 font-medium text-text-secondary">涨跌幅</th>
                      <th className="text-center px-6 py-4 font-medium text-text-secondary">走势</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === 'rise' ? pagedRiseData : pagedFallData).map((item, idx) => {
                      const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                      return (
                        <tr key={item.id} className="border-b border-border-light hover:bg-bg transition-colors">
                          <td className="px-6 py-4">
                            {globalIdx < 3 ? (
                              <span className="text-2xl">{RANK_MEDALS[globalIdx]}</span>
                            ) : (
                              <span className="text-text-muted font-medium">{globalIdx + 1}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/herb/${item.herbId}`}
                              className="text-text hover:text-primary transition-colors font-semibold"
                            >
                              {item.herbName}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-text-muted">{item.spec}</td>
                          <td className="px-6 py-4 text-text-muted">{item.market}</td>
                          <td className="px-6 py-4 text-right font-mono font-medium text-text">{formatPrice(item.currentPrice)}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-mono font-semibold text-lg ${
                              activeTab === 'rise' ? 'text-rise' : 'text-fall'
                            }`}>
                              {formatChange(item.monthlyChange)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {activeTab === 'rise' ? (
                              <TrendingUp className="w-6 h-6 text-rise inline" />
                            ) : (
                              <TrendingDown className="w-6 h-6 text-fall inline" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <Pagination
                current={currentPage}
                total={(activeTab === 'rise' ? sortedByRise : sortedByFall).length}
                pageSize={PAGE_SIZE}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        )}

        {/* Query Rank */}
        {activeTab === 'query' && (
          <div className="mb-8">
            <div className="bg-card rounded-2xl border border-border-light shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-bg border-b border-border-light">
                      <th className="text-left px-6 py-4 font-medium text-text-secondary w-20">排名</th>
                      <th className="text-left px-6 py-4 font-medium text-text-secondary">品名</th>
                      <th className="text-left px-6 py-4 font-medium text-text-secondary">搜索热度</th>
                      <th className="text-right px-6 py-4 font-medium text-text-secondary">当前价</th>
                      <th className="text-right px-6 py-4 font-medium text-text-secondary">今日涨跌</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotHerbs.map((herb, idx) => {
                      const priceEntry = marketPrices.find(p => p.herbId === herb.id);
                      const fireCount = Math.max(1, 5 - Math.floor(idx / 3));
                      return (
                        <tr key={herb.id} className="border-b border-border-light hover:bg-bg transition-colors">
                          <td className="px-6 py-4">
                            {idx < 3 ? (
                              <span className="text-2xl">{RANK_MEDALS[idx]}</span>
                            ) : (
                              <span className="text-text-muted font-medium">{idx + 1}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/herb/${herb.id}`}
                              className="text-text hover:text-primary transition-colors font-semibold"
                            >
                              {herb.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1">
                              {Array.from({ length: fireCount }).map((_, i) => (
                                <Flame key={i} className="w-5 h-5 text-rise" />
                              ))}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-mono font-medium text-text">
                            {priceEntry ? formatPrice(priceEntry.currentPrice) : '-'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {priceEntry ? (
                              <span className={`font-mono font-medium ${
                                priceEntry.dailyChange > 0 ? 'text-rise' : priceEntry.dailyChange < 0 ? 'text-fall' : 'text-text-muted'
                              }`}>
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
            </div>
          </div>
        )}

        {/* Bull Herbs */}
        {activeTab === 'bull' && (
          <div className="mb-8">
            {bullHerbs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bullHerbs.map(item => (
                  <Link
                    key={item.id}
                    to={`/herb/${item.herbId}`}
                    className="bg-card rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all duration-300 card-hover"
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-rise/10 flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-rise" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-text text-lg">{item.herbName}</span>
                          <span className="text-text-muted text-sm">{item.spec}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xl font-medium text-text">{formatPrice(item.currentPrice)}</span>
                          <span className="font-mono text-lg text-rise font-semibold">{formatChange(item.monthlyChange)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center">
                <p className="text-text-secondary">暂无牛气品种</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
