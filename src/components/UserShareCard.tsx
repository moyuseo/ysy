import React from 'react';
import { UserShare } from '../types';

interface UserShareCardProps {
  share: UserShare;
}

const UserShareCard: React.FC<UserShareCardProps> = ({ share }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {share.images && share.images.length > 0 && (
        <div className={`relative ${share.images.length > 1 ? 'flex' : ''}`}>
          {share.images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className={`relative ${share.images.length > 1 ? 'flex-1' : ''}`}
              style={{ height: share.images.length > 1 ? '150px' : '200px' }}
            >
              <img
                src={image}
                alt={`${share.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {share.images.length > 3 && index === 2 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    +{share.images.length - 3}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold">
              {share.authorName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{share.authorName}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {share.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {share.location}
                </span>
              )}
              <span>{share.publishTime}</span>
            </div>
          </div>
          <span className="ml-auto px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
            {share.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
          {share.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {share.content}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {share.likes}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {share.comments}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {share.views}
            </span>
          </div>
          <button className="text-xs text-primary-600 hover:text-primary-700">
            查看详情 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserShareCard;