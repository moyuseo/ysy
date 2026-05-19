import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Search, Leaf, Clock, BarChart3, Newspaper, Package } from 'lucide-react';
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

const latestPrices = marketPrices.slice(0, 6);
const supplyTrades = trades.filter(t => t.type === 'supply').slice(0, 3);
const demandTrades = trades.filter(t => t.type === 'demand').slice(0, 3);
const latestNews = newsList.slice(0, 5);
const hotHerbs = herbs.slice(0, 14);

const riseCount = marketPrices.filter(p => p.monthlyChange > 0).length;
const fallCount = marketPrices.filter(p => p.monthlyChange < 0).length;

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-green-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-800/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative container py-24 md:py-32">
          <div className="max-w-3xl anim-up d1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-800/50 border border-green-700/50 rounded-full text-green-300 text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              实时更新 · 数据驱动
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              中药材<br />
              <span className="text-green-400">行情中心</span>
            </h1>
            <p className="text-lg text-green-200/70 mb-10 leading-relaxed max-w-xl">
              覆盖全国主要中药材市场，实时追踪价格走势，助力药材交易精准决策
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/price" className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-green-600/20">
                查看行情 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/trade" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium rounded-lg transition-all">
                供求对接
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { icon: Leaf, label: '覆盖品种', value: herbs.length, color: 'text-green-400' },
              { icon: Clock, label: '今日更新', value: marketPrices.length, color: 'text-green-400' },
              { icon: TrendingUp, label: '上涨品种', value: riseCount, color: 'text-red-400' },
              { icon: TrendingDown, label: '下跌品种', value: fallCount, color: 'text-green-300' },
            ].map((item, idx) => (
              <div key={item.label} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 anim-up d${idx + 2}`}>
                <item.icon className={`w-5 h-5 ${item.color} mb-3`} />
                <div className={`text-3xl font-bold text-white mb-1`}>{item.value}</div>
                <div className="text-sm text-green-200/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-8 anim-up d1">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">今日行情</h2>
            <p className="text-sm text-slate-500 mt-1">最新市场价格动态</p>
          </div>
          <Link to="/price" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium">
            查看全部 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="card anim-up d2">
          <div className="overflow-x-auto">
            <table className="tbl">
              <thead>
                <tr>
                  <th>品种</th>
                  <th>规格</th>
                  <th>市场</th>
                  <th className="text-right">今日价</th>
                  <th className="text-right">月涨跌</th>
                  <th className="text-right">走势</th>
                </tr>
              </thead>
              <tbody>
                {latestPrices.map((price) => (
                  <tr key={price.id}>
                    <td>
                      <Link to={`/herb/${price.herbId}`} className="text-green-800 hover:text-green-600 font-medium">
                        {price.herbName}
                      </Link>
                    </td>
                    <td className="text-slate-500">{price.spec}</td>
                    <td className="text-slate-500">{price.market}</td>
                    <td className="text-right">
                      <span className="prc">{formatPrice(price.currentPrice)}</span>
                    </td>
                    <td className="text-right">
                      <span className={`chg ${price.monthlyChange > 0 ? 'chg-up' : price.monthlyChange < 0 ? 'chg-down' : 'badge-flat'}`}>
                        {formatChange(price.monthlyChange)}
                      </span>
                    </td>
                    <td className="text-right">
                      {price.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-600 inline" />}
                      {price.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-700 inline" />}
                      {price.trend === 'stable' && <span className="text-slate-400 text-xs">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card anim-up d1">
              <div className="card-head">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-600" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">涨幅榜</h3>
                </div>
              </div>
              <div className="card-body p-0">
                {topRisers.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 last:border-0 hover:bg-green-50/50 transition-colors">
                    <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold ${
                      idx === 0 ? 'bg-red-100 text-red-700' :
                      idx === 1 ? 'bg-amber-100 text-amber-600' :
                      idx === 2 ? 'bg-green-100 text-green-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <Link to={`/herb/${item.herbId}`} className="text-sm text-slate-800 hover:text-green-700 flex-1 font-medium truncate">
                      {item.herbName}
                    </Link>
                    <span className="text-sm font-bold text-red-600 tabular-nums">
                      {formatChange(item.monthlyChange)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card anim-up d2">
              <div className="card-head">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-700" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">跌幅榜</h3>
                </div>
              </div>
              <div className="card-body p-0">
                {topFallers.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 last:border-0 hover:bg-green-50/50 transition-colors">
                    <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold ${
                      idx === 0 ? 'bg-green-100 text-green-800' :
                      idx === 1 ? 'bg-emerald-100 text-emerald-700' :
                      idx === 2 ? 'bg-teal-100 text-teal-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <Link to={`/herb/${item.herbId}`} className="text-sm text-slate-800 hover:text-green-700 flex-1 font-medium truncate">
                      {item.herbName}
                    </Link>
                    <span className="text-sm font-bold text-green-700 tabular-nums">
                      {formatChange(item.monthlyChange)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card anim-up d3">
              <div className="card-head">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-700" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">供求速递</h3>
                </div>
              </div>
              <div className="card-body p-0">
                <div>
                  <div className="px-5 pt-3 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">供应</div>
                  {supplyTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between px-5 py-2.5 border-b border-slate-100 group">
                      <Link to="/trade" className="text-sm text-slate-800 group-hover:text-green-700 font-medium truncate">
                        {trade.herbName}
                        <span className="text-xs text-slate-400 ml-1">{trade.spec}</span>
                      </Link>
                      <span className="text-sm font-semibold text-red-600 shrink-0 ml-3">{trade.price}</span>
                    </div>
                  ))}
                </div>
                <div className="divider" />
                <div>
                  <div className="px-5 pt-3 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">求购</div>
                  {demandTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between px-5 py-2.5 border-b border-slate-100 last:border-0 group">
                      <Link to="/trade" className="text-sm text-slate-800 group-hover:text-green-700 font-medium truncate">
                        {trade.herbName}
                        <span className="text-xs text-slate-400 ml-1">{trade.spec}</span>
                      </Link>
                      <span className="text-sm font-semibold text-slate-700 shrink-0 ml-3">{trade.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-end justify-between mb-8 anim-up d1">
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900">最新资讯</h2>
                <p className="text-sm text-slate-500 mt-1">行业动态与市场分析</p>
              </div>
              <Link to="/news" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium">
                全部资讯 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4 anim-up d2">
              {latestNews.map((news, idx) => (
                <Link key={news.id} to={`/news/${news.id}`} className="card flex items-start gap-5 p-5 group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                    idx === 0 ? 'bg-green-800 text-white' : 'bg-green-50 text-green-800'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-green-700 transition-colors line-clamp-1 mb-1">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{news.summary}</p>
                  </div>
                  <div className="text-xs text-slate-400 shrink-0 mt-1">{formatDate(news.createdAt)}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-8 anim-up d2">
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900">热门品种</h2>
                <p className="text-sm text-slate-500 mt-1">高频查询药材</p>
              </div>
              <Link to="/rank" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium">
                排行 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5 anim-up d3">
              {hotHerbs.map((herb) => (
                <Link
                  key={herb.id}
                  to={`/herb/${herb.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-green-400 hover:text-green-800 hover:bg-green-50 transition-all font-medium"
                >
                  <Leaf className="w-3 h-3 text-green-600" />
                  {herb.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 anim-up d4">
              <div className="flex items-end justify-between mb-6">
                <h3 className="font-serif text-lg font-bold text-slate-900">快速入口</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BarChart3, label: '行情中心', path: '/price', desc: '价格查询' },
                  { icon: Package, label: '供求信息', path: '/trade', desc: '供需对接' },
                  { icon: TrendingUp, label: '价格排行', path: '/rank', desc: '涨跌排名' },
                  { icon: Newspaper, label: '资讯动态', path: '/news', desc: '行业资讯' },
                ].map((item) => (
                  <Link key={item.path} to={item.path} className="card p-4 group hover:border-green-300">
                    <item.icon className="w-5 h-5 text-green-700 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-green-700 transition-colors">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-950">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">开始探索中药材行情</h3>
              <p className="text-green-200/60 text-sm">搜索品种、规格、产地，获取实时价格数据</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索品种、规格、产地..."
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-green-200/40 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
