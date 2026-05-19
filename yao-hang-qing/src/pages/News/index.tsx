import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import TabNav from '../../components/TabNav/TabNav';
import NewsCard from '../../components/NewsCard/NewsCard';
import Pagination from '../../components/Pagination/Pagination';

const TABS = [
  { key: 'analysis', label: '品种分析' },
  { key: 'dynamic', label: '药市动态' },
  { key: 'origin', label: '产地快报' },
  { key: 'policy', label: '新闻法规' },
  { key: 'review', label: '涨跌盘点' },
];

const PAGE_SIZE = 10;

const HARVEST_CALENDAR: Record<number, string[]> = {};
herbs.forEach((herb) => {
  const time = herb.harvestTime;
  const monthMap: Record<string, number[]> = {
    '春': [3, 4, 5],
    '夏': [6, 7, 8],
    '秋': [9, 10, 11],
    '冬': [12, 1, 2],
  };
  const months: number[] = [];
  if (time.includes('春')) months.push(...monthMap['春']);
  if (time.includes('夏')) months.push(...monthMap['夏']);
  if (time.includes('秋')) months.push(...monthMap['秋']);
  if (time.includes('冬')) months.push(...monthMap['冬']);
  if (months.length === 0) months.push(0);
  months.forEach((m) => {
    if (!HARVEST_CALENDAR[m]) HARVEST_CALENDAR[m] = [];
    HARVEST_CALENDAR[m].push(herb.name);
  });
});

const MONTH_LABELS = ['全年', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const allHerbNames = Array.from(new Set(newsList.flatMap((n) => n.herbNames)));

export default function News() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedHerb, setSelectedHerb] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    let result = newsList.filter((n) => n.category === activeTab);
    if (selectedHerb) {
      result = result.filter((n) => n.herbNames.includes(selectedHerb));
    }
    const pinned = result.filter((n) => n.isPinned);
    const unpinned = result.filter((n) => !n.isPinned);
    return [...pinned, ...unpinned];
  }, [activeTab, selectedHerb]);

  const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE);
  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNews.slice(start, start + PAGE_SIZE);
  }, [filteredNews, currentPage]);

  const hotNews = useMemo(() => {
    return [...newsList].sort((a, b) => b.views - a.views).slice(0, 5);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
    setSelectedHerb(null);
  };

  const handleHerbFilter = (name: string) => {
    setSelectedHerb((prev) => (prev === name ? null : name));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text">资讯中心</h1>

      <TabNav tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        <div className="lg:col-span-7 space-y-4">
          {pagedNews.length > 0 ? (
            pagedNews.map((news) => <NewsCard key={news.id} news={news} />)
          ) : (
            <p className="py-8 text-center text-sm text-text-secondary">暂无相关资讯</p>
          )}
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-text">热门资讯</h3>
            <div className="space-y-2">
              {hotNews.map((news, idx) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="flex items-start gap-2 text-sm text-text hover:text-primary transition-colors"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold text-white ${
                      idx < 3 ? 'bg-primary' : 'bg-text-secondary'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="line-clamp-2">{news.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-text">按品种筛选</h3>
            <div className="flex flex-wrap gap-2">
              {allHerbNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleHerbFilter(name)}
                  className={`rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                    selectedHerb === name
                      ? 'bg-primary text-white'
                      : 'bg-primary/5 text-text hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-text">产新日历</h3>
            <div className="space-y-2">
              {MONTH_LABELS.map((label, idx) => {
                const key = idx;
                const herbNames = HARVEST_CALENDAR[key] || [];
                if (key !== 0 && herbNames.length === 0) return null;
                return (
                  <div key={key} className="flex items-start gap-2">
                    <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {label}
                    </span>
                    <span className="text-xs text-text-secondary leading-5">
                      {herbNames.join('、') || '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
