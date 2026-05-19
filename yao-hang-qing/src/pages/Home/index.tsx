import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { prices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import PriceTable from '../../components/PriceTable/PriceTable';
import NewsCard from '../../components/NewsCard/NewsCard';
import { formatChange } from '../../utils/format';

const pinnedNews = newsList.filter((n) => n.isPinned);
const carouselSlides = pinnedNews.length > 0 ? pinnedNews.slice(0, 3) : newsList.slice(0, 3);

const sortedByMonthlyUp = [...prices]
  .filter((p) => p.monthlyChange > 0)
  .sort((a, b) => b.monthlyChange - a.monthlyChange);
const sortedByMonthlyDown = [...prices]
  .filter((p) => p.monthlyChange < 0)
  .sort((a, b) => a.monthlyChange - b.monthlyChange);

const top5Up = sortedByMonthlyUp.slice(0, 5);
const top5Down = sortedByMonthlyDown.slice(0, 5);

const hotHerbs = herbs.slice(0, 15);

const supplyTrades = trades.filter((t) => t.type === 'supply').slice(0, 4);
const demandTrades = trades.filter((t) => t.type === 'demand').slice(0, 4);

const recommendedNews = [
  ...newsList.filter((n) => n.isPinned),
  ...newsList.filter((n) => !n.isPinned),
].slice(0, 4);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [priceTab, setPriceTab] = useState<'market' | 'origin'>('market');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const top5Prices = prices.slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl">
        <div className="relative h-56 md:h-64">
          {carouselSlides.map((slide, idx) => (
            <Link
              key={slide.id}
              to={`/news/${slide.id}`}
              className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-700 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                {slide.isPinned && (
                  <span className="mb-2 inline-block rounded bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    置顶
                  </span>
                )}
                <h2 className="text-xl font-bold text-white md:text-2xl line-clamp-2">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm text-white/80 line-clamp-1">{slide.summary}</p>
              </div>
            </Link>
          ))}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center border-l-4 border-primary pl-3">
          <h2 className="text-lg font-bold text-text">今日涨跌速览</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-3 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-up" />
                <span className="text-sm font-medium text-up">涨幅榜 TOP5</span>
              </div>
              <div className="space-y-2">
                {top5Up.map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-white ${
                        idx < 3 ? 'bg-up' : 'bg-stable'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <Link
                      to={`/herb/${p.herbId}`}
                      className="flex-1 text-sm text-text hover:text-primary hover:underline"
                    >
                      {p.herbName}
                    </Link>
                    <span className="font-data text-sm text-up">
                      {formatChange(p.monthlyChange)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-down" />
                <span className="text-sm font-medium text-down">跌幅榜 TOP5</span>
              </div>
              <div className="space-y-2">
                {top5Down.map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-white ${
                        idx < 3 ? 'bg-down' : 'bg-stable'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <Link
                      to={`/herb/${p.herbId}`}
                      className="flex-1 text-sm text-text hover:text-primary hover:underline"
                    >
                      {p.herbName}
                    </Link>
                    <span className="font-data text-sm text-down">
                      {formatChange(p.monthlyChange)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/rank"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              查看完整排行 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-medium text-text">热门药材</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {hotHerbs.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="rounded-md bg-primary/5 px-2 py-2 text-center text-sm text-text transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center border-l-4 border-primary pl-3">
            <h2 className="text-lg font-bold text-text">市场价格快报</h2>
          </div>
          <Link
            to="/price"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            查看更多 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mb-3 flex gap-1">
          <button
            type="button"
            onClick={() => setPriceTab('market')}
            className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors ${
              priceTab === 'market'
                ? 'bg-primary text-white'
                : 'bg-bg text-text-secondary hover:text-text'
            }`}
          >
            市场价格
          </button>
          <button
            type="button"
            onClick={() => setPriceTab('origin')}
            className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors ${
              priceTab === 'origin'
                ? 'bg-primary text-white'
                : 'bg-bg text-text-secondary hover:text-text'
            }`}
          >
            产地价格
          </button>
        </div>
        <PriceTable prices={top5Prices} />
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center border-l-4 border-primary pl-3">
          <h2 className="text-lg font-bold text-text">最新供求</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-text">供应信息</span>
              <Link
                to="/trade?type=supply"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                更多供应 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {supplyTrades.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Link
                      to={`/herb/${t.herbId}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {t.herbName}
                    </Link>
                    <span className="text-xs text-text-secondary">{t.spec}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
                    <span>数量: {t.quantity}</span>
                    <span>产地: {t.origin}</span>
                    <span className="font-data text-text">{t.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-text">求购信息</span>
              <Link
                to="/trade?type=demand"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                更多求购 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {demandTrades.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Link
                      to={`/herb/${t.herbId}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {t.herbName}
                    </Link>
                    <span className="text-xs text-text-secondary">{t.spec}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
                    <span>数量: {t.quantity}</span>
                    <span>产地: {t.origin}</span>
                    {t.quoteCount !== undefined && <span>报价: {t.quoteCount}条</span>}
                    {t.remainingDays !== undefined && <span>剩余: {t.remainingDays}天</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center border-l-4 border-primary pl-3">
            <h2 className="text-lg font-bold text-text">推荐资讯</h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            查看更多资讯 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedNews.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </section>
    </div>
  );
}
