import type { Market, Category } from '../types';

export const MARKETS: Market[] = [
  { key: 'bozhou', label: '亳州', province: '安徽' },
  { key: 'anguo', label: '安国', province: '河北' },
  { key: 'yulin', label: '玉林', province: '广西' },
  { key: 'chengdu', label: '成都', province: '四川' },
  { key: 'lianqiao', label: '廉桥', province: '湖南' },
  { key: 'yuzhou', label: '禹州', province: '河南' },
  { key: 'longxi', label: '陇西', province: '甘肃' },
];

export const CATEGORIES: Category[] = [
  { key: 'root', label: '根及根茎类', count: 0 },
  { key: 'fruit', label: '果实种子类', count: 0 },
  { key: 'herb', label: '全草类', count: 0 },
  { key: 'flower', label: '花类', count: 0 },
  { key: 'leaf', label: '叶类', count: 0 },
  { key: 'bark', label: '树皮类', count: 0 },
  { key: 'vine', label: '藤木类', count: 0 },
  { key: 'animal', label: '动物类', count: 0 },
  { key: 'mineral', label: '矿石类', count: 0 },
  { key: 'fungus', label: '菌藻类', count: 0 },
  { key: 'spice', label: '香料类', count: 0 },
  { key: 'other', label: '其他', count: 0 },
];

export const NEWS_CATEGORIES = [
  { key: 'analysis', label: '品种分析' },
  { key: 'dynamic', label: '药市动态' },
  { key: 'origin', label: '产地快报' },
  { key: 'policy', label: '新闻法规' },
  { key: 'review', label: '涨跌盘点' },
];

export const TRADE_TYPES = [
  { key: 'supply', label: '供应信息' },
  { key: 'demand', label: '求购信息' },
  { key: 'bidding', label: '采购招标' },
  { key: 'direct', label: '产地直供' },
];

export const RANK_TYPES = [
  { key: 'rise', label: '涨幅排行' },
  { key: 'fall', label: '跌幅排行' },
  { key: 'query', label: '查询排行' },
  { key: 'bull', label: '牛气品种' },
];

export const WIKI_TYPES = [
  { key: 'knowledge', label: '药材知识' },
  { key: 'planting', label: '种植技术' },
  { key: 'regulation', label: '新闻法规' },
];
