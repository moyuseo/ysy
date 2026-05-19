import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Leaf } from 'lucide-react';
import { herbs } from '../../data/herbs';

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/price', label: '行情价格' },
  { path: '/trade', label: '供求信息' },
  { path: '/rank', label: '涨跌排行' },
  { path: '/news', label: '资讯中心' },
  { path: '/wiki', label: '知识百科' },
  { path: '/about', label: '关于我们' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return herbs
      .filter(
        (h) =>
          h.name.includes(q) ||
          h.pinyin.toLowerCase().startsWith(q) ||
          h.pinyinInitial.toLowerCase().startsWith(q) ||
          h.alias.some((a) => a.includes(q))
      )
      .slice(0, 8);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Leaf className="w-7 h-7 text-primary-lightest" />
            <span className="font-serif text-xl font-bold tracking-wide">
              药行情
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative hidden md:block">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="搜索品种/拼音首字母..."
                className="w-56 lg:w-64 px-3 py-1.5 rounded-l-md text-sm text-text bg-white/95 placeholder:text-text-secondary/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-primary-light rounded-r-md hover:bg-primary-lighter transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl border border-border z-50 max-h-80 overflow-y-auto">
                {suggestions.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="flex items-center justify-between px-3 py-2 hover:bg-fall-bg text-text text-sm transition-colors"
                  >
                    <span className="font-medium">{herb.name}</span>
                    <span className="text-text-secondary text-xs">
                      {herb.category === 'root'
                        ? '根茎类'
                        : herb.category === 'fruit'
                        ? '果实类'
                        : herb.category === 'herb'
                        ? '全草类'
                        : herb.category === 'flower'
                        ? '花类'
                        : '其他'}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-white/20">
            <nav className="flex flex-col gap-1 pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <form onSubmit={handleSearch} className="flex mt-2 px-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索品种..."
                className="flex-1 px-3 py-1.5 rounded-l-md text-sm text-text bg-white/95"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-primary-light rounded-r-md"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
