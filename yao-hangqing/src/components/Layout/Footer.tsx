import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { label: '首页', path: '/' },
  { label: '行情中心', path: '/price' },
  { label: '供求信息', path: '/trade' },
  { label: '价格排行', path: '/rank' },
];

const SERVICE_LINKS = [
  { label: '资讯动态', path: '/news' },
  { label: '药材百科', path: '/wiki' },
  { label: '关于我们', path: '/about' },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                <span className="text-green-950 text-lg font-serif font-bold">药</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold text-white">药行情</span>
                <span className="hidden sm:block text-xs text-slate-500 -mt-1">中药材行情中心</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              专注中药材价格信息服务，汇聚行业数据，助力药材交易决策。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">快速导航</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">服务支持</h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span>service@yaohangqing.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>安徽省亳州市中药材交易中心</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Copyright © 2026 药行情 版权所有
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <Link to="/privacy" className="hover:text-green-700 transition-colors">
                隐私政策
              </Link>
              <Link to="/disclaimer" className="hover:text-green-700 transition-colors">
                免责声明
              </Link>
              <Link to="/about" className="hover:text-green-700 transition-colors">
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
