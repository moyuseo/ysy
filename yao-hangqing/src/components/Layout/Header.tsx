import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { herbs } from '../../data/herbs';

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/price', label: '行情中心' },
  { path: '/trade', label: '供求信息' },
  { path: '/rank', label: '价格排行' },
  { path: '/news', label: '资讯动态' },
  { path: '/wiki', label: '药材百科' },
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
      .slice(0, 6);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-16">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-serif font-bold">药</span>
              </div>
              <span className="font-serif text-xl font-bold text-slate-800">药行情</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    isActive(item.path)
                      ? 'bg-green-50 text-green-800'
                      : 'text-slate-500 hover:text-green-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="搜索药材..."
                    className="inp w-56 pl-10 pr-4 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {suggestions.map((herb) => (
                    <Link
                      key={herb.id}
                      to={`/herb/${herb.id}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-green-50 text-slate-800 text-sm transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <span className="font-medium">{herb.name}</span>
                      <span className="badge-tag">{herb.family}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 text-slate-500 hover:text-green-700 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="container py-4">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-green-50 text-green-800'
                      : 'text-slate-500 hover:text-green-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索药材..."
                  className="inp w-full pl-10 pr-4 py-3"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
