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
    <header className="sticky top-0 z-50 h-14 bg-surface-raised/95 backdrop-blur border-b border-border-subtle">
      <div className="max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <span className="font-display text-base font-medium text-text-secondary">
            药行情
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                isActive(item.path)
                  ? 'text-text'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative hidden md:block">
          <form onSubmit={handleSearch} className="flex items-center">
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
              className="w-48 px-3 py-1.5 text-sm text-text border border-border-subtle rounded-l focus:outline-none focus:border-border placeholder:text-text-tertiary"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 border border-l-0 border-border-subtle rounded-r hover:bg-surface transition-colors"
            >
              <Search className="w-4 h-4 text-text-secondary" />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface-raised border border-border-subtle rounded shadow-lg z-50 max-h-80 overflow-y-auto">
              {suggestions.map((herb) => (
                <Link
                  key={herb.id}
                  to={`/herb/${herb.id}`}
                  className="flex items-center justify-between px-3 py-2 hover:bg-surface text-text text-sm transition-colors"
                >
                  <span className="font-medium">{herb.name}</span>
                  <span className="text-text-tertiary text-xs">
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
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-text-secondary" />
          ) : (
            <Menu className="w-5 h-5 text-text-secondary" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-raised border-b border-border-subtle">
          <nav className="flex flex-col px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 text-sm border-b border-border-subtle last:border-b-0 ${
                  isActive(item.path)
                    ? 'text-text'
                    : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form onSubmit={handleSearch} className="flex items-center px-4 pb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索品种..."
              className="flex-1 px-3 py-1.5 text-sm text-text border border-border-subtle rounded-l focus:outline-none placeholder:text-text-tertiary"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 border border-l-0 border-border-subtle rounded-r"
            >
              <Search className="w-4 h-4 text-text-secondary" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
