export function formatPrice(price: number): string {
  if (price === 0) return '暂无';
  return `¥${price.toFixed(2)}`;
}

export function formatChange(change: number): string {
  if (change === 0) return '→持平';
  const sign = change > 0 ? '↑' : '↓';
  return `${sign}${Math.abs(change).toFixed(2)}%`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getTrendClass(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up': return 'price-up';
    case 'down': return 'price-down';
    case 'stable': return 'price-stable';
  }
}

export function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up': return '↑';
    case 'down': return '↓';
    case 'stable': return '→';
  }
}

export function matchPinyin(query: string, pinyin: string, pinyinInitial: string, name: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  return (
    name.includes(q) ||
    pinyin.toLowerCase().includes(q) ||
    pinyinInitial.toLowerCase().includes(q)
  );
}

export function generatePriceHistory(basePrice: number, days: number = 365): { date: string; price: number }[] {
  const history: { date: string; price: number }[] = [];
  const now = new Date();
  let price = basePrice * (0.7 + Math.random() * 0.3);
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * basePrice * 0.03;
    price = Math.max(price + change, basePrice * 0.3);
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    });
  }
  return history;
}
