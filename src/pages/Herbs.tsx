import React, { useState } from 'react';
import { 
  herbs, 
  herbProfiles, 
  authenticityChecks, 
  cultivationTechniques, 
  healthKnowledge, 
  originDistributions 
} from '../data/mockData';
import HerbProfileCard from '../components/HerbProfileCard';
import AuthenticityCheckCard from '../components/AuthenticityCheckCard';
import CultivationTechniqueCard from '../components/CultivationTechniqueCard';
import HealthKnowledgeCard from '../components/HealthKnowledgeCard';
import OriginDistributionCard from '../components/OriginDistributionCard';

type KnowledgeSection = 'profile' | 'authenticity' | 'cultivation' | 'health' | 'origin' | 'list';

const Herbs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeSection, setActiveSection] = useState<KnowledgeSection>('list');
  const [selectedHerbId, setSelectedHerbId] = useState<string | null>(null);

  const categories = Array.from(new Set(herbs.map((h) => h.category)));

  const filteredHerbs = herbs.filter((herb) => {
    const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || herb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderSectionContent = () => {
    if (activeSection === 'list' || !selectedHerbId) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHerbs.map((herb) => (
            <div
              key={herb.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedHerbId(herb.id);
                setActiveSection('profile');
              }}
            >
              {herb.imageUrl && (
                <img
                  src={herb.imageUrl}
                  alt={herb.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{herb.name}</h3>
                  {herb.pinyin && (
                    <p className="text-sm text-gray-500">{herb.pinyin}</p>
                  )}
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mb-2">
                  {herb.category}
                </span>
                {herb.efficacy && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {herb.efficacy.join('、')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const selectedHerb = herbs.find(h => h.id === selectedHerbId);
    const profile = herbProfiles.find(p => p.herbId === selectedHerbId);
    const authenticity = authenticityChecks.find(c => c.herbId === selectedHerbId);
    const cultivation = cultivationTechniques.find(t => t.herbId === selectedHerbId);
    const health = healthKnowledge.find(k => k.herbId === selectedHerbId);
    const origin = originDistributions.find(d => d.herbId === selectedHerbId);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setActiveSection('list')}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            ← 返回列表
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedHerb?.name} - {sectionNames[activeSection]}
          </h2>
        </div>

        {activeSection === 'profile' && profile && (
          <HerbProfileCard profile={profile} />
        )}
        
        {activeSection === 'authenticity' && authenticity && (
          <AuthenticityCheckCard check={authenticity} />
        )}
        
        {activeSection === 'cultivation' && cultivation && (
          <CultivationTechniqueCard technique={cultivation} />
        )}
        
        {activeSection === 'health' && health && (
          <HealthKnowledgeCard knowledge={health} />
        )}
        
        {activeSection === 'origin' && origin && (
          <OriginDistributionCard distribution={origin} />
        )}
        
        {!profile && !authenticity && !cultivation && !health && !origin && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-600">
            该药材暂无{sectionNames[activeSection]}信息
          </div>
        )}
      </div>
    );
  };

  const sectionNames: Record<KnowledgeSection, string> = {
    list: '药材列表',
    profile: '品种档案',
    authenticity: '真伪鉴别',
    cultivation: '种植技术',
    health: '养生保健',
    origin: '产地分布'
  };

  const hasContent = (section: KnowledgeSection) => {
    if (!selectedHerbId) return true;
    switch (section) {
      case 'list': return true;
      case 'profile': return herbProfiles.some(p => p.herbId === selectedHerbId);
      case 'authenticity': return authenticityChecks.some(c => c.herbId === selectedHerbId);
      case 'cultivation': return cultivationTechniques.some(t => t.herbId === selectedHerbId);
      case 'health': return healthKnowledge.some(k => k.herbId === selectedHerbId);
      case 'origin': return originDistributions.some(d => d.herbId === selectedHerbId);
      default: return false;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">品种知识</h1>
          <p className="text-gray-600">中药材百科全书 - 包含品种档案、真伪鉴别、种植技术、养生保健、产地分布等</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {(Object.entries(sectionNames) as [KnowledgeSection, string][]).map(([section, name]) => (
              <button
                key={section}
                disabled={!hasContent(section)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeSection === section
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : hasContent(section)
                      ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                }`}
                onClick={() => setActiveSection(section)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Filters - only show in list view */}
        {activeSection === 'list' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="搜索药材名称..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">全部分类</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {renderSectionContent()}

        {/* Empty State - only for list view */}
        {activeSection === 'list' && filteredHerbs.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            暂无符合条件的药材
          </div>
        )}
      </div>
    </div>
  );
};

export default Herbs;
