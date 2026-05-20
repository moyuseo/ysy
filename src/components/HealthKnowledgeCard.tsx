import React from 'react';
import { HealthKnowledge } from '../types';

interface HealthKnowledgeCardProps {
  knowledge: HealthKnowledge;
}

const HealthKnowledgeCard: React.FC<HealthKnowledgeCardProps> = ({ knowledge }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{knowledge.herbName} 养生保健</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">健康功效</h4>
          <ul className="space-y-1">
            {knowledge.healthBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">适用人群</h4>
          <div className="flex flex-wrap gap-2">
            {knowledge.suitableFor.map((person, idx) => (
              <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                {person}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">使用方法</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knowledge.usageMethods.map((method, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
              <h5 className="text-xs font-semibold text-primary-700 mb-1">{method.name}</h5>
              <p className="text-sm text-gray-600">{method.method}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">推荐食谱</h4>
        <div className="space-y-4">
          {knowledge.recommendedRecipes.map((recipe, idx) => (
            <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h5 className="text-sm font-semibold text-green-800 mb-2">{recipe.name}</h5>
              <div className="mb-2">
                <p className="text-xs font-medium text-gray-700">食材：</p>
                <p className="text-sm text-gray-600">{recipe.ingredients.join('、')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">做法：</p>
                <p className="text-sm text-gray-600">{recipe.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {knowledge.contraindications && knowledge.contraindications.length > 0 && (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="text-sm font-semibold text-red-800 mb-2">禁忌人群</h4>
          <ul className="space-y-1">
            {knowledge.contraindications.map((contraindication, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-sm text-gray-700">{contraindication}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthKnowledgeCard;
