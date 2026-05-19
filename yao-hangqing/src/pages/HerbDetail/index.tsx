import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowLeft, Leaf, Clock, MapPin } from 'lucide-react';
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
      <div className="container py-8">
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg mb-6">品种未找到</p>
          <Link to="/price" className="btn btn-p inline-flex items-center gap-2">
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
    <div className="container py-10">
      <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2 anim-up">
        <Link to="/" className="hover:text-green-700 transition-colors">首页</Link>
        <span className="text-slate-300">/</span>
        <Link to="/price" className="hover:text-green-700 transition-colors">行情</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium">{herb.name}</span>
      </nav>

      <div className="card p-8 mb-8 anim-up d1">
        <div className="flex items-start gap-6 flex-wrap mb-6">
          <h1 className="font-serif text-4xl font-bold text-slate-800 tracking-wide">{herb.name}</h1>
          {herb.alias.length > 0 && (
            <span className="text-slate-500 text-lg mt-2">
              （{herb.alias.join('、')}）
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <span className="badge badge-tag">
            {CATEGORY_MAP[herb.category] || herb.category}
          </span>
          <span className="badge badge-tag">
            {herb.family}
          </span>
        </div>
        <div className="text-slate-500 leading-relaxed max-w-3xl">
          {herb.effect}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-[60%]">
          <div className="card p-6 mb-6 anim-up d2">
            <h2 className="section-title flex items-center gap-3 mb-6">
              <span className="w-1 h-6 bg-green-700 rounded-full" />
              价格走势
            </h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(v: string) => v.slice(5)}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(v: number) => `¥${v}`}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [`¥${value}`, herb.name]}
                    labelFormatter={(label: unknown) => `日期: ${String(label)}`}
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontFamily: 'Noto Serif SC',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#047857"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: '#047857', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 text-sm py-12 text-center">暂无走势数据</p>
            )}
          </div>

          <div className="card overflow-hidden anim-up d3">
            <div className="card-head bg-green-50">
              <h2 className="section-title text-base">价格明细</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>规格</th>
                    <th>市场/产地</th>
                    <th className="text-right">今日价</th>
                    <th className="text-right">月涨跌</th>
                    <th className="text-center">走势</th>
                  </tr>
                </thead>
                <tbody>
                  {herbMarketPrices.map(p => (
                    <tr key={p.id}>
                      <td className="text-slate-500">{p.spec}</td>
                      <td className="text-slate-500">{p.market}</td>
                      <td className="text-right">
                        <span className={`prc ${p.monthlyChange > 0 ? 'prc-up' : p.monthlyChange < 0 ? 'prc-down' : ''}`}>
                          {formatPrice(p.currentPrice)}
                        </span>
                      </td>
                      <td className="text-right">
                        <span className={`chg ${p.monthlyChange > 0 ? 'chg-up' : p.monthlyChange < 0 ? 'chg-down' : ''}`}>
                          {formatChange(p.monthlyChange)}
                        </span>
                      </td>
                      <td className="text-center">
                        {p.trend === 'up' && <span className="chg chg-up"><TrendingUp className="w-3 h-3" /></span>}
                        {p.trend === 'down' && <span className="chg chg-down"><TrendingDown className="w-3 h-3" /></span>}
                        {p.trend === 'stable' && <span className="badge badge-flat">—</span>}
                      </td>
                    </tr>
                  ))}
                  {herbOriginPrices.map(p => (
                    <tr key={p.id}>
                      <td className="text-slate-500">{p.spec}</td>
                      <td className="text-slate-500">{p.origin}</td>
                      <td className="text-right">
                        <span className={`prc ${p.monthlyChange > 0 ? 'prc-up' : p.monthlyChange < 0 ? 'prc-down' : ''}`}>
                          {formatPrice(p.currentPrice)}
                        </span>
                      </td>
                      <td className="text-right">
                        <span className={`chg ${p.monthlyChange > 0 ? 'chg-up' : p.monthlyChange < 0 ? 'chg-down' : ''}`}>
                          {formatChange(p.monthlyChange)}
                        </span>
                      </td>
                      <td className="text-center">
                        {p.trend === 'up' && <span className="chg chg-up"><TrendingUp className="w-3 h-3" /></span>}
                        {p.trend === 'down' && <span className="chg chg-down"><TrendingDown className="w-3 h-3" /></span>}
                        {p.trend === 'stable' && <span className="badge badge-flat">—</span>}
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
            <div className="card p-6 mb-6 anim-up d2">
              <h3 className="section-title text-base mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-700" />
                市场报价
              </h3>
              <div className="divide-y divide-slate-100">
                {herbMarketPrices.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-4 text-sm">
                    <div className="min-w-0">
                      <div className="text-slate-800 font-medium">{p.market}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{p.spec}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`prc ${p.monthlyChange > 0 ? 'prc-up' : p.monthlyChange < 0 ? 'prc-down' : ''}`}>
                        {formatPrice(p.currentPrice)}
                      </span>
                      <span className={`chg ${p.monthlyChange > 0 ? 'chg-up' : p.monthlyChange < 0 ? 'chg-down' : ''}`}>
                        {formatChange(p.monthlyChange)}
                      </span>
                      {p.trend === 'up' && <span className="badge badge-up text-xs">涨</span>}
                      {p.trend === 'down' && <span className="badge badge-down text-xs">跌</span>}
                      {p.trend === 'stable' && <span className="badge badge-flat text-xs">稳</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {herbOriginPrices.length > 0 && (
            <div className="card p-6 anim-up d3">
              <h3 className="section-title text-base mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700" />
                产地报价
              </h3>
              <div className="divide-y divide-slate-100">
                {herbOriginPrices.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-4 text-sm">
                    <div className="min-w-0">
                      <div className="text-slate-800 font-medium">{p.origin}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{p.spec}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`prc ${p.monthlyChange > 0 ? 'prc-up' : p.monthlyChange < 0 ? 'prc-down' : ''}`}>
                        {formatPrice(p.currentPrice)}
                      </span>
                      <span className={`chg ${p.monthlyChange > 0 ? 'chg-up' : p.monthlyChange < 0 ? 'chg-down' : ''}`}>
                        {formatChange(p.monthlyChange)}
                      </span>
                      {p.trend === 'up' && <span className="badge badge-up text-xs">涨</span>}
                      {p.trend === 'down' && <span className="badge badge-down text-xs">跌</span>}
                      {p.trend === 'stable' && <span className="badge badge-flat text-xs">稳</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mb-8 anim-up d4">
        <div className="tab-bar">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab ${activeTab === tab.key ? 'on' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card-body">
          {activeTab === 'supply' && (
            supplyTrades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>品名</th>
                      <th>规格</th>
                      <th>产地</th>
                      <th>数量</th>
                      <th>价格</th>
                      <th>日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplyTrades.map(t => (
                      <tr key={t.id}>
                        <td className="text-slate-800 font-medium">{t.herbName}</td>
                        <td className="text-slate-500">{t.spec}</td>
                        <td className="text-slate-500">{t.origin}</td>
                        <td className="text-slate-500">{t.quantity}</td>
                        <td className="text-red-600 font-semibold">{t.price}</td>
                        <td className="text-slate-400">{formatDate(t.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-400 text-sm py-12 text-center">暂无供应信息</p>
            )
          )}

          {activeTab === 'demand' && (
            demandTrades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>品名</th>
                      <th>规格</th>
                      <th>数量</th>
                      <th>报价人数</th>
                      <th>剩余天数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demandTrades.map(t => (
                      <tr key={t.id}>
                        <td className="text-slate-800 font-medium">{t.herbName}</td>
                        <td className="text-slate-500">{t.spec}</td>
                        <td className="text-slate-500">{t.quantity}</td>
                        <td className="text-green-700 font-medium">{t.quoteCount || 0}人</td>
                        <td className="text-slate-500">{t.remainingDays || 0}天</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-400 text-sm py-12 text-center">暂无求购信息</p>
            )
          )}

          {activeTab === 'news' && (
            relatedNews.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {relatedNews.map(n => (
                  <li key={n.id} className="py-4 first:pt-0 last:pb-0">
                    <Link to={`/news/${n.id}`} className="flex items-start justify-between gap-4 group">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-800 group-hover:text-green-700 transition-colors truncate">{n.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{n.summary}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-slate-400">{formatDate(n.createdAt)}</div>
                        <div className="text-xs text-slate-400 mt-1">{n.views} 阅读</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm py-12 text-center">暂无相关资讯</p>
            )
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <p className="text-sm text-slate-700 leading-relaxed">{herb.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 pt-2">
                {infoItems.map(([label, value]) => (
                  <div key={label} className="flex py-3 border-b border-slate-100">
                    <span className="w-28 shrink-0 text-slate-500 text-sm font-medium">{label}</span>
                    <span className="text-sm text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card overflow-hidden anim-up d5">
        <div className="card-head bg-green-50">
          <h2 className="section-title text-base flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-700" />
            基本信息
          </h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
            {infoItems.map(([label, value]) => (
              <div key={label} className="flex py-3 border-b border-slate-100">
                <span className="w-28 shrink-0 text-slate-500 text-sm font-medium">{label}</span>
                <span className="text-sm text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
