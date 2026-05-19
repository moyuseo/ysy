import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { trades } from '../../data/trades';
import { CATEGORIES } from '../../utils/constants';
import { formatDate } from '../../utils/format';

const TABS = [
  { key: 'supply', label: '供应信息' },
  { key: 'demand', label: '求购信息' },
  { key: 'bidding', label: '采购招标' },
  { key: 'direct', label: '产地直供' },
];

const PAGE_SIZE = 15;

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

  const totalPages = Math.ceil(filteredTrades.length / PAGE_SIZE);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCategory('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return (
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <span className="text-xs text-text-tertiary">共 {filteredTrades.length} 条</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 text-xs rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-raised transition-colors"
          >
            上一页
          </button>
          {pages.map((p, i) =>
            typeof p === 'string' ? (
              <span key={`e-${i}`} className="px-1.5 text-text-tertiary text-xs">...</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  currentPage === p
                    ? 'bg-accent text-white border-accent'
                    : 'border-border hover:bg-surface-raised'
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 text-xs rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-raised transition-colors"
          >
            下一页
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl text-text mb-6">供求信息</h1>

      <div className="flex items-center justify-between mb-4 border-b border-border">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative -mb-px ${
              activeTab === tab.key
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-4 items-center">
        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary pointer-events-none" />
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
            className="appearance-none border border-border rounded pl-7 pr-6 py-1.5 text-xs bg-surface-raised text-text cursor-pointer hover:border-text-tertiary transition-colors"
          >
            <option value="">全部品类</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索品名、规格、产地"
            className="w-full border border-border rounded pl-7 pr-3 py-1.5 text-xs bg-surface-raised text-text placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors"
          />
        </div>
      </div>

      {activeTab === 'supply' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-3 py-2 text-left font-medium text-text-secondary">品名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">规格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">产地</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">数量</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">价格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">联系方式</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">日期</th>
              </tr>
            </thead>
            <tbody>
              {pagedTrades.map(trade => (
                <tr key={trade.id} className="border-b border-border-subtle hover:bg-surface-raised transition-colors">
                  <td className="px-3 py-2.5">
                    <Link to={`/herb/${trade.herbId}`} className="text-text hover:text-accent transition-colors font-medium">
                      {trade.herbName}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.spec}</td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.origin}</td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.quantity}</td>
                  <td className="px-3 py-2.5 text-accent font-mono font-medium">{trade.price}</td>
                  <td className="px-3 py-2.5 text-text-secondary font-mono">{maskPhone(trade.contact)}</td>
                  <td className="px-3 py-2.5 text-text-tertiary">{formatDate(trade.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagedTrades.length === 0 && (
            <div className="text-center py-12 text-text-tertiary text-sm">暂无相关信息</div>
          )}
          {renderPagination()}
        </div>
      )}

      {activeTab === 'demand' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-3 py-2 text-left font-medium text-text-secondary">品名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">规格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">数量</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">报价人数</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">剩余天数</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {pagedTrades.map(trade => (
                <tr key={trade.id} className="border-b border-border-subtle hover:bg-surface-raised transition-colors">
                  <td className="px-3 py-2.5">
                    <Link to={`/herb/${trade.herbId}`} className="text-text hover:text-accent transition-colors font-medium">
                      {trade.herbName}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.spec}</td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.quantity}</td>
                  <td className="px-3 py-2.5 text-accent">{trade.quoteCount ?? 0}</td>
                  <td className="px-3 py-2.5">
                    <span className={trade.remainingDays && trade.remainingDays <= 5 ? 'text-rise font-medium' : 'text-text-secondary'}>
                      {trade.remainingDays ? `${trade.remainingDays}天` : '-'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <button className="px-3 py-1 text-xs rounded bg-accent text-white hover:bg-accent/90 transition-colors">
                      抢先报价
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagedTrades.length === 0 && (
            <div className="text-center py-12 text-text-tertiary text-sm">暂无相关信息</div>
          )}
          {renderPagination()}
        </div>
      )}

      {activeTab === 'bidding' && (
        <div className="space-y-0">
          {pagedTrades.map((trade, idx) => (
            <div key={trade.id} className={`py-3 flex items-start justify-between ${idx > 0 ? 'border-t border-border-subtle' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-text">{trade.company}</span>
                  {trade.isPromoted && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-muted text-accent font-medium">热门</span>
                  )}
                </div>
                <div className="text-xs text-text-secondary">
                  {trade.herbName} · {trade.spec} · {trade.quantity}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                <span className="text-xs text-text-tertiary">{formatDate(trade.createdAt)}</span>
                <Link to={`/trade/${trade.id}`} className="text-xs text-accent hover:text-accent/80 transition-colors">
                  查看详情 →
                </Link>
              </div>
            </div>
          ))}
          {pagedTrades.length === 0 && (
            <div className="text-center py-12 text-text-tertiary text-sm">暂无相关信息</div>
          )}
          {renderPagination()}
        </div>
      )}

      {activeTab === 'direct' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-3 py-2 text-left font-medium text-text-secondary">品名</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">规格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">产地</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">数量</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">价格</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">联系方式</th>
                <th className="px-3 py-2 text-left font-medium text-text-secondary">日期</th>
              </tr>
            </thead>
            <tbody>
              {pagedTrades.map(trade => (
                <tr key={trade.id} className="border-b border-border-subtle hover:bg-surface-raised transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Link to={`/herb/${trade.herbId}`} className="text-text hover:text-accent transition-colors font-medium">
                        {trade.herbName}
                      </Link>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-muted text-accent font-medium">产地直供</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.spec}</td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.origin}</td>
                  <td className="px-3 py-2.5 text-text-secondary">{trade.quantity}</td>
                  <td className="px-3 py-2.5 text-accent font-mono font-medium">{trade.price}</td>
                  <td className="px-3 py-2.5 text-text-secondary font-mono">{maskPhone(trade.contact)}</td>
                  <td className="px-3 py-2.5 text-text-tertiary">{formatDate(trade.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagedTrades.length === 0 && (
            <div className="text-center py-12 text-text-tertiary text-sm">暂无相关信息</div>
          )}
          {renderPagination()}
        </div>
      )}
    </div>
  );
}
