import React, { useState } from 'react';
import ProcurementNewsCard from '../components/ProcurementNewsCard';
import PublicOpinionCard from '../components/PublicOpinionCard';
import PolicyRegulationCard from '../components/PolicyRegulationCard';
import DiscussionPostCard from '../components/DiscussionPostCard';
import UserShareCard from '../components/UserShareCard';
import { procurementNews, publicOpinions, policyRegulations, discussionPosts, userShares } from '../data/mockData';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('procurement');

  const tabs = [
    { id: 'procurement', label: '集采资讯', icon: '📋' },
    { id: 'opinion', label: '舆情监测', icon: '💬' },
    { id: 'policy', label: '新闻法规', icon: '📜' },
    { id: 'discussion', label: '药商谈药', icon: '💬' },
    { id: 'share', label: '热心拍客', icon: '📸' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'procurement':
        return (
          <div className="space-y-4">
            {procurementNews.map((news) => (
              <ProcurementNewsCard key={news.id} news={news} />
            ))}
          </div>
        );
      case 'opinion':
        return (
          <div className="space-y-4">
            {publicOpinions.map((opinion) => (
              <PublicOpinionCard key={opinion.id} opinion={opinion} />
            ))}
          </div>
        );
      case 'policy':
        return (
          <div className="space-y-4">
            {policyRegulations.map((regulation) => (
              <PolicyRegulationCard key={regulation.id} regulation={regulation} />
            ))}
          </div>
        );
      case 'discussion':
        return (
          <div className="space-y-4">
            {discussionPosts.map((post) => (
              <DiscussionPostCard key={post.id} post={post} />
            ))}
          </div>
        );
      case 'share':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userShares.map((share) => (
              <UserShareCard key={share.id} share={share} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">行业服务</h1>
          <p className="text-primary-100">集采资讯、舆情监测、新闻法规、药商谈药、热心拍客</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;