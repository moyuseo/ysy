import type { HerbCategory } from '../types';
import { herbs } from './herbs';

export interface CategoryCount {
  key: HerbCategory;
  label: string;
  count: number;
}

export const CATEGORY_LABELS: Record<HerbCategory, string> = {
  root: '根及根茎类',
  fruit: '果实种子类',
  herb: '全草类',
  flower: '花类',
  leaf: '叶类',
  bark: '树皮类',
  vine: '藤木类',
  animal: '动物类',
  mineral: '矿石类',
  fungus: '菌藻类',
  spice: '香料类',
  other: '其他',
};

export const categoryCounts: CategoryCount[] = Object.entries(CATEGORY_LABELS).map(
  ([key, label]) => ({
    key: key as HerbCategory,
    label,
    count: herbs.filter((h) => h.category === key).length,
  })
);
