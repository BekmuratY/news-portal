import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AdminNewPage from './pages/AdminNewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path="/admin/new" element={<AdminNewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
