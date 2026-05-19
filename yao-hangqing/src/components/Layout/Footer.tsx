import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-6">
      <div className="max-w-[1280px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-tertiary">
        <span>Copyright © 2026 药行情</span>
        <div className="flex items-center gap-3">
          <Link to="/links" className="hover:text-text-secondary transition-colors">
            友情链接
          </Link>
          <span className="text-border">|</span>
          <Link to="/privacy" className="hover:text-text-secondary transition-colors">
            隐私政策
          </Link>
          <span className="text-border">|</span>
          <Link to="/disclaimer" className="hover:text-text-secondary transition-colors">
            免责声明
          </Link>
        </div>
      </div>
    </footer>
  );
}
