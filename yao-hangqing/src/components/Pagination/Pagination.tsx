interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 pt-6">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1.5 text-sm text-text-secondary disabled:text-text-tertiary disabled:cursor-not-allowed hover:text-text transition-colors"
      >
        上一页
      </button>
      {pages.map((p, i) =>
        typeof p === 'string' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-tertiary">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              current === p
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:bg-accent-muted'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
        className="px-3 py-1.5 text-sm text-text-secondary disabled:text-text-tertiary disabled:cursor-not-allowed hover:text-text transition-colors"
      >
        下一页
      </button>
      <span className="ml-4 text-xs text-text-tertiary">
        共 {total} 条
      </span>
    </div>
  );
}
