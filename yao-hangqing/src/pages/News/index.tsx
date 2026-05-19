import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  const [selectedHerb, setSelectedHerb] = useState('');

  const filteredNews = useMemo(() => {
    let result = newsList.filter(n => n.category === activeTab);
    if (selectedHerb) {
      result = result.filter(n => n.herbNames.includes(selectedHerb));
    }
    return result;
  }, [activeTab, selectedHerb]);

  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNews.slice(start, start + PAGE_SIZE);
  }, [filteredNews, currentPage]);

  const hotNews = useMemo(
    () => [...newsList].sort((a, b) => b.views - a.views).slice(0, 5),
    [],
  );

  const newsHerbNames = useMemo(() => {
    const names = new Set<string>();
    newsList.filter(n => n.category === activeTab).forEach(n => {
      n.herbNames.forEach(name => names.add(name));
    });
    return Array.from(names);
  }, [activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
    setSelectedHerb('');
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
                  className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {news.isPinned && (
                      <span className="text-xs px-2 py-0.5 rounded bg-rise text-white font-medium">
                        置顶
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded bg-fall-bg text-primary font-medium">
                      {CATEGORY_LABELS[news.category]}
                    </span>
                  </div>
                  <Link
                    to={`/news/${news.id}`}
                    className="text-base font-medium text-text hover:text-primary transition-colors block mb-1.5"
                  >
                    {news.title}
                  </Link>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                    {news.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>{formatDate(news.createdAt)}</span>
                    <span>{news.views} 次浏览</span>
                    {news.herbNames.length > 0 && (
                      <div className="flex items-center gap-1">
                        {news.herbNames.slice(0, 3).map(name => (
                          <span key={name} className="px-1.5 py-0.5 bg-bg rounded text-text-secondary">
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm text-center">
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
          <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
            <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">热门资讯</h2>
            <ul className="space-y-3">
              {hotNews.map((news, idx) => (
                <li key={news.id} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 w-5 h-5 rounded text-xs flex items-center justify-center font-medium ${
                      idx < 3
                        ? 'bg-rise text-white'
                        : 'bg-border text-text-secondary'
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

          <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
            <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">按品种筛选</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedHerb(''); setCurrentPage(1); }}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedHerb === ''
                    ? 'bg-primary text-white border-primary'
                    : 'bg-fall-bg text-primary border-primary/20 hover:bg-primary hover:text-white'
                }`}
              >
                全部
              </button>
              {newsHerbNames.map(name => (
                <button
                  key={name}
                  onClick={() => { setSelectedHerb(name); setCurrentPage(1); }}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedHerb === name
                      ? 'bg-primary text-white border-primary'
                      : 'bg-fall-bg text-primary border-primary/20 hover:bg-primary hover:text-white'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
