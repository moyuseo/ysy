export type HerbCategory =
  | 'root'
  | 'fruit'
  | 'herb'
  | 'flower'
  | 'leaf'
  | 'bark'
  | 'vine'
  | 'animal'
  | 'mineral'
  | 'fungus'
  | 'spice'
  | 'other';

export interface Herb {
  id: string;
  name: string;
  alias: string[];
  category: HerbCategory;
  origin: string[];
  spec: string[];
  family: string;
  nature: string;
  meridian: string;
  effect: string;
  description: string;
  pinyin: string;
  pinyinInitial: string;
  harvestTime: string;
  imageUrl: string;
  tags: string[];
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface Price {
  id: string;
  herbId: string;
  herbName: string;
  spec: string;
  market: string;
  origin: string;
  currentPrice: number;
  previousPrice: number;
  dailyChange: number;
  monthlyChange: number;
  trend: 'up' | 'down' | 'stable';
  updatedAt: string;
  history: PriceHistoryPoint[];
}

export interface Trade {
  id: string;
  type: 'supply' | 'demand' | 'bidding' | 'direct';
  herbName: string;
  herbId?: string;
  spec: string;
  origin: string;
  quantity: string;
  price: string;
  contact: string;
  deliveryAddress?: string;
  quoteCount?: number;
  remainingDays?: number;
  createdAt: string;
  company?: string;
  imageUrl?: string;
  isPromoted: boolean;
  description?: string;
}

export interface News {
  id: string;
  title: string;
  category: 'analysis' | 'dynamic' | 'origin' | 'policy' | 'review';
  summary: string;
  content: string;
  herbNames: string[];
  herbIds: string[];
  imageUrl?: string;
  createdAt: string;
  views: number;
  isPinned: boolean;
  tags: string[];
}

export interface WikiArticle {
  id: string;
  title: string;
  category: 'knowledge' | 'planting' | 'regulation';
  herbName?: string;
  summary: string;
  content: string;
  createdAt: string;
  views: number;
}

export interface Category {
  key: HerbCategory;
  label: string;
  count: number;
}

export interface Market {
  key: string;
  label: string;
  province: string;
}
