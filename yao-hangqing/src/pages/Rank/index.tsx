import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
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

const RANK_BADGE = [
  'bg-red-100 text-red-700',
  'bg-amber-100 text-amber-600',
  'bg-green-100 text-green-700',
];

const FALL_RANK_BADGE = [
  'bg-green-100 text-green-700',
  'bg-green-100 text-green-700',
  'bg-green-100 text-green-700',
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
      <div className="flex items-center justify-between pt-6 border-t-2 border-slate-200">
        <span className="text-sm text-slate-500">共 <span className="font-semibold text-slate-800">{total}</span> 条</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn btn-s disabled:opacity-40 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          {pageList.map((p, i) =>
            typeof p === 'string' ? (
              <span key={`e-${i}`} className="px-2 text-slate-400 text-sm">...</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`btn ${currentPage === p ? 'btn-p' : 'btn-s'}`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(pages, p + 1))}
            disabled={currentPage === pages}
            className="btn btn-s disabled:opacity-40 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    );
  };

  const renderRankBadge = (globalIdx: number, type: 'rise' | 'fall') => {
    if (globalIdx < 3) {
      const cls = type === 'rise' ? RANK_BADGE[globalIdx] : FALL_RANK_BADGE[globalIdx];
      return <span className={`badge ${cls}`}>{globalIdx + 1}</span>;
    }
    return <span className="badge bg-slate-100 text-slate-500">{globalIdx + 1}</span>;
  };

  return (
    <div className="container py-10">
      <div className="mb-10 anim-up">
        <h1 className="section-title mb-2">涨跌排行</h1>
        <p className="text-slate-500">实时追踪药材价格涨跌，把握市场风向</p>
      </div>

      <div className="tab-bar mb-6 anim-up d1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`tab ${activeTab === tab.key ? 'on' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-8 anim-up d2">
        {TIME_RANGES.map(range => (
          <button
            key={range.key}
            onClick={() => setTimeRange(range.key)}
            className={`btn ${timeRange === range.key ? 'btn-p' : 'btn-s'}`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {activeTab === 'rise' && (
        <div className="card anim-fade">
          <div className="card-body overflow-x-auto">
            <table className="tbl">
              <thead>
                <tr>
                  <th className="w-20">排名</th>
                  <th>品种</th>
                  <th>规格</th>
                  <th>市场</th>
                  <th className="text-right">今日价</th>
                  <th className="text-right">涨跌幅</th>
                </tr>
              </thead>
              <tbody>
                {pagedRiseData.map((item, idx) => {
                  const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                  return (
                    <tr
                      key={item.id}
                      className={globalIdx < 3 ? 'bg-red-50' : ''}
                      style={{ animationDelay: `${idx * 0.03}s` }}
                    >
                      <td>
                        <div className="flex items-center justify-center">
                          {renderRankBadge(globalIdx, 'rise')}
                        </div>
                      </td>
                      <td>
                        <Link to={`/herb/${item.herbId}`} className="text-green-700 hover:text-green-800 font-semibold transition-colors">
                          {item.herbName}
                        </Link>
                      </td>
                      <td className="text-slate-500">{item.spec}</td>
                      <td className="text-slate-500">{item.market}</td>
                      <td className="text-right prc prc-up">{formatPrice(item.currentPrice)}</td>
                      <td className="text-right">
                        <span className="chg chg-up">
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
        </div>
      )}

      {activeTab === 'fall' && (
        <div className="card anim-fade">
          <div className="card-body overflow-x-auto">
            <table className="tbl">
              <thead>
                <tr>
                  <th className="w-20">排名</th>
                  <th>品种</th>
                  <th>规格</th>
                  <th>市场</th>
                  <th className="text-right">今日价</th>
                  <th className="text-right">涨跌幅</th>
                </tr>
              </thead>
              <tbody>
                {pagedFallData.map((item, idx) => {
                  const globalIdx = (currentPage - 1) * PAGE_SIZE + idx;
                  return (
                    <tr
                      key={item.id}
                      className={globalIdx < 3 ? 'bg-green-50' : ''}
                      style={{ animationDelay: `${idx * 0.03}s` }}
                    >
                      <td>
                        <div className="flex items-center justify-center">
                          {renderRankBadge(globalIdx, 'fall')}
                        </div>
                      </td>
                      <td>
                        <Link to={`/herb/${item.herbId}`} className="text-green-700 hover:text-green-800 font-semibold transition-colors">
                          {item.herbName}
                        </Link>
                      </td>
                      <td className="text-slate-500">{item.spec}</td>
                      <td className="text-slate-500">{item.market}</td>
                      <td className="text-right prc prc-down">{formatPrice(item.currentPrice)}</td>
                      <td className="text-right">
                        <span className="chg chg-down">
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
        </div>
      )}

      {activeTab === 'query' && (
        <div className="card anim-fade">
          <div className="card-body overflow-x-auto">
            <table className="tbl">
              <thead>
                <tr>
                  <th className="w-20">排名</th>
                  <th>品名</th>
                  <th>搜索热度</th>
                  <th className="text-right">当前价</th>
                  <th className="text-right">今日涨跌</th>
                </tr>
              </thead>
              <tbody>
                {hotHerbs.map((herb, idx) => {
                  const priceEntry = marketPrices.find(p => p.herbId === herb.id);
                  const searchCount = Math.max(1, 100 - idx * 6);
                  return (
                    <tr
                      key={herb.id}
                      className={idx < 3 ? 'bg-green-50' : ''}
                      style={{ animationDelay: `${idx * 0.03}s` }}
                    >
                      <td>
                        <div className="flex items-center justify-center">
                          {renderRankBadge(idx, 'rise')}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link to={`/herb/${herb.id}`} className="text-green-700 hover:text-green-800 font-semibold transition-colors">
                            {herb.name}
                          </Link>
                          {idx < 3 && <Flame className="w-4 h-4 text-red-600 animate-pulse" />}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-500"
                              style={{ width: `${searchCount}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-400 font-mono">{searchCount}</span>
                        </div>
                      </td>
                      <td className="text-right prc">
                        {priceEntry ? formatPrice(priceEntry.currentPrice) : '-'}
                      </td>
                      <td className="text-right">
                        {priceEntry ? (
                          <span className={`chg ${priceEntry.dailyChange > 0 ? 'chg-up' : priceEntry.dailyChange < 0 ? 'chg-down' : 'bg-slate-100 text-slate-500'}`}>
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
      )}

      {activeTab === 'bull' && (
        <div className="card anim-fade">
          <div className="card-body">
            {bullHerbs.length === 0 ? (
              <div className="text-center py-16 text-slate-400">暂无牛气品种</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bullHerbs.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={`/herb/${item.herbId}`}
                    className="p-5 border-l-4 border-l-red-600 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-4 rounded-r anim-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800 transition-colors">{item.herbName}</span>
                        <span className="text-xs text-slate-500">{item.spec}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{formatPrice(item.currentPrice)}</span>
                        <span className="chg chg-up">{formatChange(item.monthlyChange)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
