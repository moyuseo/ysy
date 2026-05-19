import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Globe, MessageCircle, User } from 'lucide-react';

const NAV_LINKS = [
  { label: '行情价格', to: '/price' },
  { label: '供求信息', to: '/trade' },
  { label: '涨跌排行', to: '/rank' },
  { label: '资讯中心', to: '/news' },
  { label: '知识百科', to: '/wiki' },
];

const RESOURCES = [
  { label: '关于我们', to: '/about' },
  { label: '使用帮助', to: '/help' },
  { label: 'API 文档', to: '/api' },
  { label: '合作伙伴', to: '/partners' },
];

const LEGAL = [
  { label: '隐私政策', to: '/privacy' },
  { label: '服务条款', to: '/terms' },
  { label: '免责声明', to: '/disclaimer' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-950 text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-200" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold">药行情</div>
                <div className="text-xs text-primary-300">中药材行情信息平台</div>
              </div>
            </Link>
            <p className="text-sm text-primary-200 leading-relaxed mb-6">
              药行情致力于为您提供最新、最准确的中药材市场价格、供求信息及行业动态，助力您的业务决策。
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors">
                <Globe className="w-4.5 h-4.5 text-primary-200" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors">
                <MessageCircle className="w-4.5 h-4.5 text-primary-200" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors">
                <User className="w-4.5 h-4.5 text-primary-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-white">快速访问</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-200 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-white">资源中心</h3>
            <ul className="space-y-2.5">
              {RESOURCES.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-200 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-white">联系我们</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-primary-300 shrink-0 mt-0.5" />
                <span className="text-sm text-primary-200">安徽省亳州市中药材交易中心</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-primary-300 shrink-0" />
                <a href="mailto:contact@yaohangqing.com" className="text-sm text-primary-200 hover:text-white transition-colors">
                  contact@yaohangqing.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-primary-300 shrink-0" />
                <a href="tel:400-888-8888" className="text-sm text-primary-200 hover:text-white transition-colors">
                  400-888-8888
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-primary-300">
              © {currentYear} 药行情. All rights reserved.
            </div>
            <div className="flex items-center gap-5">
              {LEGAL.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-primary-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
