import { useParams, Link } from 'react-router-dom';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import { formatDateTime } from '../../utils/format';
import { Eye, CalendarDays, Tag, ArrowLeft } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  analysis: '品种分析',
  dynamic: '药市动态',
  origin: '产地快报',
  policy: '新闻法规',
  review: '涨跌盘点',
};

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();

  const news = newsList.find(n => n.id === id);

  if (!news) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-text-secondary text-lg mb-3">资讯未找到</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-primary hover:text-primary-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回资讯中心
          </Link>
        </div>
      </div>
    );
  }

  const relatedHerbs = herbs.filter(h => news.herbIds.includes(h.id));
  const relatedNews = newsList
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <nav className="text-sm text-text-secondary mb-4 flex items-center gap-1.5">
        <Link to="/" className="hover:text-primary transition-colors">首页</Link>
        <span className="text-border">&gt;</span>
        <Link to="/news" className="hover:text-primary transition-colors">资讯中心</Link>
        <span className="text-border">&gt;</span>
        <span className="text-text">{CATEGORY_LABELS[news.category]}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[70%]">
          <div className="bg-card rounded-lg border border-border p-6">
            <span className="inline-block px-2 py-0.5 rounded bg-fall-bg text-primary text-xs font-medium mb-3">
              {CATEGORY_LABELS[news.category]}
            </span>
            <h1 className="font-serif text-2xl font-bold text-text mb-4">{news.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary mb-6 pb-4 border-b border-divider">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {formatDateTime(news.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {news.views} 次浏览
              </span>
            </div>
            <div className="space-y-4">
              {news.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-text leading-relaxed text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] space-y-6">
          {relatedHerbs.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">关联品种</h2>
              <div className="flex flex-wrap gap-2">
                {relatedHerbs.map(herb => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-fall-bg text-primary rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedNews.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">相关资讯</h2>
              <ul className="space-y-3">
                {relatedNews.map(n => (
                  <li key={n.id} className="border-b border-divider pb-3 last:border-0 last:pb-0">
                    <Link
                      to={`/news/${n.id}`}
                      className="text-sm text-text hover:text-primary transition-colors line-clamp-2 block mb-1.5"
                    >
                      {n.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {formatDateTime(n.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {n.views}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
