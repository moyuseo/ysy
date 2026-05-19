import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Building2, MapPin, Phone, Clock, Users, Tag, Star } from 'lucide-react';
import { trades } from '../../data/trades';
import { CATEGORIES } from '../../utils/constants';
import TabNav from '../../components/TabNav/TabNav';
import Pagination from '../../components/Pagination/Pagination';
import { formatDate } from '../../utils/format';

const TABS = [
  { key: 'supply', label: '供应信息' },
  { key: 'demand', label: '求购信息' },
  { key: 'bidding', label: '采购招标' },
  { key: 'direct', label: '产地直供' },
];

const PAGE_SIZE = 10;

function maskPhone(phone: string): string {
  if (phone.length >= 7) {
    return phone.slice(0, 3) + '****' + phone.slice(-4);
  }
  return phone;
}

export default function TradePage() {
  const [activeTab, setActiveTab] = useState('supply');
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrades = useMemo(() => {
    let result = trades.filter(t => {
      if (activeTab === 'supply') return t.type === 'supply';
      if (activeTab === 'demand') return t.type === 'demand';
      if (activeTab === 'bidding') return t.type === 'bidding';
      if (activeTab === 'direct') return t.type === 'direct';
      return true;
    });

    if (category) {
      result = result.filter(t => t.herbId && t.herbId.startsWith('H'));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(t =>
        t.herbName.toLowerCase().includes(query) ||
        t.spec.toLowerCase().includes(query) ||
        t.origin.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeTab, category, searchQuery]);

  const pagedTrades = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTrades.slice(start, start + PAGE_SIZE);
  }, [filteredTrades, currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCategory('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="font-serif text-2xl font-bold text-text mb-6">供求信息</h1>

      <div className="mb-6">
        <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative">
          <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none" />
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
            className="appearance-none border border-border rounded pl-7 pr-6 py-1.5 text-sm bg-card text-text cursor-pointer hover:border-primary-light transition-colors"
          >
            <option value="">全部品类</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <ShoppingCart className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索品名、规格、产地"
            className="border border-border rounded pl-8 pr-3 py-1.5 text-sm bg-card text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary-light transition-colors w-56"
          />
        </div>
      </div>

      {activeTab === 'supply' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {pagedTrades.map(trade => (
            <div key={trade.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to={`/herb/${trade.herbId}`}
                    className="text-lg font-bold text-text hover:text-primary transition-colors"
                  >
                    {trade.herbName}
                  </Link>
                  <span className="text-xs px-2 py-0.5 rounded bg-row-alt text-text-secondary border border-border">
                    {trade.spec}
                  </span>
                  {trade.isPromoted && (
                    <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded bg-gold/15 text-gold font-medium">
                      <Star className="w-3 h-3 fill-gold" />
                      推荐
                    </span>
                  )}
                </div>
              </div>

              <div className="text-primary font-mono font-semibold text-base mb-3">
                {trade.price}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary mb-3">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary-light" />
                  {trade.origin}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-primary-light" />
                  {trade.quantity}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-primary-light" />
                  {maskPhone(trade.contact)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary-light" />
                  {formatDate(trade.createdAt)}
                </span>
              </div>

              {trade.description && (
                <p className="text-xs text-text-secondary mt-3 line-clamp-2 leading-relaxed">
                  {trade.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'demand' && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">品名</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">规格</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">产地要求</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">数量</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">报价人数</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">剩余天数</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {pagedTrades.map(trade => (
                <tr key={trade.id} className="border-b border-divider hover:bg-row-hover transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/herb/${trade.herbId}`} className="text-text hover:text-primary transition-colors font-medium">
                      {trade.herbName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{trade.spec}</td>
                  <td className="px-4 py-3 text-text-secondary">{trade.origin}</td>
                  <td className="px-4 py-3 text-text-secondary">{trade.quantity}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      {trade.quoteCount ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={trade.remainingDays && trade.remainingDays <= 5 ? 'text-rise font-medium' : 'text-text-secondary'}>
                      {trade.remainingDays ? `${trade.remainingDays}天` : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1 text-xs rounded bg-primary text-white hover:bg-primary-light transition-colors">
                      抢先报价
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'bidding' && (
        <div className="space-y-4 mb-6">
          {pagedTrades.map(trade => (
            <div key={trade.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text">{trade.company}</span>
                      {trade.isPromoted && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gold/15 text-gold font-medium">热门</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary mb-1">
                      {trade.herbName} · {trade.spec} · {trade.quantity}
                    </div>
                    <div className="text-sm text-primary font-mono font-medium">{trade.price}</div>
                    {trade.description && (
                      <p className="text-xs text-text-secondary mt-2 line-clamp-2 leading-relaxed">{trade.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                  <span className="text-xs text-text-secondary inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(trade.createdAt)}
                  </span>
                  <Link
                    to="/trade"
                    className="text-xs text-primary hover:text-primary-light transition-colors"
                  >
                    查看详情 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'direct' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {pagedTrades.map(trade => (
            <div key={trade.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to={`/herb/${trade.herbId}`}
                    className="text-lg font-bold text-text hover:text-primary transition-colors"
                  >
                    {trade.herbName}
                  </Link>
                  <span className="text-xs px-2 py-0.5 rounded bg-row-alt text-text-secondary border border-border">
                    {trade.spec}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">产地直供</span>
                  {trade.isPromoted && (
                    <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded bg-gold/15 text-gold font-medium">
                      <Star className="w-3 h-3 fill-gold" />
                      推荐
                    </span>
                  )}
                </div>
              </div>

              <div className="text-primary font-mono font-semibold text-base mb-3">
                {trade.price}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary mb-3">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary-light" />
                  {trade.origin}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-primary-light" />
                  {trade.quantity}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-primary-light" />
                  {maskPhone(trade.contact)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary-light" />
                  {formatDate(trade.createdAt)}
                </span>
              </div>

              {trade.description && (
                <p className="text-xs text-text-secondary mt-3 line-clamp-2 leading-relaxed">
                  {trade.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {pagedTrades.length === 0 && (
        <div className="text-center py-12 text-text-secondary">暂无相关信息</div>
      )}

      <Pagination
        current={currentPage}
        total={filteredTrades.length}
        pageSize={PAGE_SIZE}
        onChange={setCurrentPage}
      />
    </div>
  );
}
