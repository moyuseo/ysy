import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 15% 0%, rgba(45, 90, 74, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 100%, rgba(139, 105, 20, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(201, 64, 67, 0.02) 0%, transparent 60%)
          `
        }}
      />
      <Header />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
