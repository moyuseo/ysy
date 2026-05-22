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

export interface CompositeIndex {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  baseValue: number;
  baseDate: string;
  updateTime: string;
  trend: 'up' | 'down' | 'stable';
  history: IndexHistory[];
}

export interface IndexHistory {
  date: string;
  value: number;
  changePercent?: number;
}

export interface CategoryIndex {
  id: string;
  name: string;
  code: string;
  value: number;
  change: number;
  changePercent: number;
  updateTime: string;
  trend: 'up' | 'down' | 'stable';
  herbCount: number;
  description?: string;
}

export interface MarketIndexItem {
  id: string;
  name: string;
  code: string;
  value: number;
  change: number;
  changePercent: number;
  updateTime: string;
  trend: 'up' | 'down' | 'stable';
  region: string;
  province: string;
  description?: string;
}

export interface VarietyIndexItem {
  id: string;
  herbId: string;
  herbName: string;
  category: string;
  efficacy: string;
  value: number;
  change: number;
  changePercent: number;
  updateTime: string;
  trend: 'up' | 'down' | 'stable';
  baseValue: number;
  baseDate: string;
  history: IndexHistory[];
  currentPrice?: number;
  priceUnit?: string;
}

export interface SpecialtyIndex {
  id: string;
  name: string;
  code: string;
  type: 'daodi' | 'qualified' | 'imported';
  description: string;
  value: number;
  change: number;
  changePercent: number;
  updateTime: string;
  trend: 'up' | 'down' | 'stable';
  varietyCount: number;
  averagePremium?: number;
}

export interface PersonalIndex {
  id: string;
  name: string;
  userId: string;
  varieties: string[];
  markets: string[];
  regions: string[];
  weights?: number[];
  alertThreshold?: {
    high?: number;
    low?: number;
  };
  createdAt: string;
  updatedAt: string;
}
