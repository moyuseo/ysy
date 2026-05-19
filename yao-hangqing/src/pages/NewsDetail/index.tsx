import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Calendar, Eye, BookOpen } from 'lucide-react';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import { formatDateTime } from '../../utils/format';

const CATEGORY_LABELS: Record<string, string> = {
  analysis: '品种分析',
  dynamic: '药市动态',
  origin: '产地快报',
  policy: '新闻法规',
  review: '涨跌盘点',
  market: '市场动态',
  industry: '行业资讯',
};

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();

  const news = newsList.find(n => n.id === id);

  if (!news) {
    return (
      <div className="container py-10">
        <div className="py-16 text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <p className="font-serif text-xl text-slate-500 mb-4">资讯未找到</p>
          <Link
            to="/news"
            className="btn btn-p inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回资讯中心
          </Link>
        </div>
      </div>
    );
  }

  const relatedHerbs = herbs.filter(h => news.herbIds?.includes(h.id) || news.herbNames.includes(h.name));
  const relatedNews = newsList
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 4);

  return (
    <div className="container py-10">
      <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2 anim-up">
        <Link to="/" className="hover:text-green-700 transition-colors">首页</Link>
        <span className="text-slate-300">/</span>
        <Link to="/news" className="hover:text-green-700 transition-colors">资讯中心</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium">{CATEGORY_LABELS[news.category] || '资讯'}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%] anim-up d1">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-up">
                {CATEGORY_LABELS[news.category] || '资讯'}
              </span>
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDateTime(news.createdAt)}
              </span>
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {news.views} 阅读
              </span>
            </div>
            <h1 className="font-serif text-3xl text-slate-900 mb-8 leading-relaxed tracking-wide">
              {news.title}
            </h1>
            <div className="divider mb-8" />
            <div className="space-y-6">
              {news.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] anim-up d2">
          {relatedHerbs.length > 0 && (
            <div className="card mb-6">
              <div className="card-head">
                <h2 className="section-title text-base flex items-center gap-2">
                  <Tag className="w-4 h-4 text-green-700" />
                  关联品种
                </h2>
              </div>
              <div className="card-body">
                <div className="flex flex-wrap gap-2">
                  {relatedHerbs.map(herb => (
                    <Link
                      key={herb.id}
                      to={`/herb/${herb.id}`}
                      className="badge badge-tag hover:bg-green-200 transition-colors cursor-pointer"
                    >
                      {herb.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {relatedNews.length > 0 && (
            <div className="card">
              <div className="card-head">
                <h2 className="section-title text-base">相关资讯</h2>
              </div>
              <div className="card-body">
                <ul className="space-y-4">
                  {relatedNews.map(n => (
                    <li key={n.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <Link
                        to={`/news/${n.id}`}
                        className="text-sm text-slate-900 hover:text-green-700 transition-colors line-clamp-2 block mb-2 font-medium"
                      >
                        {n.title}
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{formatDateTime(n.createdAt)}</span>
                        <span>{n.views} 阅读</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
