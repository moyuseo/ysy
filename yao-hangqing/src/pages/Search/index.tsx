import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { marketPrices } from '../../data/prices';
import { newsList } from '../../data/news';
import { formatPrice, formatChange } from '../../utils/format';

const CATEGORY_MAP: Record<string, string> = {
  root: '根及根茎类',
  fruit: '果实种子类',
  herb: '全草类',
  flower: '花类',
  leaf: '叶类',
  bark: '树皮类',
  vine: '藤木类',
  animal: '动物类',
  mineral: '矿石类',
  fungus: '菌藻类',
  spice: '香料类',
  other: '其他',
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState('');

  const matchedHerbs = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.trim().toLowerCase();
    return herbs.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.alias.some(a => a.toLowerCase().includes(q)) ||
      h.pinyin.toLowerCase().includes(q) ||
      h.pinyinInitial.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const categoriesWithResults = useMemo(() => {
    const cats = new Set(matchedHerbs.map(h => h.category));
    return Array.from(cats);
  }, [matchedHerbs]);

  const filteredHerbs = useMemo(() => {
    if (!categoryFilter) return matchedHerbs;
    return matchedHerbs.filter(h => h.category === categoryFilter);
  }, [matchedHerbs, categoryFilter]);

  const relatedNews = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.trim().toLowerCase();
    return newsList.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.herbNames.some(name => name.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(query);
    setCategoryFilter('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const getHerbPrices = (herbId: string) => {
    return marketPrices.filter(p => p.herbId === herbId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入药材名称、别名或拼音搜索..."
            className="w-full border border-border rounded-lg pl-12 pr-24 py-3.5 text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface-raised"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white px-5 py-2 rounded-md text-sm hover:bg-accent/90 transition-colors"
          >
            搜索
          </button>
        </div>
      </div>

      {searchTerm.trim() && (
        <>
          <div className="mb-5 text-sm text-text-secondary">
            搜索 "<span className="text-text font-medium">{searchTerm}</span>" 共找到 <span className="text-text font-medium">{filteredHerbs.length}</span> 个品种
            {relatedNews.length > 0 && `、${relatedNews.length} 条资讯`}
          </div>

          {categoriesWithResults.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => setCategoryFilter('')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  categoryFilter === ''
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-accent hover:bg-accent-muted'
                }`}
              >
                全部
              </button>
              {categoriesWithResults.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    categoryFilter === cat
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-accent hover:bg-accent-muted'
                  }`}
                >
                  {CATEGORY_MAP[cat] || cat}
                </button>
              ))}
            </div>
          )}

          {filteredHerbs.length > 0 ? (
            <div className="space-y-4 mb-8">
              {filteredHerbs.map(herb => {
                const prices = getHerbPrices(herb.id);
                const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.currentPrice)) : null;
                const maxPrice = prices.length > 0 ? Math.max(...prices.map(p => p.currentPrice)) : null;
                return (
                  <div
                    key={herb.id}
                    className="border-b border-border-subtle py-4"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <Link
                        to={`/herb/${herb.id}`}
                        className="font-medium text-text hover:text-accent transition-colors"
                      >
                        {herb.name}
                      </Link>
                      {herb.alias.length > 0 && (
                        <span className="text-xs text-text-tertiary">
                          {herb.alias.slice(0, 3).join('、')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-accent-muted text-accent">
                        {CATEGORY_MAP[herb.category] || herb.category}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {herb.family}
                      </span>
                    </div>

                    {prices.length > 0 && minPrice !== null && maxPrice !== null && (
                      <div className="mb-2 flex items-center gap-4 text-sm">
                        <span className="text-text">
                          {minPrice === maxPrice
                            ? formatPrice(minPrice)
                            : `${formatPrice(minPrice)} ~ ${formatPrice(maxPrice)}`}
                        </span>
                        {prices[0] && (
                          <span
                            className={
                              prices[0].trend === 'up'
                                ? 'text-rise'
                                : prices[0].trend === 'down'
                                  ? 'text-fall'
                                  : 'text-text-tertiary'
                            }
                          >
                            {formatChange(prices[0].monthlyChange)}
                          </span>
                        )}
                        <span className="text-xs text-text-tertiary">
                          {prices.map(p => p.market).join('、')}
                        </span>
                      </div>
                    )}

                    <div className="text-xs text-text-tertiary mb-2">
                      产地：{herb.origin.join('、')}
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-1 mb-2">
                      {herb.effect}
                    </p>

                    <Link
                      to={`/herb/${herb.id}`}
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      查看详情
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-text-secondary mb-8">
              未找到匹配的药材品种
            </div>
          )}

          {relatedNews.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-text mb-4">相关资讯</h2>
              <div className="space-y-3">
                {relatedNews.map(news => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="block border-b border-border-subtle py-3 hover:bg-surface-raised transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-accent-muted text-accent">
                        {news.category === 'analysis' ? '品种分析' :
                         news.category === 'dynamic' ? '药市动态' :
                         news.category === 'origin' ? '产地快报' :
                         news.category === 'policy' ? '新闻法规' : '涨跌盘点'}
                      </span>
                      <span className="text-xs text-text-tertiary">{news.createdAt}</span>
                    </div>
                    <h3 className="text-sm text-text">{news.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!searchTerm.trim() && (
        <div className="py-8 text-center">
          <Search className="w-12 h-12 text-border mx-auto mb-3" />
          <p className="text-text-secondary">输入关键词开始搜索中药材品种和资讯</p>
        </div>
      )}
    </div>
  );
}
