import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, TrendingUp, Leaf, BookOpen } from 'lucide-react';
import { marketPrices } from '../../data/prices';
import { herbs } from '../../data/herbs';
import { newsList } from '../../data/news';
import { wikiList } from '../../data/wiki';
import { formatPrice, formatChange } from '../../utils/format';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return { herbs: [], prices: [], news: [], wiki: [] };

    const q = query.trim().toLowerCase();

    const matchedHerbs = herbs.filter(h =>
      h.name.includes(q) ||
      h.pinyin.toLowerCase().startsWith(q) ||
      h.pinyinInitial.toLowerCase().startsWith(q) ||
      h.alias.some(a => a.includes(q))
    );

    const matchedPrices = marketPrices.filter(p =>
      p.herbName.toLowerCase().includes(q)
    );

    const matchedNews = newsList.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q)
    );

    const matchedWiki = wikiList.filter(w =>
      w.title.toLowerCase().includes(q) ||
      w.summary.toLowerCase().includes(q)
    );

    return { herbs: matchedHerbs, prices: matchedPrices, news: matchedNews, wiki: matchedWiki };
  }, [query]);

  const totalResults = results.herbs.length + results.prices.length + results.news.length + results.wiki.length;

  return (
    <div className="container py-10">
      <div className="mb-10 anim-up">
        <div className="flex items-center gap-3 mb-3">
          <Search className="w-6 h-6 text-green-700" />
          <h1 className="section-title">搜索结果</h1>
        </div>
        {query && (
          <p className="text-slate-500">
            找到 <span className="font-semibold text-slate-900">{totalResults}</span> 条与 "<span className="text-green-700 font-semibold">{query}</span>" 相关的结果
          </p>
        )}
      </div>

      {!query && (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <p className="text-slate-500 text-lg">请输入搜索关键词</p>
        </div>
      )}

      {query && totalResults === 0 && (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <p className="text-slate-500 text-lg mb-2">未找到相关结果</p>
          <p className="text-slate-400 text-sm">请尝试其他关键词</p>
        </div>
      )}

      {query && results.herbs.length > 0 && (
        <div className="mb-10 anim-up d1">
          <h2 className="section-title mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-700" />
            药材品种 ({results.herbs.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.herbs.slice(0, 12).map(herb => (
              <Link
                key={herb.id}
                to={`/herb/${herb.id}`}
                className="card p-4 text-center hover:border-green-400 transition-colors group"
              >
                <div className="font-serif text-lg text-slate-900 group-hover:text-green-700 transition-colors">
                  {herb.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{herb.family}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {query && results.prices.length > 0 && (
        <div className="mb-10 anim-up d2">
          <h2 className="section-title mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            价格行情 ({results.prices.length})
          </h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>品种</th>
                    <th>规格</th>
                    <th>市场</th>
                    <th className="text-right">今日价</th>
                    <th className="text-right">月涨跌</th>
                  </tr>
                </thead>
                <tbody>
                  {results.prices.slice(0, 10).map(price => (
                    <tr key={price.id}>
                      <td>
                        <Link to={`/herb/${price.herbId}`} className="text-green-700 hover:text-green-600 font-semibold transition-colors">
                          {price.herbName}
                        </Link>
                      </td>
                      <td className="text-slate-500">{price.spec}</td>
                      <td className="text-slate-500">{price.market}</td>
                      <td className="text-right prc">{formatPrice(price.currentPrice)}</td>
                      <td className="text-right">
                        <span className={`chg ${price.monthlyChange > 0 ? 'chg-up' : price.monthlyChange < 0 ? 'chg-down' : 'badge-flat'}`}>
                          {formatChange(price.monthlyChange)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {query && results.news.length > 0 && (
        <div className="mb-10 anim-up d3">
          <h2 className="section-title mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-700" />
            相关资讯 ({results.news.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.news.slice(0, 6).map(news => (
              <Link key={news.id} to={`/news/${news.id}`} className="card p-5 group">
                <h3 className="text-slate-900 group-hover:text-green-700 transition-colors font-medium mb-2 line-clamp-1">
                  {news.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{news.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {query && results.wiki.length > 0 && (
        <div className="mb-10 anim-up d4">
          <h2 className="section-title mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-700" />
            相关知识 ({results.wiki.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.wiki.slice(0, 6).map(wiki => (
              <Link key={wiki.id} to={`/wiki/${wiki.id}`} className="card p-5 group">
                <h3 className="text-slate-900 group-hover:text-green-700 transition-colors font-medium mb-2">
                  {wiki.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{wiki.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
