import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Building2, MapPin, Phone, Clock, Users } from 'lucide-react';
import { trades } from '../../data/trades';
import { herbs } from '../../data/herbs';
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

const herbCategoryMap = new Map(herbs.map(h => [h.id, h.category]));

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
      result = result.filter(t => {
        const herb = herbs.find(h => h.name === t.herbName);
        return herb && herb.category === category;
      });
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

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
          className="border border-border rounded px-3 py-1.5 text-sm"
        >
          <option value="">全部品类</option>
          {CATEGORIES.map(c => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索品名、规格、产地"
            className="border border-border rounded px-3 py-1.5 text-sm w-56"
          />
        </div>
      </div>

      {activeTab === 'supply' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {pagedTrades.map(trade => (
            <div key={trade.id} className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <Link to={`/herb/${trade.herbId}`} className="font-medium text-text hover:text-primary transition-colors">
                    {trade.herbName}
                  </Link>
                  <span className="text-xs text-text-secondary">{trade.spec}</span>
                  {trade.isPromoted && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gold/20 text-gold font-medium">推荐</span>
                  )}
                </div>
              </div>
              <div className="text-primary font-mono font-medium mb-2">{trade.price}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary mb-2">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trade.origin}</span>
                <span className="flex items-center gap-1"><Package className="w-3 h-3" />{trade.quantity}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{maskPhone(trade.contact)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(trade.createdAt)}</span>
              </div>
              {trade.description && (
                <p className="text-xs text-text-secondary line-clamp-2">{trade.description}</p>
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
                <tr key={trade.id} className="border-b border-border/50 hover:bg-bg/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/herb/${trade.herbId}`} className="text-text hover:text-primary transition-colors font-medium">
                      {trade.herbName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{trade.spec}</td>
                  <td className="px-4 py-3 text-text-secondary">{trade.origin}</td>
                  <td className="px-4 py-3 text-text-secondary">{trade.quantity}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
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
            <div key={trade.id} className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text">{trade.company}</span>
                      {trade.isPromoted && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gold/20 text-gold font-medium">热门</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary mb-1">
                      {trade.herbName} · {trade.spec} · {trade.quantity}
                    </div>
                    <div className="text-sm text-primary font-mono">{trade.price}</div>
                    {trade.description && (
                      <p className="text-xs text-text-secondary mt-2 line-clamp-2">{trade.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                  <span className="text-xs text-text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3" />{formatDate(trade.createdAt)}
                  </span>
                  <Link
                    to={`/trade/${trade.id}`}
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
            <div key={trade.id} className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <Link to={`/herb/${trade.herbId}`} className="font-medium text-text hover:text-primary transition-colors">
                    {trade.herbName}
                  </Link>
                  <span className="text-xs text-text-secondary">{trade.spec}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">产地直供</span>
                  {trade.isPromoted && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gold/20 text-gold font-medium">推荐</span>
                  )}
                </div>
              </div>
              <div className="text-primary font-mono font-medium mb-2">{trade.price}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary mb-2">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trade.origin}</span>
                <span className="flex items-center gap-1"><Package className="w-3 h-3" />{trade.quantity}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{maskPhone(trade.contact)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(trade.createdAt)}</span>
              </div>
              {trade.description && (
                <p className="text-xs text-text-secondary line-clamp-2">{trade.description}</p>
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
