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

const CATEGORY_BADGE: Record<string, string> = {
  analysis: 'badge-up',
  dynamic: 'badge-tag',
  origin: 'badge-warn',
  policy: 'badge-tag',
  review: 'badge-up',
};

const DELAY_CLASSES = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'];

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
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="section-title mb-2">资讯动态</h1>
        <p className="text-slate-500">中药材行业最新资讯，把握市场脉搏</p>
      </div>

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
            placeholder="搜索资讯..."
            className="inp pl-10 w-60"
          />
        </div>
      </div>

      {currentPage === 1 && !category && !searchQuery && featuredNews && (
        <div className="mb-10 anim-up d1">
          <div className="card p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge badge-up">头条</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(featuredNews.createdAt)}
                  </span>
                </div>
                <Link to={`/news/${featuredNews.id}`}>
                  <h2 className="font-serif text-2xl text-slate-800 hover:text-green-700 transition-colors mb-4 leading-relaxed">
                    {featuredNews.title}
                  </h2>
                </Link>
                <p className="text-slate-600 leading-relaxed mb-4">{featuredNews.summary}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {featuredNews.views} 阅读
                  </span>
                  <Link to={`/news/${featuredNews.id}`} className="text-green-700 hover:text-green-800 font-medium transition-colors">
                    阅读全文 →
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-80 shrink-0">
                <div className="grid grid-cols-2 gap-3">
                  {recentNews.map((news, idx) => (
                    <Link
                      key={news.id}
                      to={`/news/${news.id}`}
                      className={`p-4 bg-green-50 border border-green-100 rounded-lg hover:border-green-400 transition-colors group anim-up ${DELAY_CLASSES[idx] || ''}`}
                    >
                      <div className="text-xs text-slate-400 mb-2">{formatDate(news.createdAt)}</div>
                      <h3 className="text-sm text-slate-700 group-hover:text-green-700 transition-colors line-clamp-2 font-medium">
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
            className={`card card-body group anim-up ${DELAY_CLASSES[idx % 8] || ''}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${CATEGORY_BADGE[news.category] || 'badge-tag'}`}>
                {CATEGORIES.find(c => c.key === news.category)?.label || '资讯'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(news.createdAt)}
              </span>
            </div>
            <h3 className="font-serif text-lg text-slate-800 group-hover:text-green-700 transition-colors mb-3 line-clamp-2">
              {news.title}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{news.summary}</p>
            <div className="divider mb-4" />
            <div className="flex items-center justify-between text-xs text-slate-500">
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
        <div className="text-center py-16 text-slate-400">暂无相关资讯</div>
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
  );
}
