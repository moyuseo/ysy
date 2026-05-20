import React, { useState } from 'react';
import { suppliers, demands } from '../data/mockData';

const Trade: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supply' | 'demand'>('supply');

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">供求交易</h1>
          <p className="text-gray-600">中药材供需对接平台</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'supply'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('supply')}
            >
              供货信息
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'demand'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('demand')}
            >
              求购信息
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mb-6">
          <button className="btn-secondary">发布求购</button>
          <button className="btn-primary">发布供应</button>
        </div>

        {/* Content */}
        {activeTab === 'supply' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{supplier.name}</h3>
                  {supplier.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      已认证
                    </span>
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500">主营品种：</span>
                    <span className="text-gray-900">{supplier.products.join('、')}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">所在地：</span>
                    <span className="text-gray-900">{supplier.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">联系方式：</span>
                    <span className="text-gray-900">{supplier.contact}</span>
                  </div>
                </div>
                <button className="w-full btn-primary">
                  联系卖家
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">品种</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收货地</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demands.map((demand) => (
                  <tr key={demand.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{demand.herbName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demand.spec}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demand.quantity} {demand.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demand.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demand.publishTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        联系买家
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;
