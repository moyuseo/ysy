import { useState, useMemo } from 'react';
import { wikiArticles } from '../../data/wiki';
import { herbs } from '../../data/herbs';
import { CATEGORIES, WIKI_CATEGORY_LABELS } from '../../utils/constants';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';

const TABS = [
  { key: 'knowledge', label: '药材知识' },
  { key: 'planting', label: '种植技术' },
  { key: 'regulation', label: '新闻法规' },
];

const PAGE_SIZE = 8;

const PLANTING_ITEMS = [
  { key: 'planting-guide', label: '种植指南' },
  { key: 'pest-control', label: '病虫害防治' },
  { key: 'harvest', label: '采收加工' },
];

const REGULATION_ITEMS = [
  { key: 'policy', label: '政策法规' },
  { key: 'standard', label: '质量标准' },
  { key: 'certification', label: '认证规范' },
];

export default function WikiPage() {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [activeSidebar, setActiveSidebar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const herbMap = useMemo(() => {
    const map = new Map<string, typeof herbs[number]>();
    for (const herb of herbs) {
      map.set(herb.name, herb);
    }
    return map;
  }, []);

  const filteredArticles = useMemo(() => {
    let result = [...wikiArticles];

    result = result.filter(a => a.category === activeTab);

    if (activeSidebar !== 'all') {
      const isCategoryFilter = CATEGORIES.some(c => c.key === activeSidebar);
      if (isCategoryFilter) {
        result = result.filter(a => {
          if (!a.herbName) return false;
          const herb = herbMap.get(a.herbName);
          return herb?.category === activeSidebar;
        });
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, activeSidebar, searchQuery, herbMap]);

  const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);
  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSidebar('all');
    setCurrentPage(1);
    setExpandedId(null);
  };

  const handleSidebarChange = (key: string) => {
    setActiveSidebar(key);
    setCurrentPage(1);
    setExpandedId(null);
  };

  const sidebarItems = useMemo(() => {
    if (activeTab === 'planting') return PLANTING_ITEMS;
    if (activeTab === 'regulation') return REGULATION_ITEMS;
    return [];
  }, [activeTab]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text">知识百科</h1>

      <TabNav tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />

      <div className="flex gap-6">
        <aside className="w-1/4 shrink-0 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold text-text">品种分类</h3>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleSidebarChange('all')}
                  className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                    activeSidebar === 'all'
                      ? 'bg-primary text-white font-medium'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-text'
                  }`}
                >
                  全部品种
                </button>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.key}>
                  <button
                    type="button"
                    onClick={() => handleSidebarChange(cat.key)}
                    className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                      activeSidebar === cat.key
                        ? 'bg-primary text-white font-medium'
                        : 'text-text-secondary hover:bg-bg-secondary hover:text-text'
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {sidebarItems.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-text">专题分类</h3>
              <ul className="space-y-1">
                {sidebarItems.map(item => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => handleSidebarChange(item.key)}
                      className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                        activeSidebar === item.key
                          ? 'bg-primary text-white font-medium'
                          : 'text-text-secondary hover:bg-bg-secondary hover:text-text'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <main className="w-3/4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 pl-10 text-sm text-text outline-none placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {pagedArticles.length === 0 ? (
            <div className="rounded-lg border border-border bg-card py-16 text-center text-sm text-text-secondary">
              暂无相关文章
            </div>
          ) : (
            <div className="space-y-3">
              {pagedArticles.map(article => (
                <div
                  key={article.id}
                  className="rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                        className="text-base font-semibold text-text hover:text-primary transition-colors text-left"
                      >
                        {article.title}
                      </button>
                      {article.herbName && (
                        <span className="ml-2 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          {article.herbName}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 rounded bg-bg-secondary px-2 py-0.5 text-xs text-text-secondary">
                      {WIKI_CATEGORY_LABELS[article.category]}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                    {article.summary}
                  </p>

                  {expandedId === article.id && (
                    <div className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-text-secondary whitespace-pre-line">
                      {article.content}
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-text-tertiary">
                      <span>{article.createdAt}</span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      阅读全文 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
