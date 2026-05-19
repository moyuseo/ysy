import { Link } from 'react-router-dom';
import type { News } from '../../types';
import { NEWS_CATEGORY_LABELS } from '../../utils/constants';
import { formatFullDate } from '../../utils/format';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link
      to={`/news/${news.id}`}
      className="block rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        {news.isPinned && (
          <span className="rounded bg-gold/20 px-1.5 py-0.5 text-xs font-medium text-gold">
            置顶
          </span>
        )}
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
          {NEWS_CATEGORY_LABELS[news.category]}
        </span>
      </div>

      <h3 className="mb-1 text-sm font-medium text-text line-clamp-1">{news.title}</h3>

      <p className="mb-2 text-xs text-text-secondary line-clamp-2">{news.summary}</p>

      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <span>{formatFullDate(news.createdAt)}</span>
        <span>{news.views} 阅读</span>
      </div>
    </Link>
  );
}
