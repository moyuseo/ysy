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
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Search className="w-6 h-6 text-indigo" />
          <h1 className="font-serif text-4xl text-ink tracking-wide">搜索结果</h1>
        </div>
        {query && (
          <p className="text-ink-light">
            找到 <span className="font-semibold text-ink">{totalResults}</span> 条与 "<span className="text-indigo font-semibold">{query}</span>" 相关的结果
          </p>
        )}
      </div>

      {!query && (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-paper-dark mx-auto mb-6" />
          <p className="text-ink-light text-lg">请输入搜索关键词</p>
        </div>
      )}

      {query && totalResults === 0 && (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-paper-dark mx-auto mb-6" />
          <p className="text-ink-light text-lg mb-2">未找到相关结果</p>
          <p className="text-ink-muted text-sm">请尝试其他关键词</p>
        </div>
      )}

      {query && results.herbs.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl text-ink mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-jade" />
            药材品种 ({results.herbs.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.herbs.slice(0, 12).map(herb => (
              <Link
                key={herb.id}
                to={`/herb/${herb.id}`}
                className="paper-card p-4 text-center hover:border-indigo transition-colors group"
              >
                <div className="font-serif text-lg text-ink group-hover:text-indigo transition-colors">
                  {herb.name}
                </div>
                <div className="text-xs text-ink-muted mt-1">{herb.family}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {query && results.prices.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl text-ink mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cinnabar" />
            价格行情 ({results.prices.length})
          </h2>
          <div className="paper-card overflow-hidden">
            <table className="table-antique">
              <thead>
                <tr>
                  <th className="px-5 py-3">品种</th>
                  <th className="px-5 py-3">规格</th>
                  <th className="px-5 py-3">市场</th>
                  <th className="px-5 py-3 text-right">今日价</th>
                  <th className="px-5 py-3 text-right">月涨跌</th>
                </tr>
              </thead>
              <tbody>
                {results.prices.slice(0, 10).map(price => (
                  <tr key={price.id}>
                    <td className="px-5 py-3">
                      <Link to={`/herb/${price.herbId}`} className="text-indigo hover:text-indigo-dark font-semibold transition-colors">
                        {price.herbName}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-ink-light">{price.spec}</td>
                    <td className="px-5 py-3 text-ink-light">{price.market}</td>
                    <td className="px-5 py-3 text-right font-mono font-semibold">{formatPrice(price.currentPrice)}</td>
                    <td className={`px-5 py-3 text-right font-mono font-semibold ${price.monthlyChange > 0 ? 'text-cinnabar' : price.monthlyChange < 0 ? 'text-jade' : 'text-ink-muted'}`}>
                      {formatChange(price.monthlyChange)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {query && results.news.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl text-ink mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo" />
            相关资讯 ({results.news.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.news.slice(0, 6).map(news => (
              <Link key={news.id} to={`/news/${news.id}`} className="paper-card p-5 group">
                <h3 className="text-ink group-hover:text-indigo transition-colors font-medium mb-2 line-clamp-1">
                  {news.title}
                </h3>
                <p className="text-sm text-ink-light line-clamp-2">{news.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {query && results.wiki.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl text-ink mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ochre" />
            相关知识 ({results.wiki.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.wiki.slice(0, 6).map(wiki => (
              <Link key={wiki.id} to={`/wiki/${wiki.id}`} className="paper-card p-5 group">
                <h3 className="text-ink group-hover:text-indigo transition-colors font-medium mb-2">
                  {wiki.title}
                </h3>
                <p className="text-sm text-ink-light line-clamp-2">{wiki.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
