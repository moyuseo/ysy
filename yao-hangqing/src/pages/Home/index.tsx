import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Search } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div>
                <div className="text-[#737373] text-xs mb-1">覆盖品种</div>
                <div className="text-2xl font-semibold text-[#171717]">{herbs.length}</div>
              </div>
              <div>
                <div className="text-[#737373] text-xs mb-1">今日更新</div>
                <div className="text-2xl font-semibold text-[#171717]">{marketPrices.length}</div>
              </div>
              <div>
                <div className="text-[#737373] text-xs mb-1">上涨</div>
                <div className="text-2xl font-semibold text-[#DC2626]">{riseCount}</div>
              </div>
              <div>
                <div className="text-[#737373] text-xs mb-1">下跌</div>
                <div className="text-2xl font-semibold text-[#16A34A]">{fallCount}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#737373]">
              <span>数据更新时间: 2026-05-19 09:30</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <div className="w-[70%]">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#171717]">行情概览</h2>
                <Link to="/price" className="text-sm text-[#059669] hover:text-[#047857] flex items-center gap-1">
                  查看更多 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="text-left py-3 px-2 text-xs font-medium text-[#737373]">品种</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-[#737373]">规格</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-[#737373]">市场</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-[#737373]">今日价</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-[#737373]">月涨跌</th>
                  </tr>
                </thead>
                <tbody>
                  {latestPrices.map((price) => (
                    <tr key={price.id} className="border-b border-[#F0F0F0] hover:bg-[#D1FAE5] transition-colors">
                      <td className="py-3 px-2">
                        <Link to={`/herb/${price.herbId}`} className="text-[#171717] hover:text-[#059669]">
                          {price.herbName}
                        </Link>
                      </td>
                      <td className="py-3 px-2 text-sm text-[#737373]">{price.spec}</td>
                      <td className="py-3 px-2 text-sm text-[#737373]">{price.market}</td>
                      <td className="py-3 px-2 text-right font-mono text-[#171717]">{formatPrice(price.currentPrice)}</td>
                      <td className={`py-3 px-2 text-right font-mono text-sm ${price.monthlyChange > 0 ? 'text-[#DC2626]' : price.monthlyChange < 0 ? 'text-[#16A34A]' : 'text-[#737373]'}`}>
                        {formatChange(price.monthlyChange)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#E5E5E5] mb-8"></div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#171717] mb-4">最新供求</h2>
              <div className="flex gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-[#059669]">供应</span>
                    <Link to="/trade" className="text-xs text-[#A3A3A3] hover:text-[#059669]">更多</Link>
                  </div>
                  <div className="space-y-3">
                    {supplyTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-2 border-b border-[#F0F0F0] last:border-0">
                        <div>
                          <Link to="/trade" className="text-sm text-[#171717] hover:text-[#059669]">{trade.herbName}</Link>
                          <span className="text-xs text-[#A3A3A3] ml-2">{trade.spec}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm text-[#171717]">{trade.price}</div>
                          <div className="text-xs text-[#A3A3A3]">{trade.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-[#059669]">求购</span>
                    <Link to="/trade" className="text-xs text-[#A3A3A3] hover:text-[#059669]">更多</Link>
                  </div>
                  <div className="space-y-3">
                    {demandTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-2 border-b border-[#F0F0F0] last:border-0">
                        <div>
                          <Link to="/trade" className="text-sm text-[#171717] hover:text-[#059669]">{trade.herbName}</Link>
                          <span className="text-xs text-[#A3A3A3] ml-2">{trade.spec}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm text-[#171717]">{trade.price}</div>
                          <div className="text-xs text-[#A3A3A3]">{trade.quoteCount}条报价</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[30%]">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#171717] mb-4">涨跌排行</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#DC2626]" />
                    <span className="text-sm font-medium text-[#DC2626]">涨幅榜</span>
                  </div>
                  <div className="space-y-2">
                    {topRisers.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${idx < 3 ? 'bg-[#DC2626] text-white' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-[#171717] hover:text-[#059669] flex-1 truncate">
                          {item.herbName}
                        </Link>
                        <span className="font-mono text-sm text-[#DC2626]">{formatChange(item.monthlyChange)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendingDown className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-sm font-medium text-[#16A34A]">跌幅榜</span>
                  </div>
                  <div className="space-y-2">
                    {topFallers.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${idx < 3 ? 'bg-[#16A34A] text-white' : 'bg-[#DCFCE7] text-[#16A34A]'}`}>
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-[#171717] hover:text-[#059669] flex-1 truncate">
                          {item.herbName}
                        </Link>
                        <span className="font-mono text-sm text-[#16A34A]">{formatChange(item.monthlyChange)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] mb-8"></div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#171717] mb-4">热门品种</h2>
              <div className="flex flex-wrap gap-2">
                {hotHerbs.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-full text-[#171717] hover:border-[#059669] hover:text-[#059669] transition-colors"
                  >
                    {herb.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] mb-8"></div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#171717]">最新资讯</h2>
                <Link to="/news" className="text-sm text-[#059669] hover:text-[#047857]">更多</Link>
              </div>
              <div className="space-y-3">
                {latestNews.map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="block py-2 border-b border-[#F0F0F0] last:border-0 hover:bg-[#D1FAE5] -mx-2 px-2 transition-colors">
                    <div className="text-sm text-[#171717] line-clamp-1 mb-1">{news.title}</div>
                    <div className="text-xs text-[#A3A3A3]">{formatDate(news.createdAt)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" />
                <input
                  type="text"
                  placeholder="搜索品种、规格、产地..."
                  className="pl-10 pr-4 py-2 w-80 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/price" className="text-[#737373] hover:text-[#059669]">行情</Link>
              <Link to="/trade" className="text-[#737373] hover:text-[#059669]">供求</Link>
              <Link to="/price" className="text-[#737373] hover:text-[#059669]">排行</Link>
              <Link to="/news" className="text-[#737373] hover:text-[#059669]">资讯</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
