import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import { NEWS_CATEGORY_LABELS } from '../../utils/constants';
import { formatFullDate } from '../../utils/format';
import NewsCard from '../../components/NewsCard/NewsCard';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();

  const news = useMemo(() => newsList.find((n) => n.id === id), [id]);

  const herbMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const herb of herbs) {
      map.set(herb.name, herb.id);
    }
    return map;
  }, []);

  const relatedNews = useMemo(() => {
    if (!news) return [];
    return newsList
      .filter((n) => n.category === news.category && n.id !== news.id)
      .slice(0, 3);
  }, [news]);

  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-4 text-lg text-text-secondary">未找到该资讯</p>
        <Link to="/news" className="text-primary hover:underline">
          返回资讯中心
        </Link>
      </div>
    );
  }

  const paragraphs = news.content.split('\n').filter((p) => p.trim() !== '');

  return (
    <div className="space-y-4">
      <nav className="flex items-center gap-2 text-sm text-text-secondary">
        <Link to="/" className="hover:text-primary">
          首页
        </Link>
        <span>/</span>
        <Link to="/news" className="hover:text-primary">
          资讯中心
        </Link>
        <span>/</span>
        <Link
          to={`/news?tab=${news.category}`}
          className="hover:text-primary"
        >
          {NEWS_CATEGORY_LABELS[news.category]}
        </Link>
        <span>/</span>
        <span className="text-text line-clamp-1">{news.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        <div className="lg:col-span-7">
          <article className="rounded-lg border border-border bg-card p-6">
            <h1 className="mb-3 text-xl font-bold font-serif text-text">
              {news.title}
            </h1>

            <div className="mb-6 flex items-center gap-3 text-xs text-text-secondary">
              <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                {NEWS_CATEGORY_LABELS[news.category]}
              </span>
              <span>{formatFullDate(news.createdAt)}</span>
              <span>{news.views} 阅读</span>
            </div>

            <div className="space-y-4 text-sm leading-7 text-text">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-text">关联品种</h3>
            <div className="flex flex-wrap gap-2">
              {news.herbNames.map((name) => {
                const herbId = herbMap.get(name);
                return herbId ? (
                  <Link
                    key={name}
                    to={`/herb/${herbId}`}
                    className="rounded-md bg-primary/5 px-2.5 py-1.5 text-xs text-text transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {name}
                  </Link>
                ) : (
                  <span
                    key={name}
                    className="rounded-md bg-primary/5 px-2.5 py-1.5 text-xs text-text"
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-text">相关资讯</h3>
            <div className="space-y-3">
              {relatedNews.length > 0 ? (
                relatedNews.map((n) => <NewsCard key={n.id} news={n} />)
              ) : (
                <p className="text-xs text-text-secondary">暂无相关资讯</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
