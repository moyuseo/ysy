import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

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
    <footer className="bg-paper-aged border-t-2 border-paper-dark">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-cinnabar rounded flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-serif font-bold">药</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-ink tracking-wider">
                  药行情
                </span>
                <span className="text-[10px] text-ink-muted tracking-widest uppercase">
                  Herbal Market Intelligence
                </span>
              </div>
            </div>
            <p className="text-sm text-ink-light leading-relaxed mb-6">
              专注中药材价格信息服务，汇聚行业数据，传承千年智慧，助力药材交易决策。
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-paper-warm border border-paper-dark rounded flex items-center justify-center text-ink-muted hover:text-indigo hover:border-indigo transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-paper-warm border border-paper-dark rounded flex items-center justify-center text-ink-muted hover:text-indigo hover:border-indigo transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base font-bold text-ink mb-6 tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-indigo rounded-full" />
              快速导航
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-ink-light hover:text-indigo transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-indigo group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-bold text-ink mb-6 tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-cinnabar rounded-full" />
              服务支持
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-ink-light hover:text-cinnabar transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cinnabar group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-sm text-ink-light hover:text-cinnabar transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-cinnabar group-hover:w-3 transition-all duration-300" />
                  友情链接
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-bold text-ink mb-6 tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-ochre rounded-full" />
              联系我们
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-ink-light">
                <Phone className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-ink font-medium">400-888-8888</div>
                  <div className="text-xs text-ink-muted mt-0.5">周一至周五 9:00-18:00</div>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-light">
                <Mail className="w-4 h-4 text-ochre shrink-0" />
                <span className="font-mono">service@yaohangqing.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-light">
                <MapPin className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
                <span>安徽省亳州市中药材交易中心</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-paper-dark">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ink-muted tracking-wide">
              Copyright © 2026 药行情 版权所有 | 传承千年智慧，服务药材行业
            </p>
            <div className="flex items-center gap-6 text-xs text-ink-muted">
              <Link to="/privacy" className="hover:text-indigo transition-colors">
                隐私政策
              </Link>
              <span className="w-1 h-1 bg-paper-dark rounded-full" />
              <Link to="/disclaimer" className="hover:text-indigo transition-colors">
                免责声明
              </Link>
              <span className="w-1 h-1 bg-paper-dark rounded-full" />
              <Link to="/about" className="hover:text-indigo transition-colors">
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
