import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16">
      <div className="max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Leaf className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-primary font-serif">药行情</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path) ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block shrink-0">
          <SearchBar />
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <nav className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 text-sm font-medium transition-colors hover:bg-divider ${
                  isActive(item.path) ? 'text-primary bg-primary-lightest/20' : 'text-text-secondary'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-4">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
}
