import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { compositeIndices, categoryIndices, marketIndices, varietyIndices, specialtyIndices, personalIndices } from '../data/mockData';
import { CompositeIndex, CategoryIndex, MarketIndexItem, VarietyIndexItem, SpecialtyIndex, PersonalIndex } from '../types';

const MarketCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'category' | 'market' | 'variety' | 'specialty' | 'personal'>('overview');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {compositeIndices.map((index) => (
          <div key={index.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{index.name}</h3>
              <span className="text-sm text-gray-500">{index.updateTime}</span>
            </div>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-4xl font-bold text-gray-900">{index.value.toFixed(1)}</span>
                <span className="text-lg text-gray-600 ml-2">点</span>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full ${
                index.trend === 'up' ? 'bg-red-100 text-red-700' :
                index.trend === 'down' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                <span className="text-2xl mr-1">
                  {index.trend === 'up' ? '↑' : index.trend === 'down' ? '↓' : '→'}
                </span>
                <span className="font-semibold">{Math.abs(index.changePercent).toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <span>基期: {index.baseDate} ({index.baseValue}点)</span>
              <span className="mx-2">|</span>
              <span>涨跌: {index.change > 0 ? '+' : ''}{index.change.toFixed(1)}点</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={index.history}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={index.trend === 'up' ? '#10b981' : index.trend === 'down' ? '#ef4444' : '#6b7280'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={index.trend === 'up' ? '#10b981' : index.trend === 'down' ? '#ef4444' : '#6b7280'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => [`${value.toFixed(1)}点`, '指数']}
                />
                <Area type="monotone" dataKey="value" stroke={index.trend === 'up' ? '#10b981' : index.trend === 'down' ? '#ef4444' : '#6b7280'} fill="url(#colorValue)" />
                <Line type="monotone" dataKey="value" stroke={index.trend === 'up' ? '#10b981' : index.trend === 'down' ? '#ef4444' : '#6b7280'} strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">市场概况</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-blue-200 text-sm">综合指数</p>
            <p className="text-3xl font-bold">{compositeIndices[0].value.toFixed(1)}</p>
            <p className={`text-sm ${compositeIndices[0].changePercent > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {compositeIndices[0].changePercent > 0 ? '↑' : '↓'} {Math.abs(compositeIndices[0].changePercent).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">监测品类</p>
            <p className="text-3xl font-bold">{categoryIndices.length}</p>
            <p className="text-sm text-blue-200">个分类</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">监测市场</p>
            <p className="text-3xl font-bold">{marketIndices.length}</p>
            <p className="text-sm text-blue-200">大市场</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">品种指数</p>
            <p className="text-3xl font-bold">{varietyIndices.length}+</p>
            <p className="text-sm text-blue-200">核心品种</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">热门品类</h3>
          <div className="space-y-3">
            {categoryIndices.slice(0, 5).map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <span className="text-gray-700">{cat.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{cat.value.toFixed(1)}</span>
                  <span className={`text-sm ${cat.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {cat.changePercent > 0 ? '↑' : '↓'} {Math.abs(cat.changePercent).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">市场动态</h3>
          <div className="space-y-3">
            {marketIndices.slice(0, 5).map((market) => (
              <div key={market.id} className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">{market.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({market.province})</span>
                </div>
                <span className={`text-sm ${market.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {market.changePercent > 0 ? '↑' : '↓'} {Math.abs(market.changePercent).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">特色指数</h3>
          <div className="space-y-3">
            {specialtyIndices.map((special) => (
              <div key={special.id} className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">{special.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({special.varietyCount}品种)</span>
                </div>
                <span className={`text-sm ${special.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {special.changePercent > 0 ? '↑' : '↓'} {Math.abs(special.changePercent).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">品类指数</h2>
        <p className="text-gray-600">按药用部位分类</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categoryIndices.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
              <span className={`text-2xl ${category.trend === 'up' ? 'text-red-500' : category.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                {category.trend === 'up' ? '↑' : category.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-gray-900">{category.value.toFixed(1)}</span>
              <span className="text-gray-600 ml-1">点</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={`font-semibold ${category.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {category.changePercent > 0 ? '+' : ''}{category.change.toFixed(1)} ({category.changePercent.toFixed(2)}%)
              </span>
              <span className="text-gray-500">{category.herbCount}种</span>
            </div>
            {category.description && (
              <p className="text-xs text-gray-500 mt-3">{category.description}</p>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">品类指数走势对比</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={categoryIndices[0].value > 0 ? 
            categoryIndices[0].value > 0 ? 
            [{ name: '根茎类', value: categoryIndices[0].value, change: categoryIndices[0].changePercent }] : []
            : []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderMarket = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">市场指数</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedMarket('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${selectedMarket === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            全部市场
          </button>
          {['华北', '华南', '西南', '华中'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedMarket(region)}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedMarket === region ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketIndices
          .filter(m => selectedMarket === 'all' || m.region === selectedMarket)
          .map((market) => (
            <div key={market.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{market.name}</h3>
                  <p className="text-sm text-gray-500">{market.province} · {market.region}</p>
                </div>
                <span className={`text-3xl ${market.trend === 'up' ? 'text-red-500' : market.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                  {market.trend === 'up' ? '↑' : market.trend === 'down' ? '↓' : '→'}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{market.value.toFixed(1)}</span>
                <span className="text-gray-600 ml-2">点</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                market.trend === 'up' ? 'bg-red-50' : market.trend === 'down' ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <span className={`font-semibold ${market.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {market.changePercent > 0 ? '+' : ''}{market.change.toFixed(1)}点
                </span>
                <span className={`text-lg font-bold ${market.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {market.changePercent > 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-4">{market.description}</p>
              <p className="text-xs text-gray-400 mt-2">更新时间: {market.updateTime}</p>
            </div>
          ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">市场指数对比图</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={marketIndices}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderVariety = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">品种指数</h2>
        <p className="text-gray-600">核心中药材品种价格指数</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {varietyIndices.map((variety) => (
          <div key={variety.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{variety.herbName}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{variety.category}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{variety.efficacy}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl ${variety.trend === 'up' ? 'text-red-500' : variety.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                  {variety.trend === 'up' ? '↑' : variety.trend === 'down' ? '↓' : '→'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">指数</p>
                <p className="text-2xl font-bold text-gray-900">{variety.value.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">当前价</p>
                <p className="text-2xl font-bold text-gray-900">
                  {variety.currentPrice}<span className="text-sm">/{variety.priceUnit}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">涨跌</p>
                <p className={`text-2xl font-bold ${variety.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {variety.changePercent > 0 ? '+' : ''}{variety.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={variety.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={variety.trend === 'up' ? '#ef4444' : variety.trend === 'down' ? '#10b981' : '#6b7280'} 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>基期: {variety.baseDate} ({variety.baseValue}点)</span>
              <span>更新: {variety.updateTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpecialty = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-6">
        <h2 className="text-3xl font-bold mb-4">特色指数体系</h2>
        <p className="text-lg text-blue-100">道地药材 · 药典合格 · 进口药材</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {specialtyIndices.map((special) => (
          <div key={special.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                  special.type === 'daodi' ? 'bg-red-100' :
                  special.type === 'qualified' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <span className="text-2xl">
                    {special.type === 'daodi' ? '🏔️' : special.type === 'qualified' ? '✅' : '🌍'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{special.name}</h3>
                  <p className="text-sm text-gray-500">{special.code}</p>
                </div>
              </div>
              <span className={`text-3xl ${special.trend === 'up' ? 'text-red-500' : special.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                {special.trend === 'up' ? '↑' : special.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">{special.value.toFixed(1)}</span>
              <span className="text-gray-600 ml-2">点</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${
              special.trend === 'up' ? 'bg-red-50' : 'bg-green-50'
            }`}>
              <span className={`font-semibold ${special.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {special.changePercent > 0 ? '+' : ''}{special.change.toFixed(1)}点
              </span>
              <span className={`text-lg font-bold ${special.changePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {special.changePercent > 0 ? '+' : ''}{special.changePercent.toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-600 mb-4">{special.description}</p>
            <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
              <span>品种数: {special.varietyCount}</span>
              {special.averagePremium && (
                <span className="text-green-600">平均溢价: +{special.averagePremium}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">特色指数说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">道地药材指数</h4>
            <p className="text-sm text-red-700">
              仅统计道地产区的品种价格，反映正宗药材的稀缺程度和价值。为高端采购提供参考。
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">药典合格指数</h4>
            <p className="text-sm text-green-700">
              统计具有第三方质检报告且合格的品种价格，反映优质药材的市场溢价情况。
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">进口药材指数</h4>
            <p className="text-sm text-blue-700">
              统计海外进口中药材价格波动，为外贸企业提供市场参考和风险预警。
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg p-8 text-white mb-6">
        <h2 className="text-3xl font-bold mb-4">个性化指数工具</h2>
        <p className="text-lg text-yellow-100">自定义组合 · 智能预警 · 专属监控</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalIndices.map((personal) => (
          <div key={personal.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{personal.name}</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                编辑
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">监控品种</p>
                <div className="flex flex-wrap gap-2">
                  {personal.varieties.map((v, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">监控市场</p>
                <div className="flex flex-wrap gap-2">
                  {personal.markets.map((m, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              {personal.weights && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">权重分配</p>
                  <div className="flex items-center gap-2">
                    {personal.weights.map((w, idx) => (
                      <div key={idx} className="flex-1">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${w * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-center mt-1">{(w * 100).toFixed(0)}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {personal.alertThreshold && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-yellow-800 mb-2">预警设置</p>
                <div className="flex justify-between text-sm">
                  {personal.alertThreshold.high && (
                    <span className="text-red-600">🔴 高于 {personal.alertThreshold.high}点</span>
                  )}
                  {personal.alertThreshold.low && (
                    <span className="text-green-600">🟢 低于 {personal.alertThreshold.low}点</span>
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-between text-xs text-gray-500 pt-4 border-t">
              <span>创建: {personal.createdAt}</span>
              <span>更新: {personal.updatedAt}</span>
            </div>
          </div>
        ))}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
          <div className="text-5xl mb-3">➕</div>
          <p className="text-gray-600 font-semibold">创建新组合</p>
          <p className="text-sm text-gray-500 mt-1">自定义您的专属指数组合</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">功能说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-800 mb-2">自选组合</h4>
            <p className="text-sm text-gray-600">自由选择关注的品种、市场、产地，系统自动生成专属指数曲线</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔔</div>
            <h4 className="font-bold text-gray-800 mb-2">智能预警</h4>
            <p className="text-sm text-gray-600">当指数突破设定阈值时，自动发送通知提醒</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">📈</div>
            <h4 className="font-bold text-gray-800 mb-2">趋势分析</h4>
            <p className="text-sm text-gray-600">多维度数据对比，深度分析您关注的药材走势</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">行情中心</h1>
        <p className="text-gray-600">中药材行业多维度指数分析平台</p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            首页概览
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`px-6 py-4 font-semibold transition-colors ${
              activeTab === 'category'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            品类指数
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`px-6 py-4 font-semibold transition-colors ${
              activeTab === 'market'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            市场指数
          </button>
          <button
            onClick={() => setActiveTab('variety')}
            className={`px-6 py-4 font-semibold transition-colors ${
              activeTab === 'variety'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            品种指数
          </button>
          <button
            onClick={() => setActiveTab('specialty')}
            className={`px-6 py-4 font-semibold transition-colors ${
              activeTab === 'specialty'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            特色指数
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-6 py-4 font-semibold transition-colors ${
              activeTab === 'personal'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            个性化工具
          </button>
        </div>
      </div>

      <div className="min-h-screen">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'category' && renderCategory()}
        {activeTab === 'market' && renderMarket()}
        {activeTab === 'variety' && renderVariety()}
        {activeTab === 'specialty' && renderSpecialty()}
        {activeTab === 'personal' && renderPersonal()}
      </div>
    </div>
  );
};

export default MarketCenter;
