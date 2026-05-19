import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, Building2, MapPin, Phone, Clock, Users, Filter, Search } from 'lucide-react';
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
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(t =>
        t.herbName.toLowerCase().includes(q) ||
        t.spec.toLowerCase().includes(q) ||
        t.origin.toLowerCase().includes(q)
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
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">供求信息</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              对接药材供应商与采购商，实时更新供求商机
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNav tabs={TABS} activeKey={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Filter Section */}
        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-text">筛选条件</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm text-text-secondary font-medium">品类</label>
              <select
                value={category}
                onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
                className="w-full border border-border-light rounded-xl px-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              >
                <option value="">全部品类</option>
                {CATEGORIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm text-text-secondary font-medium">搜索</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="搜索品名、规格、产地"
                  className="w-full border border-border-light rounded-xl pl-10 pr-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-sm text-text-muted">
          共找到 <span className="text-primary font-semibold">{filteredTrades.length}</span> 条信息
        </div>

        {/* Supply Cards */}
        {(activeTab === 'supply' || activeTab === 'direct') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pagedTrades.map(trade => (
              <div
                key={trade.id}
                className="bg-card rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all duration-300 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-primary" />
                    <div>
                      <Link
                        to={`/herb/${trade.herbId}`}
                        className="text-lg font-semibold text-text hover:text-primary transition-colors"
                      >
                        {trade.herbName}
                      </Link>
                      <div className="text-text-muted text-sm mt-1">{trade.spec}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {activeTab === 'direct' && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        产地直供
                      </span>
                    )}
                    {trade.isPromoted && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold font-medium">
                        推荐
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-2xl font-semibold text-primary font-mono mb-4">{trade.price}</div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted mb-4">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {trade.origin}
                  </span>
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {trade.quantity}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {maskPhone(trade.contact)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {formatDate(trade.createdAt)}
                  </span>
                </div>

                {trade.description && (
                  <p className="text-sm text-text-muted line-clamp-2">{trade.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Demand Table */}
        {activeTab === 'demand' && (
          <div className="bg-card rounded-2xl border border-border-light shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-bg border-b border-border-light">
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">品名</th>
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">规格</th>
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">产地要求</th>
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">数量</th>
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">报价人数</th>
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">剩余天数</th>
                    <th className="text-left px-6 py-4 font-medium text-text-secondary">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedTrades.map(trade => (
                    <tr key={trade.id} className="border-b border-border-light hover:bg-bg transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          to={`/herb/${trade.herbId}`}
                          className="text-text hover:text-primary transition-colors font-medium"
                        >
                          {trade.herbName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-text-muted">{trade.spec}</td>
                      <td className="px-6 py-4 text-text-muted">{trade.origin}</td>
                      <td className="px-6 py-4 text-text-muted">{trade.quantity}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-text">
                          <Users className="w-4 h-4 text-primary" />
                          {trade.quoteCount || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={trade.remainingDays && trade.remainingDays <= 5 ? 'text-rise font-medium' : 'text-text-muted'}>
                          {trade.remainingDays ? `${trade.remainingDays}天` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 text-sm rounded-xl bg-primary text-white hover:bg-primary-700 transition-colors">
                          抢先报价
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bidding Cards */}
        {activeTab === 'bidding' && (
          <div className="space-y-6 mb-8">
            {pagedTrades.map(trade => (
              <div
                key={trade.id}
                className="bg-card rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all duration-300 card-hover"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <Building2 className="w-8 h-8 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-semibold text-text">{trade.company}</span>
                        {trade.isPromoted && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold font-medium">
                            热门
                          </span>
                        )}
                      </div>
                      <div className="text-text-muted mb-2">
                        {trade.herbName} · {trade.spec} · {trade.quantity}
                      </div>
                      <div className="text-xl font-semibold text-primary font-mono mb-2">{trade.price}</div>
                      {trade.description && (
                        <p className="text-sm text-text-muted line-clamp-2">{trade.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <span className="text-sm text-text-muted flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDate(trade.createdAt)}
                    </span>
                    <Link
                      to={`/trade/${trade.id}`}
                      className="text-sm text-primary hover:text-primary-700 transition-colors font-medium"
                    >
                      查看详情 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {pagedTrades.length === 0 && (
          <div className="bg-card rounded-2xl border border-border-light p-12 shadow-sm text-center mb-8">
            <p className="text-text-secondary">暂无相关信息</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={filteredTrades.length}
          pageSize={PAGE_SIZE}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
