import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Pin, Eye, CalendarDays } from 'lucide-react';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';
import { formatDate } from '../../utils/format';

const TABS = [
  { key: 'analysis', label: '品种分析' },
  { key: 'dynamic', label: '药市动态' },
  { key: 'origin', label: '产地快报' },
  { key: 'policy', label: '新闻法规' },
  { key: 'review', label: '涨跌盘点' },
];

const CATEGORY_LABELS: Record<string, string> = {
  analysis: '品种分析',
  dynamic: '药市动态',
  origin: '产地快报',
  policy: '新闻法规',
  review: '涨跌盘点',
};

const PAGE_SIZE = 10;

export default function News() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    return newsList.filter(n => n.category === activeTab);
  }, [activeTab]);

  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNews.slice(start, start + PAGE_SIZE);
  }, [filteredNews, currentPage]);

  const hotNews = useMemo(
    () => [...newsList].sort((a, b) => b.views - a.views).slice(0, 5),
    [],
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="font-serif text-2xl font-bold text-text mb-6">资讯中心</h1>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[70%]">
          {pagedNews.length > 0 ? (
            <div className="space-y-4">
              {pagedNews.map(news => (
                <div
                  key={news.id}
                  className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {news.isPinned && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-rise text-white font-medium">
                        <Pin className="w-3 h-3" />
                        置顶
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/news/${news.id}`}
                    className="font-medium text-text hover:text-primary transition-colors block mb-1.5"
                  >
                    {news.title}
                  </Link>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                    {news.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-fall-bg text-primary font-medium">
                      {CATEGORY_LABELS[news.category]}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDate(news.createdAt)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {news.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-text-secondary">暂无相关资讯</p>
            </div>
          )}

          <Pagination
            current={currentPage}
            total={filteredNews.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>

        <div className="w-full lg:w-[30%] space-y-6">
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">热门资讯</h2>
            <ul className="space-y-3">
              {hotNews.map((news, idx) => (
                <li key={news.id} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 w-5 h-5 rounded text-xs flex items-center justify-center font-medium ${
                      idx < 3
                        ? 'text-rise'
                        : 'text-text-secondary'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <Link
                    to={`/news/${news.id}`}
                    className="text-sm text-text hover:text-primary transition-colors line-clamp-2"
                  >
                    {news.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">按品种筛选</h2>
            <div className="flex flex-wrap gap-2">
              {herbs.slice(0, 16).map(herb => (
                <Link
                  key={herb.id}
                  to={`/search?q=${encodeURIComponent(herb.name)}`}
                  className="px-3 py-1.5 text-sm rounded-full border border-primary/20 bg-fall-bg text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {herb.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
