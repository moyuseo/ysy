import React from 'react';
import { HighQualityProduct } from '../types';

interface HighQualityCardProps {
  product: HighQualityProduct;
}

const HighQualityCard: React.FC<HighQualityCardProps> = ({ product }) => {
  const qualityColors = {
    '特级': 'bg-yellow-500',
    '一级': 'bg-blue-500',
    '二级': 'bg-gray-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-primary-100">
      <div className="relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.herbName}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <span className="text-amber-400 text-4xl">⭐</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
            三无一全
          </span>
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 ${qualityColors[product.qualityLevel]} text-white rounded-full text-xs font-bold`}>
          {product.qualityLevel}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{product.herbName}</h3>
          <span className="text-xs text-gray-500">{product.origin}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{product.spec}</p>
        
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">品质认证</h4>
          <div className="flex flex-wrap gap-2">
            {product.hasNoSulfur && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                <span>✓</span>无硫
              </span>
            )}
            {product.hasNoPesticideResidue && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                <span>✓</span>无农残
              </span>
            )}
            {product.hasNoHeavyMetal && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                <span>✓</span>无重金属
              </span>
            )}
            {product.isComplete && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                <span>✓</span>全成分
              </span>
            )}
          </div>
        </div>
        
        {product.description && (
          <p className="text-xs text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <button className="w-full btn-primary">查看详情</button>
      </div>
    </div>
  );
};

export default HighQualityCard;
