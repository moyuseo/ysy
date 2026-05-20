import React from 'react';
import { TraceabilityInfo } from '../types';

interface TraceabilityCardProps {
  traceInfo: TraceabilityInfo;
}

const TraceabilityCard: React.FC<TraceabilityCardProps> = ({ traceInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{traceInfo.herbName} 溯源信息</h3>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          可溯源
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">批次号</div>
          <div className="text-sm font-medium text-gray-900">{traceInfo.batchNumber}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">产地</div>
          <div className="text-sm font-medium text-gray-900">{traceInfo.origin}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">采收日期</div>
          <div className="text-sm font-medium text-gray-900">{traceInfo.harvestDate}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">加工日期</div>
          <div className="text-sm font-medium text-gray-900">{traceInfo.processingDate}</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">资质认证</h4>
        <div className="flex flex-wrap gap-2">
          {traceInfo.certifications.map((cert, idx) => (
            <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              {cert}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4">溯源流程</h4>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-4">
            {traceInfo.traceSteps.map((step) => (
              <div key={step.step} className="relative pl-10">
                <div className="absolute left-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {step.step}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{step.title}</span>
                    <span className="text-xs text-gray-500">{step.date}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">📍 {step.location}</div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityCard;
