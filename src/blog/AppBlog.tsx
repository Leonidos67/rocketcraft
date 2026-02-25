import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogHeader from './components/BlogHeader';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';
import BlogAdmin from './pages/BlogAdmin';

const AppBlog = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#000]">
        <BlogHeader />
        <main className="container mx-auto px-4 py-0">
          <Routes>
            <Route path="/" element={<BlogHome />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/admin" element={<BlogAdmin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppBlog;