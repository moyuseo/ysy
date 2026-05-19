import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { newsList } from '../../data/news';
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

export default function NewsPage() {
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
    []
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
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">资讯中心</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              最新行业资讯，深度市场分析，助您把握药材市场脉动
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {pagedNews.length > 0 ? (
              <div className="space-y-6">
                {pagedNews.map(news => (
                  <div
                    key={news.id}
                    className="bg-card rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {news.isPinned && (
                        <span className="text-xs px-3 py-1 rounded-full bg-rise text-white font-medium">
                          置顶
                        </span>
                      )}
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {CATEGORY_LABELS[news.category]}
                      </span>
                    </div>
                    <Link
                      to={`/news/${news.id}`}
                      className="text-xl font-semibold text-text hover:text-primary transition-colors block mb-3"
                    >
                      {news.title}
                    </Link>
                    <p className="text-text-secondary leading-relaxed mb-4 line-clamp-2">
                      {news.summary}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-text-muted">
                      <span>{formatDate(news.createdAt)}</span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        {news.views} 次浏览
                      </span>
                    </div>
                    {news.herbNames.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        {news.herbNames.slice(0, 3).map(name => (
                          <span key={name} className="px-3 py-1 bg-bg rounded-full text-sm text-text-muted">
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center">
                <p className="text-text-secondary">暂无相关资讯</p>
              </div>
            )}

            <div className="mt-8">
              <Pagination
                current={currentPage}
                total={filteredNews.length}
                pageSize={PAGE_SIZE}
                onChange={setCurrentPage}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            {/* Hot News */}
            <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6">
              <h2 className="font-serif text-xl font-semibold text-text border-l-4 border-primary pl-3 mb-6">
                热门资讯
              </h2>
              <ul className="space-y-5">
                {hotNews.map((news, idx) => (
                  <li key={news.id} className="flex items-start gap-4">
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold ${
                        idx < 3
                          ? 'bg-rise text-white'
                          : 'bg-bg text-text-muted'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <Link
                      to={`/news/${news.id}`}
                      className="text-text hover:text-primary transition-colors font-medium line-clamp-2 flex-1"
                    >
                      {news.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Herb Filter */}
            <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6">
              <h2 className="font-serif text-xl font-semibold text-text border-l-4 border-primary pl-3 mb-6">
                按品种筛选
              </h2>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => { setSelectedHerb(''); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium ${
                    selectedHerb === ''
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-bg text-primary border border-primary/20 hover:bg-primary hover:text-white'
                  }`}
                >
                  全部
                </button>
                {newsHerbNames.map(name => (
                  <button
                    key={name}
                    onClick={() => { setSelectedHerb(name); setCurrentPage(1); }}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium ${
                      selectedHerb === name
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-bg text-primary border border-primary/20 hover:bg-primary hover:text-white'
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
    </div>
  );
}
