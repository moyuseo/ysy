import React, { useState } from 'react';
import { priceList } from '../data/mockData';

const Prices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name');

  const markets = ['亳州', '安国', '玉林', '成都'];

  const filteredPrices = priceList.filter((item) => {
    const matchesSearch = item.herbName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarket = !selectedMarket || item.market === selectedMarket;
    return matchesSearch && matchesMarket;
  });

  const sortedPrices = [...filteredPrices].sort((a, b) => {
    if (sortBy === 'name') return a.herbName.localeCompare(b.herbName);
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change') return b.change - a.change;
    return 0;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">价格行情</h1>
          <p className="text-gray-600">实时了解中药材市场价格动态</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="搜索药材品种..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
              >
                <option value="">全部市场</option>
                {markets.map((market) => (
                  <option key={market} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="name">按名称</option>
                <option value="price">按价格</option>
                <option value="change">按涨跌</option>
              </select>
            </div>
            <div>
              <button className="w-full btn-primary">
                导出数据
              </button>
            </div>
          </div>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">品种</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产地</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">市场</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">涨跌</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedPrices.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.herbName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.spec}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.origin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.market}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {item.price} {item.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.trend === 'up'
                        ? 'bg-green-100 text-green-800'
                        : item.trend === 'down'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                      {item.change !== 0 ? ` ${item.change > 0 ? '+' : ''}${item.change}` : ' 持平'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.updateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedPrices.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              暂无符合条件的数据
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prices;
