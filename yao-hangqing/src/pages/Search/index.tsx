import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-rise" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-fall" />;
    return <Minus className="w-4 h-4 text-stable" />;
  };

  const getTrendClass = (trend: string) => {
    if (trend === 'up') return 'text-rise';
    if (trend === 'down') return 'text-fall';
    return 'text-stable';
  };

  return (
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">搜索</h1>
            <p className="text-lg text-primary-100">
              查找中药材品种、资讯和市场信息
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入药材名称、别名或拼音搜索..."
              className="w-full border-0 rounded-2xl pl-16 pr-36 py-5 text-lg bg-white text-text shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              搜索
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {searchTerm.trim() && (
          <>
            {/* Results Info */}
            <div className="mb-8 text-lg">
              <span className="text-text-muted">搜索</span>
              <span className="text-text font-bold mx-2">"{searchTerm}"</span>
              <span className="text-text-muted">共找到</span>
              <span className="text-primary font-bold mx-2">{filteredHerbs.length}</span>
              <span className="text-text-muted">个品种</span>
              {relatedNews.length > 0 && (
                <>
                  <span className="text-text-muted">，</span>
                  <span className="text-primary font-bold mx-2">{relatedNews.length}</span>
                  <span className="text-text-muted">条资讯</span>
                </>
              )}
            </div>

            {/* Category Filters */}
            {categoriesWithResults.length > 1 && (
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => setCategoryFilter('')}
                  className={`px-5 py-2.5 text-sm rounded-full transition-all duration-300 font-medium ${
                    categoryFilter === ''
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-card text-primary border border-primary/20 hover:bg-primary hover:text-white'
                  }`}
                >
                  全部
                </button>
                {categoriesWithResults.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-5 py-2.5 text-sm rounded-full transition-all duration-300 font-medium ${
                      categoryFilter === cat
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-card text-primary border border-primary/20 hover:bg-primary hover:text-white'
                    }`}
                  >
                    {CATEGORY_MAP[cat] || cat}
                  </button>
                ))}
              </div>
            )}

            {/* Herb Results */}
            {filteredHerbs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {filteredHerbs.map(herb => {
                  const priceInfo = getHerbPrice(herb.id);
                  return (
                    <div
                      key={herb.id}
                      className="bg-card rounded-2xl border border-border-light shadow-sm p-7 hover:shadow-lg transition-all duration-300 card-hover"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Link
                            to={`/herb/${herb.id}`}
                            className="text-xl font-semibold text-text hover:text-primary transition-colors"
                          >
                            {herb.name}
                          </Link>
                          {herb.alias.length > 0 && (
                            <span className="text-text-muted text-sm ml-2">
                              （{herb.alias.slice(0, 3).join('、')}）
                            </span>
                          )}
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {CATEGORY_MAP[herb.category] || herb.category}
                        </span>
                      </div>

                      {priceInfo && (
                        <div className="flex items-center gap-4 mb-4 text-lg">
                          <span className="text-text font-bold font-mono">{formatPrice(priceInfo.currentPrice)}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-mono font-bold ${getTrendClass(priceInfo.trend)}`}>
                              {formatChange(priceInfo.monthlyChange)}
                            </span>
                            {getTrendIcon(priceInfo.trend)}
                          </div>
                          <span className="text-text-muted text-sm">{priceInfo.market}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>产地：{herb.origin.join('、')}</span>
                      </div>

                      <p className="text-text-muted leading-relaxed mb-4 line-clamp-2">
                        {herb.effect}
                      </p>

                      <Link
                        to={`/herb/${herb.id}`}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-700 transition-colors font-medium"
                      >
                        查看详情
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center mb-10">
                <p className="text-text-secondary text-lg">未找到匹配的药材品种</p>
              </div>
            )}

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-text border-l-4 border-primary pl-3 mb-6">
                  相关资讯
                </h2>
                <div className="space-y-4">
                  {relatedNews.map(news => (
                    <Link
                      key={news.id}
                      to={`/news/${news.id}`}
                      className="block bg-card rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {news.category === 'analysis' ? '品种分析' :
                           news.category === 'dynamic' ? '药市动态' :
                           news.category === 'origin' ? '产地快报' :
                           news.category === 'policy' ? '新闻法规' : '涨跌盘点'}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-text hover:text-primary transition-colors mb-2">
                        {news.title}
                      </h3>
                      <p className="text-text-muted line-clamp-2">{news.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!searchTerm.trim() && (
          <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center">
            <Search className="w-16 h-16 text-border-light mx-auto mb-4" />
            <p className="text-text-secondary text-lg">输入关键词开始搜索中药材品种和资讯</p>
          </div>
        )}
      </div>
    </div>
  );
}
