import { useState, useMemo } from 'react';
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

export default function Wiki() {
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
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="font-serif text-2xl font-bold text-text mb-6">知识百科</h1>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[25%]">
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm sticky top-20">
            <h2 className="font-serif text-base border-l-4 border-primary pl-3 mb-4">分类目录</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedCategory === ''
                      ? 'bg-fall-bg text-primary font-medium'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  全部文章
                </button>
              </li>
              {articleHerbNames.map(name => (
                <li key={name}>
                  <button
                    onClick={() => { setSelectedCategory(name); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedCategory === name
                        ? 'bg-fall-bg text-primary font-medium'
                        : 'text-text-secondary hover:bg-gray-50'
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-[75%]">
          {pagedArticles.length > 0 ? (
            <div className="space-y-4">
              {pagedArticles.map(article => (
                <div
                  key={article.id}
                  className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-fall-bg text-primary font-medium">
                      {CATEGORY_LABELS[article.category]}
                    </span>
                    {article.herbName && (
                      <span className="text-xs px-2 py-0.5 rounded bg-gold/10 text-gold font-medium">
                        {article.herbName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-medium text-text mb-2">{article.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">{article.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>{formatDate(article.createdAt)}</span>
                    <span>{article.views} 次浏览</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm text-center">
              <p className="text-text-secondary">暂无相关文章</p>
            </div>
          )}

          <Pagination
            current={currentPage}
            total={filteredArticles.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
