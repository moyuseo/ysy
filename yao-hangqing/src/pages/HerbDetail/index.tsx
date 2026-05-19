import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Package, ShoppingCart, Newspaper, BookOpen, MapPin, Calendar, Info } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { marketPrices, originPrices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import PriceChart from '../../components/PriceChart/PriceChart';
import TabNav from '../../components/TabNav/TabNav';
import { formatPrice, formatChange, formatDate } from '../../utils/format';

const TABS = [
  { key: 'supply', label: '供应信息', icon: Package },
  { key: 'demand', label: '求购信息', icon: ShoppingCart },
  { key: 'news', label: '相关资讯', icon: Newspaper },
  { key: 'knowledge', label: '药材知识', icon: BookOpen },
];

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

const TIME_RANGES = [
  { key: '1m', label: '近1月' },
  { key: '3m', label: '近3月' },
  { key: '6m', label: '近6月' },
  { key: '1y', label: '近1年' },
];

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-rise" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-fall" />;
  return <Minus className="w-4 h-4 text-stable" />;
}

function ChangeBadge({ value, trend }: { value: number; trend: 'up' | 'down' | 'stable' }) {
  const cls = trend === 'up' ? 'text-rise' : trend === 'down' ? 'text-fall' : 'text-stable';
  return <span className={`text-sm font-medium ${cls}`}>{formatChange(value)}</span>;
}

export default function HerbDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('supply');
  const [timeRange, setTimeRange] = useState('1y');

  const herb = useMemo(() => herbs.find(h => h.id === id), [id]);

  const herbMarketPrices = useMemo(
    () => (herb ? marketPrices.filter(p => p.herbId === herb.id) : []),
    [herb],
  );

  const herbOriginPrices = useMemo(
    () => (herb ? originPrices.filter(p => p.herbId === herb.id) : []),
    [herb],
  );

  const chartData = useMemo(
    () => (herbMarketPrices.length > 0 ? herbMarketPrices[0].history : []),
    [herbMarketPrices],
  );

  const supplyTrades = useMemo(
    () => (herb ? trades.filter(t => t.herbName === herb.name && t.type === 'supply') : []),
    [herb],
  );

  const demandTrades = useMemo(
    () => (herb ? trades.filter(t => t.herbName === herb.name && t.type === 'demand') : []),
    [herb],
  );

  const relatedNews = useMemo(
    () => (herb ? newsList.filter(n => n.herbNames.includes(herb.name)) : []),
    [herb],
  );

  if (!herb) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <Info className="w-10 h-10 text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary text-lg">品种未找到</p>
          <Link to="/" className="text-primary hover:underline mt-2 inline-block text-sm">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const infoItems = [
    ['品名', herb.name],
    ['别名', herb.alias.join('、') || '-'],
    ['科属', herb.family],
    ['性味', herb.nature],
    ['归经', herb.meridian],
    ['功效', herb.effect],
    ['主产地', herb.origin.join('、')],
    ['常见规格', herb.spec.join('、')],
    ['采收时间', herb.harvestTime],
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <nav className="text-sm text-text-secondary mb-4 flex items-center gap-1.5">
        <Link to="/" className="hover:text-primary transition-colors">首页</Link>
        <span className="text-border">/</span>
        <Link to="/price" className="hover:text-primary transition-colors">行情价格</Link>
        <span className="text-border">/</span>
        <span className="text-text">{herb.name}</span>
      </nav>

      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex items-start gap-3 flex-wrap mb-3">
          <h1 className="font-serif text-3xl font-bold text-text">
            {herb.name}
          </h1>
          {herb.alias.length > 0 && (
            <span className="text-text-secondary text-base mt-1.5">
              （{herb.alias.join('、')}）
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="bg-fall-bg text-primary px-3 py-1 rounded text-sm">
            {CATEGORY_MAP[herb.category] || herb.category}
          </span>
          <span className="bg-gold/10 text-gold px-3 py-1 rounded text-sm">
            {herb.family}
          </span>
        </div>
        <div className="text-text-secondary text-sm">
          性味：{herb.nature}　|　归经：{herb.meridian}　|　功效：{herb.effect}
        </div>
      </div>

      <div className="flex gap-4 mb-6 flex-col lg:flex-row">
        <div className="w-full lg:w-[40%] bg-card rounded-lg border border-border p-5">
          <h2 className="text-base font-bold text-text mb-4">价格概览</h2>
          {herbMarketPrices.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                市场报价
              </h3>
              <div className="divide-y divide-divider">
                {herbMarketPrices.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div className="min-w-0">
                      <div className="text-text font-medium">{p.market}</div>
                      <div className="text-text-secondary text-xs">{p.spec}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-medium text-text">{formatPrice(p.currentPrice)}</span>
                      <ChangeBadge value={p.monthlyChange} trend={p.trend} />
                      <TrendIcon trend={p.trend} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {herbOriginPrices.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                产地报价
              </h3>
              <div className="divide-y divide-divider">
                {herbOriginPrices.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div className="min-w-0">
                      <div className="text-text font-medium">{p.origin}</div>
                      <div className="text-text-secondary text-xs">{p.spec}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-medium text-text">{formatPrice(p.currentPrice)}</span>
                      <ChangeBadge value={p.monthlyChange} trend={p.trend} />
                      <TrendIcon trend={p.trend} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {herbMarketPrices.length === 0 && herbOriginPrices.length === 0 && (
            <p className="text-text-secondary text-sm py-4 text-center">暂无报价数据</p>
          )}
        </div>

        <div className="w-full lg:w-[60%] bg-card rounded-lg border border-border p-5">
          <h2 className="text-base font-bold text-text mb-4">价格走势</h2>
          {chartData.length > 0 ? (
            <>
              <PriceChart history={chartData} herbName={herb.name} />
              <div className="flex gap-2 mt-4 justify-center">
                {TIME_RANGES.map(range => (
                  <button
                    key={range.key}
                    onClick={() => setTimeRange(range.key)}
                    className={`px-3 py-1 text-xs rounded border transition-colors ${
                      timeRange === range.key
                        ? 'bg-primary text-white border-primary'
                        : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-text-secondary text-sm py-8 text-center">暂无走势数据</p>
          )}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={setActiveTab} />
        <div className="p-5">
          {activeTab === 'supply' && (
            supplyTrades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-secondary">
                      <th className="text-left py-2.5 font-medium">品名</th>
                      <th className="text-left py-2.5 font-medium">规格</th>
                      <th className="text-left py-2.5 font-medium">产地</th>
                      <th className="text-left py-2.5 font-medium">数量</th>
                      <th className="text-left py-2.5 font-medium">价格</th>
                      <th className="text-left py-2.5 font-medium">日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplyTrades.map(t => (
                      <tr key={t.id} className="border-b border-divider last:border-b-0 hover:bg-row-hover transition-colors">
                        <td className="py-2.5 text-text font-medium">{t.herbName}</td>
                        <td className="py-2.5 text-text-secondary">{t.spec}</td>
                        <td className="py-2.5 text-text-secondary">{t.origin}</td>
                        <td className="py-2.5 text-text-secondary">{t.quantity}</td>
                        <td className="py-2.5 text-primary font-medium">{t.price}</td>
                        <td className="py-2.5 text-text-secondary">{formatDate(t.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-text-secondary text-sm py-6 text-center">暂无供应信息</p>
            )
          )}

          {activeTab === 'demand' && (
            demandTrades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-secondary">
                      <th className="text-left py-2.5 font-medium">品名</th>
                      <th className="text-left py-2.5 font-medium">规格</th>
                      <th className="text-left py-2.5 font-medium">数量</th>
                      <th className="text-left py-2.5 font-medium">报价人数</th>
                      <th className="text-left py-2.5 font-medium">剩余天数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demandTrades.map(t => (
                      <tr key={t.id} className="border-b border-divider last:border-b-0 hover:bg-row-hover transition-colors">
                        <td className="py-2.5 text-text font-medium">{t.herbName}</td>
                        <td className="py-2.5 text-text-secondary">{t.spec}</td>
                        <td className="py-2.5 text-text-secondary">{t.quantity}</td>
                        <td className="py-2.5 text-text-secondary">{t.quoteCount || 0}人</td>
                        <td className="py-2.5 text-text-secondary">{t.remainingDays || 0}天</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-text-secondary text-sm py-6 text-center">暂无求购信息</p>
            )
          )}

          {activeTab === 'news' && (
            relatedNews.length > 0 ? (
              <ul className="divide-y divide-divider">
                {relatedNews.map(n => (
                  <li key={n.id} className="py-3.5 first:pt-0 last:pb-0">
                    <Link to={`/news/${n.id}`} className="flex items-start justify-between gap-4 group">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors truncate">{n.title}</h4>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-1">{n.summary}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-text-secondary flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3" />
                          {formatDate(n.createdAt)}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">{n.views} 阅读</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-secondary text-sm py-6 text-center">暂无相关资讯</p>
            )
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-3">
              <p className="text-sm text-text leading-relaxed">{herb.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 pt-2">
                {infoItems.map(([label, value]) => (
                  <div key={label} className="flex py-2.5 border-b border-divider">
                    <span className="w-20 shrink-0 text-text-secondary text-sm">{label}</span>
                    <span className="text-sm text-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h2 className="text-base font-bold text-text mb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
          {infoItems.map(([label, value]) => (
            <div key={label} className="flex py-2.5 border-b border-divider">
              <span className="w-20 shrink-0 text-text-secondary text-sm">{label}</span>
              <span className="text-sm text-text">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
