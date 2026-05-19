import type { Category, Market } from '../types';

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
  { key: 'root', label: '根及根茎类' },
  { key: 'fruit', label: '果实种子类' },
  { key: 'herb', label: '全草类' },
  { key: 'flower', label: '花类' },
  { key: 'leaf', label: '叶类' },
  { key: 'bark', label: '树皮类' },
  { key: 'vine', label: '藤木类' },
  { key: 'animal', label: '动物类' },
  { key: 'mineral', label: '矿石类' },
  { key: 'fungus', label: '菌藻类' },
  { key: 'spice', label: '香料类' },
  { key: 'other', label: '其他' },
];

export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  analysis: '品种分析',
  dynamic: '药市动态',
  origin: '产地快报',
  policy: '新闻法规',
  review: '涨跌盘点',
};

export const WIKI_CATEGORY_LABELS: Record<string, string> = {
  knowledge: '药材知识',
  planting: '种植技术',
  regulation: '新闻法规',
};

export const TRADE_TYPE_LABELS: Record<string, string> = {
  supply: '供应信息',
  demand: '求购信息',
  bidding: '采购招标',
  direct: '产地直供',
};

export const NAV_ITEMS = [
  { label: '首页', path: '/' },
  { label: '行情价格', path: '/price' },
  { label: '供求信息', path: '/trade' },
  { label: '涨跌排行', path: '/rank' },
  { label: '资讯中心', path: '/news' },
  { label: '知识百科', path: '/wiki' },
  { label: '关于我们', path: '/about' },
];
