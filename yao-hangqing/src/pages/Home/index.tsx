import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Package, ShoppingCart, Newspaper, Leaf } from 'lucide-react';
import { marketPrices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import PriceTable from '../../components/PriceTable';
import { formatChange, formatDate } from '../../utils/format';

const topRisers = [...marketPrices]
  .sort((a, b) => b.monthlyChange - a.monthlyChange)
  .slice(0, 5);

const topFallers = [...marketPrices]
  .sort((a, b) => a.monthlyChange - b.monthlyChange)
  .slice(0, 5);

const hotHerbs = herbs.slice(0, 15);

const latestPrices = marketPrices.slice(0, 8);

const supplyTrades = trades.filter(t => t.type === 'supply').slice(0, 4);
const demandTrades = trades.filter(t => t.type === 'demand').slice(0, 4);

const latestNews = newsList.slice(0, 4);

const categoryLabels: Record<string, string> = {
  analysis: '品种分析',
  dynamic: '药市动态',
  origin: '产地快报',
  policy: '新闻法规',
  review: '涨跌盘点',
};

const riseCount = marketPrices.filter(p => p.monthlyChange > 0).length;
const fallCount = marketPrices.filter(p => p.monthlyChange < 0).length;

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-10">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">中药材行情信息平台</h1>
            <p className="text-white/80 text-base">实时追踪中药材市场价格，洞察行业动态，助力供需对接</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-primary-lighter" />
                <span className="text-white/70 text-sm">覆盖品种</span>
              </div>
              <div className="text-2xl font-bold">{herbs.length}<span className="text-sm font-normal ml-1">种</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Newspaper className="w-4 h-4 text-primary-lighter" />
                <span className="text-white/70 text-sm">今日更新</span>
              </div>
              <div className="text-2xl font-bold">{marketPrices.length}<span className="text-sm font-normal ml-1">条</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-red-300" />
                <span className="text-white/70 text-sm">涨</span>
              </div>
              <div className="text-2xl font-bold text-red-300">{riseCount}<span className="text-sm font-normal ml-1">种</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-green-300" />
                <span className="text-white/70 text-sm">跌</span>
              </div>
              <div className="text-2xl font-bold text-green-300">{fallCount}<span className="text-sm font-normal ml-1">种</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 mt-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[60%]">
            <div className="bg-card rounded-lg shadow-sm border border-border p-5">
              <h2 className="font-serif text-xl border-l-4 border-primary pl-3 mb-4">今日涨跌速览</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">涨幅榜</span>
                  </div>
                  <ul className="space-y-2">
                    {topRisers.map((item) => (
                      <li key={item.id} className="flex items-center justify-between text-sm">
                        <Link to={`/herb/${item.herbId}`} className="text-text hover:text-primary transition-colors truncate max-w-[50%]">
                          {item.herbName}
                          <span className="text-text-secondary ml-1 text-xs">{item.spec}</span>
                        </Link>
                        <span className="text-red-600 font-mono font-medium">{formatChange(item.monthlyChange)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">跌幅榜</span>
                  </div>
                  <ul className="space-y-2">
                    {topFallers.map((item) => (
                      <li key={item.id} className="flex items-center justify-between text-sm">
                        <Link to={`/herb/${item.herbId}`} className="text-text hover:text-primary transition-colors truncate max-w-[50%]">
                          {item.herbName}
                          <span className="text-text-secondary ml-1 text-xs">{item.spec}</span>
                        </Link>
                        <span className="text-green-600 font-mono font-medium">{formatChange(item.monthlyChange)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[40%]">
            <div className="bg-card rounded-lg shadow-sm border border-border p-5 h-full">
              <h2 className="font-serif text-xl border-l-4 border-primary pl-3 mb-4">热门品种</h2>
              <div className="flex flex-wrap gap-2">
                {hotHerbs.map(herb => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="inline-block px-3 py-1.5 text-sm bg-fall-bg text-primary rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 mb-8">
        <div className="bg-card rounded-lg shadow-sm border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl border-l-4 border-primary pl-3">市场行情快报</h2>
            <Link to="/price" className="text-primary-light text-sm hover:text-primary flex items-center gap-1 transition-colors">
              查看更多 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <PriceTable prices={latestPrices} />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="bg-card rounded-lg shadow-sm border border-border p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl border-l-4 border-primary pl-3">供应信息</h2>
                <Link to="/trade" className="text-primary-light text-sm hover:text-primary flex items-center gap-1 transition-colors">
                  更多 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <ul className="space-y-3">
                {supplyTrades.map(trade => (
                  <li key={trade.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <Link to={`/trade/${trade.id}`} className="font-medium text-text hover:text-primary transition-colors">
                        {trade.herbName}
                        <span className="text-text-secondary text-xs ml-1.5">{trade.spec}</span>
                      </Link>
                      <span className="text-primary font-mono text-sm font-medium">{trade.price}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {trade.quantity}
                      </span>
                      <span>{trade.origin}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-card rounded-lg shadow-sm border border-border p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl border-l-4 border-primary pl-3">求购信息</h2>
                <Link to="/trade" className="text-primary-light text-sm hover:text-primary flex items-center gap-1 transition-colors">
                  更多 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <ul className="space-y-3">
                {demandTrades.map(trade => (
                  <li key={trade.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <Link to={`/trade/${trade.id}`} className="font-medium text-text hover:text-primary transition-colors">
                        {trade.herbName}
                        <span className="text-text-secondary text-xs ml-1.5">{trade.spec}</span>
                      </Link>
                      <span className="text-primary font-mono text-sm font-medium">{trade.price}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        {trade.quantity}
                      </span>
                      <span>{trade.quoteCount}条报价</span>
                      <span>剩余{trade.remainingDays}天</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl border-l-4 border-primary pl-3">推荐资讯</h2>
          <Link to="/news" className="text-primary-light text-sm hover:text-primary flex items-center gap-1 transition-colors">
            更多 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestNews.map(news => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded bg-fall-bg text-primary font-medium">
                  {categoryLabels[news.category]}
                </span>
                <span className="text-xs text-text-secondary">{formatDate(news.createdAt)}</span>
              </div>
              <h3 className="text-sm font-medium text-text line-clamp-2 mb-2 flex-1">{news.title}</h3>
              <div className="text-xs text-text-secondary">{news.views} 次浏览</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
