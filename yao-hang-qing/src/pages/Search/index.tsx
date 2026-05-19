import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { prices } from '../../data/prices';
import { newsList } from '../../data/news';
import { CATEGORY_LABELS } from '../../data/categories';
import { matchPinyin, formatPrice, formatChange, getTrendClass } from '../../utils/format';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const matchedHerbs = useMemo(() => {
    if (!query.trim()) return [];
    return herbs.filter((herb) => {
      const nameMatch = matchPinyin(query, herb.pinyin, herb.pinyinInitial, herb.name);
      const aliasMatch = herb.alias.some((a) => a.includes(query.toLowerCase().trim()));
      const tagMatch = herb.tags.some((t) => t.includes(query.toLowerCase().trim()));
      return nameMatch || aliasMatch || tagMatch;
    });
  }, [query]);

  const categoryTabs = useMemo(() => {
    const counts = new Map<string, number>();
    matchedHerbs.forEach((h) => {
      counts.set(h.category, (counts.get(h.category) || 0) + 1);
    });
    const tabs = [{ key: 'all', label: '全部', count: matchedHerbs.length }];
    Object.entries(CATEGORY_LABELS).forEach(([key, label]) => {
      const count = counts.get(key);
      if (count) {
        tabs.push({ key, label, count });
      }
    });
    return tabs;
  }, [matchedHerbs]);

  const filteredHerbs = useMemo(() => {
    if (activeCategory === 'all') return matchedHerbs;
    return matchedHerbs.filter((h) => h.category === activeCategory);
  }, [matchedHerbs, activeCategory]);

  const relatedNews = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return newsList.filter((n) =>
      n.herbNames.some((name) => name.toLowerCase().includes(q)) ||
      n.title.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
      setActiveCategory('all');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索药材名称、拼音、别名..."
            className="w-full rounded-lg border border-border bg-card py-3 pl-12 pr-4 text-base text-text placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-light"
          >
            搜索
          </button>
        </div>
      </div>

      {!query.trim() && (
        <div className="py-20 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-border" />
          <p className="text-lg text-text-secondary">请输入搜索关键词</p>
        </div>
      )}

      {query.trim() && matchedHerbs.length === 0 && relatedNews.length === 0 && (
        <div className="py-20 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-border" />
          <p className="text-lg text-text-secondary">未找到相关结果</p>
        </div>
      )}

      {query.trim() && (matchedHerbs.length > 0 || relatedNews.length > 0) && (
        <>
          <div className="mb-4">
            <p className="text-sm text-text-secondary">
              找到 <span className="font-medium text-text">{matchedHerbs.length}</span> 个相关品种
            </p>
          </div>

          {categoryTabs.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === tab.key
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border text-text-secondary hover:text-text hover:border-primary'
                  }`}
                >
                  {tab.label}
                  <span className="ml-1 text-xs">({tab.count})</span>
                </button>
              ))}
            </div>
          )}

          {filteredHerbs.length > 0 && (
            <div className="mb-8 space-y-4">
              {filteredHerbs.map((herb) => {
                const price = prices.find((p) => p.herbId === herb.id);
                return (
                  <div
                    key={herb.id}
                    className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Link
                        to={`/herb/${herb.id}`}
                        className="text-lg font-bold text-text hover:text-primary"
                      >
                        {herb.name}
                      </Link>
                      {herb.alias.length > 0 && (
                        <span className="text-sm text-text-secondary">
                          ({herb.alias.join('、')})
                        </span>
                      )}
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {CATEGORY_LABELS[herb.category]}
                      </span>
                      <span className="rounded border border-border bg-bg px-2 py-0.5 text-xs font-medium text-text-secondary">
                        {herb.family}
                      </span>
                    </div>

                    <div className="mb-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                      {price && (
                        <div className="flex items-center gap-2">
                          <span className="text-text-secondary">价格:</span>
                          <span className="font-data font-medium text-text">
                            {formatPrice(price.currentPrice)}
                          </span>
                          <span className={`font-data text-xs ${getTrendClass(price.trend)}`}>
                            {formatChange(price.dailyChange)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-text-secondary">产地:</span>
                        <span className="text-text">{herb.origin.join('、')}</span>
                      </div>
                    </div>

                    <p className="mb-3 text-sm text-text-secondary line-clamp-2">
                      {herb.effect}
                    </p>

                    <Link
                      to={`/herb/${herb.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      查看详情 →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {relatedNews.length > 0 && (
            <div>
              <div className="mb-4 flex items-center border-l-4 border-primary pl-3">
                <h2 className="text-lg font-bold text-text">相关资讯</h2>
              </div>
              <div className="space-y-3">
                {relatedNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="block rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                        {news.category === 'analysis' ? '行情分析' :
                         news.category === 'dynamic' ? '市场动态' :
                         news.category === 'origin' ? '产地快报' :
                         news.category === 'policy' ? '政策法规' : '行情回顾'}
                      </span>
                      <h3 className="flex-1 text-sm font-medium text-text line-clamp-1">
                        {news.title}
                      </h3>
                      <span className="text-xs text-text-secondary">{news.createdAt}</span>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2">{news.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
