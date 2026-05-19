import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import { formatDate } from '../../utils/format';

const TABS = [
  { key: 'analysis', label: '品种分析' },
  { key: 'dynamic', label: '药市动态' },
  { key: 'origin', label: '产地快报' },
  { key: 'policy', label: '新闻法规' },
  { key: 'review', label: '涨跌盘点' },
];

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

  const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl text-text mb-6">资讯中心</h1>

      <div className="flex gap-6 mb-6 border-b border-border-subtle">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`pb-3 text-sm transition-colors ${
              activeTab === tab.key
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        <div className="w-[70%]">
          {pagedNews.length > 0 ? (
            <div>
              {pagedNews.map(news => (
                <div
                  key={news.id}
                  className="border-b border-border-subtle py-4"
                >
                  <Link
                    to={`/news/${news.id}`}
                    className="font-medium text-text hover:text-accent transition-colors block mb-1"
                  >
                    {news.title}
                  </Link>
                  <p className="text-sm text-text-secondary line-clamp-1 mb-2">
                    {news.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary">
                    <span>{formatDate(news.createdAt)}</span>
                    <span>{news.views} 次浏览</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-text-secondary">
              暂无相关资讯
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-text-secondary disabled:text-text-tertiary disabled:cursor-not-allowed hover:text-text"
              >
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded ${
                    currentPage === page
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:bg-border-subtle'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-text-secondary disabled:text-text-tertiary disabled:cursor-not-allowed hover:text-text"
              >
                下一页
              </button>
            </div>
          )}
        </div>

        <div className="w-[30%]">
          <div className="mb-8">
            <h2 className="text-sm font-medium text-text mb-4">热门资讯</h2>
            <ul className="space-y-3">
              {hotNews.map((news, idx) => (
                <li key={news.id} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 w-5 h-5 text-xs flex items-center justify-center ${
                      idx < 3 ? 'text-rise font-medium' : 'text-text-tertiary'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <Link
                    to={`/news/${news.id}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors line-clamp-2"
                  >
                    {news.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium text-text mb-4">按品种筛选</h2>
            <div className="flex flex-wrap gap-2">
              {herbs.slice(0, 16).map(herb => (
                <Link
                  key={herb.id}
                  to={`/search?q=${encodeURIComponent(herb.name)}`}
                  className="px-3 py-1 text-sm text-text-secondary hover:text-accent hover:bg-accent-muted rounded transition-colors"
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
