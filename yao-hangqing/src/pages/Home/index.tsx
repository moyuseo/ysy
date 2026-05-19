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
    <main>
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20">
        <div className="container">
          <div className="max-w-2xl anim-up d1">
            <h1 className="font-serif text-4xl font-bold mb-4 tracking-tight">
              中药材行情中心
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              实时掌握药材市场动态，精准把握价格走势
            </p>
            <div className="flex gap-3">
              <Link to="/price" className="btn bg-white text-green-900 hover:bg-gray-50">
                查看行情
              </Link>
              <Link to="/trade" className="btn border border-white/30 text-white hover:bg-white/10">
                供求对接
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-6 anim-up d2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <div className="text-3xl font-bold">{herbs.length}</div>
            <div className="text-sm text-slate-500 mt-1">覆盖品种</div>
          </div>
          <div className="card p-6 anim-up d3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <div className="text-3xl font-bold">{marketPrices.length}</div>
            <div className="text-sm text-slate-500 mt-1">今日更新</div>
          </div>
          <div className="card p-6 anim-up d4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-red-600">{riseCount}</div>
            <div className="text-sm text-slate-500 mt-1">上涨品种</div>
          </div>
          <div className="card p-6 anim-up d5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-700">{fallCount}</div>
            <div className="text-sm text-slate-500 mt-1">下跌品种</div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[65%]">
            <div className="card anim-up d3">
              <div className="card-head">
                <h2 className="section-title">今日行情</h2>
                <Link to="/price" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium">
                  查看更多 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>品种</th>
                      <th>规格</th>
                      <th>市场</th>
                      <th className="text-right">今日价</th>
                      <th className="text-right">月涨跌</th>
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
                        <td className="text-right prc">{formatPrice(price.currentPrice)}</td>
                        <td className="text-right">
                          <span className={`chg ${price.monthlyChange > 0 ? 'chg-up' : price.monthlyChange < 0 ? 'chg-down' : 'badge-flat'}`}>
                            {formatChange(price.monthlyChange)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card mt-8 anim-up d4">
              <div className="card-head">
                <h2 className="section-title">供求速递</h2>
                <Link to="/trade" className="text-sm text-slate-500 hover:text-green-700 font-medium">
                  更多 →
                </Link>
              </div>
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-slate-700">供应信息</span>
                    </div>
                    <div className="space-y-3">
                      {supplyTrades.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 group">
                          <div>
                            <Link to="/trade" className="text-sm text-slate-900 group-hover:text-green-700 font-medium">
                              {trade.herbName}
                            </Link>
                            <span className="text-xs text-slate-400 ml-2">{trade.spec}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-red-600">{trade.price}</div>
                            <div className="text-xs text-slate-400">{trade.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block w-px bg-slate-200" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-slate-700">求购信息</span>
                    </div>
                    <div className="space-y-3">
                      {demandTrades.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 group">
                          <div>
                            <Link to="/trade" className="text-sm text-slate-900 group-hover:text-green-700 font-medium">
                              {trade.herbName}
                            </Link>
                            <span className="text-xs text-slate-400 ml-2">{trade.spec}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-slate-900">{trade.price}</div>
                            <div className="text-xs text-slate-400">{trade.quoteCount}条报价</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="card anim-up d3">
              <div className="card-head">
                <h2 className="section-title">涨跌榜</h2>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-red-600">涨幅榜</span>
                    </div>
                    <div className="space-y-2">
                      {topRisers.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-3 py-2">
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
                            idx === 0 ? 'bg-red-100 text-red-700' :
                            idx === 1 ? 'bg-amber-100 text-amber-600' :
                            idx === 2 ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <Link to={`/herb/${item.herbId}`} className="text-sm text-slate-900 hover:text-green-700 flex-1 truncate font-medium">
                            {item.herbName}
                          </Link>
                          <span className="text-sm font-semibold text-red-600">
                            {formatChange(item.monthlyChange)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="divider" />
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingDown className="w-4 h-4 text-green-700" />
                      <span className="text-sm font-semibold text-green-700">跌幅榜</span>
                    </div>
                    <div className="space-y-2">
                      {topFallers.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-3 py-2">
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
                            idx === 0 ? 'bg-red-100 text-red-700' :
                            idx === 1 ? 'bg-amber-100 text-amber-600' :
                            idx === 2 ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <Link to={`/herb/${item.herbId}`} className="text-sm text-slate-900 hover:text-green-700 flex-1 truncate font-medium">
                            {item.herbName}
                          </Link>
                          <span className="text-sm font-semibold text-green-700">
                            {formatChange(item.monthlyChange)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-6 anim-up d4">
              <div className="card-head">
                <h2 className="section-title">热门品种</h2>
              </div>
              <div className="card-body">
                <div className="flex flex-wrap gap-2">
                  {hotHerbs.map((herb) => (
                    <Link
                      key={herb.id}
                      to={`/herb/${herb.id}`}
                      className="badge badge-tag hover:bg-green-200 transition-colors cursor-pointer"
                    >
                      {herb.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mt-6 anim-up d5">
              <div className="card-head">
                <h2 className="section-title">最新资讯</h2>
                <Link to="/news" className="text-sm text-slate-500 hover:text-green-700 font-medium">更多 →</Link>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {latestNews.map((news) => (
                    <Link key={news.id} to={`/news/${news.id}`} className="block py-3 border-b border-slate-100 last:border-0 group">
                      <div className="text-sm text-slate-900 group-hover:text-green-700 transition-colors font-medium line-clamp-1 mb-1">
                        {news.title}
                      </div>
                      <div className="text-xs text-slate-400">{formatDate(news.createdAt)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 border-t border-slate-200">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索品种、规格、产地..."
                className="inp pl-11"
              />
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/price" className="text-slate-600 hover:text-green-700 font-medium">行情中心</Link>
              <Link to="/trade" className="text-slate-600 hover:text-green-700 font-medium">供求信息</Link>
              <Link to="/rank" className="text-slate-600 hover:text-green-700 font-medium">价格排行</Link>
              <Link to="/news" className="text-slate-600 hover:text-green-700 font-medium">资讯动态</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
