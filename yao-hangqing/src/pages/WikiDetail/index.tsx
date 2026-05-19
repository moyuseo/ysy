import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Leaf } from 'lucide-react';
import { wikiList } from '../../data/wiki';
import { herbs } from '../../data/herbs';

const CATEGORY_LABELS: Record<string, string> = {
  basic: '基础知识',
  identification: '鉴别方法',
  processing: '炮制工艺',
  storage: '储藏养护',
};

export default function WikiDetail() {
  const { id } = useParams<{ id: string }>();

  const wiki = wikiList.find(w => w.id === id);

  if (!wiki) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="py-16 text-center">
          <BookOpen className="w-16 h-16 text-paper-dark mx-auto mb-6" />
          <p className="font-serif text-xl text-ink-light mb-4">知识未找到</p>
          <Link
            to="/wiki"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回药材百科
          </Link>
        </div>
      </div>
    );
  }

  const relatedHerbs = herbs.filter(h => wiki.relatedHerbs.includes(h.name));
  const relatedWiki = wikiList
    .filter(w => w.category === wiki.category && w.id !== wiki.id)
    .slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <nav className="text-sm text-ink-muted mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-indigo transition-colors">首页</Link>
        <span className="text-paper-dark">/</span>
        <Link to="/wiki" className="hover:text-indigo transition-colors">药材百科</Link>
        <span className="text-paper-dark">/</span>
        <span className="text-ink font-medium">{CATEGORY_LABELS[wiki.category] || '知识'}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%]">
          <div className="paper-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge-antique badge-indigo">
                {CATEGORY_LABELS[wiki.category] || '知识'}
              </span>
            </div>
            <h1 className="font-serif text-3xl text-ink mb-8 leading-relaxed tracking-wide">
              {wiki.title}
            </h1>
            <div className="ink-divider mb-8" />
            <div className="space-y-6">
              {wiki.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-ink-light leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%]">
          {relatedHerbs.length > 0 && (
            <div className="paper-card p-6 mb-6">
              <h2 className="font-serif text-base text-ink font-semibold mb-4 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-jade" />
                相关药材
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedHerbs.map(herb => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="px-3 py-1.5 text-sm text-jade bg-jade-muted rounded hover:bg-jade hover:text-white transition-colors"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedWiki.length > 0 && (
            <div className="paper-card p-6">
              <h2 className="font-serif text-base text-ink font-semibold mb-4">相关知识</h2>
              <ul className="space-y-4">
                {relatedWiki.map(w => (
                  <li key={w.id} className="border-b border-paper-dark pb-4 last:border-0 last:pb-0">
                    <Link
                      to={`/wiki/${w.id}`}
                      className="text-sm text-ink hover:text-indigo transition-colors line-clamp-2 block mb-2 font-medium"
                    >
                      {w.title}
                    </Link>
                    <p className="text-xs text-ink-muted line-clamp-1">{w.summary}</p>
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
