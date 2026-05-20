import React from 'react';
import { FreshCutProduct } from '../types';

interface FreshCutCardProps {
  product: FreshCutProduct;
}

const FreshCutCard: React.FC<FreshCutCardProps> = ({ product }) => {
  const freshnessColors = {
    A: 'bg-green-500',
    B: 'bg-yellow-500',
    C: 'bg-orange-500',
  };

  const freshnessLabels = {
    A: '新鲜',
    B: '较新鲜',
    C: '一般',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.herbName}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-blue-400 text-4xl">💧</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
            趁鲜切制
          </span>
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 ${freshnessColors[product.freshnessLevel]} text-white rounded-full text-xs font-bold`}>
          {freshnessLabels[product.freshnessLevel]}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{product.herbName}</h3>
          <span className="text-xs text-gray-500">{product.origin}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{product.spec}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">切制日期</span>
            <span className="font-medium text-gray-900">{product.cutDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">保鲜方式</span>
            <span className="text-gray-700">{product.storageMethod}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">保质期</span>
            <span className="text-gray-700">{product.shelfLife}</span>
          </div>
        </div>
        
        {product.description && (
          <p className="text-xs text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <button className="w-full btn-primary">立即购买</button>
      </div>
    </div>
  );
};

export default FreshCutCard;
