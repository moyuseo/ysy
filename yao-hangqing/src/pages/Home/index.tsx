import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Search, Leaf, Clock } from 'lucide-react';
import { marketPrices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import { herbs } from '../../data/herbs';
import { formatChange, formatDate, formatPrice } from '../../utils/format';

const topRisers = [...marketPrices]
  .sort((a, b) => b.monthlyChange - a.monthlyChange)
  .slice(0, 5);

const topFallers = [...marketPrices]
  .sort((a, b) => a.monthlyChange - b.monthlyChange)
  .slice(0, 5);

const latestPrices = marketPrices.slice(0, 8);
const supplyTrades = trades.filter(t => t.type === 'supply').slice(0, 4);
const demandTrades = trades.filter(t => t.type === 'demand').slice(0, 4);
const latestNews = newsList.slice(0, 4);
const hotHerbs = herbs.slice(0, 12);

const riseCount = marketPrices.filter(p => p.monthlyChange > 0).length;
const fallCount = marketPrices.filter(p => p.monthlyChange < 0).length;

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="font-serif text-5xl font-bold mb-4 tracking-tight">
              中药材行情中心
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              实时掌握药材市场动态，精准把握价格走势
            </p>
            <div className="flex gap-4">
              <Link to="/price" className="btn-primary bg-white text-forest hover:bg-mint-light">
                查看行情
              </Link>
              <Link to="/trade" className="btn-secondary border-white text-white hover:bg-white/10">
                供求对接
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up stagger-2">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-forest-muted rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-forest" />
              </div>
            </div>
            <div className="kpi-value">{herbs.length}</div>
            <div className="text-sm text-slate-light">覆盖品种</div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-forest-muted rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-forest" />
              </div>
            </div>
            <div className="kpi-value">{marketPrices.length}</div>
            <div className="text-sm text-slate-light">今日更新</div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-coral-muted rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-coral" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-coral">{riseCount}</div>
            <div className="text-sm text-slate-light">上涨品种</div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-forest-muted rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-forest" />
              </div>
            </div>
            <div className="kpi-value">{fallCount}</div>
            <div className="text-sm text-slate-light">下跌品种</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[65%]">
            <div className="card-flat p-6 mb-8 animate-fade-in-up stagger-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-slate">今日行情</h2>
                <Link to="/price" className="text-sm text-forest hover:text-forest-light flex items-center gap-1 transition-colors">
                  查看更多 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th className="py-3 px-4">品种</th>
                      <th className="py-3 px-4">规格</th>
                      <th className="py-3 px-4">市场</th>
                      <th className="py-3 px-4 text-right">今日价</th>
                      <th className="py-3 px-4 text-right">月涨跌</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestPrices.map((price, idx) => (
                      <tr key={price.id} className="animate-fade-in" style={{ animationDelay: `${0.3 + idx * 0.05}s` }}>
                        <td className="py-3 px-4">
                          <Link to={`/herb/${price.herbId}`} className="text-forest hover:text-forest-light font-medium transition-colors">
                            {price.herbName}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-slate-light text-sm">{price.spec}</td>
                        <td className="py-3 px-4 text-slate-light text-sm">{price.market}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="price-text text-slate">{formatPrice(price.currentPrice)}</span>
                        </td>
                        <td className={`py-3 px-4 text-right text-sm font-semibold ${
                          price.monthlyChange > 0 ? 'text-coral' : 
                          price.monthlyChange < 0 ? 'text-forest' : 'text-slate-muted'
                        }`}>
                          {formatChange(price.monthlyChange)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-flat p-6 animate-fade-in-up stagger-4">
              <h2 className="font-serif text-xl font-bold text-slate mb-6">供求速递</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-slate">供应信息</span>
                    <Link to="/trade" className="text-xs text-slate-muted hover:text-forest transition-colors">更多</Link>
                  </div>
                  <div className="space-y-3">
                    {supplyTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0 group">
                        <div>
                          <Link to="/trade" className="text-sm text-slate group-hover:text-forest transition-colors font-medium">
                            {trade.herbName}
                          </Link>
                          <span className="text-xs text-slate-muted ml-2">{trade.spec}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm text-coral font-semibold">{trade.price}</div>
                          <div className="text-xs text-slate-muted">{trade.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block w-px bg-cream-dark" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-slate">求购信息</span>
                    <Link to="/trade" className="text-xs text-slate-muted hover:text-forest transition-colors">更多</Link>
                  </div>
                  <div className="space-y-3">
                    {demandTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0 group">
                        <div>
                          <Link to="/trade" className="text-sm text-slate group-hover:text-forest transition-colors font-medium">
                            {trade.herbName}
                          </Link>
                          <span className="text-xs text-slate-muted ml-2">{trade.spec}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm text-slate font-semibold">{trade.price}</div>
                          <div className="text-xs text-slate-muted">{trade.quoteCount}条报价</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="card-flat p-6 mb-6 animate-fade-in-up stagger-3">
              <h2 className="font-serif text-xl font-bold text-slate mb-6">涨跌榜</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-coral" />
                    <span className="text-sm font-semibold text-coral">涨幅榜</span>
                  </div>
                  <div className="space-y-2">
                    {topRisers.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3 py-1.5">
                        <span className={`badge ${idx < 3 ? 'badge-rise' : 'bg-coral-muted text-coral'}`}>
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-slate hover:text-forest flex-1 truncate transition-colors">
                          {item.herbName}
                        </Link>
                        <span className="font-mono text-sm text-coral font-semibold">
                          {formatChange(item.monthlyChange)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="divider" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-4 h-4 text-forest" />
                    <span className="text-sm font-semibold text-forest">跌幅榜</span>
                  </div>
                  <div className="space-y-2">
                    {topFallers.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3 py-1.5">
                        <span className={`badge ${idx < 3 ? 'badge-fall' : 'bg-forest-muted text-forest'}`}>
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-slate hover:text-forest flex-1 truncate transition-colors">
                          {item.herbName}
                        </Link>
                        <span className="font-mono text-sm text-forest font-semibold">
                          {formatChange(item.monthlyChange)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-flat p-6 mb-6 animate-fade-in-up stagger-4">
              <h2 className="font-serif text-xl font-bold text-slate mb-6">热门品种</h2>
              <div className="flex flex-wrap gap-2">
                {hotHerbs.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="px-4 py-2 text-sm bg-cream border border-cream-dark text-slate rounded-lg hover:border-forest hover:text-forest transition-all"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="card-flat p-6 animate-fade-in-up stagger-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-slate">最新资讯</h2>
                <Link to="/news" className="text-sm text-forest hover:text-forest-light transition-colors">更多</Link>
              </div>
              <div className="space-y-4">
                {latestNews.map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="block py-3 border-b border-cream-dark last:border-0 group">
                    <div className="text-sm text-slate group-hover:text-forest transition-colors font-medium line-clamp-1 mb-1">
                      {news.title}
                    </div>
                    <div className="text-xs text-slate-muted">{formatDate(news.createdAt)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-muted">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted" />
              <input
                type="text"
                placeholder="搜索品种、规格、产地..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-forest transition-colors"
              />
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link to="/price" className="text-slate-light hover:text-forest transition-colors font-medium">行情中心</Link>
              <Link to="/trade" className="text-slate-light hover:text-forest transition-colors font-medium">供求信息</Link>
              <Link to="/rank" className="text-slate-light hover:text-forest transition-colors font-medium">价格排行</Link>
              <Link to="/news" className="text-slate-light hover:text-forest transition-colors font-medium">资讯动态</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
