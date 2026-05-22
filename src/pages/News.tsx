import React, { useState } from 'react';
import { newsList } from '../data/mockData';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'expert' | 'analysis'>('news');

  const categories = ['全部', '市场快讯', '产地信息', '品种分析', '产业观察', '政策解读'];

  const filteredNews = selectedCategory && selectedCategory !== '全部'
    ? newsList.filter((news) => news.category === selectedCategory)
    : newsList;

  const sortedByViews = [...newsList].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  const expertInsights = [
    {
      id: 'exp-1',
      expertName: '张教授',
      expertTitle: '中药材行业协会顾问',
      avatar: '👨‍🏫',
      company: '中国中药协会',
      title: '2026年中药材市场走势预测',
      summary: '基于当前市场供需关系和政策导向，对今年主要品种价格走势进行专业分析...',
      category: '市场预测',
      date: '2026-05-20',
      views: 1256,
    },
    {
      id: 'exp-2',
      expertName: '李博士',
      expertTitle: 'GAP认证专家',
      avatar: '👩‍🔬',
      company: '中国医学科学院',
      title: 'GAP认证对中药材品质的提升作用',
      summary: '深度解读GAP认证体系对中药材种植、加工全过程的质量控制标准...',
      category: '质量分析',
      date: '2026-05-18',
      views: 986,
    },
    {
      id: 'exp-3',
      expertName: '王老师',
      expertTitle: '中药炮制传承人',
      avatar: '👨‍🔧',
      company: '北京中医药大学',
      title: '传统炮制工艺的现代化改良',
      summary: '探讨如何在保持传统功效的同时，实现中药炮制的标准化和现代化...',
      category: '工艺研究',
      date: '2026-05-15',
      views: 854,
    },
  ];

  const analysisReports = [
    {
      id: 'rep-1',
      title: '2026年第一季度中药材市场分析报告',
      category: '季度报告',
      date: '2026-04-05',
      pages: 45,
      downloads: 2341,
      description: '全面分析2026年Q1中药材市场价格走势、供需变化及影响因素',
      tags: ['价格分析', '市场趋势', '供需关系'],
    },
    {
      id: 'rep-2',
      title: '道地药材产业发展研究报告',
      category: '专题研究',
      date: '2026-03-20',
      pages: 68,
      downloads: 1876,
      description: '深入研究道地药材的地理分布、品质特征及产业化发展路径',
      tags: ['道地药材', '产业发展', '品质研究'],
    },
    {
      id: 'rep-3',
      title: '中药材进出口形势分析',
      category: '进出口报告',
      date: '2026-03-10',
      pages: 32,
      downloads: 1543,
      description: '分析当前中药材进出口政策变化及对国内市场的影响',
      tags: ['进出口', '政策分析', '国际贸易'],
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">资讯分析</h1>
          <p className="text-gray-600">及时掌握中药材行业最新动态</p>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-8 py-4 font-semibold transition-colors ${
                activeTab === 'news'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📰 最新资讯
            </button>
            <button
              onClick={() => setActiveTab('expert')}
              className={`px-8 py-4 font-semibold transition-colors ${
                activeTab === 'expert'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👨‍🏫 专家解读
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-8 py-4 font-semibold transition-colors ${
                activeTab === 'analysis'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 行业报告
            </button>
          </div>
        </div>

        {activeTab === 'news' && (
          <>
            {/* Hot News Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                {/* Category Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          (!selectedCategory && category === '全部') || selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory(category === '全部' ? '' : category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* News List */}
                <div className="space-y-6">
                  {filteredNews.map((news) => (
                    <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {news.imageUrl && (
                          <div className="md:w-64 flex-shrink-0">
                            <img
                              src={news.imageUrl}
                              alt={news.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-50 rounded-full">
                              {news.category}
                            </span>
                            <span className="text-sm text-gray-500">{news.source}</span>
                            <span className="text-sm text-gray-500">{news.publishTime}</span>
                            {news.views && (
                              <span className="text-sm text-gray-500">👁️ {news.views}</span>
                            )}
                          </div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-green-600 transition-colors cursor-pointer">
                            {news.title}
                          </h2>
                          <p className="text-gray-600 mb-4">{news.summary}</p>
                          <button className="text-green-600 hover:text-green-800 font-medium">
                            阅读全文 →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredNews.length === 0 && (
                  <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
                    暂无该分类的资讯
                  </div>
                )}
              </div>

              {/* Hot News Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🔥</span>
                    <h3 className="text-lg font-bold text-gray-900">热门资讯</h3>
                  </div>
                  <div className="space-y-4">
                    {sortedByViews.map((news, index) => (
                      <div key={news.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                            index === 0 ? 'bg-red-500 text-white' :
                            index === 1 ? 'bg-orange-500 text-white' :
                            index === 2 ? 'bg-yellow-500 text-white' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 hover:text-green-600 cursor-pointer line-clamp-2 mb-1">
                              {news.title}
                            </h4>
                            <span className="text-xs text-gray-500">👁️ {news.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'expert' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">👨‍🏫 专家解读</h2>
              <p className="text-green-100">权威专家深度分析，洞察行业趋势</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertInsights.map((expert) => (
                <div key={expert.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-3xl">
                        {expert.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{expert.expertName}</h3>
                        <p className="text-sm text-gray-600">{expert.expertTitle}</p>
                        <p className="text-xs text-gray-500">{expert.company}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {expert.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-green-600 cursor-pointer">
                      {expert.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {expert.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                      <span>{expert.date}</span>
                      <span>👁️ {expert.views}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      阅读全文
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">📊 行业深度报告</h2>
              <p className="text-emerald-100">专业数据研究，洞察市场先机</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisReports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 border-b border-green-100">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {report.category}
                      </span>
                      <span className="text-sm text-gray-500">{report.pages}页</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.tags.map((tag, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 {report.date}</span>
                      <span>⬇️ {report.downloads}次下载</span>
                    </div>
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2">
                      <span>📥</span>
                      <span>下载报告</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                查看更多报告 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
