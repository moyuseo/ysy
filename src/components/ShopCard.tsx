import React from 'react';
import { Shop } from '../types';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
          {shop.logo ? (
            <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
              🏪
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
            {shop.verified && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                已认证
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <span className="text-yellow-500">⭐</span>
            <span>{shop.rating}</span>
            <span className="text-gray-400">|</span>
            <span>销量 {shop.salesCount}</span>
          </div>
          <p className="text-sm text-gray-500">{shop.location}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{shop.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {shop.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">主营：</span>
        <div className="flex flex-wrap gap-1">
          {shop.products.map((product, index) => (
            <span key={index} className="text-sm text-gray-700">
              {product}
              {index < shop.products.length - 1 && '、'}
            </span>
          ))}
        </div>
      </div>
      <button className="w-full btn-primary">
        联系商家
      </button>
    </div>
  );
};

export default ShopCard;
