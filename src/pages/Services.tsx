import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'user' | 'merchant' | 'training' | 'support'>('user');

  const userStats = {
    favorites: 12,
    orders: 28,
    transactions: 156000,
    credits: 2580,
  };

  const trainingCourses = [
    {
      id: 'course-1',
      title: '中药材GAP种植技术培训',
      category: '种植技术',
      level: '初级',
      duration: '16课时',
      students: 1256,
      rating: 4.8,
      image: '🌱',
    },
    {
      id: 'course-2',
      title: '中药材质量鉴别与检测',
      category: '质量检测',
      level: '中级',
      duration: '24课时',
      students: 892,
      rating: 4.9,
      image: '🔬',
    },
    {
      id: 'course-3',
      title: '中药材炮制工艺实操',
      category: '炮制工艺',
      level: '高级',
      duration: '32课时',
      students: 456,
      rating: 4.7,
      image: '⚒️',
    },
    {
      id: 'course-4',
      title: '中药材电商运营指南',
      category: '电商运营',
      level: '中级',
      duration: '20课时',
      students: 1534,
      rating: 4.6,
      image: '💻',
    },
  ];

  const faqs = [
    {
      category: '交易问题',
      questions: [
        { q: '如何发布供应信息？', a: '登录后进入"供求交易"页面，点击"发布供应"按钮，填写药材信息即可发布。' },
        { q: '交易资金如何保障？', a: '平台采用资金托管模式，买家付款后资金由平台保管，确认收货后资金才会转给卖家。' },
        { q: '如何申请退款？', a: '如需退款，请在订单详情页点击"申请退款"，填写退款原因，客服会在24小时内处理。' },
      ],
    },
    {
      category: '品质问题',
      questions: [
        { q: '如何验证质检报告真伪？', a: '进入"溯源与质量"-"质检报告"页面，输入报告编号即可查询验证。' },
        { q: '发现质量问题怎么办？', a: '请保留证据并联系客服，平台提供"假一赔十"保障，核实后可获得相应赔偿。' },
        { q: '如何申请GAP认证？', a: 'GAP认证需联系第三方认证机构，平台提供认证咨询和对接服务。' },
      ],
    },
    {
      category: '账号问题',
      questions: [
        { q: '如何修改登录密码？', a: '登录后进入"用户中心"-"账号设置"，可修改登录密码和绑定手机。' },
        { q: '企业认证需要什么材料？', a: '企业认证需提供营业执照、法人身份证、经营许可证等资质文件。' },
      ],
    },
  ];

  const merchantBenefits = [
    { icon: '📈', title: '更多曝光', desc: '优质供应商推荐，提升品牌知名度' },
    { icon: '💰', title: '降低成本', desc: '减少中间环节，提高利润空间' },
    { icon: '🔒', title: '交易保障', desc: '资金托管、诚信保障，安全交易' },
    { icon: '📊', title: '数据分析', desc: '实时掌握市场动态，优化经营' },
    { icon: '🎯', title: '精准营销', desc: '大数据推荐，精准对接采购商' },
    { icon: '🏆', title: '品牌认证', desc: '权威认证体系，提升竞争力' },
  ];

  const renderUserCenter = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">👤 用户中心</h2>
        <p className="text-green-100">管理您的账号、订单和收藏</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            用
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">用户001</h3>
            <p className="text-gray-600">个人认证用户</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                ✓ 已实名认证
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                ⭐ 信用良好
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              编辑资料
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{userStats.favorites}</div>
            <div className="text-gray-600">我的收藏</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.orders}</div>
            <div className="text-gray-600">我的订单</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">¥{userStats.transactions.toLocaleString()}</div>
            <div className="text-gray-600">交易金额</div>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">{userStats.credits}</div>
            <div className="text-gray-600">信用积分</div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '📦', title: '我的订单', link: '/trade', desc: '查看订单' },
          { icon: '❤️', title: '我的收藏', link: '/', desc: '收藏药材' },
          { icon: '💼', title: '我的供应', link: '/trade', desc: '管理供应' },
          { icon: '📝', title: '我的求购', link: '/trade', desc: '管理求购' },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderMerchantSettlement = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">🏪 商家入驻</h2>
        <p className="text-emerald-100">开启中药材电商新篇章</p>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">商家入驻优势</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {merchantBenefits.map((benefit, idx) => (
            <div key={idx} className="text-center p-4">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-xs text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Steps */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">入驻流程</h3>
        <div className="flex items-center justify-between">
          {[
            { step: '1', title: '注册账号', desc: '填写基本信息' },
            { step: '2', title: '提交资质', desc: '上传证照材料' },
            { step: '3', title: '资质审核', desc: '平台审核认证' },
            { step: '4', title: '缴纳保证金', desc: '签订合同入驻' },
            { step: '5', title: '开店营业', desc: '发布商品经营' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
              {idx < 4 && <div className="w-8 text-gray-400 mx-2">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Form */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">立即入驻</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">企业名称</label>
              <input
                type="text"
                placeholder="请输入企业名称"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">联系人</label>
              <input
                type="text"
                placeholder="请输入联系人姓名"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">联系电话</label>
              <input
                type="tel"
                placeholder="请输入联系电话"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">主营品种</label>
              <input
                type="text"
                placeholder="请输入主营药材品种"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">企业简介</label>
            <textarea
              rows={4}
              placeholder="请输入企业简介..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">我已阅读并同意《商家入驻协议》和《交易规则》</span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
          >
            提交入驻申请
          </button>
        </form>
      </div>
    </div>
  );

  const renderTrainingAcademy = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">🎓 培训学院</h2>
        <p className="text-teal-100">专业培训课程，提升行业技能</p>
      </div>

      {/* Featured Course */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-8 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block bg-white text-teal-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              ⭐ 精品课程
            </span>
            <h3 className="text-2xl font-bold mb-2">中药材行业入门指南</h3>
            <p className="text-teal-100 mb-4">从0开始，全面了解中药材行业</p>
            <button className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
              立即学习
            </button>
          </div>
          <div className="text-8xl">📚</div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{course.image}</div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                course.level === '初级' ? 'bg-green-100 text-green-700' :
                course.level === '中级' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {course.level}
              </span>
            </div>
            <div className="p-6">
              <span className="text-xs text-teal-600 font-semibold">{course.category}</span>
              <h3 className="font-bold text-gray-900 mb-2 mt-1 line-clamp-2">{course.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{course.duration}</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  {course.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{course.students}人学习</span>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors">
                  开始学习
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomerSupport = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">📞 客服中心</h2>
        <p className="text-cyan-100">7×24小时在线，为您服务</p>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
            💬
          </div>
          <h3 className="font-bold text-gray-900 mb-2">在线客服</h3>
          <p className="text-sm text-gray-600 mb-4">点击下方按钮开始对话</p>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            立即咨询
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
            📱
          </div>
          <h3 className="font-bold text-gray-900 mb-2">电话咨询</h3>
          <p className="text-sm text-gray-600 mb-2">400-123-4567</p>
          <p className="text-xs text-gray-500">工作日 9:00-18:00</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
            ✉️
          </div>
          <h3 className="font-bold text-gray-900 mb-2">邮件反馈</h3>
          <p className="text-sm text-gray-600 mb-2">contact@example.com</p>
          <p className="text-xs text-gray-500">24小时内回复</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题</h3>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.category}>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm">
                  ❓
                </span>
                {faq.category}
              </h4>
              <div className="space-y-4 pl-10">
                {faq.questions.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-teal-300 pl-4">
                    <h5 className="font-semibold text-gray-900 mb-2">{item.q}</h5>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border-2 border-teal-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">意见反馈</h3>
        <form className="space-y-4 max-w-2xl mx-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">反馈类型</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="">请选择反馈类型</option>
              <option value="suggestion">功能建议</option>
              <option value="bug">系统问题</option>
              <option value="complaint">投诉建议</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">反馈内容</label>
            <textarea
              rows={5}
              placeholder="请详细描述您的问题或建议..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">联系方式</label>
            <input
              type="text"
              placeholder="请输入手机号或邮箱"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg font-bold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg"
          >
            提交反馈
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">用户服务</h1>
          <p className="text-gray-600">用户中心 · 商家入驻 · 培训学院 · 客服中心</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b overflow-x-auto">
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeSection === 'user'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveSection('user')}
            >
              👤 用户中心
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeSection === 'merchant'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveSection('merchant')}
            >
              🏪 商家入驻
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeSection === 'training'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveSection('training')}
            >
              🎓 培训学院
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeSection === 'support'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveSection('support')}
            >
              📞 客服中心
            </button>
          </div>
        </div>

        {activeSection === 'user' && renderUserCenter()}
        {activeSection === 'merchant' && renderMerchantSettlement()}
        {activeSection === 'training' && renderTrainingAcademy()}
        {activeSection === 'support' && renderCustomerSupport()}
      </div>
    </div>
  );
};

export default Services;
