import React, { useState } from 'react';
import { supplyItems, purchaseItems, shops } from '../data/mockData';
import ShopCard from '../components/ShopCard';
import SupplyCard from '../components/SupplyCard';
import PurchaseCard from '../components/PurchaseCard';

const Trade: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supply' | 'purchase' | 'shops' | 'orders' | 'trust'>('supply');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const orders = [
    {
      id: 'ord-1',
      orderNo: 'DD20260522001',
      type: 'supply',
      herbName: '人参',
      quantity: 100,
      unit: 'kg',
      price: 380,
      status: 'pending',
      createTime: '2026-05-22 10:30',
    },
    {
      id: 'ord-2',
      orderNo: 'DD20260521002',
      type: 'purchase',
      herbName: '当归',
      quantity: 200,
      unit: 'kg',
      price: 45,
      status: 'completed',
      createTime: '2026-05-21 14:20',
    },
    {
      id: 'ord-3',
      orderNo: 'DD20260520003',
      type: 'supply',
      herbName: '黄芪',
      quantity: 150,
      unit: 'kg',
      price: 28,
      status: 'processing',
      createTime: '2026-05-20 09:15',
    },
  ];

  const trustBadges = [
    { icon: '🏅', title: '实名认证', desc: '商家身份真实可靠', color: 'from-blue-500 to-blue-600' },
    { icon: '✅', title: '资质审核', desc: '营业执照经营许可', color: 'from-green-500 to-green-600' },
    { icon: '📋', title: '质检报告', desc: '第三方质量检测', color: 'from-emerald-500 to-emerald-600' },
    { icon: '💰', title: '交易担保', desc: '资金安全有保障', color: 'from-teal-500 to-teal-600' },
    { icon: '🔒', title: '隐私保护', desc: '信息安全不泄露', color: 'from-cyan-500 to-cyan-600' },
    { icon: '📝', title: '合同签署', desc: '在线签署交易合同', color: 'from-indigo-500 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">供求交易</h1>
          <p className="text-gray-600">专业的中药材供需对接平台 - 安全交易·诚信保障</p>
        </div>

        {/* Trust Badges Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛡️</span>
              <div>
                <h3 className="text-xl font-bold text-white">诚信保障体系</h3>
                <p className="text-green-100">6大保障·安全交易·值得信赖</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('trust')}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              了解更多 →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowInquiryModal(true)}
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-2">💬</div>
            <div className="font-bold">在线询价</div>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-2">📋</div>
            <div className="font-bold">我的订单</div>
          </button>
          <button className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl hover:shadow-lg transition-all">
            <div className="text-4xl mb-2">🤝</div>
            <div className="font-bold">签约商家</div>
          </button>
          <button className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl hover:shadow-lg transition-all">
            <div className="text-4xl mb-2">📞</div>
            <div className="font-bold">联系客服</div>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'supply'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('supply')}
            >
              📦 供货信息
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'purchase'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('purchase')}
            >
              🛒 求购信息
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'shops'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('shops')}
            >
              🏪 药通店铺
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'orders'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              📝 我的订单
            </button>
            <button
              className={`px-8 py-4 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'trust'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('trust')}
            >
              🛡️ 诚信保障
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'supply' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  产地直供
                </span>
                <span className="text-sm text-gray-500">共 {supplyItems.length} 条供应信息</span>
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                + 发布供应
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supplyItems.map((item) => (
                <SupplyCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'purchase' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">共 {purchaseItems.length} 条求购信息</div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                + 发布求购
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchaseItems.map((item) => (
                <PurchaseCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'shops' && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">推荐店铺</h2>
                <button className="text-green-600 hover:text-green-800 text-sm font-semibold">
                  查看更多 →
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">📋 订单管理中心</h2>
              <p className="text-blue-100">便捷管理您的交易订单</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-emerald-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">订单号</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">类型</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">药材名称</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">数量</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">价格</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">状态</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">创建时间</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">{order.orderNo}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          order.type === 'supply' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {order.type === 'supply' ? '供应' : '求购'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.herbName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.quantity}{order.unit}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-700">¥{order.price}/{order.unit}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {order.status === 'pending' ? '待处理' : order.status === 'processing' ? '处理中' : '已完成'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.createTime}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-green-600 hover:text-green-800 font-semibold">
                          查看详情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'trust' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">🛡️ 诚信保障体系</h2>
              <p className="text-emerald-100">全方位保障您的交易安全</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center text-3xl text-white`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{badge.title}</h3>
                  <p className="text-sm text-gray-600">{badge.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">交易保障流程</h3>
              <div className="flex items-center justify-between">
                {[
                  { step: '1', title: '商家认证', desc: '实名+资质审核' },
                  { step: '2', title: '需求发布', desc: '发布供应/求购' },
                  { step: '3', title: '在线洽谈', desc: '询价·议价' },
                  { step: '4', title: '签订合同', desc: '电子合同签署' },
                  { step: '5', title: '交易担保', desc: '资金托管' },
                  { step: '6', title: '完成交易', desc: '评价·售后' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                        {item.step}
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                    {idx < 5 && <div className="w-8 text-gray-400 mx-2">→</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3">💰 资金保障</h4>
                <p className="text-sm text-gray-700 mb-4">
                  交易资金由平台托管，买家确认收货后，资金才会转给卖家，确保双方利益
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ 资金托管</li>
                  <li>✓ 安全支付</li>
                  <li>✓ 退款保障</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h4 className="font-bold text-gray-900 mb-3">🔍 质量保障</h4>
                <p className="text-sm text-gray-700 mb-4">
                  所有商品均需提供质检报告，支持第三方检测，确保药材质量符合标准
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ 质检报告</li>
                  <li>✓ 第三方检测</li>
                  <li>✓ 假一赔十</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3">📝 合同保障</h4>
                <p className="text-sm text-gray-700 mb-4">
                  在线签署电子合同，具有法律效力，明确双方权利义务，避免纠纷
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ 电子合同</li>
                  <li>✓ 法律效力</li>
                  <li>✓ 纠纷仲裁</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💬 在线询价</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">药材名称</label>
                <input
                  type="text"
                  placeholder="请输入药材名称"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">数量</label>
                <input
                  type="text"
                  placeholder="请输入需求量"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">留言</label>
                <textarea
                  rows={4}
                  placeholder="请输入您的需求..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  提交询价
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;
