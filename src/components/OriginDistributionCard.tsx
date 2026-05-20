import React from 'react';
import { OriginDistribution } from '../types';

interface OriginDistributionCardProps {
  distribution: OriginDistribution;
}

const OriginDistributionCard: React.FC<OriginDistributionCardProps> = ({ distribution }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{distribution.herbName} 产地分布</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">主要产地</h4>
        <div className="flex flex-wrap gap-2">
          {distribution.mainProvinces.map((province, idx) => (
            <span key={idx} className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {province}
            </span>
          ))}
        </div>
      </div>
      
      {distribution.characteristics && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">产地特点</h4>
          <p className="text-sm text-gray-600">{distribution.characteristics}</p>
        </div>
      )}
      
      {distribution.qualityLevels && distribution.qualityLevels.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">品质等级</h4>
          <div className="space-y-3">
            {distribution.qualityLevels.map((level, idx) => (
              <div key={idx} className={`p-4 rounded-lg border ${
                idx === 0 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : idx === 1 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">{level.area}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    idx === 0 
                      ? 'bg-yellow-200 text-yellow-800' 
                      : idx === 1 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-amber-200 text-amber-800'
                  }`}>
                    {level.level}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {distribution.mapImage && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">产地地图</h4>
          <img
            src={distribution.mapImage}
            alt="产地地图"
            className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default OriginDistributionCard;
