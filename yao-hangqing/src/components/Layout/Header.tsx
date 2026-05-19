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
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b-2 border-paper-dark">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-cinnabar rounded flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white text-lg font-serif font-bold">药</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-ochre rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-ink tracking-wider">
                药行情
              </span>
              <span className="text-[10px] text-ink-muted tracking-widest uppercase">
                Herbal Market
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2 text-sm font-semibold tracking-wider transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-indigo'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-indigo transition-all duration-300 ${
                    isActive(item.path) ? 'w-8' : 'w-0 group-hover:w-8'
                  }`}
                />
                {isActive(item.path) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="relative hidden lg:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
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
                  className="w-56 px-4 py-2.5 pr-10 text-sm bg-paper-warm border border-paper-dark rounded focus:outline-none focus:border-indigo focus:ring-2 focus:ring-indigo-muted transition-all placeholder:text-ink-muted"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-indigo transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-paper border-2 border-paper-dark rounded shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.map((herb) => (
                  <Link
                    key={herb.id}
                    to={`/herb/${herb.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-indigo-muted text-ink text-sm transition-colors border-b border-paper-dark last:border-b-0"
                  >
                    <span className="font-medium">{herb.name}</span>
                    <span className="text-ink-muted text-xs">
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
            className="lg:hidden p-2 -mr-2 text-ink hover:text-indigo transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper border-t border-paper-dark animate-fade-in">
          <nav className="flex flex-col px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-base font-medium border-b border-paper-dark last:border-b-0 transition-colors ${
                  isActive(item.path)
                    ? 'text-indigo'
                    : 'text-ink-light hover:text-ink'
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
              className="flex-1 px-4 py-2.5 text-sm bg-paper-warm border border-paper-dark rounded focus:outline-none placeholder:text-ink-muted"
            />
            <button
              type="submit"
              className="ml-3 p-2.5 text-ink-muted hover:text-indigo transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
