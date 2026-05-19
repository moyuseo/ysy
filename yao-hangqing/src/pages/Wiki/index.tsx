import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { wikiArticles } from '../../data/wiki';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';
import { formatDate } from '../../utils/format';

const TABS = [
  { key: 'knowledge', label: '药材知识' },
  { key: 'planting', label: '种植技术' },
  { key: 'regulation', label: '新闻法规' },
];

const CATEGORY_LABELS: Record<string, string> = {
  knowledge: '药材知识',
  planting: '种植技术',
  regulation: '新闻法规',
};

const PAGE_SIZE = 10;

export default function WikiPage() {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredArticles = useMemo(() => {
    let result = wikiArticles.filter(a => a.category === activeTab);
    if (selectedCategory) {
      result = result.filter(a => a.herbName === selectedCategory);
    }
    return result;
  }, [activeTab, selectedCategory]);

  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  const articleHerbNames = useMemo(() => {
    const names = new Set<string>();
    wikiArticles.filter(a => a.category === activeTab).forEach(a => {
      if (a.herbName) names.add(a.herbName);
    });
    return Array.from(names);
  }, [activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">知识百科</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              专业的药材知识库，汇集种植技术、行业法规、药材知识
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
          {/* Sidebar - Category Tree */}
          <div className="w-full lg:w-1/4">
            <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6 sticky top-6">
              <h2 className="font-serif text-xl font-semibold text-text border-l-4 border-primary pl-3 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                分类目录
              </h2>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 font-medium ${
                      selectedCategory === ''
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-muted hover:bg-bg hover:text-text'
                    }`}
                  >
                    全部文章
                  </button>
                </li>
                {articleHerbNames.map(name => (
                  <li key={name}>
                    <button
                      onClick={() => { setSelectedCategory(name); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 font-medium ${
                        selectedCategory === name
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-muted hover:bg-bg hover:text-text'
                      }`}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {pagedArticles.length > 0 ? (
              <div className="space-y-6">
                {pagedArticles.map(article => (
                  <div
                    key={article.id}
                    className="bg-card rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {CATEGORY_LABELS[article.category]}
                      </span>
                      {article.herbName && (
                        <span className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold font-medium">
                          {article.herbName}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-3">{article.title}</h3>
                    <p className="text-text-secondary leading-relaxed mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span>{formatDate(article.createdAt)}</span>
                      <span>{article.views} 次浏览</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center">
                <p className="text-text-secondary">暂无相关文章</p>
              </div>
            )}

            <div className="mt-8">
              <Pagination
                current={currentPage}
                total={filteredArticles.length}
                pageSize={PAGE_SIZE}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
