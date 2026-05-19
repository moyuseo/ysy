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

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export type TradeType = 'supply' | 'demand' | 'bidding' | 'direct';

export interface Trade {
  id: string;
  type: TradeType;
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

export type NewsCategory = 'analysis' | 'dynamic' | 'origin' | 'policy' | 'review';

export interface News {
  id: string;
  title: string;
  category: NewsCategory;
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

export type WikiCategory = 'knowledge' | 'planting' | 'regulation';

export interface WikiArticle {
  id: string;
  title: string;
  category: WikiCategory;
  herbName?: string;
  summary: string;
  content: string;
  createdAt: string;
  views: number;
}

export interface Category {
  key: HerbCategory;
  label: string;
}

export interface Market {
  key: string;
  label: string;
  province: string;
}
