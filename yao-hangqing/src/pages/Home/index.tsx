import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Package, ShoppingCart, Newspaper, Leaf, Zap, Eye, MapPin, Calendar } from 'lucide-react';
import { marketPrices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import PriceTable from '../../components/PriceTable/PriceTable';
import { formatChange, formatDate, formatPrice } from '../../utils/format';

const topRisers = [...marketPrices]
  .sort((a, b) => b.monthlyChange - a.monthlyChange)
  .slice(0, 6);

const topFallers = [...marketPrices]
  .sort((a, b) => a.monthlyChange - b.monthlyChange)
  .slice(0, 6);

const hotHerbs = herbs.slice(0, 12);
const latestPrices = marketPrices.slice(0, 8);
const supplyTrades = trades.filter(t => t.type === 'supply').slice(0, 4);
const demandTrades = trades.filter(t => t.type === 'demand').slice(0, 4);
const latestNews = newsList.slice(0, 4);

const riseCount = marketPrices.filter(p => p.monthlyChange > 0).length;
const fallCount = marketPrices.filter(p => p.monthlyChange < 0).length;
const stableCount = marketPrices.length - riseCount - fallCount;

const CATEGORY_LABELS = {
  analysis: '品种分析',
  dynamic: '药市动态',
  origin: '产地快报',
  policy: '新闻法规',
  review: '涨跌盘点',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              中药材行情信息平台
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto">
              实时追踪中药材市场价格，洞察行业动态，精准对接供求信息，助力您的业务决策
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 text-center border border-white/10">
              <div className="text-3xl font-bold mb-1">{herbs.length}</div>
              <div className="text-primary-200 text-sm flex items-center justify-center gap-1.5">
                <Leaf className="w-4 h-4" />
                覆盖品种
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 text-center border border-white/10">
              <div className="text-3xl font-bold mb-1">{marketPrices.length}</div>
              <div className="text-primary-200 text-sm flex items-center justify-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                行情数据
              </div>
            </div>
            <div className="bg-rise/20 backdrop-blur-sm rounded-2xl px-6 py-5 text-center border border-rise/20">
              <div className="text-3xl font-bold text-rise-100 mb-1">{riseCount}</div>
              <div className="text-rise-100/80 text-sm flex items-center justify-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                上涨品种
              </div>
            </div>
            <div className="bg-fall/20 backdrop-blur-sm rounded-2xl px-6 py-5 text-center border border-fall/20">
              <div className="text-3xl font-bold text-fall-100 mb-1">{fallCount}</div>
              <div className="text-fall-100/80 text-sm flex items-center justify-center gap-1.5">
                <TrendingDown className="w-4 h-4" />
                下跌品种
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-10 relative z-20">
        {/* Quick Market Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-card rounded-2xl shadow-md border border-border-light p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rise-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-rise" />
                </div>
                <h2 className="font-serif text-lg font-semibold text-text">今日涨幅榜</h2>
              </div>
              <Link to="/rank" className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
                全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {topRisers.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/herb/${item.herbId}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-primary-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${idx === 0 ? 'bg-gold-50 text-gold' : idx === 1 ? 'bg-gray-100 text-gray-500' : idx === 2 ? 'bg-orange-50 text-orange-600' : 'bg-bg-alt text-text-muted'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text group-hover:text-primary transition-colors">{item.herbName}</div>
                      <div className="text-xs text-text-muted">{item.spec} · {item.market}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold text-rise">+{formatChange(item.monthlyChange)}</div>
                    <div className="font-mono text-sm text-text-muted">{formatPrice(item.currentPrice)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-md border border-border-light p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fall-50 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-fall" />
                </div>
                <h2 className="font-serif text-lg font-semibold text-text">今日跌幅榜</h2>
              </div>
              <Link to="/rank" className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
                全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {topFallers.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/herb/${item.herbId}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-primary-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${idx === 0 ? 'bg-red-50 text-red-500' : idx === 1 ? 'bg-gray-100 text-gray-500' : idx === 2 ? 'bg-orange-50 text-orange-600' : 'bg-bg-alt text-text-muted'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text group-hover:text-primary transition-colors">{item.herbName}</div>
                      <div className="text-xs text-text-muted">{item.spec} · {item.market}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold text-fall">{formatChange(item.monthlyChange)}</div>
                    <div className="font-mono text-sm text-text-muted">{formatPrice(item.currentPrice)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Hot Herbs Section */}
        <div className="bg-card rounded-2xl shadow-md border border-border-light p-6 mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gold" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-text">热门品种</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {hotHerbs.map((herb) => (
              <Link
                key={herb.id}
                to={`/herb/${herb.id}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl text-sm font-medium transition-all duration-200 border border-primary-100 hover:border-primary-200"
              >
                <span className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center font-serif text-xs font-bold">{herb.name[0]}</span>
                {herb.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Price Table Section */}
        <div className="bg-card rounded-2xl shadow-md border border-border-light overflow-hidden mb-10">
          <div className="px-6 py-5 border-b border-border-light flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-text">市场行情快报</h2>
            </div>
            <Link to="/price" className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-6 pt-4">
            <PriceTable prices={latestPrices} />
          </div>
        </div>

        {/* Supply & Demand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-card rounded-2xl shadow-md border border-border-light p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="font-serif text-lg font-semibold text-text">最新供应</h2>
              </div>
              <Link to="/trade" className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
                更多 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {supplyTrades.map((trade) => (
                <Link
                  key={trade.id}
                  to="/trade"
                  className="flex items-start justify-between p-4 rounded-xl hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-text group-hover:text-primary transition-colors mb-0.5">{trade.herbName}</div>
                      <div className="text-sm text-text-muted mb-2">{trade.spec}</div>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {trade.origin}</span>
                        <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {trade.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{trade.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-md border border-border-light p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="font-serif text-lg font-semibold text-text">最新求购</h2>
              </div>
              <Link to="/trade" className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
                更多 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {demandTrades.map((trade) => (
                <Link
                  key={trade.id}
                  to="/trade"
                  className="flex items-start justify-between p-4 rounded-xl hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-text group-hover:text-primary transition-colors mb-0.5">{trade.herbName}</div>
                      <div className="text-sm text-text-muted mb-2">{trade.spec}</div>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {trade.quantity}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 剩余{trade.remainingDays}天</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{trade.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-text">推荐资讯</h2>
            </div>
            <Link to="/news" className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
              更多 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="bg-card rounded-2xl shadow-sm border border-border-light overflow-hidden card-hover group"
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      news.category === 'analysis' ? 'bg-blue-50 text-blue-700' :
                      news.category === 'origin' ? 'bg-orange-50 text-orange-700' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {CATEGORY_LABELS[news.category]}
                    </span>
                    <span className="text-xs text-text-muted">{formatDate(news.createdAt)}</span>
                  </div>
                  <h3 className="font-medium text-text line-clamp-2 mb-2 group-hover:text-primary transition-colors">{news.title}</h3>
                  <p className="text-sm text-text-muted line-clamp-2">{news.summary}</p>
                </div>
                <div className="px-5 pb-4 flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {news.views}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
