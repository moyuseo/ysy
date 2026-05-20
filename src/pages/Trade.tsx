import React, { useState } from 'react';
import { supplyItems, purchaseItems, shops } from '../data/mockData';
import ShopCard from '../components/ShopCard';
import SupplyCard from '../components/SupplyCard';
import PurchaseCard from '../components/PurchaseCard';

const Trade: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supply' | 'purchase' | 'shops'>('supply');

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">供求交易</h1>
          <p className="text-gray-600">专业的中药材供需对接平台</p>
        </div>

        {/* 推荐店铺 */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">推荐店铺</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              查看更多 →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.slice(0, 3).map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
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
                activeTab === 'purchase'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('purchase')}
            >
              求购信息
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'shops'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('shops')}
            >
              药通店铺
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
          <div>
            {/* 产地直供标签 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  产地直供
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supplyItems.map((item) => (
                <SupplyCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : activeTab === 'purchase' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchaseItems.map((item) => (
              <PurchaseCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;
