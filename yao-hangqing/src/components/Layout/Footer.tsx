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
    <footer className="bg-forest-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-serif font-bold">药</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-wide">
                药行情
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              专注中药材价格信息服务，汇聚行业数据，助力药材交易决策。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">快速导航</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">服务支持</h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-mint shrink-0" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-mint shrink-0" />
                <span>service@yaohangqing.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                <span>安徽省亳州市中药材交易中心</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              Copyright © 2026 药行情 版权所有
            </p>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <Link to="/privacy" className="hover:text-white transition-colors">
                隐私政策
              </Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">
                免责声明
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
