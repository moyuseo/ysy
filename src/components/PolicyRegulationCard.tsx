import React from 'react';
import { PolicyRegulation } from '../types';

interface PolicyRegulationCardProps {
  regulation: PolicyRegulation;
}

const PolicyRegulationCard: React.FC<PolicyRegulationCardProps> = ({ regulation }) => {
  const categoryColors: Record<string, string> = {
    '产业政策': 'bg-blue-100 text-blue-800',
    '质量监管': 'bg-red-100 text-red-800',
    '产业规划': 'bg-green-100 text-green-800',
    '认证管理': 'bg-purple-100 text-purple-800',
    '药品管理': 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {regulation.imageUrl && (
          <div className="sm:w-1/3">
            <img
              src={regulation.imageUrl}
              alt={regulation.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
        <div className={`flex-1 ${regulation.imageUrl ? 'sm:w-2/3' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColors[regulation.category] || 'bg-gray-100 text-gray-600'}`}>
              {regulation.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
            {regulation.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {regulation.summary}
          </p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-start justify-between">
              <span>发布单位：</span>
              <span className="text-gray-700">{regulation.issuingAuthority}</span>
            </div>
            {regulation.documentNo && (
              <div className="flex items-start justify-between">
                <span>文件编号：</span>
                <span className="text-gray-700">{regulation.documentNo}</span>
              </div>
            )}
            <div className="flex items-start justify-between">
              <span>发布时间：</span>
              <span className="text-gray-700">{regulation.publishTime}</span>
            </div>
            {regulation.effectiveDate && (
              <div className="flex items-start justify-between">
                <span>施行日期：</span>
                <span className="text-primary-600 font-medium">{regulation.effectiveDate}</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              阅读 {regulation.views?.toLocaleString() || 0}
            </span>
            <button className="text-xs text-primary-600 hover:text-primary-700">
              查看详情 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyRegulationCard;