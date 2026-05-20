import React from 'react';
import { GAPProduct } from '../types';

interface GAPProductCardProps {
  product: GAPProduct;
}

const GAPProductCard: React.FC<GAPProductCardProps> = ({ product }) => {
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
          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <span className="text-green-400 text-4xl">🌿</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
            GAP认证
          </span>
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
            <span className="text-gray-500">认证编号</span>
            <span className="font-medium text-gray-900">{product.certificationNo}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">认证日期</span>
            <span className="text-gray-700">{product.certificationDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">有效期至</span>
            <span className="text-gray-700">{product.validUntil}</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          种植基地：{product.baseName}
        </div>
        
        {product.description && (
          <p className="text-xs text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <button className="w-full btn-primary">查看详情</button>
      </div>
    </div>
  );
};

export default GAPProductCard;
