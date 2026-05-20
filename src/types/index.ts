export interface Herb {
  id: string;
  name: string;
  pinyin?: string;
  latinName?: string;
  category: string;
  nature?: string;
  taste?: string;
  meridian?: string[];
  efficacy?: string[];
  origin?: string[];
  description?: string;
  imageUrl?: string;
}

export interface PriceItem {
  id: string;
  herbId: string;
  herbName: string;
  spec: string;
  origin: string;
  market: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  updateTime: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishTime: string;
  imageUrl?: string;
  views?: number;
}

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  products: string[];
  location: string;
  contact: string;
  verified: boolean;
}

export interface Demand {
  id: string;
  herbName: string;
  spec: string;
  quantity: number;
  unit: string;
  location: string;
  contact: string;
  publishTime: string;
}

export interface MarketIndex {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  updateTime: string;
}
