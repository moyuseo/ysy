import { useParams, Link } from 'react-router-dom';
import { Home, ChevronRight, Eye } from 'lucide-react';
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

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();

  const news = newsList.find(n => n.id === id);

  if (!news) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center">
            <p className="text-text-secondary text-xl mb-4">资讯未找到</p>
            <Link to="/news" className="inline-flex items-center gap-2 text-primary hover:text-primary-700 transition-colors">
              <Home className="w-4 h-4" />
              返回资讯中心
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedHerbs = herbs.filter(h => news.herbIds.includes(h.id));
  const relatedNews = newsList
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-12 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-100 mb-8">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              首页
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/news" className="hover:text-white transition-colors">
              资讯中心
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{CATEGORY_LABELS[news.category]}</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4">
              {CATEGORY_LABELS[news.category]}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {news.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-primary-100">
              <span>{formatDateTime(news.createdAt)}</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {news.views} 次浏览
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-card rounded-2xl border border-border-light shadow-sm p-8">
              <article className="prose prose-lg max-w-none">
                {news.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-text leading-relaxed mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </article>

              {/* Related Herbs Tags */}
              {relatedHerbs.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border-light">
                  <h3 className="font-serif text-lg font-semibold text-text mb-4">
                    相关品种
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {relatedHerbs.map(herb => (
                      <Link
                        key={herb.id}
                        to={`/herb/${herb.id}`}
                        className="inline-flex items-center px-4 py-2 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                      >
                        {herb.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6">
                <h3 className="font-serif text-xl font-semibold text-text border-l-4 border-primary pl-3 mb-6">
                  相关资讯
                </h3>
                <ul className="space-y-4">
                  {relatedNews.map(n => (
                    <li key={n.id} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
                      <Link
                        to={`/news/${n.id}`}
                        className="text-text hover:text-primary transition-colors font-medium line-clamp-2 block mb-2"
                      >
                        {n.title}
                      </Link>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span>{formatDateTime(n.createdAt)}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
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
    </div>
  );
}
