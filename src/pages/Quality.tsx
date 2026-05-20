import React, { useState } from 'react';
import {
  traceabilityProducts,
  gapCertifiedProducts,
  freshCutProducts,
  highQualityProducts,
} from '../data/mockData';
import TraceabilityComponent from '../components/TraceabilityComponent';
import GAPCertifiedComponent from '../components/GAPCertifiedComponent';
import FreshCutComponent from '../components/FreshCutComponent';
import HighQualityComponent from '../components/HighQualityComponent';

type QualitySection = 'overview' | 'traceability' | 'gap' | 'freshcut' | 'highquality';

const Quality: React.FC = () => {
  const [activeSection, setActiveSection] = useState<QualitySection>('overview');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">溯源与质量</h1>
          <p className="text-gray-600">中药材全程溯源，品质保障</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'overview'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('overview');
                setSelectedProductId(null);
              }}
            >
              首页概览
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'traceability'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('traceability');
                setSelectedProductId(null);
              }}
            >
              溯源系统
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'gap'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('gap');
                setSelectedProductId(null);
              }}
            >
              GAP专区
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'freshcut'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('freshcut');
                setSelectedProductId(null);
              }}
            >
              趁鲜切制
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'highquality'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('highquality');
                setSelectedProductId(null);
              }}
            >
              三无一全
            </button>
          </div>
        </div>

        {activeSection === 'overview' && !selectedProductId && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">溯源系统</h2>
                <button
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  onClick={() => setActiveSection('traceability')}
                >
                  查看全部 →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {traceabilityProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setActiveSection('traceability');
                      setSelectedProductId(product.id);
                    }}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-40 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2">{product.herbName}</h3>
                    <p className="text-sm text-gray-600 mb-1">批号：{product.batchNo}</p>
                    <p className="text-sm text-gray-600">产地：{product.origin}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">GAP认证</h2>
                <button
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  onClick={() => setActiveSection('gap')}
                >
                  查看全部 →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gapCertifiedProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setActiveSection('gap');
                      setSelectedProductId(product.id);
                    }}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-40 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2">{product.herbName}</h3>
                    <p className="text-sm text-gray-600 mb-1">认证号：{product.certificateNo}</p>
                    <p className="text-sm text-gray-600">基地：{product.baseLocation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">趁鲜切制</h2>
                <button
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  onClick={() => setActiveSection('freshcut')}
                >
                  查看全部 →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {freshCutProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setActiveSection('freshcut');
                      setSelectedProductId(product.id);
                    }}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-40 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2">{product.herbName}</h3>
                    <p className="text-sm text-gray-600 mb-1">规格：{product.specification}</p>
                    <p className="text-lg font-bold text-primary-700">{product.price} {product.unit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">三无一全</h2>
                <button
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  onClick={() => setActiveSection('highquality')}
                >
                  查看全部 →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {highQualityProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setActiveSection('highquality');
                      setSelectedProductId(product.id);
                    }}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-40 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2">{product.herbName}</h3>
                    <p className="text-sm text-gray-600 mb-1">产地：{product.origin}</p>
                    <p className="text-lg font-bold text-primary-700">{product.price} {product.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'traceability' && (
          <div>
            {selectedProductId ? (
              <div>
                <button
                  className="mb-4 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  onClick={() => setSelectedProductId(null)}
                >
                  ← 返回列表
                </button>
                {traceabilityProducts
                  .filter((p) => p.id === selectedProductId)
                  .map((product) => (
                    <TraceabilityComponent key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {traceabilityProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.herbName}</h3>
                      <p className="text-sm text-gray-600 mb-1">批号：{product.batchNo}</p>
                      <p className="text-sm text-gray-600 mb-1">产地：{product.origin}</p>
                      <p className="text-sm text-gray-600 mb-2">规格：{product.specifications}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{product.qualityLevel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'gap' && (
          <div>
            {selectedProductId ? (
              <div>
                <button
                  className="mb-4 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  onClick={() => setSelectedProductId(null)}
                >
                  ← 返回列表
                </button>
                {gapCertifiedProducts
                  .filter((p) => p.id === selectedProductId)
                  .map((product) => (
                    <GAPCertifiedComponent key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gapCertifiedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{product.herbName}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">GAP认证</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">基地：{product.baseLocation}</p>
                      <p className="text-sm text-gray-600 mb-2">面积：{product.areaSize}</p>
                      <p className="text-xs text-gray-500">有效期至：{product.validUntil}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'freshcut' && (
          <div>
            {selectedProductId ? (
              <div>
                <button
                  className="mb-4 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  onClick={() => setSelectedProductId(null)}
                >
                  ← 返回列表
                </button>
                {freshCutProducts
                  .filter((p) => p.id === selectedProductId)
                  .map((product) => (
                    <FreshCutComponent key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {freshCutProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{product.herbName}</h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">趁鲜切制</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">产地：{product.origin}</p>
                      <p className="text-sm text-gray-600 mb-2">规格：{product.specification}</p>
                      <p className="text-xl font-bold text-primary-700">{product.price} {product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'highquality' && (
          <div>
            {selectedProductId ? (
              <div>
                <button
                  className="mb-4 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  onClick={() => setSelectedProductId(null)}
                >
                  ← 返回列表
                </button>
                {highQualityProducts
                  .filter((p) => p.id === selectedProductId)
                  .map((product) => (
                    <HighQualityComponent key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {highQualityProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.herbName} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{product.herbName}</h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{product.standardType}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">产地：{product.origin}</p>
                      <p className="text-sm text-gray-600 mb-2">等级：{product.qualityLevel}</p>
                      <p className="text-xl font-bold text-primary-700">{product.price} {product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quality;