import React from 'react';
import { PublicOpinion } from '../types';

interface PublicOpinionCardProps {
  opinion: PublicOpinion;
}

const PublicOpinionCard: React.FC<PublicOpinionCardProps> = ({ opinion }) => {
  const sentimentColors = {
    positive: { bg: 'bg-green-100', text: 'text-green-800', label: '正面' },
    neutral: { bg: 'bg-gray-100', text: 'text-gray-800', label: '中性' },
    negative: { bg: 'bg-red-100', text: 'text-red-800', label: '负面' },
  };

  const influenceColors = {
    high: { bg: 'bg-red-100', text: 'text-red-800', label: '高' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '中' },
    low: { bg: 'bg-green-100', text: 'text-green-800', label: '低' },
  };

  const sentiment = sentimentColors[opinion.sentiment];
  const influence = influenceColors[opinion.influenceLevel];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {opinion.imageUrl && (
          <div className="sm:w-1/3">
            <img
              src={opinion.imageUrl}
              alt={opinion.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
        <div className={`flex-1 ${opinion.imageUrl ? 'sm:w-2/3' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${sentiment.bg} ${sentiment.text}`}>
              {sentiment.label}舆情
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${influence.bg} ${influence.text}`}>
              影响度{influence.label}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
            {opinion.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {opinion.summary}
          </p>
          {opinion.relatedHerbs && opinion.relatedHerbs.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-xs text-gray-500">相关品种：</span>
              {opinion.relatedHerbs.map((herb, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-primary-50 text-primary-600 rounded"
                >
                  {herb}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>来源：{opinion.source}</span>
            <span>{opinion.publishTime}</span>
            <span>阅读 {opinion.views?.toLocaleString() || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicOpinionCard;