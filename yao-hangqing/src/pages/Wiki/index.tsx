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

const CATEGORY_BADGE: Record<string, string> = {
  basic: 'badge-tag',
  identification: 'badge-up',
  processing: 'badge-warn',
  storage: 'badge-tag',
};

const DELAY_CLASSES = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'];

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
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="section-title mb-2">药材百科</h1>
        <p className="text-slate-500">中药材知识宝库，传承千年智慧</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[70%]">
          <div className="flex gap-3 mb-8 items-center flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setCategory(cat.key); setCurrentPage(1); }}
                className={`btn ${category === cat.key ? 'btn-p' : 'btn-s'}`}
              >
                {cat.label}
              </button>
            ))}

            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="搜索知识..."
                className="inp pl-10 w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pagedWiki.map((wiki, idx) => (
              <Link
                key={wiki.id}
                to={`/wiki/${wiki.id}`}
                className={`card card-body group anim-up ${DELAY_CLASSES[idx % 8] || ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-700 transition-colors">
                    <BookOpen className="w-6 h-6 text-green-700 group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${CATEGORY_BADGE[wiki.category] || 'badge-tag'}`}>
                        {CATEGORIES.find(c => c.key === wiki.category)?.label || '知识'}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-slate-800 group-hover:text-green-700 transition-colors mb-2">
                      {wiki.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{wiki.summary}</p>
                    {wiki.relatedHerbs.length > 0 && (
                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
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
            <div className="text-center py-16 text-slate-400">暂无相关知识</div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-s disabled:opacity-40 disabled:cursor-not-allowed"
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
                    className={`btn ${currentPage === page ? 'btn-p' : 'btn-s'}`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-s disabled:opacity-40 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-[30%] shrink-0">
          <div className="card mb-6">
            <div className="card-head">
              <h3 className="font-serif text-base text-slate-800 font-semibold flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-700" />
                热门药材
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-0">
                {hotHerbs.map(herb => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="flex items-center justify-between py-2.5 group"
                  >
                    <span className="text-sm text-slate-700 group-hover:text-green-700 transition-colors font-medium">
                      {herb.name}
                    </span>
                    <span className="text-xs text-slate-400">{herb.family}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <h3 className="font-serif text-base text-slate-800 font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-700" />
                知识分类
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-2">
                {CATEGORIES.filter(c => c.key).map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    className="w-full text-left btn btn-s justify-start"
                  >
                    {cat.label}
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
