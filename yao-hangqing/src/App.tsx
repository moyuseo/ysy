import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const Price = lazy(() => import('./pages/Price'));
const HerbDetail = lazy(() => import('./pages/HerbDetail'));
const Trade = lazy(() => import('./pages/Trade'));
const Rank = lazy(() => import('./pages/Rank'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Wiki = lazy(() => import('./pages/Wiki'));
const Search = lazy(() => import('./pages/Search'));
const About = lazy(() => import('./pages/About'));

function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-text-secondary text-sm">加载中...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/price" element={<Price />} />
            <Route path="/herb/:id" element={<HerbDetail />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
