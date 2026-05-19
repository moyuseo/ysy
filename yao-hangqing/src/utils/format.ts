export function formatPrice(price: number): string {
  if (price === 0) return '暂无';
  return `¥${price.toFixed(2)}`;
}

export function formatChange(change: number): string {
  if (change > 0) return `+${(change * 100).toFixed(2)}%`;
  if (change < 0) return `${(change * 100).toFixed(2)}%`;
  return '持平';
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
}

export function getTrendClass(trend: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return 'price-rise';
  if (trend === 'down') return 'price-fall';
  return 'price-stable';
}

export function maskPhone(phone: string): string {
  if (phone.length >= 7) {
    return phone.slice(0, 3) + '****' + phone.slice(-4);
  }
  return phone;
}
