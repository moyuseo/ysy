import React from 'react';
import { DailyViewpoint } from '../types';

interface DailyViewpointCardProps {
  viewpoint: DailyViewpoint;
}

const DailyViewpointCard: React.FC<DailyViewpointCardProps> = ({ viewpoint }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {viewpoint.imageUrl && (
          <div className="md:w-1/3">
            <img
              src={viewpoint.imageUrl}
              alt={viewpoint.title}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
        )}
        <div className={`flex-1 p-4 ${viewpoint.imageUrl ? 'md:w-2/3' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
              {viewpoint.category}
            </span>
            <span className="text-xs text-gray-500">{viewpoint.publishTime}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
            {viewpoint.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {viewpoint.content}
          </p>
          {viewpoint.keywords && viewpoint.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {viewpoint.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>作者：{viewpoint.authorName}</span>
              <span>{viewpoint.views.toLocaleString()} 阅读</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {viewpoint.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyViewpointCard;