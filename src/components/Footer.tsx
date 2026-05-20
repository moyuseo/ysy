import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">药</span>
              </div>
              <span className="text-xl font-bold">中药材信息平台</span>
            </div>
            <p className="text-gray-400 text-sm">
              专业的中药材行业信息服务平台，提供价格行情、资讯分析、供求交易等全方位服务。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
              <li><Link to="/prices" className="hover:text-white transition-colors">价格行情</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">资讯分析</Link></li>
              <li><Link to="/trade" className="hover:text-white transition-colors">供求交易</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">服务项目</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">市场快讯</a></li>
              <li><a href="#" className="hover:text-white transition-colors">品种分析</a></li>
              <li><a href="#" className="hover:text-white transition-colors">产地信息</a></li>
              <li><a href="#" className="hover:text-white transition-colors">政策解读</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-400">
              <li>电话：400-123-4567</li>
              <li>邮箱：contact@example.com</li>
              <li>地址：安徽省亳州市</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 中药材信息平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
