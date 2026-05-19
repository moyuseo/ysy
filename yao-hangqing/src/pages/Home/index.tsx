import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Search, Leaf, Sparkles, Clock } from 'lucide-react';
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
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-muted/40 via-paper to-paper">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-cinnabar/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-ochre/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-40 w-48 h-48 bg-indigo/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-6 py-16">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-paper border border-paper-dark rounded-full text-xs text-ink-muted mb-6">
              <Sparkles className="w-3 h-3 text-ochre" />
              <span>传承千年智慧，服务药材行业</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-ink mb-4 tracking-wide">
              中药材<span className="text-cinnabar">行情</span>中心
            </h1>
            <p className="text-ink-light text-lg max-w-xl mx-auto leading-relaxed">
              实时掌握药材市场动态，精准把握价格走势
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up stagger-2">
            <div className="paper-card p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-muted rounded flex items-center justify-center group-hover:bg-indigo group-hover:text-white transition-colors">
                  <Leaf className="w-5 h-5 text-indigo group-hover:text-white" />
                </div>
              </div>
              <div className="font-serif text-3xl text-ink mb-1">{herbs.length}</div>
              <div className="text-xs text-ink-muted tracking-wider uppercase">覆盖品种</div>
            </div>
            <div className="paper-card p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-muted rounded flex items-center justify-center group-hover:bg-indigo group-hover:text-white transition-colors">
                  <Clock className="w-5 h-5 text-indigo group-hover:text-white" />
                </div>
              </div>
              <div className="font-serif text-3xl text-ink mb-1">{marketPrices.length}</div>
              <div className="text-xs text-ink-muted tracking-wider uppercase">今日更新</div>
            </div>
            <div className="paper-card p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-cinnabar-muted rounded flex items-center justify-center group-hover:bg-cinnabar group-hover:text-white transition-colors">
                  <TrendingUp className="w-5 h-5 text-cinnabar group-hover:text-white" />
                </div>
              </div>
              <div className="font-serif text-3xl text-cinnabar mb-1">{riseCount}</div>
              <div className="text-xs text-ink-muted tracking-wider uppercase">上涨品种</div>
            </div>
            <div className="paper-card p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-jade-muted rounded flex items-center justify-center group-hover:bg-jade group-hover:text-white transition-colors">
                  <TrendingDown className="w-5 h-5 text-jade group-hover:text-white" />
                </div>
              </div>
              <div className="font-serif text-3xl text-jade mb-1">{fallCount}</div>
              <div className="text-xs text-ink-muted tracking-wider uppercase">下跌品种</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[65%]">
            <div className="paper-card p-6 mb-8 animate-fade-in-up stagger-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-ink flex items-center gap-3">
                  <span className="w-1 h-6 bg-cinnabar rounded-full" />
                  今日行情
                </h2>
                <Link to="/price" className="text-sm text-indigo hover:text-indigo-dark flex items-center gap-1 transition-colors group">
                  查看更多 
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-antique">
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
                          <Link to={`/herb/${price.herbId}`} className="text-ink hover:text-indigo font-medium transition-colors">
                            {price.herbName}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-ink-light text-sm">{price.spec}</td>
                        <td className="py-3 px-4 text-ink-light text-sm">{price.market}</td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-ink">
                          {formatPrice(price.currentPrice)}
                        </td>
                        <td className={`py-3 px-4 text-right font-mono text-sm font-semibold ${
                          price.monthlyChange > 0 ? 'text-cinnabar' : 
                          price.monthlyChange < 0 ? 'text-jade' : 'text-ink-muted'
                        }`}>
                          {formatChange(price.monthlyChange)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="paper-card p-6 animate-fade-in-up stagger-4">
              <h2 className="font-serif text-xl text-ink flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-ochre rounded-full" />
                供求速递
              </h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-ink tracking-wider">供应信息</span>
                    <Link to="/trade" className="text-xs text-ink-muted hover:text-indigo transition-colors">更多</Link>
                  </div>
                  <div className="space-y-3">
                    {supplyTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-3 border-b border-paper-dark last:border-0 group">
                        <div>
                          <Link to="/trade" className="text-sm text-ink group-hover:text-indigo transition-colors font-medium">
                            {trade.herbName}
                          </Link>
                          <span className="text-xs text-ink-muted ml-2">{trade.spec}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm text-cinnabar font-semibold">{trade.price}</div>
                          <div className="text-xs text-ink-muted">{trade.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-paper-dark to-transparent" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-ink tracking-wider">求购信息</span>
                    <Link to="/trade" className="text-xs text-ink-muted hover:text-indigo transition-colors">更多</Link>
                  </div>
                  <div className="space-y-3">
                    {demandTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-3 border-b border-paper-dark last:border-0 group">
                        <div>
                          <Link to="/trade" className="text-sm text-ink group-hover:text-indigo transition-colors font-medium">
                            {trade.herbName}
                          </Link>
                          <span className="text-xs text-ink-muted ml-2">{trade.spec}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm text-ink font-semibold">{trade.price}</div>
                          <div className="text-xs text-ink-muted">{trade.quoteCount}条报价</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="paper-card p-6 mb-6 animate-fade-in-up stagger-3">
              <h2 className="font-serif text-xl text-ink flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-indigo rounded-full" />
                涨跌榜
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-cinnabar" />
                    <span className="text-sm font-semibold text-cinnabar tracking-wider">涨幅榜</span>
                  </div>
                  <div className="space-y-2">
                    {topRisers.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3 py-1.5">
                        <span className={`seal ${idx < 3 ? 'seal-rise' : 'bg-cinnabar-muted text-cinnabar'}`}>
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-ink hover:text-indigo flex-1 truncate transition-colors">
                          {item.herbName}
                        </Link>
                        <span className="font-mono text-sm text-cinnabar font-semibold">
                          {formatChange(item.monthlyChange)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ink-divider" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-4 h-4 text-jade" />
                    <span className="text-sm font-semibold text-jade tracking-wider">跌幅榜</span>
                  </div>
                  <div className="space-y-2">
                    {topFallers.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3 py-1.5">
                        <span className={`seal ${idx < 3 ? 'seal-fall' : 'bg-jade-muted text-jade'}`}>
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-ink hover:text-indigo flex-1 truncate transition-colors">
                          {item.herbName}
                        </Link>
                        <span className="font-mono text-sm text-jade font-semibold">
                          {formatChange(item.monthlyChange)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="paper-card p-6 mb-6 animate-fade-in-up stagger-4">
              <h2 className="font-serif text-xl text-ink flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-ochre rounded-full" />
                热门品种
              </h2>
              <div className="flex flex-wrap gap-2">
                {hotHerbs.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="px-4 py-2 text-sm bg-paper-warm border border-paper-dark text-ink rounded hover:border-indigo hover:text-indigo transition-all"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="paper-card p-6 animate-fade-in-up stagger-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-ink flex items-center gap-3">
                  <span className="w-1 h-6 bg-cinnabar rounded-full" />
                  最新资讯
                </h2>
                <Link to="/news" className="text-sm text-indigo hover:text-indigo-dark transition-colors">更多</Link>
              </div>
              <div className="space-y-4">
                {latestNews.map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="block py-3 border-b border-paper-dark last:border-0 group">
                    <div className="text-sm text-ink group-hover:text-indigo transition-colors font-medium line-clamp-1 mb-1">
                      {news.title}
                    </div>
                    <div className="text-xs text-ink-muted">{formatDate(news.createdAt)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-aged border-t-2 border-paper-dark">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                placeholder="搜索品种、规格、产地..."
                className="w-full pl-11 pr-4 py-3 bg-paper border-2 border-paper-dark rounded text-sm focus:outline-none focus:border-indigo transition-colors"
              />
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link to="/price" className="text-ink-light hover:text-indigo transition-colors font-medium">行情中心</Link>
              <Link to="/trade" className="text-ink-light hover:text-indigo transition-colors font-medium">供求信息</Link>
              <Link to="/rank" className="text-ink-light hover:text-indigo transition-colors font-medium">价格排行</Link>
              <Link to="/news" className="text-ink-light hover:text-indigo transition-colors font-medium">资讯动态</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
