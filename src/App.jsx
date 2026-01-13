import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PapersProvider } from './context/PapersContext';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import TagsPage from './pages/TagsPage';

function App() {
  return (
    <AuthProvider>
      <PapersProvider>
        <BrowserRouter basename="/arxiv-sound-papers">
        <div className="min-h-screen transition-colors spectrogram-bg">
          <div className="relative z-10">
            <Header />
            <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/tags" element={<TagsPage />} />
            </Routes>
            </main>
            <footer className="bg-primary-900/90 border-t border-primary-800/80 mt-12 transition-colors backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                © 2024 arXiv Sound Papers Viewer. Data from{' '}
                <a
                  href="https://arxiv.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  className="hover:underline"
                >
                  arXiv.org
                </a>
              </p>
            </div>
            </footer>
          </div>
        </div>
      </BrowserRouter>
      </PapersProvider>
    </AuthProvider>
  );
}

export default App;
