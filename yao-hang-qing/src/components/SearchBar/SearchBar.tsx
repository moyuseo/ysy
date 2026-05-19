import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { herbs } from '../../data/herbs';
import { prices } from '../../data/prices';
import { matchPinyin, formatPrice } from '../../utils/format';
import { CATEGORY_LABELS } from '../../data/categories';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = '搜索药材名称、拼音...', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<typeof herbs>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const matched = herbs.filter((h) =>
        matchPinyin(query, h.pinyin, h.pinyinInitial, h.name)
      );
      setResults(matched.slice(0, 8));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = useNavigate();

  function handleSelect(herbId: string) {
    setQuery('');
    setFocused(false);
    navigate(`/herb/${herbId}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
      setFocused(false);
    }
  }

  function getHerbPrice(herbId: string) {
    const p = prices.find((pr) => pr.herbId === herbId);
    return p ? formatPrice(p.currentPrice) : '--';
  }

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center rounded-lg border border-border bg-card px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-shadow">
          <Search className="h-4 w-4 text-text-secondary shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className="ml-2 w-full bg-transparent outline-none text-sm text-text placeholder:text-text-secondary"
          />
        </div>
      </form>
      {focused && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg overflow-hidden">
          {results.map((herb) => (
            <button
              key={herb.id}
              type="button"
              onClick={() => handleSelect(herb.id)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-bg transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text">{herb.name}</span>
                <span className="rounded bg-bg px-1.5 py-0.5 text-xs text-text-secondary">
                  {CATEGORY_LABELS[herb.category]}
                </span>
              </div>
              <span className="font-data text-sm text-primary">{getHerbPrice(herb.id)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
