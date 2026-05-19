import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import { formatDateTime } from '../../utils/format';

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="py-8 text-center">
          <p className="text-text-secondary text-lg mb-3">资讯未找到</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="text-sm text-text-secondary mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-accent transition-colors">首页</Link>
        <span className="text-border">&gt;</span>
        <Link to="/news" className="hover:text-accent transition-colors">资讯中心</Link>
        <span className="text-border">&gt;</span>
        <span className="text-text">{CATEGORY_LABELS[news.category]}</span>
      </nav>

      <div className="flex gap-8">
        <div className="w-[70%]">
          <span className="inline-block px-2 py-0.5 text-xs text-accent bg-accent-muted rounded mb-3">
            {CATEGORY_LABELS[news.category]}
          </span>
          <h1 className="font-display text-2xl text-text mb-4">{news.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-6 pb-4 border-b border-border-subtle">
            <span>{formatDateTime(news.createdAt)}</span>
            <span>{news.views} 次浏览</span>
          </div>
          <div className="space-y-4">
            {news.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-text leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="w-[30%]">
          {relatedHerbs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-text mb-4">关联品种</h2>
              <div className="flex flex-wrap gap-2">
                {relatedHerbs.map(herb => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="px-3 py-1 text-sm text-accent bg-accent-muted rounded hover:bg-accent hover:text-white transition-colors"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedNews.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-text mb-4">相关资讯</h2>
              <ul className="space-y-3">
                {relatedNews.map(n => (
                  <li key={n.id} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                    <Link
                      to={`/news/${n.id}`}
                      className="text-sm text-text-secondary hover:text-accent transition-colors line-clamp-2 block mb-1"
                    >
                      {n.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-text-tertiary">
                      <span>{formatDateTime(n.createdAt)}</span>
                      <span>{n.views} 次</span>
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
