import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, MapPin, Package, Star, Plus } from 'lucide-react';
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
      <div className="flex items-center justify-between pt-6 border-t-2 border-green-200">
        <span className="text-sm text-slate-500">共 <span className="font-semibold text-slate-800">{filteredTrades.length}</span> 条</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn btn-s text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          {pages.map((p, i) =>
            typeof p === 'string' ? (
              <span key={`e-${i}`} className="px-2 text-slate-400 text-sm">...</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`btn text-sm ${currentPage === p ? 'btn-p' : 'btn-s'}`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-s text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title mb-1">供求信息</h1>
          <p className="text-sm text-slate-500">药材供求对接平台，快速匹配交易需求</p>
        </div>
        <button className="btn btn-p">
          <Plus className="w-4 h-4" />
          发布信息
        </button>
      </div>

      <div className="tab-bar mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`tab ${activeTab === tab.key ? 'on' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6 items-center">
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
          className="sel"
        >
          <option value="">全部品类</option>
          {CATEGORIES.map(c => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="搜索品名、规格、产地"
            className="inp pl-10"
          />
        </div>
      </div>

      {activeTab === 'supply' && (
        <div className="card">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pagedTrades.map((trade, idx) => (
                <div
                  key={trade.id}
                  className="p-5 border border-slate-200 rounded-lg hover:border-green-700 transition-colors group anim-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/herb/${trade.herbId}`} className="text-lg text-green-700 group-hover:text-green-800 transition-colors font-semibold">
                        {trade.herbName}
                      </Link>
                      <span className="badge badge-tag text-[10px]">
                        {trade.spec}
                      </span>
                    </div>
                    {trade.isPromoted && (
                      <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                    )}
                  </div>
                  <div className="text-red-600 text-xl font-bold mb-3">
                    {trade.price}
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{trade.origin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>{trade.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="font-mono">{maskPhone(trade.contact)}</span>
                    </div>
                  </div>
                  <div className="divider mt-3 mb-3" />
                  <div className="text-xs text-slate-400">
                    {formatDate(trade.createdAt)}
                  </div>
                </div>
              ))}
            </div>
            {pagedTrades.length === 0 && (
              <div className="text-center py-16 text-slate-400">暂无相关信息</div>
            )}
            {renderPagination()}
          </div>
        </div>
      )}

      {activeTab === 'demand' && (
        <div className="card">
          <div className="card-body overflow-x-auto">
            <table className="tbl">
              <thead>
                <tr>
                  <th>品名</th>
                  <th>规格</th>
                  <th>数量</th>
                  <th>报价人数</th>
                  <th>剩余天数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {pagedTrades.map((trade, idx) => (
                  <tr key={trade.id} className="anim-fade" style={{ animationDelay: `${idx * 0.03}s` }}>
                    <td>
                      <Link to={`/herb/${trade.herbId}`} className="text-green-700 hover:text-green-800 font-semibold transition-colors">
                        {trade.herbName}
                      </Link>
                    </td>
                    <td className="text-slate-600">{trade.spec}</td>
                    <td className="text-slate-600">{trade.quantity}</td>
                    <td className="text-green-700 font-semibold">{trade.quoteCount ?? 0}</td>
                    <td>
                      <span className={trade.remainingDays && trade.remainingDays <= 5 ? 'badge badge-warn' : 'text-slate-600'}>
                        {trade.remainingDays ? `${trade.remainingDays}天` : '-'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-p text-xs py-1.5 px-3">
                        抢先报价
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pagedTrades.length === 0 && (
              <div className="text-center py-16 text-slate-400">暂无相关信息</div>
            )}
            {renderPagination()}
          </div>
        </div>
      )}

      {activeTab === 'bidding' && (
        <div className="card">
          <div className="card-body">
            {pagedTrades.map((trade, idx) => (
              <div
                key={trade.id}
                className={`py-5 flex items-start justify-between anim-up ${idx > 0 ? 'border-t border-slate-200' : ''}`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-slate-800 text-lg">{trade.company}</span>
                    {trade.isPromoted && (
                      <span className="badge badge-warn text-[10px]">热门</span>
                    )}
                  </div>
                  <div className="text-sm text-slate-600">
                    {trade.herbName} · {trade.spec} · {trade.quantity}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 ml-6">
                  <span className="text-sm text-slate-400">{formatDate(trade.createdAt)}</span>
                  <Link to="/trade" className="text-sm text-green-700 hover:text-green-800 font-medium transition-colors">
                    查看详情 →
                  </Link>
                </div>
              </div>
            ))}
            {pagedTrades.length === 0 && (
              <div className="text-center py-16 text-slate-400">暂无相关信息</div>
            )}
            {renderPagination()}
          </div>
        </div>
      )}

      {activeTab === 'direct' && (
        <div className="card">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pagedTrades.map((trade, idx) => (
                <div
                  key={trade.id}
                  className="p-5 border border-green-200 rounded-lg bg-green-50 hover:border-green-700 transition-colors group anim-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/herb/${trade.herbId}`} className="text-lg text-green-700 group-hover:text-green-800 transition-colors font-semibold">
                        {trade.herbName}
                      </Link>
                      <span className="badge badge-tag text-[10px]">
                        产地直供
                      </span>
                    </div>
                    {trade.isPromoted && (
                      <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                    )}
                  </div>
                  <div className="text-green-700 text-xl font-bold mb-3">
                    {trade.price}
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-700" />
                      <span>{trade.origin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-700" />
                      <span>{trade.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-700" />
                      <span className="font-mono">{maskPhone(trade.contact)}</span>
                    </div>
                  </div>
                  <div className="divider mt-3 mb-3" />
                  <div className="text-xs text-slate-400">
                    {formatDate(trade.createdAt)}
                  </div>
                </div>
              ))}
            </div>
            {pagedTrades.length === 0 && (
              <div className="text-center py-16 text-slate-400">暂无相关信息</div>
            )}
            {renderPagination()}
          </div>
        </div>
      )}
    </div>
  );
}
