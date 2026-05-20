import React from 'react';
import { HerbProfile } from '../types';

interface HerbProfileCardProps {
  profile: HerbProfile;
}

const HerbProfileCard: React.FC<HerbProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h3>
        {profile.alias && profile.alias.length > 0 && (
          <p className="text-sm text-gray-600">
            别名：{profile.alias.join('、')}
          </p>
        )}
      </div>
      
      <div className="space-y-4">
        {profile.source && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">来源</h4>
            <p className="text-sm text-gray-600">{profile.source}</p>
          </div>
        )}
        
        {profile.properties && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">性味</h4>
            <p className="text-sm text-gray-600">{profile.properties}</p>
          </div>
        )}
        
        {profile.functions && profile.functions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">功能</h4>
            <div className="flex flex-wrap gap-2">
              {profile.functions.map((func, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  {func}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {profile.indications && profile.indications.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">主治</h4>
            <p className="text-sm text-gray-600">{profile.indications.join('；')}</p>
          </div>
        )}
        
        {profile.dosage && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">用法用量</h4>
            <p className="text-sm text-gray-600">{profile.dosage}</p>
          </div>
        )}
        
        {profile.precautions && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">注意事项</h4>
            <p className="text-sm text-gray-600">{profile.precautions}</p>
          </div>
        )}
        
        {profile.storage && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">贮藏</h4>
            <p className="text-sm text-gray-600">{profile.storage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HerbProfileCard;
