import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { herbs } from '../../data/herbs';
import { prices } from '../../data/prices';
import { trades } from '../../data/trades';
import { newsList } from '../../data/news';
import { CATEGORY_LABELS } from '../../data/categories';
import TabNav from '../../components/TabNav/TabNav';
import PriceChart from '../../components/PriceChart/PriceChart';
import TradeCard from '../../components/TradeCard/TradeCard';
import NewsCard from '../../components/NewsCard/NewsCard';
import { formatPrice, formatChange, getTrendClass } from '../../utils/format';

const TABS = [
  { key: 'supply', label: '供应信息' },
  { key: 'demand', label: '求购信息' },
  { key: 'news', label: '相关资讯' },
  { key: 'knowledge', label: '药材知识' },
  { key: 'planting', label: '种植技术' },
];

export default function HerbDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('supply');

  const herb = useMemo(() => herbs.find((h) => h.id === id), [id]);

  const herbPrices = useMemo(
    () => (herb ? prices.filter((p) => p.herbId === herb.id) : []),
    [herb],
  );

  const pricesByMarket = useMemo(() => {
    const map = new Map<string, typeof herbPrices>();
    herbPrices.forEach((p) => {
      const list = map.get(p.market) || [];
      list.push(p);
      map.set(p.market, list);
    });
    return map;
  }, [herbPrices]);

  const pricesByOrigin = useMemo(() => {
    const map = new Map<string, typeof herbPrices>();
    herbPrices.forEach((p) => {
      const list = map.get(p.origin) || [];
      list.push(p);
      map.set(p.origin, list);
    });
    return map;
  }, [herbPrices]);

  const chartHistory = useMemo(
    () => (herbPrices.length > 0 ? herbPrices[0].history : []),
    [herbPrices],
  );

  const supplyTrades = useMemo(
    () =>
      herb
        ? trades.filter((t) => t.type === 'supply' && t.herbName === herb.name)
        : [],
    [herb],
  );

  const demandTrades = useMemo(
    () =>
      herb
        ? trades.filter((t) => t.type === 'demand' && t.herbName === herb.name)
        : [],
    [herb],
  );

  const relatedNews = useMemo(
    () =>
      herb
        ? newsList.filter((n) => n.herbNames.includes(herb.name))
        : [],
    [herb],
  );

  if (!herb) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-4 text-lg text-text-secondary">未找到该药材信息</p>
        <Link to="/" className="text-primary hover:underline">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
        <Link to="/" className="hover:text-primary">
          首页
        </Link>
        <span>/</span>
        <Link to="/price" className="hover:text-primary">
          行情价格
        </Link>
        <span>/</span>
        <span className="text-text">{herb.name}</span>
      </nav>

      <div className="mb-6">
        <Link
          to="/price"
          className="mb-3 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          返回列表
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-text">
            {herb.name}
            {herb.alias.length > 0 && (
              <span className="ml-2 text-base font-normal text-text-secondary">
                ({herb.alias.join('、')})
              </span>
            )}
          </h1>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {CATEGORY_LABELS[herb.category]}
          </span>
          <span className="rounded bg-bg px-2 py-0.5 text-xs font-medium text-text-secondary border border-border">
            {herb.family}
          </span>
          <span className="text-xs text-text-secondary">
            性味: <span className="text-text">{herb.nature}</span>
          </span>
          <span className="text-xs text-text-secondary">
            归经: <span className="text-text">{herb.meridian}</span>
          </span>
          <span className="text-xs text-text-secondary">
            功效: <span className="text-text">{herb.effect}</span>
          </span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-text">市场价格</h3>
            {pricesByMarket.size === 0 ? (
              <p className="text-sm text-text-secondary">暂无价格数据</p>
            ) : (
              <div className="space-y-4">
                {Array.from(pricesByMarket.entries()).map(([market, items]) => (
                  <div key={market}>
                    <div className="mb-1.5 text-xs font-medium text-text-secondary">
                      {market}市场
                    </div>
                    <div className="space-y-1">
                      {items.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between rounded bg-bg px-3 py-2 text-sm"
                        >
                          <span className="text-text-secondary">{p.spec}</span>
                          <span className="font-data font-medium text-text">
                            {formatPrice(p.currentPrice)}
                          </span>
                          <span className={`font-data text-xs ${getTrendClass(p.trend)}`}>
                            {formatChange(p.dailyChange)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pricesByOrigin.size > 0 && (
              <>
                <h3 className="mb-3 mt-5 text-sm font-medium text-text">产地价格</h3>
                <div className="space-y-4">
                  {Array.from(pricesByOrigin.entries()).map(([origin, items]) => (
                    <div key={origin}>
                      <div className="mb-1.5 text-xs font-medium text-text-secondary">
                        {origin}产地
                      </div>
                      <div className="space-y-1">
                        {items.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between rounded bg-bg px-3 py-2 text-sm"
                          >
                            <span className="text-text-secondary">{p.spec}</span>
                            <span className="font-data font-medium text-text">
                              {formatPrice(p.currentPrice)}
                            </span>
                            <span className={`font-data text-xs ${getTrendClass(p.trend)}`}>
                              {formatChange(p.dailyChange)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <PriceChart
            history={chartHistory}
            title={`${herb.name}价格走势`}
          />
        </div>
      </div>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mb-8">
        {activeTab === 'supply' && (
          supplyTrades.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supplyTrades.map((t) => (
                <TradeCard key={t.id} trade={t} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-text-secondary">暂无供应信息</p>
          )
        )}

        {activeTab === 'demand' && (
          demandTrades.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {demandTrades.map((t) => (
                <TradeCard key={t.id} trade={t} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-text-secondary">暂无求购信息</p>
          )
        )}

        {activeTab === 'news' && (
          relatedNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((n) => (
                <NewsCard key={n.id} news={n} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-text-secondary">暂无相关资讯</p>
          )
        )}

        {activeTab === 'knowledge' && (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">性味</td>
                  <td className="px-4 py-3 text-text">{herb.nature}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">归经</td>
                  <td className="px-4 py-3 text-text">{herb.meridian}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">功效</td>
                  <td className="px-4 py-3 text-text">{herb.effect}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">用法用量</td>
                  <td className="px-4 py-3 text-text">内服：煎汤，6～12g；或入丸、散。</td>
                </tr>
                <tr>
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">使用注意</td>
                  <td className="px-4 py-3 text-text">请在医师指导下使用，孕妇慎用。</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'planting' && (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">采收时间</td>
                  <td className="px-4 py-3 text-text">{herb.harvestTime}</td>
                </tr>
                <tr>
                  <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">主产地</td>
                  <td className="px-4 py-3 text-text">{herb.origin.join('、')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="bg-bg px-4 py-3 font-medium text-text">基本信息</div>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">名称</td>
              <td className="px-4 py-3 text-text">{herb.name}</td>
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">别名</td>
              <td className="px-4 py-3 text-text">{herb.alias.join('、')}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">类别</td>
              <td className="px-4 py-3 text-text">{CATEGORY_LABELS[herb.category]}</td>
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">科属</td>
              <td className="px-4 py-3 text-text">{herb.family}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">性味</td>
              <td className="px-4 py-3 text-text">{herb.nature}</td>
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">归经</td>
              <td className="px-4 py-3 text-text">{herb.meridian}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">功效</td>
              <td className="px-4 py-3 text-text" colSpan={3}>{herb.effect}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">产地</td>
              <td className="px-4 py-3 text-text" colSpan={3}>{herb.origin.join('、')}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">规格</td>
              <td className="px-4 py-3 text-text" colSpan={3}>{herb.spec.join('、')}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">采收时间</td>
              <td className="px-4 py-3 text-text" colSpan={3}>{herb.harvestTime}</td>
            </tr>
            <tr>
              <td className="w-24 bg-bg px-4 py-3 font-medium text-text-secondary">简介</td>
              <td className="px-4 py-3 text-text" colSpan={3}>{herb.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
