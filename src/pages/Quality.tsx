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

type QualitySection = 'overview' | 'traceability' | 'gap' | 'freshcut' | 'highquality' | 'report' | 'lab' | 'certification';

const Quality: React.FC = () => {
  const [activeSection, setActiveSection] = useState<QualitySection>('overview');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchReportNo, setSearchReportNo] = useState('');
  const [searchCertNo, setSearchCertNo] = useState('');

  const testingLabs = [
    {
      id: 'lab-1',
      name: '中国食品药品检定研究院',
      abbr: '中检院',
      level: '国家级',
      address: '北京市东城区天坛西里2号',
      phone: '010-67095294',
      certification: 'CMA认证、CNAS认可',
      specialties: ['中药材检测', '农药残留', '重金属检测', '微生物检测'],
    },
    {
      id: 'lab-2',
      name: '安徽省食品药品检验研究院',
      abbr: '安徽食药检院',
      level: '省级',
      address: '安徽省合肥市包河区包河大道199号',
      phone: '0551-63358700',
      certification: 'CMA认证、CNAS认可',
      specialties: ['中药材检测', '农药残留', '重金属检测'],
    },
    {
      id: 'lab-3',
      name: '甘肃省药品检验研究院',
      abbr: '甘肃药检院',
      level: '省级',
      address: '甘肃省兰州市安宁区安宁东路37号',
      phone: '0931-7683355',
      certification: 'CMA认证、CNAS认可',
      specialties: ['当归检测', '黄芪检测', '党参检测', '道地药材检测'],
    },
  ];

  const certificationData = [
    {
      id: 'cert-1',
      type: 'GAP认证',
      description: '中药材生产质量管理规范认证',
      criteria: [
        '基地环境符合要求',
        '种子种苗管理规范',
        '种植过程可追溯',
        '农药化肥使用规范',
        '采收加工符合标准',
      ],
      authority: '国家药品监督管理局',
      validity: '3年',
    },
    {
      id: 'cert-2',
      type: 'GMP认证',
      description: '药品生产质量管理规范认证',
      criteria: [
        '生产环境符合要求',
        '设备设施完善',
        '质量控制体系健全',
        '人员培训到位',
        '文件记录完整',
      ],
      authority: '国家药品监督管理局',
      validity: '5年',
    },
    {
      id: 'cert-3',
      type: 'GSP认证',
      description: '药品经营质量管理规范认证',
      criteria: [
        '经营资质齐全',
        '仓储条件达标',
        '购销渠道合法',
        '质量管理体系完善',
        '信息化管理规范',
      ],
      authority: '省级药品监督管理局',
      validity: '5年',
    },
    {
      id: 'cert-4',
      type: '有机认证',
      description: '有机产品认证',
      criteria: [
        '不使用化学合农药',
        '不使用化学肥料',
        '土壤水质检测合格',
        '生产过程可追溯',
        '通过有机转换期',
      ],
      authority: '有机产品认证机构',
      validity: '1年',
    },
  ];

  const renderReportSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">📋 质检报告查询</h2>
        <p className="text-green-100">验证中药材质量检测报告真伪</p>
      </div>
      
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">查询质检报告</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">报告编号</label>
            <input
              type="text"
              placeholder="请输入报告编号"
              value={searchReportNo}
              onChange={(e) => setSearchReportNo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">药材名称</label>
            <input
              type="text"
              placeholder="请输入药材名称"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              🔍 查询报告
            </button>
          </div>
        </div>
      </div>

      {/* Report Sample */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">报告样例</h3>
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            ✓ 已验证
          </span>
        </div>
        <div className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-white">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-green-800 mb-2">中药材质量检测报告</h4>
            <p className="text-gray-600">报告编号: ZJ20260522001</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm font-semibold text-gray-600">药材名称:</span>
              <span className="ml-2 text-gray-900">人参</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-600">检测机构:</span>
              <span className="ml-2 text-gray-900">中国食品药品检定研究院</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-600">检测日期:</span>
              <span className="ml-2 text-gray-900">2026-05-22</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-600">报告有效期:</span>
              <span className="ml-2 text-gray-900">2027-05-22</span>
            </div>
          </div>
          <div className="mb-6">
            <h5 className="font-bold text-gray-900 mb-3">检测项目</h5>
            <div className="space-y-2">
              {[
                { item: '农药残留', result: '合格', method: 'GC-MS' },
                { item: '重金属', result: '合格', method: 'ICP-MS' },
                { item: '二氧化硫', result: '合格', method: '滴定法' },
                { item: '黄曲霉毒素', result: '合格', method: 'HPLC' },
                { item: '水分', result: '合格', method: '烘干法' },
                { item: '总灰分', result: '合格', method: '炽灼法' },
              ].map((test, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-700">{test.item}</span>
                  <span className="text-sm text-gray-500">{test.method}</span>
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {test.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center pt-4 border-t-2 border-green-200">
            <p className="text-sm text-gray-600">
              本报告仅对所检样品负责，报告真实性可通过报告编号在官网查询验证
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLabSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">🏢 检测机构</h2>
        <p className="text-emerald-100">权威第三方检测机构信息</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testingLabs.map((lab) => (
          <div key={lab.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white text-2xl">
                🏛️
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{lab.name}</h3>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                  lab.level === '国家级' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {lab.level}
                </span>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-start">
                <span className="text-emerald-500 mr-2">📍</span>
                <span className="text-sm text-gray-700">{lab.address}</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-500 mr-2">📞</span>
                <span className="text-sm text-gray-700">{lab.phone}</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-500 mr-2">📜</span>
                <span className="text-sm text-gray-700">{lab.certification}</span>
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">检测项目:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {lab.specialties.map((spec, idx) => (
                  <span key={idx} className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificationSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">✅ 质量认证查询</h2>
        <p className="text-teal-100">验证中药材相关认证证书真伪</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">认证证书查询</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">证书编号</label>
            <input
              type="text"
              placeholder="请输入证书编号"
              value={searchCertNo}
              onChange={(e) => setSearchCertNo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">认证类型</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">全部</option>
              <option value="gap">GAP认证</option>
              <option value="gmp">GMP认证</option>
              <option value="gsp">GSP认证</option>
              <option value="organic">有机认证</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              🔍 查询认证
            </button>
          </div>
        </div>
      </div>

      {/* Certification Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificationData.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{cert.type}</h3>
                  <p className="text-teal-100 text-sm">{cert.description}</p>
                </div>
                <div className="text-4xl">📜</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-700">发证机构:</span>
                <span className="ml-2 text-gray-900">{cert.authority}</span>
              </div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-700">有效期:</span>
                <span className="ml-2 text-gray-900">{cert.validity}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700 mb-2 block">认证标准:</span>
                <ul className="space-y-2">
                  {cert.criteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="text-teal-500 mr-2">✓</span>
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">溯源与质量</h1>
          <p className="text-gray-600">中药材全程溯源 · 品质保障 · 质量认证</p>
        </div>

        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'overview'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('overview');
                setSelectedProductId(null);
              }}
            >
              🏠 首页概览
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'traceability'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('traceability');
                setSelectedProductId(null);
              }}
            >
              🔍 溯源系统
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'gap'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('gap');
                setSelectedProductId(null);
              }}
            >
              ✅ GAP专区
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'freshcut'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('freshcut');
                setSelectedProductId(null);
              }}
            >
              🔪 趁鲜切制
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'highquality'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveSection('highquality');
                setSelectedProductId(null);
              }}
            >
              🌟 三无一全
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'report'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('report')}
            >
              📋 质检报告
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'lab'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('lab')}
            >
              🏢 检测机构
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeSection === 'certification'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('certification')}
            >
              🎖️ 认证查询
            </button>
          </div>
        </div>

        {activeSection === 'overview' && !selectedProductId && (
          <div className="space-y-6">
            {/* ... existing overview content ... */}
          </div>
        )}

        {activeSection === 'report' && renderReportSection()}
        {activeSection === 'lab' && renderLabSection()}
        {activeSection === 'certification' && renderCertificationSection()}

        {activeSection === 'traceability' && !selectedProductId && (
          <TraceabilityComponent products={traceabilityProducts} />
        )}
        {activeSection === 'gap' && !selectedProductId && (
          <GAPCertifiedComponent products={gapCertifiedProducts} />
        )}
        {activeSection === 'freshcut' && !selectedProductId && (
          <FreshCutComponent products={freshCutProducts} />
        )}
        {activeSection === 'highquality' && !selectedProductId && (
          <HighQualityComponent products={highQualityProducts} />
        )}
      </div>
    </div>
  );
};

export default Quality;
