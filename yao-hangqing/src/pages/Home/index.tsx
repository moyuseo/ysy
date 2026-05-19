import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, ArrowRight, Search, Leaf,
  Clock, BarChart3, Newspaper, Package, ChevronRight,
  Activity
} from 'lucide-react';
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
const latestNews = newsList.slice(0, 5);
const hotHerbs = herbs.slice(0, 16);

const riseCount = marketPrices.filter(p => p.monthlyChange > 0).length;
const fallCount = marketPrices.filter(p => p.monthlyChange < 0).length;

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </div>
  );
}

const rankBadge = (idx: number, type: 'rise' | 'fall') => {
  if (idx === 0) return type === 'rise'
    ? { bg: '#dc2626', color: '#fff' }
    : { bg: '#065f46', color: '#fff' };
  if (idx === 1) return type === 'rise'
    ? { bg: '#f87171', color: '#fff' }
    : { bg: '#059669', color: '#fff' };
  if (idx === 2) return type === 'rise'
    ? { bg: '#fca5a5', color: '#7f1d1d' }
    : { bg: '#6ee7b7', color: '#064e3b' };
  return { bg: '#f1f5f9', color: '#64748b' };
};

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setHeroLoaded(true); }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #011a15 0%, #022c22 25%, #064e3b 60%, #065f46 100%)',
          minHeight: 'clamp(520px, 75vh, 700px)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle at 30% 70%, rgba(52,211,153,0.06) 0%, transparent 60%)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative container flex flex-col justify-center" style={{ paddingTop: 'clamp(100px, 14vh, 160px)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{
                background: 'rgba(16,185,129,0.10)',
                border: '1px solid rgba(16,185,129,0.18)',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s',
              }}
            >
              <Activity className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-300 text-xs font-medium tracking-wide">实时数据 · 每日更新</span>
            </div>

            <h1
              className="font-serif font-bold text-white mb-5"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 4.25rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              中药材
              <br />
              <span style={{ color: '#6ee7b7' }}>行情中心</span>
            </h1>

            <p
              className="text-base mb-10 leading-relaxed max-w-md"
              style={{
                color: 'rgba(167,243,208,0.50)',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s',
              }}
            >
              覆盖全国主要中药材市场，实时追踪价格走势，助力药材交易精准决策
            </p>

            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s',
              }}
            >
              <Link
                to="/price"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white transition-all duration-200"
                style={{ background: '#059669' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(5,150,105,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#059669'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                查看行情 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/trade"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white/80 transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
              >
                供求对接
              </Link>
            </div>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s',
            }}
          >
            {[
              { icon: Leaf, label: '覆盖品种', value: herbs.length, accent: '#6ee7b7' },
              { icon: Clock, label: '今日更新', value: marketPrices.length, accent: '#6ee7b7' },
              { icon: TrendingUp, label: '上涨品种', value: riseCount, accent: '#fca5a5' },
              { icon: TrendingDown, label: '下跌品种', value: fallCount, accent: '#6ee7b7' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '18px 20px',
                }}
              >
                <item.icon className="w-4 h-4 mb-2.5" style={{ color: item.accent }} />
                <div className="text-2xl font-bold text-white mb-0.5" style={{ fontVariantNumeric: 'tabular-nums' }}>{item.value}</div>
                <div className="text-xs" style={{ color: 'rgba(167,243,208,0.40)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 今日行情 ── */}
      <SectionReveal>
        <section className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">今日行情</h2>
              <p className="text-sm text-slate-400 mt-1">最新市场价格动态</p>
            </div>
            <Link to="/price" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium transition-colors">
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>品种</th>
                    <th>规格</th>
                    <th>市场</th>
                    <th style={{ textAlign: 'right' }}>今日价</th>
                    <th style={{ textAlign: 'right' }}>月涨跌</th>
                    <th style={{ textAlign: 'right' }}>走势</th>
                  </tr>
                </thead>
                <tbody>
                  {latestPrices.map((price) => (
                    <tr key={price.id}>
                      <td>
                        <Link to={`/herb/${price.herbId}`} className="text-green-800 hover:text-green-600 font-medium transition-colors">
                          {price.herbName}
                        </Link>
                      </td>
                      <td className="text-slate-500">{price.spec}</td>
                      <td className="text-slate-500">{price.market}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="prc">{formatPrice(price.currentPrice)}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={`chg ${price.monthlyChange > 0 ? 'chg-up' : price.monthlyChange < 0 ? 'chg-down' : 'badge-flat'}`}>
                          {formatChange(price.monthlyChange)}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {price.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-600" style={{ display: 'inline', verticalAlign: 'middle' }} />}
                        {price.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-700" style={{ display: 'inline', verticalAlign: 'middle' }} />}
                        {price.trend === 'stable' && <span className="text-slate-400 text-xs">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── 涨跌排行 ── */}
      <SectionReveal>
        <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900">涨跌排行</h2>
                <p className="text-sm text-slate-400 mt-1">实时价格变动排名</p>
              </div>
              <Link to="/rank" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium transition-colors">
                完整排行 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 涨幅榜 */}
              <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-head" style={{ background: 'linear-gradient(135deg, #fef2f2, #fff5f5)' }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <h3 className="font-serif text-base font-bold text-slate-900">涨幅榜</h3>
                  </div>
                </div>
                <div>
                  {topRisers.map((item, idx) => {
                    const badge = rankBadge(idx, 'rise');
                    return (
                      <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 last:border-0 hover:bg-green-50/40 transition-colors group">
                        <span
                          className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: badge.bg, color: badge.color }}
                        >
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-slate-800 group-hover:text-green-700 flex-1 font-medium truncate transition-colors">
                          {item.herbName}
                        </Link>
                        <span className="text-sm font-bold text-red-600 shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          {formatChange(item.monthlyChange)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 跌幅榜 */}
              <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-head" style={{ background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)' }}>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-green-700" />
                    <h3 className="font-serif text-base font-bold text-slate-900">跌幅榜</h3>
                  </div>
                </div>
                <div>
                  {topFallers.map((item, idx) => {
                    const badge = rankBadge(idx, 'fall');
                    return (
                      <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 last:border-0 hover:bg-green-50/40 transition-colors group">
                        <span
                          className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: badge.bg, color: badge.color }}
                        >
                          {idx + 1}
                        </span>
                        <Link to={`/herb/${item.herbId}`} className="text-sm text-slate-800 group-hover:text-green-700 flex-1 font-medium truncate transition-colors">
                          {item.herbName}
                        </Link>
                        <span className="text-sm font-bold text-green-700 shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          {formatChange(item.monthlyChange)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 供求速递 */}
              <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-head" style={{ background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)' }}>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-green-700" />
                    <h3 className="font-serif text-base font-bold text-slate-900">供求速递</h3>
                  </div>
                </div>
                <div>
                  <div className="px-5 pt-3 pb-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">供应</span>
                  </div>
                  {supplyTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between px-5 py-2 border-b border-slate-100 group">
                      <Link to="/trade" className="text-sm text-slate-800 group-hover:text-green-700 font-medium truncate transition-colors">
                        {trade.herbName}
                        <span className="text-xs text-slate-400 ml-1.5">{trade.spec}</span>
                      </Link>
                      <span className="text-sm font-semibold text-red-600 shrink-0 ml-3">{trade.price}</span>
                    </div>
                  ))}
                  <div className="divider" />
                  <div className="px-5 pt-3 pb-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">求购</span>
                  </div>
                  {demandTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between px-5 py-2 border-b border-slate-100 last:border-0 group">
                      <Link to="/trade" className="text-sm text-slate-800 group-hover:text-green-700 font-medium truncate transition-colors">
                        {trade.herbName}
                        <span className="text-xs text-slate-400 ml-1.5">{trade.spec}</span>
                      </Link>
                      <span className="text-sm font-semibold text-slate-700 shrink-0 ml-3">{trade.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── 资讯 + 热门品种 ── */}
      <SectionReveal>
        <section className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* 资讯 */}
            <div className="lg:col-span-3">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">最新资讯</h2>
                  <p className="text-sm text-slate-400 mt-1">行业动态与市场分析</p>
                </div>
                <Link to="/news" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium transition-colors">
                  全部资讯 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {latestNews.map((news, idx) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 group"
                    style={{ background: 'white', border: '1px solid #e2e8f0' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#a7f3d0'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(5,150,105,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        background: idx === 0 ? '#065f46' : '#ecfdf5',
                        color: idx === 0 ? '#fff' : '#065f46',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-green-700 transition-colors line-clamp-1 mb-1">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{news.summary}</p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span className="text-xs text-slate-400">{formatDate(news.createdAt)}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-green-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 热门品种 + 快速入口 */}
            <div className="lg:col-span-2">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">热门品种</h2>
                  <p className="text-sm text-slate-400 mt-1">高频查询药材</p>
                </div>
                <Link to="/rank" className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 font-medium transition-colors">
                  排行 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {hotHerbs.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm text-slate-600 font-medium transition-all duration-200"
                    style={{ background: 'white', border: '1px solid #e2e8f0' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#6ee7b7'; e.currentTarget.style.color = '#065f46'; e.currentTarget.style.background = '#ecfdf5'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'white'; }}
                  >
                    <Leaf className="w-3 h-3 text-green-500" />
                    {herb.name}
                  </Link>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-5">快速入口</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: BarChart3, label: '行情中心', path: '/price', desc: '价格查询' },
                    { icon: Package, label: '供求信息', path: '/trade', desc: '供需对接' },
                    { icon: TrendingUp, label: '价格排行', path: '/rank', desc: '涨跌排名' },
                    { icon: Newspaper, label: '资讯动态', path: '/news', desc: '行业资讯' },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="p-4 rounded-xl transition-all duration-200 group"
                      style={{ background: 'white', border: '1px solid #e2e8f0' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#a7f3d0'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(5,150,105,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <item.icon className="w-5 h-5 text-green-700 mb-2.5 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-green-700 transition-colors">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── 底部 CTA ── */}
      <SectionReveal>
        <section style={{ background: 'linear-gradient(155deg, #011a15, #022c22 40%, #064e3b)' }}>
          <div className="container" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">开始探索中药材行情</h3>
                <p style={{ color: 'rgba(167,243,208,0.45)' }} className="text-sm">搜索品种、规格、产地，获取实时价格数据</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="搜索品种、规格、产地..."
                  className="w-full pl-11 pr-4 py-3 rounded-lg text-sm text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#6ee7b7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(110,231,183,0.12)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
