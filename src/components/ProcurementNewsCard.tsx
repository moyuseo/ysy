import React from 'react';
import { ProcurementNews } from '../types';

interface ProcurementNewsCardProps {
  news: ProcurementNews;
}

const ProcurementNewsCard: React.FC<ProcurementNewsCardProps> = ({ news }) => {
  const statusColors: Record<string, string> = {
    '招标中': 'bg-yellow-100 text-yellow-800',
    '公示中': 'bg-blue-100 text-blue-800',
    '报名中': 'bg-purple-100 text-purple-800',
    '已完成': 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {news.imageUrl && (
          <div className="sm:w-1/3">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
        <div className={`flex-1 ${news.imageUrl ? 'sm:w-2/3' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
              {news.procurementType}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
              {news.region}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[news.status] || 'bg-gray-100 text-gray-600'}`}>
              {news.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {news.summary}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>来源：{news.source}</span>
            <span>{news.publishTime}</span>
          </div>
          {news.amount && (
            <div className="mt-2 text-sm">
              <span className="text-gray-500">采购金额：</span>
              <span className="text-primary-600 font-medium">{news.amount}</span>
            </div>
          )}
          {news.deadline && (
            <div className="mt-1 text-sm">
              <span className="text-gray-500">截止时间：</span>
              <span className="text-red-600 font-medium">{news.deadline}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcurementNewsCard;