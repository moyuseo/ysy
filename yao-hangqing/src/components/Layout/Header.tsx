import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Leaf, TrendingUp, TrendingDown, Zap, Newspaper, FileText, User } from 'lucide-react';
import { herbs } from '../../data/herbs';

const NAV_ITEMS = [
  { path: '/', label: '首页', icon: <Leaf className="w-4 h-4" /> },
  { path: '/price', label: '行情价格', icon: <TrendingUp className="w-4 h-4" /> },
  { path: '/trade', label: '供求信息', icon: <Zap className="w-4 h-4" /> },
  { path: '/rank', label: '涨跌排行', icon: <TrendingDown className="w-4 h-4" /> },
  { path: '/news', label: '资讯中心', icon: <Newspaper className="w-4 h-4" /> },
  { path: '/wiki', label: '知识百科', icon: <FileText className="w-4 h-4" /> },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-200 group-hover:shadow-xl transition-all duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gold-50 rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-gold rounded-full" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-serif text-xl font-bold text-primary-900 leading-tight">药行情</div>
              <div className="text-xs text-text-muted -mt-0.5">中药材行情信息平台</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search & Right Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="搜索中药材名称、拼音..."
                  className="w-64 lg:w-80 pl-10 pr-4 py-2.5 bg-primary-50/50 border border-primary-100 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all duration-200"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-primary-100 z-50 overflow-hidden">
                  <div className="p-2">
                    {suggestions.map((herb) => (
                      <Link
                        key={herb.id}
                        to={`/herb/${herb.id}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary-50 transition-colors duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-serif text-sm font-bold">
                            {herb.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text group-hover:text-primary transition-colors">{herb.name}</div>
                            <div className="text-xs text-text-muted">{herb.alias[0]}</div>
                          </div>
                        </div>
                        <div className="text-xs text-text-muted px-2 py-1 bg-primary-50 rounded-lg">
                          {herb.category === 'root' ? '根茎类' : herb.category === 'fruit' ? '果实类' : '其他'}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-md shadow-primary-200 hover:shadow-lg">
              <User className="w-4 h-4" />
              登录
            </button>

            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-primary-700" /> : <Menu className="w-6 h-6 text-text" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-primary-100">
            <div className="py-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索中药材..."
                    className="w-full pl-10 pr-4 py-3 bg-primary-50/50 border border-primary-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                </div>
              </form>
              
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-text hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-4 pt-4 border-t border-primary-100">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors">
                  <User className="w-4 h-4" />
                  登录
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
