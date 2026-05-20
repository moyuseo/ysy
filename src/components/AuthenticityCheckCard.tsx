import React from 'react';
import { AuthenticityCheck } from '../types';

interface AuthenticityCheckCardProps {
  check: AuthenticityCheck;
}

const AuthenticityCheckCard: React.FC<AuthenticityCheckCardProps> = ({ check }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{check.herbName} 真伪鉴别</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            正品特征
          </h4>
          <ul className="space-y-2">
            {check.genuineFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            伪品特征
          </h4>
          <ul className="space-y-2">
            {check.fakeFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✗</span>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">鉴别方法</h4>
        <ul className="space-y-2">
          {check.identificationMethods.map((method, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-primary-500 mr-2 mt-1">{idx + 1}.</span>
              <span className="text-sm text-gray-600">{method}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {check.images && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-medium text-green-600 mb-2">正品图</h5>
            <img
              src={check.images.genuine}
              alt="正品"
              className="w-full h-48 object-cover rounded-lg border-2 border-green-200"
            />
          </div>
          <div>
            <h5 className="text-xs font-medium text-red-600 mb-2">伪品图</h5>
            <img
              src={check.images.fake}
              alt="伪品"
              className="w-full h-48 object-cover rounded-lg border-2 border-red-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticityCheckCard;
