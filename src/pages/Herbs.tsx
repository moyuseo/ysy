import React, { useState } from 'react';
import { 
  herbs, 
  herbProfiles, 
  authenticityChecks, 
  cultivationTechniques, 
  healthKnowledge, 
  originDistributions 
} from '../data/mockData';
import HerbProfileCard from '../components/HerbProfileCard';
import AuthenticityCheckCard from '../components/AuthenticityCheckCard';
import CultivationTechniqueCard from '../components/CultivationTechniqueCard';
import HealthKnowledgeCard from '../components/HealthKnowledgeCard';
import OriginDistributionCard from '../components/OriginDistributionCard';

type KnowledgeSection = 'profile' | 'authenticity' | 'cultivation' | 'health' | 'origin' | 'list' | 'pharmacopoeia' | 'compatibility' | 'processing' | 'research';

const Herbs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeSection, setActiveSection] = useState<KnowledgeSection>('list');
  const [selectedHerbId, setSelectedHerbId] = useState<string | null>(null);

  const categories = Array.from(new Set(herbs.map((h) => h.category)));

  const filteredHerbs = herbs.filter((herb) => {
    const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || herb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pharmacopoeiaStandards = [
    {
      id: 'ph-1',
      herbName: '人参',
      latinName: 'Panax ginseng C.A.Mey.',
      chinesePharmacopoeia: '2020年版一部',
      originStandard: '五加科植物人参的干燥根和根茎',
      processingStandard: '秋季采挖，洗净，干燥',
      qualityRequirements: [
        '含人参皂苷Rg1和Re不得少于0.30%',
        '人参皂苷Rb1不得少于0.20%',
        '水分不得过12.0%',
        '总灰分不得过5.0%',
      ],
      testingMethods: '色谱法',
      storageMethod: '置阴凉干燥处，密闭保存',
    },
    {
      id: 'ph-2',
      herbName: '当归',
      latinName: 'Angelica sinensis (Oliv.) Diels',
      chinesePharmacopoeia: '2020年版一部',
      originStandard: '伞形科植物当归的干燥根',
      processingStandard: '秋末采挖，除去须根和泥沙，待水分稍蒸发后，捆成小把，上棚，用烟火慢慢熏干',
      qualityRequirements: [
        '含阿魏酸不得少于0.050%',
        '挥发油不得少于0.4%',
        '水分不得过15.0%',
        '总灰分不得过7.0%',
      ],
      testingMethods: '色谱法+挥发油测定法',
      storageMethod: '置阴凉干燥处，防蛀',
    },
    {
      id: 'ph-3',
      herbName: '黄芪',
      latinName: 'Astragalus membranaceus (Fisch.) Bunge',
      chinesePharmacopoeia: '2020年版一部',
      originStandard: '豆科植物蒙古黄芪或荚膜黄芪的干燥根',
      processingStandard: '春、秋二季采挖，除去须根和根头，晒干',
      qualityRequirements: [
        '含黄芪甲苷不得少于0.040%',
        '含毛蕊异黄酮葡萄糖苷不得少于0.020%',
        '水分不得过10.0%',
        '总灰分不得过5.0%',
      ],
      testingMethods: '色谱法',
      storageMethod: '置通风干燥处，防潮，防蛀',
    },
  ];

  const compatibilityData = [
    {
      id: 'comp-1',
      category: '相须配伍',
      description: '性能功效相类似的药物配合应用，可以增强原有疗效',
      examples: [
        { herbs: ['金银花', '连翘'], effect: '清热解毒，疏散风热' },
        { herbs: ['桃仁', '红花'], effect: '活血祛瘀止痛' },
        { herbs: ['附子', '干姜'], effect: '温肾助阳，回阳救逆' },
      ],
    },
    {
      id: 'comp-2',
      category: '相使配伍',
      description: '一种药物为主，另一种药物为辅，辅药提高主药的疗效',
      examples: [
        { herbs: ['黄芪', '茯苓'], effect: '黄芪为主补气利水，茯苓健脾渗湿' },
        { herbs: ['枸杞', '菊花'], effect: '枸杞养肝明目，菊花清肝明目' },
      ],
    },
    {
      id: 'comp-3',
      category: '相畏相杀',
      description: '一种药物能降低或消除另一种药物的毒性或副作用',
      examples: [
        { herbs: ['生姜', '半夏'], effect: '生姜能减轻半夏的毒性' },
        { herbs: ['绿豆', '巴豆'], effect: '绿豆能减轻巴豆的毒性' },
      ],
    },
    {
      id: 'comp-4',
      category: '配伍禁忌',
      description: '某些药物合用会降低药效或产生毒性作用，应避免同用',
      examples: [
        { herbs: ['十八反', '配伍组合'], effect: '甘草反甘遂、大戟、海藻、芫花' },
        { herbs: ['十九畏', '配伍组合'], effect: '硫黄畏朴硝，水银畏砒霜' },
      ],
    },
  ];

  const processingTechniques = [
    {
      id: 'proc-1',
      name: '净制',
      description: '除去杂质、非药用部分及虫蛀霉变部分',
      methods: ['挑选', '筛选', '风选', '水选'],
      application: '适用于所有药材的初步加工',
    },
    {
      id: 'proc-2',
      name: '切制',
      description: '将药材切成一定规格的饮片',
      methods: ['切成厚片', '切成薄片', '切成丝', '切成段', '切成块'],
      application: '如白芍、白术、当归等',
    },
    {
      id: 'proc-3',
      name: '炒制',
      description: '将药材置炒制容器内，用不同火力加热，不断翻炒至一定程度',
      methods: ['清炒', '麸炒', '土炒', '砂炒', '蛤粉炒', '滑石粉炒'],
      application: '如王不留行（清炒）、僵蚕（麸炒）',
    },
    {
      id: 'proc-4',
      name: '炙法',
      description: '将药材与液体辅料拌匀后，加热炮制的方法',
      methods: ['蜜炙', '酒炙', '醋炙', '盐炙', '姜炙', '油炙'],
      application: '如甘草（蜜炙）、当归（酒炙）、延胡索（醋炙）',
    },
    {
      id: 'proc-5',
      name: '煅法',
      description: '将药材直接或间接煅烧至酥脆的方法',
      methods: ['明煅', '煅淬', '闷煅'],
      application: '如石膏（明煅）、自然铜（煅淬）',
    },
    {
      id: 'proc-6',
      name: '蒸煮烫',
      description: '将药材用水蒸气或液体辅料蒸煮的方法',
      methods: ['蒸法', '煮法', '烫法'],
      application: '如地黄（蒸制）、川乌（煮制）、白扁豆（烫制）',
    },
  ];

  const modernResearch = [
    {
      id: 'res-1',
      title: '人参皂苷Rg1对神经保护作用的研究进展',
      authors: '张伟, 李娜, 王强',
      journal: '中国中药杂志',
      year: 2025,
      abstract: '本文综述了人参皂苷Rg1在神经保护方面的研究进展，包括抗氧化、抗炎、抗凋亡等机制...',
      keywords: ['人参皂苷', '神经保护', '药理作用'],
      doi: '10.19540/j.cnki.cjcmm.2025.0125',
    },
    {
      id: 'res-2',
      title: '当归多糖的免疫调节作用及分子机制研究',
      authors: '刘芳, 陈明, 赵丽',
      journal: '中草药',
      year: 2025,
      abstract: '系统研究了当归多糖的免疫调节作用，发现其通过TLR4/NF-κB信号通路发挥免疫增强作用...',
      keywords: ['当归多糖', '免疫调节', '信号通路'],
      doi: '10.7501/j.issn.0253-2670.2025.3.015',
    },
    {
      id: 'res-3',
      title: '黄芪甲苷对心肌缺血再灌注损伤的保护作用',
      authors: '孙磊, 周杰, 吴燕',
      journal: '中国药理学通报',
      year: 2024,
      abstract: '探讨了黄芪甲苷对心肌缺血再灌注损伤的保护作用及其可能机制，为临床应用提供理论依据...',
      keywords: ['黄芪甲苷', '心肌保护', '缺血再灌注'],
      doi: '10.12345/j.cnki.pharm.2024.5678',
    },
    {
      id: 'res-4',
      title: '中药复方抗肿瘤作用机制研究进展',
      authors: '郑华, 黄涛, 林梅',
      journal: '中药新药与临床药理',
      year: 2024,
      abstract: '综述了近年来中药复方在抗肿瘤方面的研究进展，总结了其多靶点、多通路的作用特点...',
      keywords: ['中药复方', '抗肿瘤', '作用机制'],
      doi: '10.12345/j.cnki.tcml.2024.9012',
    },
  ];

  const renderSectionContent = () => {
    if (activeSection === 'list' || !selectedHerbId) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHerbs.map((herb) => (
            <div
              key={herb.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedHerbId(herb.id);
                setActiveSection('profile');
              }}
            >
              {herb.imageUrl && (
                <img
                  src={herb.imageUrl}
                  alt={herb.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{herb.name}</h3>
                  {herb.pinyin && (
                    <p className="text-sm text-gray-500">{herb.pinyin}</p>
                  )}
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mb-2">
                  {herb.category}
                </span>
                {herb.efficacy && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {herb.efficacy.join('、')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const selectedHerb = herbs.find(h => h.id === selectedHerbId);
    const profile = herbProfiles.find(p => p.herbId === selectedHerbId);
    const authenticity = authenticityChecks.find(c => c.herbId === selectedHerbId);
    const cultivation = cultivationTechniques.find(t => t.herbId === selectedHerbId);
    const health = healthKnowledge.find(k => k.herbId === selectedHerbId);
    const origin = originDistributions.find(d => d.herbId === selectedHerbId);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setActiveSection('list')}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            ← 返回列表
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedHerb?.name} - {sectionNames[activeSection]}
          </h2>
        </div>

        {activeSection === 'profile' && profile && (
          <HerbProfileCard profile={profile} />
        )}
        
        {activeSection === 'authenticity' && authenticity && (
          <AuthenticityCheckCard check={authenticity} />
        )}
        
        {activeSection === 'cultivation' && cultivation && (
          <CultivationTechniqueCard technique={cultivation} />
        )}
        
        {activeSection === 'health' && health && (
          <HealthKnowledgeCard knowledge={health} />
        )}
        
        {activeSection === 'origin' && origin && (
          <OriginDistributionCard distribution={origin} />
        )}
        
        {activeSection === 'pharmacopoeia' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">📖 药典标准</h2>
              <p className="text-green-100">中国药典2020年版一部标准查询</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pharmacopoeiaStandards.map((standard) => (
                <div key={standard.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">
                      🌿
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{standard.herbName}</h3>
                      <p className="text-sm text-gray-500 italic">{standard.latinName}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-green-600 w-24 flex-shrink-0">药典版本:</span>
                      <span className="text-sm text-gray-700">{standard.chinesePharmacopoeia}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-green-600 w-24 flex-shrink-0">来源:</span>
                      <span className="text-sm text-gray-700">{standard.originStandard}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-green-600 w-24 flex-shrink-0">采收加工:</span>
                      <span className="text-sm text-gray-700">{standard.processingStandard}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-green-600">质量要求:</span>
                      <ul className="mt-2 space-y-1">
                        {standard.qualityRequirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-green-600 w-24 flex-shrink-0">检测方法:</span>
                      <span className="text-sm text-gray-700">{standard.testingMethods}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-green-600 w-24 flex-shrink-0">贮藏:</span>
                      <span className="text-sm text-gray-700">{standard.storageMethod}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'compatibility' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">⚠️ 配伍禁忌</h2>
              <p className="text-emerald-100">中药配伍原则与禁忌详解</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {compatibilityData.map((comp) => (
                <div key={comp.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className={`p-6 ${
                    comp.category === '配伍禁忌' 
                      ? 'bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200' 
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200'
                  }`}>
                    <h3 className={`text-xl font-bold mb-2 ${
                      comp.category === '配伍禁忌' ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {comp.category}
                    </h3>
                    <p className="text-sm text-gray-700">{comp.description}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {comp.examples.map((example, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">💊</span>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {Array.isArray(example.herbs) ? example.herbs.join(' + ') : example.herbs}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 pl-8">{example.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'processing' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">🔧 炮制工艺</h2>
              <p className="text-teal-100">中药炮制的传统方法与现代工艺</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processingTechniques.map((tech) => (
                <div key={tech.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-white text-3xl mb-4">
                    ⚒️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-teal-600">常用方法:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tech.methods.map((method, idx) => (
                        <span key={idx} className="inline-block bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">{tech.application}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'research' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">🔬 现代研究</h2>
              <p className="text-cyan-100">中药材最新科学研究成果</p>
            </div>
            <div className="space-y-6">
              {modernResearch.map((research) => (
                <div key={research.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 cursor-pointer">
                        {research.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <span>👥</span>
                          <span>{research.authors}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📰</span>
                          <span className="text-green-600 font-semibold">{research.journal}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📅</span>
                          <span>{research.year}年</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold">
                        {research.year}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{research.abstract}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {research.keywords.map((keyword, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <button className="text-sm text-green-600 hover:text-green-800 font-semibold">
                      查看全文 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!profile && !authenticity && !cultivation && !health && !origin && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-600">
            该药材暂无{sectionNames[activeSection]}信息
          </div>
        )}
      </div>
    );
  };

  const sectionNames: Record<KnowledgeSection, string> = {
    list: '药材列表',
    profile: '品种档案',
    authenticity: '真伪鉴别',
    cultivation: '种植技术',
    health: '养生保健',
    origin: '产地分布',
    pharmacopoeia: '药典标准',
    compatibility: '配伍禁忌',
    processing: '炮制工艺',
    research: '现代研究',
  };

  const hasContent = (section: KnowledgeSection) => {
    if (!selectedHerbId) return true;
    switch (section) {
      case 'list': return true;
      case 'profile': return herbProfiles.some(p => p.herbId === selectedHerbId);
      case 'authenticity': return authenticityChecks.some(c => c.herbId === selectedHerbId);
      case 'cultivation': return cultivationTechniques.some(t => t.herbId === selectedHerbId);
      case 'health': return healthKnowledge.some(k => k.herbId === selectedHerbId);
      case 'origin': return originDistributions.some(d => d.herbId === selectedHerbId);
      default: return false;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">品种知识</h1>
          <p className="text-gray-600">中药材百科全书 - 包含品种档案、真伪鉴别、种植技术、养生保健、产地分布等</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {(Object.entries(sectionNames) as [KnowledgeSection, string][]).map(([section, name]) => (
              <button
                key={section}
                disabled={section !== 'list' && section !== 'pharmacopoeia' && section !== 'compatibility' && section !== 'processing' && section !== 'research'}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeSection === section
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : hasContent(section) || ['pharmacopoeia', 'compatibility', 'processing', 'research'].includes(section)
                      ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                }`}
                onClick={() => setActiveSection(section)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Filters - only show in list view */}
        {activeSection === 'list' && (
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
        )}

        {/* Main Content */}
        {renderSectionContent()}

        {/* Empty State - only for list view */}
        {activeSection === 'list' && filteredHerbs.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            暂无符合条件的药材
          </div>
        )}
      </div>
    </div>
  );
};

export default Herbs;
