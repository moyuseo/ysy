import React from 'react';
import { VarietyIndex } from '../types';

interface PriceIndexPanelProps {
  indexes: VarietyIndex[];
}

const PriceIndexPanel: React.FC<PriceIndexPanelProps> = ({ indexes }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">品种指数</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {indexes.map((index) => (
          <div key={index.id} className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{index.name}</h4>
            <div className="text-2xl font-bold text-primary-700 mb-1">{index.value.toFixed(2)}</div>
            <div className={`text-sm font-medium flex items-center ${
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
