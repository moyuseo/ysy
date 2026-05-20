import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Prices from './pages/Prices';
import News from './pages/News';
import Trade from './pages/Trade';
import Herbs from './pages/Herbs';
import HerbDetail from './pages/HerbDetail';
import Traceability from './pages/Traceability';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/news" element={<News />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/herbs" element={<Herbs />} />
          <Route path="/herbs/:id" element={<HerbDetail />} />
          <Route path="/traceability" element={<Traceability />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
