# 中药材行情信息网站 - 技术架构文档

## 1. 技术栈

### 1.1 前端框架
- **React 18** + **TypeScript**
- **Vite** 构建工具
- **React Router v6** 路由管理

### 1.2 UI/样式
- **Tailwind CSS 3** 原子化CSS
- 自定义CSS变量实现主题
- **Recharts** 数据可视化（价格走势图）
- **Lucide React** 图标库

### 1.3 数据层
- 模拟数据 JSON 文件
- 自定义 Hooks 封装数据逻辑
- Context API 管理全局状态（搜索、筛选）

## 2. 项目结构

```
src/
├── components/          # 公共组件
│   ├── Layout/          # 布局组件（Header, Footer, Sidebar）
│   ├── PriceTable/      # 价格表格组件
│   ├── PriceChart/      # 价格走势图组件
│   ├── HerbCard/        # 品种卡片组件
│   ├── TradeCard/       # 供求信息卡片
│   ├── NewsCard/        # 资讯卡片
│   ├── RankTable/       # 排行表格
│   └── SearchBar/       # 搜索栏
├── pages/               # 页面组件
│   ├── Home/            # 首页
│   ├── Price/           # 行情价格页
│   ├── HerbDetail/      # 品种详情页
│   ├── Trade/           # 供求信息页
│   ├── Rank/            # 涨跌排行页
│   ├── News/            # 资讯中心
│   ├── NewsDetail/      # 资讯详情
│   ├── Wiki/            # 知识百科
│   ├── Search/          # 搜索结果
│   └── About/           # 关于我们
├── data/                # 模拟数据
│   ├── herbs.ts         # 品种数据
│   ├── prices.ts        # 价格数据
│   ├── trades.ts        # 供求数据
│   ├── news.ts          # 资讯数据
│   └── wiki.ts          # 百科数据
├── hooks/               # 自定义Hooks
├── utils/               # 工具函数
├── types/               # TypeScript类型定义
└── App.tsx              # 应用入口
```

## 3. 核心数据模型

### 3.1 品种 (Herb)
```typescript
interface Herb {
  id: string;
  name: string;           // 品名
  alias: string[];        // 别名
  category: string;       // 分类（根茎类/果实类/全草类等）
  origin: string[];       // 主产地
  spec: string[];         // 常见规格
  family: string;         // 科属
  nature: string;         // 性味
  meridian: string;       // 归经
  effect: string;         // 功效
  description: string;    // 描述
  pinyin: string;         // 拼音首字母
  harvestTime: string;    // 采收时间
}
```

### 3.2 价格 (Price)
```typescript
interface Price {
  herbId: string;
  herbName: string;
  spec: string;           // 规格
  market: string;         // 市场
  origin: string;         // 产地
  currentPrice: number;   // 今日价
  previousPrice: number;  // 昨日价
  monthlyChange: number;  // 月涨跌幅
  trend: 'up' | 'down' | 'stable';  // 走势
  history: { date: string; price: number }[];  // 历史价格
}
```

### 3.3 供求信息 (Trade)
```typescript
interface Trade {
  id: string;
  type: 'supply' | 'demand' | 'bidding';
  herbName: string;
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
}
```

### 3.4 资讯 (News)
```typescript
interface News {
  id: string;
  title: string;
  category: 'analysis' | 'dynamic' | 'origin' | 'policy';
  summary: string;
  content: string;
  herbNames: string[];
  imageUrl?: string;
  createdAt: string;
  views: number;
}
```

## 4. 路由设计

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | Home | 首页 |
| `/price` | Price | 行情价格（含市场/产地/涨跌Tab） |
| `/price/market` | Price | 市场价格 |
| `/price/origin` | Price | 产地价格 |
| `/herb/:id` | HerbDetail | 品种详情 |
| `/trade` | Trade | 供求信息 |
| `/trade/supply` | Trade | 供应信息 |
| `/trade/demand` | Trade | 求购信息 |
| `/trade/bidding` | Trade | 采购招标 |
| `/rank` | Rank | 涨跌排行 |
| `/news` | News | 资讯中心 |
| `/news/:id` | NewsDetail | 资讯详情 |
| `/wiki` | Wiki | 知识百科 |
| `/search` | Search | 搜索结果 |
| `/about` | About | 关于我们 |

## 5. 性能优化策略
- 路由懒加载
- 虚拟列表（价格表格大数据量）
- 图片懒加载
- 数据缓存（Context + useMemo）
