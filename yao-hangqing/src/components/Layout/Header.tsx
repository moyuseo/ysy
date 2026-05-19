import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { herbs } from '../../data/herbs';

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/price', label: '行情' },
  { path: '/trade', label: '供求' },
  { path: '/rank', label: '排行' },
  { path: '/news', label: '资讯' },
  { path: '/wiki', label: '百科' },
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
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-forest rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-serif font-bold">药</span>
            </div>
            <span className="font-serif text-xl font-bold text-forest tracking-wide">
              药行情
            </span>
          </Link>

          <nav className="hidden lg:flex items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-forest'
                    : 'text-slate-light hover:text-forest'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="搜索品种..."
                  className="w-48 px-4 py-2 pr-10 text-sm bg-cream border border-cream-dark rounded-lg focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest-muted transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted hover:text-forest transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-cream-dark rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {suggestions.map((herb) => (
                    <Link
                      key={herb.id}
                      to={`/herb/${herb.id}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-forest-muted text-slate text-sm transition-colors border-b border-cream-dark last:border-b-0"
                    >
                      <span className="font-medium">{herb.name}</span>
                      <span className="text-slate-muted text-xs">{herb.family}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 text-slate-light hover:text-forest transition-colors"
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
        <div className="lg:hidden bg-white border-t border-cream-dark animate-fade-in">
          <nav className="flex flex-col px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-base font-medium border-b border-cream-dark last:border-b-0 transition-colors ${
                  isActive(item.path)
                    ? 'text-forest'
                    : 'text-slate-light hover:text-forest'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form onSubmit={handleSearch} className="flex items-center px-6 pb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索品种..."
              className="flex-1 px-4 py-2.5 text-sm bg-cream border border-cream-dark rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="ml-3 p-2.5 text-slate-muted hover:text-forest transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
