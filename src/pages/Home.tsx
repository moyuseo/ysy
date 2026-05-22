import React from 'react';
import { Link } from 'react-router-dom';
import { herbs, priceList, newsList, marketIndexes, suppliers, compositeIndices, categoryIndices, marketIndices as marketIndicesData, varietyIndices, specialtyIndices } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">中药材行业信息平台</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              专业的价格行情 · 市场指数 · 资讯分析 · 供求交易 · 溯源质量服务
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/market" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg">
                📊 行情中心
              </Link>
              <Link to="/prices" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105">
                💰 查看价格
              </Link>
              <Link to="/quality" className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-lg">
                🔍 溯源与质量
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-blue-200">中药材品种</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">6大</div>
                <div className="text-blue-200">专业市场</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">实时</div>
                <div className="text-blue-200">价格更新</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">全流程</div>
                <div className="text-blue-200">溯源体系</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Composite Index Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">综合指数</h2>
            <p className="text-gray-600">实时掌握中药材市场整体走势</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {compositeIndices.map((index) => (
              <div key={index.id} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{index.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">基期: {index.baseDate} ({index.baseValue}点)</p>
                  </div>
                  <div className={`flex items-center px-4 py-2 rounded-full ${
                    index.trend === 'up' ? 'bg-red-100 text-red-700' :
                    index.trend === 'down' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    <span className="text-2xl mr-2">
                      {index.trend === 'up' ? '↑' : index.trend === 'down' ? '↓' : '→'}
                    </span>
                    <span className="font-bold">{index.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold text-gray-900">{index.value.toFixed(1)}</span>
                  <span className="text-lg text-gray-600 ml-3 mb-1">点</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>涨跌: {index.change > 0 ? '+' : ''}{index.change.toFixed(1)}点</span>
                  <span>更新: {index.updateTime}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/market" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
              查看完整指数体系 →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">功能导航</h2>
            <p className="text-gray-600">一站式中药材行业服务平台</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link to="/market" className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="font-bold text-gray-800 mb-2">行情中心</h3>
              <p className="text-sm text-gray-600">多维度指数分析</p>
            </Link>
            <Link to="/prices" className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💰</div>
              <h3 className="font-bold text-gray-800 mb-2">价格行情</h3>
              <p className="text-sm text-gray-600">实时市场价格</p>
            </Link>
            <Link to="/news" className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📰</div>
              <h3 className="font-bold text-gray-800 mb-2">资讯分析</h3>
              <p className="text-sm text-gray-600">行业新闻动态</p>
            </Link>
            <Link to="/trade" className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
              <h3 className="font-bold text-gray-800 mb-2">供求交易</h3>
              <p className="text-sm text-gray-600">买卖供需对接</p>
            </Link>
            <Link to="/herbs" className="group bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
              <h3 className="font-bold text-gray-800 mb-2">品种知识</h3>
              <p className="text-sm text-gray-600">药材百科全书</p>
            </Link>
            <Link to="/quality" className="group bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="font-bold text-gray-800 mb-2">溯源与质量</h3>
              <p className="text-sm text-gray-600">质量安全保障</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Market & Category Index Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Market Index */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">市场指数</h2>
                <Link to="/market" className="text-blue-600 hover:text-blue-800 font-semibold">更多 →</Link>
              </div>
              <div className="space-y-4">
                {marketIndicesData.slice(0, 4).map((market) => (
                  <div key={market.id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">{market.name}</h3>
                        <p className="text-sm text-gray-500">{market.province} · {market.region}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{market.value.toFixed(1)}</div>
                        <div className={`text-sm font-semibold ${market.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {market.changePercent > 0 ? '↑' : '↓'} {Math.abs(market.changePercent).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Index */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">品类指数</h2>
                <Link to="/market" className="text-blue-600 hover:text-blue-800 font-semibold">更多 →</Link>
              </div>
              <div className="space-y-4">
                {categoryIndices.slice(0, 4).map((cat) => (
                  <div key={cat.id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">{cat.name}</h3>
                        <p className="text-sm text-gray-500">{cat.herbCount}个品种</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{cat.value.toFixed(1)}</div>
                        <div className={`text-sm font-semibold ${cat.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {cat.changePercent > 0 ? '↑' : '↓'} {Math.abs(cat.changePercent).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Prices Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">最新价格</h2>
              <p className="text-gray-600">实时更新各大市场中药材价格</p>
            </div>
            <Link to="/prices" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              查看全部价格 →
            </Link>
          </div>
          <div className="overflow-x-auto bg-gray-50 rounded-2xl p-2">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">品种</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">规格</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">产地</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">市场</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">价格</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">涨跌</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceList.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-base font-semibold text-gray-900">{item.herbName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.spec}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.origin}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.market}</td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-gray-900">{item.price} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1.5 text-sm font-bold rounded-full ${
                        item.trend === 'up' ? 'bg-red-100 text-red-700' : 
                        item.trend === 'down' ? 'bg-green-100 text-green-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                        {item.change !== 0 ? ` ${item.change > 0 ? '+' : ''}${item.change}` : ' 持平'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Variety & Specialty Index */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Core Variety Index */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">核心品种指数</h2>
                <Link to="/market" className="text-blue-600 hover:text-blue-800 font-semibold">更多 →</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {varietyIndices.slice(0, 6).map((variety) => (
                  <div key={variety.id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">{variety.herbName}</h3>
                        <p className="text-xs text-gray-500">{variety.category}</p>
                      </div>
                      <span className={`text-lg ${variety.trend === 'up' ? 'text-red-600' : variety.trend === 'down' ? 'text-green-600' : 'text-gray-600'}`}>
                        {variety.trend === 'up' ? '↑' : variety.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{variety.value.toFixed(1)}</div>
                    <div className={`text-sm font-semibold ${variety.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {variety.changePercent > 0 ? '+' : ''}{variety.changePercent.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialty Index */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">特色指数</h2>
                <Link to="/market" className="text-blue-600 hover:text-blue-800 font-semibold">更多 →</Link>
              </div>
              <div className="space-y-4">
                {specialtyIndices.map((special) => (
                  <div key={special.id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                          special.type === 'daodi' ? 'bg-red-100' :
                          special.type === 'qualified' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          <span className="text-2xl">
                            {special.type === 'daodi' ? '🏔️' : special.type === 'qualified' ? '✅' : '🌍'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{special.name}</h3>
                          <p className="text-xs text-gray-500">{special.varietyCount}个品种</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{special.value.toFixed(1)}</div>
                        <div className={`text-sm font-semibold ${special.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {special.changePercent > 0 ? '↑' : '↓'} {Math.abs(special.changePercent).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Herbs Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门品种</h2>
              <p className="text-gray-600">了解中药材品种详细知识</p>
            </div>
            <Link to="/herbs" className="text-blue-600 hover:text-blue-800 font-semibold">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {herbs.map((herb) => (
              <Link key={herb.id} to={`/herbs/${herb.id}`} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2">
                {herb.imageUrl && (
                  <div className="h-36 overflow-hidden">
                    <img src={herb.imageUrl} alt={herb.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 mb-1">{herb.name}</h3>
                  <p className="text-sm text-gray-500">{herb.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">资讯分析</h2>
              <p className="text-gray-600">行业新闻 · 政策解读 · 市场分析</p>
            </div>
            <Link to="/news" className="text-blue-600 hover:text-blue-800 font-semibold">
              查看更多 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsList.slice(0, 3).map((news) => (
              <Link key={news.id} to="/news" className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow">
                {news.imageUrl && (
                  <img src={news.imageUrl} alt={news.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {news.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{news.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{news.source}</span>
                    <span>{news.publishTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
