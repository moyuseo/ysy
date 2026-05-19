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
      <div className="container py-10">
        <div className="py-16 text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <p className="font-serif text-xl text-slate-500 mb-4">知识未找到</p>
          <Link
            to="/wiki"
            className="btn btn-p inline-flex items-center gap-2"
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
    <div className="container py-10">
      <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2 anim-up">
        <Link to="/" className="hover:text-green-700 transition-colors">首页</Link>
        <span className="text-slate-300">/</span>
        <Link to="/wiki" className="hover:text-green-700 transition-colors">药材百科</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium">{CATEGORY_LABELS[wiki.category] || '知识'}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%] anim-up d1">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-tag">
                {CATEGORY_LABELS[wiki.category] || '知识'}
              </span>
            </div>
            <h1 className="font-serif text-3xl text-slate-900 mb-8 leading-relaxed tracking-wide">
              {wiki.title}
            </h1>
            <div className="divider mb-8" />
            <div className="space-y-6">
              {wiki.content.split('\n\n').map((paragraph, idx) => (
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
                  <Leaf className="w-4 h-4 text-green-700" />
                  相关药材
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

          {relatedWiki.length > 0 && (
            <div className="card">
              <div className="card-head">
                <h2 className="section-title text-base">相关知识</h2>
              </div>
              <div className="card-body">
                <ul className="space-y-4">
                  {relatedWiki.map(w => (
                    <li key={w.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <Link
                        to={`/wiki/${w.id}`}
                        className="text-sm text-slate-900 hover:text-green-700 transition-colors line-clamp-2 block mb-2 font-medium"
                      >
                        {w.title}
                      </Link>
                      <p className="text-xs text-slate-400 line-clamp-1">{w.summary}</p>
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
