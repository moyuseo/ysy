import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-text-secondary text-sm">加载中...</span>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'price',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Price />
          </Suspense>
        ),
      },
      {
        path: 'herb/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HerbDetail />
          </Suspense>
        ),
      },
      {
        path: 'trade',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Trade />
          </Suspense>
        ),
      },
      {
        path: 'rank',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Rank />
          </Suspense>
        ),
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <News />
          </Suspense>
        ),
      },
      {
        path: 'news/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NewsDetail />
          </Suspense>
        ),
      },
      {
        path: 'wiki',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Wiki />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
