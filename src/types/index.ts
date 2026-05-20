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

export interface HistoricalPrice {
  date: string;
  price: number;
}

export interface VarietyIndex {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  history: HistoricalPrice[];
}

export interface HerbPriceDetail {
  herbId: string;
  herbName: string;
  currentPrice: number;
  unit: string;
  history: HistoricalPrice[];
}

export interface Shop {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  contact: string;
  products: string[];
  verified: boolean;
  rating: number;
  salesCount: number;
  tags: string[];
}

export interface SupplyItem {
  id: string;
  herbName: string;
  spec: string;
  origin: string;
  price: number;
  unit: string;
  quantity: number;
  shopId: string;
  shopName: string;
  imageUrl?: string;
  updateTime: string;
}

export interface PurchaseItem {
  id: string;
  herbName: string;
  spec: string;
  quantity: number;
  unit: string;
  price?: number;
  buyerName: string;
  location: string;
  contact: string;
  publishTime: string;
  urgent: boolean;
}
