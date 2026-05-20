import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { herbs } from '../data/mockData';

const Herbs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(herbs.map((h) => h.category)));

  const filteredHerbs = herbs.filter((herb) => {
    const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || herb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">品种知识</h1>
          <p className="text-gray-600">中药材百科全书</p>
        </div>

        {/* Filters */}
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

        {/* Herb Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHerbs.map((herb) => (
            <Link
              key={herb.id}
              to={`/herbs/${herb.id}`}
              className="card group hover:shadow-md transition-shadow"
            >
              {herb.imageUrl && (
                <img
                  src={herb.imageUrl}
                  alt={herb.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {herb.name}
                </h3>
                {herb.pinyin && (
                  <p className="text-sm text-gray-500">{herb.pinyin}</p>
                )}
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mb-3">
                {herb.category}
              </span>
              <div className="space-y-1 text-sm text-gray-600">
                {herb.nature && herb.taste && (
                  <p><span className="text-gray-500">性味：</span>{herb.nature}，{herb.taste}</p>
                )}
                {herb.origin && (
                  <p><span className="text-gray-500">产地：</span>{herb.origin.join('、')}</p>
                )}
                {herb.efficacy && (
                  <p className="line-clamp-2">
                    <span className="text-gray-500">功效：</span>{herb.efficacy.join('、')}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredHerbs.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            暂无符合条件的药材
          </div>
        )}
      </div>
    </div>
  );
};

export default Herbs;
