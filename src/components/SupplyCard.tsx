import React from 'react';
import { SupplyItem } from '../types';

interface SupplyCardProps {
  item: SupplyItem;
}

const SupplyCard: React.FC<SupplyCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.herbName}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🌿</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            现货供应
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.herbName}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {item.price}
              <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1">{item.spec}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>📍 {item.origin}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">
            <span className="text-gray-500">库存：</span>
            <span className="font-medium">{item.quantity} {item.unit}</span>
          </div>
          <div className="text-sm text-gray-500">
            {item.shopName}
          </div>
        </div>
        <button className="w-full btn-primary">
          立即联系
        </button>
      </div>
    </div>
  );
};

export default SupplyCard;
