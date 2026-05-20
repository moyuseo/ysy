import React from 'react';
import { CultivationTechnique } from '../types';

interface CultivationTechniqueCardProps {
  technique: CultivationTechnique;
}

const CultivationTechniqueCard: React.FC<CultivationTechniqueCardProps> = ({ technique }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{technique.herbName} 种植技术</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-semibold text-green-800 mb-3">生长条件</h4>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-green-700">气候：</span>
              <span className="text-sm text-gray-700">{technique.growingConditions.climate}</span>
            </div>
            <div>
              <span className="text-xs text-green-700">土壤：</span>
              <span className="text-sm text-gray-700">{technique.growingConditions.soil}</span>
            </div>
            <div>
              <span className="text-xs text-green-700">温度：</span>
              <span className="text-sm text-gray-700">{technique.growingConditions.temperature}</span>
            </div>
            <div>
              <span className="text-xs text-green-700">降雨：</span>
              <span className="text-sm text-gray-700">{technique.growingConditions.rainfall}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-3">繁殖方法</h4>
          <p className="text-sm text-gray-700">{technique.propagationMethod}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">栽培步骤</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
          {technique.cultivationSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">田间管理</h4>
          <ul className="space-y-2">
            {technique.fieldManagement.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary-500 mr-2 mt-1">•</span>
                <span className="text-sm text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">病虫害防治</h4>
          <ul className="space-y-2">
            {technique.pestControl.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-sm text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-amber-50 rounded-lg">
        <h4 className="text-sm font-semibold text-amber-800 mb-2">采收加工</h4>
        <p className="text-sm text-gray-700">{technique.harvestProcessing}</p>
      </div>
    </div>
  );
};

export default CultivationTechniqueCard;
