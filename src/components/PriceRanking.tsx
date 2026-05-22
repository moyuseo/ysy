import React from 'react';
import { PriceItem } from '../types';

interface PriceRankingProps {
  title: string;
  items: PriceItem[];
  type: 'up' | 'down';
}

const PriceRanking: React.FC<PriceRankingProps> = ({ title, items, type }) => {
  return (
    <div className={`rounded-xl shadow-md p-6 ${
      type === 'up' 
        ? 'bg-gradient-to-br from-red-50 to-white border-2 border-red-200' 
        : 'bg-gradient-to-br from-green-50 to-white border-2 border-green-200'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-2xl ${type === 'up' ? 'text-red-500' : 'text-green-500'}`}>
          {type === 'up' ? '📈' : '📉'}
        </span>
        <h3 className={`text-xl font-bold ${type === 'up' ? 'text-red-700' : 'text-green-700'}`}>{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-105 ${
            type === 'up' ? 'bg-white hover:shadow-md' : 'bg-white hover:shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                index === 0 ? 'bg-yellow-400 text-yellow-900' :
                index === 1 ? 'bg-gray-300 text-gray-700' :
                index === 2 ? 'bg-amber-600 text-amber-100' :
                type === 'up' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {index + 1}
              </span>
              <div>
                <div className="font-bold text-gray-900">{item.herbName}</div>
                <div className="text-xs text-gray-500">{item.spec}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{item.price} <span className="text-sm">{item.unit}</span></div>
              <span className={`inline-flex items-center text-sm font-bold ${
                type === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {type === 'up' ? '↑' : '↓'} {Math.abs(item.change)}
                <span className="ml-1 text-xs">({type === 'up' ? '+' : ''}{(Math.abs(item.change) / item.price * 100).toFixed(1)}%)</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRanking;
