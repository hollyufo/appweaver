import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import Builder from './pages/builder';
import Dashboard from './pages/Dashboard';
import Preview from './pages/preview';
import LandingPage from './pages/Landing';
function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="relative">
         
          <Builder />
        </div>
      } />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/landing" element={<LandingPage />} />

    </Routes>
  );
}

export default App;