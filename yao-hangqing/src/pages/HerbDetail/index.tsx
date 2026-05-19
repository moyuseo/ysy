import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { marketPrices, originPrices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import { formatPrice, formatChange, formatDate } from '../../utils/format';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const TABS = [
  { key: 'supply', label: '供应' },
  { key: 'demand', label: '求购' },
  { key: 'news', label: '资讯' },
  { key: 'knowledge', label: '知识' },
];

export default function HerbDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('supply');

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg mb-4">品种未找到</p>
          <Link to="/price" className="text-accent hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            返回行情列表
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="text-sm text-text-secondary mb-4 flex items-center gap-1.5">
        <Link to="/" className="hover:text-accent transition-colors">首页</Link>
        <span className="text-border">/</span>
        <Link to="/price" className="hover:text-accent transition-colors">行情</Link>
        <span className="text-border">/</span>
        <span className="text-text">{herb.name}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-start gap-3 flex-wrap mb-3">
          <h1 className="font-display text-3xl text-text">{herb.name}</h1>
          {herb.alias.length > 0 && (
            <span className="text-text-secondary text-base mt-1.5">
              （{herb.alias.join('、')}）
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="bg-accent-muted text-accent px-3 py-1 rounded text-sm">
            {CATEGORY_MAP[herb.category] || herb.category}
          </span>
          <span className="bg-accent-muted text-accent px-3 py-1 rounded text-sm">
            {herb.family}
          </span>
        </div>
        <div className="text-text-secondary text-sm">
          {herb.effect}
        </div>
      </div>

      <div className="flex gap-6 mb-6 flex-col lg:flex-row">
        <div className="w-full lg:w-[60%]">
          <div className="mb-6">
            <h2 className="text-base font-medium text-text mb-4">价格走势</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#737373' }}
                    tickFormatter={(v: string) => v.slice(5)}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#737373' }}
                    tickFormatter={(v: number) => `¥${v}`}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [`¥${value}`, herb.name]}
                    labelFormatter={(label: unknown) => `日期: ${String(label)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-text-secondary text-sm py-8 text-center">暂无走势数据</p>
            )}
          </div>

          <div>
            <h2 className="text-base font-medium text-text mb-4">价格明细</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface">
                    <th className="px-3 py-2.5 text-left font-medium">规格</th>
                    <th className="px-3 py-2.5 text-left font-medium">市场/产地</th>
                    <th className="px-3 py-2.5 text-right font-medium">今日价</th>
                    <th className="px-3 py-2.5 text-right font-medium">月涨跌</th>
                    <th className="px-3 py-2.5 text-center font-medium">走势</th>
                  </tr>
                </thead>
                <tbody>
                  {herbMarketPrices.map(p => (
                    <tr key={p.id} className="border-b border-border-subtle hover:bg-accent-muted transition-colors">
                      <td className="px-3 py-2.5 text-text-secondary">{p.spec}</td>
                      <td className="px-3 py-2.5 text-text-secondary">{p.market}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-medium text-text">
                        {formatPrice(p.currentPrice)}
                      </td>
                      <td className={`px-3 py-2.5 text-right font-mono font-medium ${
                        p.monthlyChange > 0 ? 'text-rise' : p.monthlyChange < 0 ? 'text-fall' : 'text-text-secondary'
                      }`}>
                        {formatChange(p.monthlyChange)}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {p.trend === 'up' && <TrendingUp className="inline w-4 h-4 text-rise" />}
                        {p.trend === 'down' && <TrendingDown className="inline w-4 h-4 text-fall" />}
                        {p.trend === 'stable' && <Minus className="inline w-4 h-4 text-text-tertiary" />}
                      </td>
                    </tr>
                  ))}
                  {herbOriginPrices.map(p => (
                    <tr key={p.id} className="border-b border-border-subtle hover:bg-accent-muted transition-colors">
                      <td className="px-3 py-2.5 text-text-secondary">{p.spec}</td>
                      <td className="px-3 py-2.5 text-text-secondary">{p.origin}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-medium text-text">
                        {formatPrice(p.currentPrice)}
                      </td>
                      <td className={`px-3 py-2.5 text-right font-mono font-medium ${
                        p.monthlyChange > 0 ? 'text-rise' : p.monthlyChange < 0 ? 'text-fall' : 'text-text-secondary'
                      }`}>
                        {formatChange(p.monthlyChange)}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {p.trend === 'up' && <TrendingUp className="inline w-4 h-4 text-rise" />}
                        {p.trend === 'down' && <TrendingDown className="inline w-4 h-4 text-fall" />}
                        {p.trend === 'stable' && <Minus className="inline w-4 h-4 text-text-tertiary" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%]">
          {herbMarketPrices.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text mb-3">市场报价</h3>
              <div className="divide-y divide-border-subtle">
                {herbMarketPrices.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div className="min-w-0">
                      <div className="text-text font-medium">{p.market}</div>
                      <div className="text-text-secondary text-xs">{p.spec}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-medium text-text">{formatPrice(p.currentPrice)}</span>
                      <span className={`font-mono text-sm ${
                        p.monthlyChange > 0 ? 'text-rise' : p.monthlyChange < 0 ? 'text-fall' : 'text-text-secondary'
                      }`}>
                        {formatChange(p.monthlyChange)}
                      </span>
                      {p.trend === 'up' && <TrendingUp className="w-4 h-4 text-rise" />}
                      {p.trend === 'down' && <TrendingDown className="w-4 h-4 text-fall" />}
                      {p.trend === 'stable' && <Minus className="w-4 h-4 text-text-tertiary" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {herbOriginPrices.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-text mb-3">产地报价</h3>
              <div className="divide-y divide-border-subtle">
                {herbOriginPrices.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div className="min-w-0">
                      <div className="text-text font-medium">{p.origin}</div>
                      <div className="text-text-secondary text-xs">{p.spec}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-medium text-text">{formatPrice(p.currentPrice)}</span>
                      <span className={`font-mono text-sm ${
                        p.monthlyChange > 0 ? 'text-rise' : p.monthlyChange < 0 ? 'text-fall' : 'text-text-secondary'
                      }`}>
                        {formatChange(p.monthlyChange)}
                      </span>
                      {p.trend === 'up' && <TrendingUp className="w-4 h-4 text-rise" />}
                      {p.trend === 'down' && <TrendingDown className="w-4 h-4 text-fall" />}
                      {p.trend === 'stable' && <Minus className="w-4 h-4 text-text-tertiary" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-border">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-secondary hover:text-accent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-5">
          {activeTab === 'supply' && (
            supplyTrades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2.5 font-medium text-text-secondary">品名</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">规格</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">产地</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">数量</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">价格</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplyTrades.map(t => (
                      <tr key={t.id} className="border-b border-border-subtle hover:bg-accent-muted transition-colors">
                        <td className="py-2.5 text-text font-medium">{t.herbName}</td>
                        <td className="py-2.5 text-text-secondary">{t.spec}</td>
                        <td className="py-2.5 text-text-secondary">{t.origin}</td>
                        <td className="py-2.5 text-text-secondary">{t.quantity}</td>
                        <td className="py-2.5 text-accent font-medium">{t.price}</td>
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
                    <tr className="border-b border-border">
                      <th className="text-left py-2.5 font-medium text-text-secondary">品名</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">规格</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">数量</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">报价人数</th>
                      <th className="text-left py-2.5 font-medium text-text-secondary">剩余天数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demandTrades.map(t => (
                      <tr key={t.id} className="border-b border-border-subtle hover:bg-accent-muted transition-colors">
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
              <ul className="divide-y divide-border-subtle">
                {relatedNews.map(n => (
                  <li key={n.id} className="py-3.5 first:pt-0 last:pb-0">
                    <Link to={`/news/${n.id}`} className="flex items-start justify-between gap-4 group">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text group-hover:text-accent transition-colors truncate">{n.title}</h4>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-1">{n.summary}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-text-secondary">
                          {formatDate(n.createdAt)}
                        </div>
                        <div className="text-xs text-text-tertiary mt-1">{n.views} 阅读</div>
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
                  <div key={label} className="flex py-2.5 border-b border-border-subtle">
                    <span className="w-20 shrink-0 text-text-secondary text-sm">{label}</span>
                    <span className="text-sm text-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-base font-medium text-text mb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
          {infoItems.map(([label, value]) => (
            <div key={label} className="flex py-2.5 border-b border-border-subtle">
              <span className="w-20 shrink-0 text-text-secondary text-sm">{label}</span>
              <span className="text-sm text-text">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
