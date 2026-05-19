import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Home, ChevronRight, Info, Leaf } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { marketPrices, originPrices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import PriceChart from '../../components/PriceChart/PriceChart';
import TabNav from '../../components/TabNav/TabNav';
import { formatPrice, formatChange, formatDate } from '../../utils/format';

const TABS = [
  { key: 'supply', label: '供应信息' },
  { key: 'demand', label: '求购信息' },
  { key: 'news', label: '相关资讯' },
  { key: 'knowledge', label: '药材知识' },
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

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-5 h-5 text-rise" />;
  if (trend === 'down') return <TrendingDown className="w-5 h-5 text-fall" />;
  return <Minus className="w-5 h-5 text-stable" />;
}

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
      <div className="min-h-screen bg-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center">
            <p className="text-text-secondary text-xl mb-4">品种未找到</p>
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-700 transition-colors">
              <Home className="w-4 h-4" />
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-100 mb-6">
            <Link to="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/price" className="hover:text-white transition-colors">行情价格</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{herb.name}</span>
          </nav>

          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-2">
                {herb.name}
                {herb.alias.length > 0 && (
                  <span className="text-primary-100 text-xl font-normal ml-3">
                    （{herb.alias.join('、')}）
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-4 text-sm text-primary-100">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {CATEGORY_MAP[herb.category] || herb.category}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {herb.family}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Basic Info Card */}
        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-text">药材介绍</h2>
          </div>
          <p className="text-text leading-relaxed mb-4">{herb.effect}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">性味：</span>
              <span className="text-text">{herb.nature}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">归经：</span>
              <span className="text-text">{herb.meridian}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">主产地：</span>
              <span className="text-text">{herb.origin.join('、')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">采收时间：</span>
              <span className="text-text">{herb.harvestTime}</span>
            </div>
          </div>
        </div>

        {/* Price Overview and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Price Overview */}
          <div className="lg:col-span-1 space-y-4">
            {/* Market Prices */}
            {herbMarketPrices.length > 0 && (
              <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-text mb-4">市场报价</h3>
                <div className="space-y-3">
                  {herbMarketPrices.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-bg rounded-xl">
                      <div>
                        <div className="text-text font-medium">{p.market}</div>
                        <div className="text-text-muted text-sm">{p.spec}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-semibold text-text">{formatPrice(p.currentPrice)}</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-mono font-medium ${
                            p.trend === 'up' ? 'text-rise' : p.trend === 'down' ? 'text-fall' : 'text-stable'
                          }`}>
                            {formatChange(p.monthlyChange)}
                          </span>
                          <TrendIcon trend={p.trend} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Origin Prices */}
            {herbOriginPrices.length > 0 && (
              <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-text mb-4">产地报价</h3>
                <div className="space-y-3">
                  {herbOriginPrices.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-bg rounded-xl">
                      <div>
                        <div className="text-text font-medium">{p.origin}</div>
                        <div className="text-text-muted text-sm">{p.spec}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-semibold text-text">{formatPrice(p.currentPrice)}</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-mono font-medium ${
                            p.trend === 'up' ? 'text-rise' : p.trend === 'down' ? 'text-fall' : 'text-stable'
                          }`}>
                            {formatChange(p.monthlyChange)}
                          </span>
                          <TrendIcon trend={p.trend} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price Chart */}
          <div className="lg:col-span-2">
            {chartData.length > 0 ? (
              <PriceChart history={chartData} herbName={herb.name} />
            ) : (
              <div className="bg-card rounded-2xl border border-border-light shadow-sm p-12 text-center">
                <p className="text-text-secondary">暂无走势数据</p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          <TabNav tabs={TABS} activeKey={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-8">
          {/* Supply Info */}
          {activeTab === 'supply' && (
            supplyTrades.length > 0 ? (
              <div className="space-y-4">
                {supplyTrades.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-6 bg-bg rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="flex-1">
                      <div className="text-text font-medium mb-1">{t.herbName}</div>
                      <div className="text-text-muted text-sm mb-2">{t.spec}</div>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span>产地：{t.origin}</span>
                        <span>数量：{t.quantity}</span>
                        <span>{formatDate(t.createdAt)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-primary font-mono">{t.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                暂无供应信息
              </div>
            )
          )}

          {/* Demand Info */}
          {activeTab === 'demand' && (
            demandTrades.length > 0 ? (
              <div className="space-y-4">
                {demandTrades.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-6 bg-bg rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="flex-1">
                      <div className="text-text font-medium mb-1">{t.herbName}</div>
                      <div className="text-text-muted text-sm mb-2">{t.spec}</div>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span>数量：{t.quantity}</span>
                        <span>报价：{t.quoteCount || 0}人</span>
                        <span>剩余：{t.remainingDays || 0}天</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                暂无求购信息
              </div>
            )
          )}

          {/* Related News */}
          {activeTab === 'news' && (
            relatedNews.length > 0 ? (
              <div className="space-y-4">
                {relatedNews.map(n => (
                  <Link
                    key={n.id}
                    to={`/news/${n.id}`}
                    className="block p-6 bg-bg rounded-xl hover:bg-primary-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-text font-medium mb-2 hover:text-primary transition-colors">{n.title}</h4>
                        <p className="text-text-muted text-sm line-clamp-2">{n.summary}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-text-muted text-sm">{formatDate(n.createdAt)}</div>
                        <div className="text-text-muted text-xs mt-1">{n.views} 阅读</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                暂无相关资讯
              </div>
            )
          )}

          {/* Knowledge */}
          {activeTab === 'knowledge' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                ['品名', herb.name],
                ['别名', herb.alias.join('、')],
                ['科属', herb.family],
                ['性味', herb.nature],
                ['归经', herb.meridian],
                ['功效', herb.effect],
                ['主产地', herb.origin.join('、')],
                ['常见规格', herb.spec.join('、')],
                ['采收时间', herb.harvestTime],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-bg rounded-xl">
                  <span className="text-text-secondary text-sm font-medium w-24 shrink-0">{label}</span>
                  <span className="text-text">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
