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

export interface HerbProfile {
  id: string;
  herbId: string;
  name: string;
  alias?: string[];
  source?: string;
  properties?: string;
  functions?: string[];
  indications?: string[];
  dosage?: string;
  precautions?: string;
  storage?: string;
}

export interface AuthenticityCheck {
  id: string;
  herbId: string;
  herbName: string;
  genuineFeatures: string[];
  fakeFeatures: string[];
  identificationMethods: string[];
  images?: { genuine: string; fake: string };
}

export interface CultivationTechnique {
  id: string;
  herbId: string;
  herbName: string;
  growingConditions: {
    climate: string;
    soil: string;
    temperature: string;
    rainfall: string;
  };
  propagationMethod: string;
  cultivationSteps: string[];
  fieldManagement: string[];
  pestControl: string[];
  harvestProcessing: string;
}

export interface HealthKnowledge {
  id: string;
  herbId: string;
  herbName: string;
  healthBenefits: string[];
  suitableFor: string[];
  usageMethods: { name: string; method: string }[];
  recommendedRecipes: { name: string; ingredients: string[]; instructions: string }[];
  contraindications?: string[];
}

export interface OriginDistribution {
  id: string;
  herbId: string;
  herbName: string;
  mainProvinces: string[];
  characteristics?: string;
  qualityLevels?: { area: string; level: string; description: string }[];
  mapImage?: string;
}

export interface TraceabilityRecord {
  id: string;
  title: string;
  date: string;
  location: string;
  operator: string;
  details: string;
  images?: string[];
}

export interface TraceabilityProduct {
  id: string;
  herbName: string;
  batchNo: string;
  traceCode: string;
  origin: string;
  productionDate: string;
  expiryDate: string;
  specifications: string;
  qualityLevel: string;
  supplierName: string;
  supplierContact: string;
  traceRecords: TraceabilityRecord[];
  imageUrl?: string;
}

export interface GAPCertifiedProduct {
  id: string;
  herbName: string;
  certificateNo: string;
  certifiedBy: string;
  certificationDate: string;
  validUntil: string;
  baseLocation: string;
  areaSize: string;
  mainProducts: string[];
  qualityStandards: string[];
  manufacturerName: string;
  manufacturerAddress: string;
  contact: string;
  imageUrl?: string;
  certificateImage?: string;
}

export interface FreshCutProduct {
  id: string;
  herbName: string;
  specification: string;
  processingMethod: string;
  origin: string;
  harvestDate: string;
  processingDate: string;
  storageMethod: string;
  shelfLife: string;
  qualityFeatures: string[];
  manufacturer: string;
  contact: string;
  price: number;
  unit: string;
  stock: number;
  imageUrl?: string;
}

export interface HighQualityProduct {
  id: string;
  herbName: string;
  standardType: string;
  herbId: string;
  origin: string;
  features: string[];
  qualityLevel: string;
  testingReport: string;
  manufacturer: string;
  contact: string;
  price: number;
  unit: string;
  stock: number;
  imageUrl?: string;
}

export interface ProcurementNews {
  id: string;
  title: string;
  summary: string;
  procurementType: string;
  region: string;
  publishTime: string;
  source: string;
  status: string;
  deadline?: string;
  amount?: string;
  imageUrl?: string;
  views?: number;
}

export interface PublicOpinion {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishTime: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  influenceLevel: 'high' | 'medium' | 'low';
  relatedHerbs: string[];
  imageUrl?: string;
  views?: number;
}

export interface PolicyRegulation {
  id: string;
  title: string;
  summary: string;
  category: string;
  issuingAuthority: string;
  publishTime: string;
  effectiveDate?: string;
  documentNo?: string;
  imageUrl?: string;
  views?: number;
}

export interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  publishTime: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  images?: string[];
}

export interface DiscussionComment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  publishTime: string;
  likes: number;
}

export interface UserShare {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  publishTime: string;
  category: string;
  images: string[];
  likes: number;
  comments: number;
  views: number;
  location?: string;
}

export interface DataStatistics {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface QueryRanking {
  id: string;
  rank: number;
  herbName: string;
  queryCount: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

export interface PriceChangeRanking {
  id: string;
  rank: number;
  herbName: string;
  currentPrice: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  origin: string;
}

export interface DailyViewpoint {
  id: string;
  title: string;
  content: string;
  authorName: string;
  publishTime: string;
  category: string;
  keywords: string[];
  views: number;
  likes: number;
  imageUrl?: string;
}

export interface DataOverview {
  totalHerbs: number;
  totalMarkets: number;
  totalSuppliers: number;
  totalTransactions: number;
  avgPriceChange: number;
  hotVarieties: string[];
}
