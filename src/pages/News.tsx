import React, { useState } from 'react';
import { newsList } from '../data/mockData';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['全部', '市场快讯', '产地信息', '品种分析', '产业观察', '政策解读'];

  const filteredNews = selectedCategory && selectedCategory !== '全部'
    ? newsList.filter((news) => news.category === selectedCategory)
    : newsList;

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">资讯分析</h1>
          <p className="text-gray-600">及时掌握中药材行业最新动态</p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  (!selectedCategory && category === '全部') || selectedCategory === category
                    ? 'bg-primary-600 text-white'
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
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">{news.source}</span>
                    <span className="text-sm text-gray-500">{news.publishTime}</span>
                    {news.views && (
                      <span className="text-sm text-gray-500">浏览 {news.views}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{news.summary}</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
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
    </div>
  );
};

export default News;
