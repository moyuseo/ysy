import React, { useState } from 'react';
import { traceabilityInfo, gapProducts, freshCutProducts, highQualityProducts } from '../data/mockData';
import TraceabilityCard from '../components/TraceabilityCard';
import GAPProductCard from '../components/GAPProductCard';
import FreshCutCard from '../components/FreshCutCard';
import HighQualityCard from '../components/HighQualityCard';

type TabType = 'traceability' | 'gap' | 'freshCut' | 'highQuality';

const Traceability: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('traceability');
  const [selectedHerbId, setSelectedHerbId] = useState<string | null>(traceabilityInfo[0]?.id || null);

  const tabs = [
    { id: 'traceability' as TabType, name: '溯源系统', icon: '🔍' },
    { id: 'gap' as TabType, name: 'GAP专区', icon: '✅' },
    { id: 'freshCut' as TabType, name: '趁鲜切制', icon: '💧' },
    { id: 'highQuality' as TabType, name: '三无一全', icon: '⭐' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'traceability':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              {traceabilityInfo.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedHerbId === item.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedHerbId(item.id)}
                >
                  {item.herbName}
                </button>
              ))}
            </div>
            {selectedHerbId && (
              <TraceabilityCard
                traceInfo={traceabilityInfo.find((t) => t.id === selectedHerbId)!}
              />
            )}
          </div>
        );

      case 'gap':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gapProducts.map((product) => (
              <GAPProductCard key={product.id} product={product} />
            ))}
          </div>
        );

      case 'freshCut':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freshCutProducts.map((product) => (
              <FreshCutCard key={product.id} product={product} />
            ))}
          </div>
        );

      case 'highQuality':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highQualityProducts.map((product) => (
              <HighQualityCard key={product.id} product={product} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">溯源与质量</h1>
          <p className="text-gray-600">中药材质量保障体系，全程可追溯</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Empty State */}
        {activeTab === 'traceability' && !selectedHerbId && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            暂无溯源信息
          </div>
        )}
      </div>
    </div>
  );
};

export default Traceability;
