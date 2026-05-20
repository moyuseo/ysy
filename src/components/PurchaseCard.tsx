import React from 'react';
import { PurchaseItem } from '../types';

interface PurchaseCardProps {
  item: PurchaseItem;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.herbName}</h3>
          <p className="text-sm text-gray-600">{item.spec}</p>
        </div>
        {item.urgent && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            急购
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">数量需求</div>
          <div className="text-base font-medium text-gray-900">{item.quantity} {item.unit}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">意向价格</div>
          <div className="text-base font-medium text-primary-600">
            {item.price ? `${item.price} 元/kg` : '电议'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <span>📍 {item.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 font-medium">{item.buyerName}</div>
        <div className="text-xs text-gray-500">{item.publishTime}</div>
      </div>
      <button className="w-full btn-primary mt-4">
        立即报价
      </button>
    </div>
  );
};

export default PurchaseCard;
