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

export interface TraceabilityInfo {
  id: string;
  herbId: string;
  herbName: string;
  batchNumber: string;
  origin: string;
  plantingBase: string;
  harvestDate: string;
  processingDate: string;
  storageLocation: string;
  qualityReport?: string;
  certifications: string[];
  traceSteps: {
    step: number;
    title: string;
    location: string;
    date: string;
    description: string;
  }[];
}

export interface GAPProduct {
  id: string;
  herbName: string;
  spec: string;
  origin: string;
  certificationNo: string;
  certificationDate: string;
  validUntil: string;
  baseName: string;
  imageUrl?: string;
  description?: string;
}

export interface FreshCutProduct {
  id: string;
  herbName: string;
  spec: string;
  origin: string;
  cutDate: string;
  freshnessLevel: 'A' | 'B' | 'C';
  storageMethod: string;
  shelfLife: string;
  imageUrl?: string;
  description?: string;
}

export interface HighQualityProduct {
  id: string;
  herbName: string;
  spec: string;
  origin: string;
  hasNoSulfur: boolean;
  hasNoPesticideResidue: boolean;
  hasNoHeavyMetal: boolean;
  isComplete: boolean;
  qualityLevel: '特级' | '一级' | '二级';
  imageUrl?: string;
  description?: string;
}
