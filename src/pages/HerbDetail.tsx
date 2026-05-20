import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { herbs, priceList } from '../data/mockData';

const HerbDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const herb = herbs.find((h) => h.id === id);
  const relatedPrices = priceList.filter((p) => p.herbId === id);

  if (!herb) {
    return (
      <div className="min-h-screen py-8">
        <div className="container">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">药材未找到</h2>
            <Link to="/herbs" className="text-primary-600 hover:text-primary-700">
              返回药材列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-600">首页</Link> &gt;
          <Link to="/herbs" className="hover:text-primary-600">品种知识</Link> &gt;
          <span className="text-gray-900">{herb.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-8">
                {herb.imageUrl && (
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src={herb.imageUrl}
                      alt={herb.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{herb.name}</h1>
                    {herb.pinyin && (
                      <p className="text-lg text-gray-500">{herb.pinyin}</p>
                    )}
                    {herb.latinName && (
                      <p className="text-sm text-gray-400 italic">{herb.latinName}</p>
                    )}
                  </div>
                  <span className="inline-block px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-full mb-4">
                    {herb.category}
                  </span>
                  <div className="space-y-3 text-gray-700">
                    {herb.nature && herb.taste && (
                      <div>
                        <span className="text-gray-500 font-medium">性味：</span>
                        {herb.nature}，{herb.taste}
                      </div>
                    )}
                    {herb.meridian && (
                      <div>
                        <span className="text-gray-500 font-medium">归经：</span>
                        {herb.meridian.join('、')}
                      </div>
                    )}
                    {herb.origin && (
                      <div>
                        <span className="text-gray-500 font-medium">产地：</span>
                        {herb.origin.join('、')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Efficacy */}
            {herb.efficacy && (
              <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">功效主治</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {herb.efficacy.map((efficacy, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      {efficacy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {herb.description && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">药材介绍</h2>
                <p className="text-gray-700 leading-relaxed">{herb.description}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Information */}
            {relatedPrices.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">市场价格</h3>
                <div className="space-y-4">
                  {relatedPrices.map((price) => (
                    <div key={price.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">{price.market}</span>
                        <span className={`text-sm font-semibold ${
                          price.trend === 'up'
                            ? 'text-green-600'
                            : price.trend === 'down'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          {price.price} {price.unit}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div>规格：{price.spec}</div>
                        <div>产地：{price.origin}</div>
                        <div className="flex items-center gap-1">
                          <span>涨跌：</span>
                          <span className={`${
                            price.trend === 'up'
                              ? 'text-green-600'
                              : price.trend === 'down'
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }`}>
                            {price.trend === 'up' ? '↑' : price.trend === 'down' ? '↓' : '→'}
                            {price.change !== 0 ? ` ${price.change > 0 ? '+' : ''}${price.change}` : ' 持平'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">查找供应</button>
                <button className="w-full btn-secondary">发布求购</button>
                <Link to="/prices" className="w-full btn-secondary block text-center">
                  查看价格走势
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbDetail;
