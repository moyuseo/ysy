import React from 'react';
import { VarietyIndex } from '../types';

interface PriceIndexPanelProps {
  indexes: VarietyIndex[];
}

const PriceIndexPanel: React.FC<PriceIndexPanelProps> = ({ indexes }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">品种指数</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {indexes.map((index) => (
          <div key={index.id} className="bg-white/95 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-shadow">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">{index.name}</h4>
            <div className="text-2xl font-bold text-gray-900 mb-1">{index.value.toFixed(2)}</div>
            <div className={`text-sm font-bold flex items-center ${
              index.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {index.change >= 0 ? '↑' : '↓'} {Math.abs(index.change).toFixed(2)}
              <span className="ml-1">({index.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceIndexPanel;
