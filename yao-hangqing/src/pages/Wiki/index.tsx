import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Leaf, Tag } from 'lucide-react';
import { wikiList } from '../../data/wiki';
import { herbs } from '../../data/herbs';

const CATEGORIES = [
  { key: '', label: '全部' },
  { key: 'basic', label: '基础知识' },
  { key: 'identification', label: '鉴别方法' },
  { key: 'processing', label: '炮制工艺' },
  { key: 'storage', label: '储藏养护' },
];

const PAGE_SIZE = 12;

export default function WikiPage() {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWiki = useMemo(() => {
    let result = wikiList;

    if (category) {
      result = result.filter(w => w.category === category);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(w =>
        w.title.toLowerCase().includes(query) ||
        w.summary.toLowerCase().includes(query)
      );
    }

    return result;
  }, [category, searchQuery]);

  const pagedWiki = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredWiki.slice(start, start + PAGE_SIZE);
  }, [filteredWiki, currentPage]);

  const totalPages = Math.ceil(filteredWiki.length / PAGE_SIZE);

  const hotHerbs = herbs.slice(0, 8);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-ink tracking-wide mb-2">药材百科</h1>
        <p className="text-ink-light">中药材知识宝库，传承千年智慧</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex gap-3 mb-8 items-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setCategory(cat.key); setCurrentPage(1); }}
                className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                  category === cat.key
                    ? 'bg-indigo text-white shadow-md'
                    : 'bg-paper-warm text-ink-light border border-paper-dark hover:border-indigo hover:text-ink'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="搜索知识..."
                className="input-antique pl-10 w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pagedWiki.map((wiki, idx) => (
              <Link
                key={wiki.id}
                to={`/wiki/${wiki.id}`}
                className="paper-card p-6 group animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-indigo-muted rounded flex items-center justify-center group-hover:bg-indigo transition-colors">
                    <BookOpen className="w-6 h-6 text-indigo group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge-antique text-[10px] ${
                        wiki.category === 'basic' ? 'badge-indigo' :
                        wiki.category === 'identification' ? 'badge-cinnabar' :
                        wiki.category === 'processing' ? 'badge-ochre' : 'badge-jade'
                      }`}>
                        {CATEGORIES.find(c => c.key === wiki.category)?.label || '知识'}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-ink group-hover:text-indigo transition-colors mb-2">
                      {wiki.title}
                    </h3>
                    <p className="text-sm text-ink-light line-clamp-2">{wiki.summary}</p>
                    {wiki.relatedHerbs.length > 0 && (
                      <div className="flex items-center gap-2 mt-3 text-xs text-ink-muted">
                        <Tag className="w-3 h-3" />
                        <span>{wiki.relatedHerbs.slice(0, 3).join('、')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {pagedWiki.length === 0 && (
            <div className="text-center py-16 text-ink-muted">暂无相关知识</div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium rounded border-2 border-paper-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo hover:text-indigo transition-colors bg-paper"
              >
                上一页
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 text-sm font-medium rounded border-2 transition-all ${
                      currentPage === page
                        ? 'bg-indigo text-white border-indigo shadow-md'
                        : 'border-paper-dark hover:border-indigo hover:text-indigo bg-paper'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium rounded border-2 border-paper-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo hover:text-indigo transition-colors bg-paper"
              >
                下一页
              </button>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="paper-card p-6 mb-6">
            <h3 className="font-serif text-lg text-ink font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-jade" />
              热门药材
            </h3>
            <div className="space-y-3">
              {hotHerbs.map(herb => (
                <Link
                  key={herb.id}
                  to={`/herb/${herb.id}`}
                  className="flex items-center justify-between py-2 border-b border-paper-dark last:border-0 group"
                >
                  <span className="text-sm text-ink group-hover:text-indigo transition-colors font-medium">
                    {herb.name}
                  </span>
                  <span className="text-xs text-ink-muted">{herb.family}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="paper-card p-6">
            <h3 className="font-serif text-lg text-ink font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo" />
              知识分类
            </h3>
            <div className="space-y-2">
              {CATEGORIES.filter(c => c.key).map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className="w-full text-left px-4 py-3 text-sm bg-paper-warm border border-paper-dark rounded hover:border-indigo hover:text-indigo transition-colors"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
