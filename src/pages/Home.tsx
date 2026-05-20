import React from 'react';
import { Link } from 'react-router-dom';
import { herbs, priceList, newsList, marketIndexes, suppliers } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">中药材行业信息平台</h1>
            <p className="text-xl text-primary-100 mb-8">专业的价格行情、资讯分析、供求交易服务</p>
            <div className="flex justify-center space-x-4">
              <Link to="/prices" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                查看价格
              </Link>
              <Link to="/news" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                了解资讯
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">市场指数</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketIndexes.map((index) => (
              <div key={index.id} className="card text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{index.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">{index.value.toFixed(2)}</div>
                <div className={`text-lg font-semibold ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                </div>
                <div className="text-sm text-gray-500 mt-2">更新于 {index.updateTime}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">最新价格</h2>
            <Link to="/prices" className="text-primary-600 hover:text-primary-700 font-medium">
              查看更多 →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">品种</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">规格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">产地</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">市场</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">价格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">涨跌</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.herbName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.spec}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.origin}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.market}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{item.price} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.trend === 'up' ? 'bg-green-100 text-green-800' : item.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
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

      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">热门品种</h2>
            <Link to="/herbs" className="text-primary-600 hover:text-primary-700 font-medium">
              查看更多 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {herbs.map((herb) => (
              <Link key={herb.id} to={`/herbs/${herb.id}`} className="card text-center hover:shadow-md">
                {herb.imageUrl && (
                  <img src={herb.imageUrl} alt={herb.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                )}
                <h3 className="font-semibold text-gray-900">{herb.name}</h3>
                <p className="text-sm text-gray-500">{herb.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
