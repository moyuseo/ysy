import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
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

  const getHerbPrice = (herbId: string) => {
    const prices = marketPrices.filter(p => p.herbId === herbId);
    if (prices.length === 0) return null;
    return prices[0];
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入药材名称、别名或拼音搜索..."
            className="w-full border border-border rounded-lg pl-12 pr-4 py-3 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-md text-sm hover:bg-primary-light transition-colors"
          >
            搜索
          </button>
        </div>
      </div>

      {searchTerm.trim() && (
        <>
          <div className="mb-4 text-sm text-text-secondary">
            搜索 "<span className="text-text font-medium">{searchTerm}</span>" 共找到 <span className="text-text font-medium">{filteredHerbs.length}</span> 个品种
            {relatedNews.length > 0 && `、${relatedNews.length} 条资讯`}
          </div>

          {categoriesWithResults.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setCategoryFilter('')}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  categoryFilter === ''
                    ? 'bg-primary text-white border-primary'
                    : 'bg-fall-bg text-primary border-primary/20 hover:bg-primary hover:text-white'
                }`}
              >
                全部
              </button>
              {categoriesWithResults.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    categoryFilter === cat
                      ? 'bg-primary text-white border-primary'
                      : 'bg-fall-bg text-primary border-primary/20 hover:bg-primary hover:text-white'
                  }`}
                >
                  {CATEGORY_MAP[cat] || cat}
                </button>
              ))}
            </div>
          )}

          {filteredHerbs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filteredHerbs.map(herb => {
                const priceInfo = getHerbPrice(herb.id);
                return (
                  <div
                    key={herb.id}
                    className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link
                          to={`/herb/${herb.id}`}
                          className="text-base font-medium text-text hover:text-primary transition-colors"
                        >
                          {herb.name}
                        </Link>
                        {herb.alias.length > 0 && (
                          <span className="text-text-secondary text-xs ml-2">
                            （{herb.alias.slice(0, 3).join('、')}）
                          </span>
                        )}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-fall-bg text-primary shrink-0">
                        {CATEGORY_MAP[herb.category] || herb.category}
                      </span>
                    </div>

                    {priceInfo && (
                      <div className="flex items-center gap-3 mb-2 text-sm">
                        <span className="text-text font-medium">{formatPrice(priceInfo.currentPrice)}</span>
                        <span
                          className={
                            priceInfo.trend === 'up'
                              ? 'text-rise'
                              : priceInfo.trend === 'down'
                                ? 'text-fall'
                                : 'text-stable'
                          }
                        >
                          {formatChange(priceInfo.monthlyChange)}
                        </span>
                        <span className="text-text-secondary text-xs">{priceInfo.market}</span>
                      </div>
                    )}

                    <div className="text-xs text-text-secondary mb-2">
                      产地：{herb.origin.join('、')}
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                      {herb.effect}
                    </p>
                    <Link
                      to={`/herb/${herb.id}`}
                      className="text-sm text-primary hover:text-primary-light transition-colors"
                    >
                      查看详情 →
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm text-center mb-8">
              <p className="text-text-secondary">未找到匹配的药材品种</p>
            </div>
          )}

          {relatedNews.length > 0 && (
            <div>
              <h2 className="font-serif text-xl border-l-4 border-primary pl-3 mb-4">相关资讯</h2>
              <div className="space-y-3">
                {relatedNews.map(news => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="block bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-fall-bg text-primary font-medium">
                        {news.category === 'analysis' ? '品种分析' :
                         news.category === 'dynamic' ? '药市动态' :
                         news.category === 'origin' ? '产地快报' :
                         news.category === 'policy' ? '新闻法规' : '涨跌盘点'}
                      </span>
                      <span className="text-xs text-text-secondary">{news.createdAt}</span>
                    </div>
                    <h3 className="text-sm font-medium text-text">{news.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!searchTerm.trim() && (
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm text-center">
          <Search className="w-12 h-12 text-border mx-auto mb-3" />
          <p className="text-text-secondary">输入关键词开始搜索中药材品种和资讯</p>
        </div>
      )}
    </div>
  );
}
