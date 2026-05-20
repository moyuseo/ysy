import React from 'react';
import { PriceItem } from '../types';

interface PriceRankingProps {
  title: string;
  items: PriceItem[];
  type: 'up' | 'down';
}

const PriceRanking: React.FC<PriceRankingProps> = ({ title, items, type }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                index === 0 ? 'bg-yellow-400 text-yellow-900' :
                index === 1 ? 'bg-gray-300 text-gray-700' :
                index === 2 ? 'bg-amber-600 text-amber-100' :
                'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </span>
              <div>
                <div className="font-medium text-gray-900">{item.herbName}</div>
                <div className="text-xs text-gray-500">{item.spec}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{item.price} {item.unit}</div>
              <span className={`inline-flex items-center text-sm font-medium ${
                type === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {type === 'up' ? '↑' : '↓'} {Math.abs(item.change)}
                <span className="text-xs ml-1">({type === 'up' ? '+' : ''}{(Math.abs(item.change) / item.price * 100).toFixed(1)}%)</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRanking;
