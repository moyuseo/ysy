import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Eye, Tag } from 'lucide-react';
import { newsList } from '../../data/news';
import { formatDate } from '../../utils/format';

const CATEGORIES = [
  { key: '', label: '全部' },
  { key: 'analysis', label: '品种分析' },
  { key: 'dynamic', label: '药市动态' },
  { key: 'origin', label: '产地快报' },
  { key: 'policy', label: '政策法规' },
  { key: 'review', label: '涨跌盘点' },
];

const PAGE_SIZE = 12;

export default function NewsPage() {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    let result = newsList;

    if (category) {
      result = result.filter(n => n.category === category);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.summary.toLowerCase().includes(query)
      );
    }

    return result;
  }, [category, searchQuery]);

  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNews.slice(start, start + PAGE_SIZE);
  }, [filteredNews, currentPage]);

  const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE);

  const featuredNews = filteredNews[0];
  const recentNews = filteredNews.slice(1, 5);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-ink tracking-wide mb-2">资讯动态</h1>
        <p className="text-ink-light">中药材行业最新资讯，把握市场脉搏</p>
      </div>

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
            placeholder="搜索资讯..."
            className="input-antique pl-10 w-60"
          />
        </div>
      </div>

      {currentPage === 1 && !category && !searchQuery && featuredNews && (
        <div className="mb-10">
          <div className="paper-card p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-antique badge-cinnabar">头条</span>
                  <span className="text-xs text-ink-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(featuredNews.createdAt)}
                  </span>
                </div>
                <Link to={`/news/${featuredNews.id}`}>
                  <h2 className="font-serif text-2xl text-ink hover:text-indigo transition-colors mb-4 leading-relaxed">
                    {featuredNews.title}
                  </h2>
                </Link>
                <p className="text-ink-light leading-relaxed mb-4">{featuredNews.summary}</p>
                <div className="flex items-center gap-4 text-sm text-ink-muted">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {featuredNews.views} 阅读
                  </span>
                  <Link to={`/news/${featuredNews.id}`} className="text-indigo hover:text-indigo-dark font-medium transition-colors">
                    阅读全文 →
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-80 shrink-0">
                <div className="grid grid-cols-2 gap-3">
                  {recentNews.map(news => (
                    <Link
                      key={news.id}
                      to={`/news/${news.id}`}
                      className="p-4 bg-paper-warm border border-paper-dark rounded hover:border-indigo transition-colors group"
                    >
                      <div className="text-xs text-ink-muted mb-2">{formatDate(news.createdAt)}</div>
                      <h3 className="text-sm text-ink group-hover:text-indigo transition-colors line-clamp-2 font-medium">
                        {news.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagedNews.map((news, idx) => (
          <Link
            key={news.id}
            to={`/news/${news.id}`}
            className="paper-card p-6 group animate-fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge-antique ${
                news.category === 'analysis' ? 'badge-cinnabar' :
                news.category === 'dynamic' ? 'badge-indigo' :
                news.category === 'origin' ? 'badge-ochre' :
                news.category === 'policy' ? 'badge-jade' : 'badge-indigo'
              }`}>
                {CATEGORIES.find(c => c.key === news.category)?.label || '资讯'}
              </span>
              <span className="text-xs text-ink-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(news.createdAt)}
              </span>
            </div>
            <h3 className="font-serif text-lg text-ink group-hover:text-indigo transition-colors mb-3 line-clamp-2">
              {news.title}
            </h3>
            <p className="text-sm text-ink-light line-clamp-2 mb-4">{news.summary}</p>
            <div className="flex items-center justify-between text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {news.views} 阅读
              </span>
              {news.herbNames.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{news.herbNames.slice(0, 2).join('、')}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {pagedNews.length === 0 && (
        <div className="text-center py-16 text-ink-muted">暂无相关资讯</div>
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
  );
}
