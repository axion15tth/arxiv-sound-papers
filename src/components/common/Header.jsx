import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePapersContext } from '../../context/PapersContext';

const Header = () => {
  const { user, login, logout } = useAuth();
  const { refreshPapers, loading } = usePapersContext();
  const location = useLocation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshPapers();
    // 更新完了のフィードバック用に少し待つ
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-primary-900/90 shadow-lg border-b border-primary-800/80 transition-colors backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ロゴ・タイトル */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={`${import.meta.env.BASE_URL}${import.meta.env.BASE_URL.endsWith('/') ? '' : '/'}logo-256.png`}
                alt="arXiv Sound Papers Logo"
                className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-200 via-primary-100 to-primary-200 bg-clip-text text-transparent tracking-tight">
                arXiv Sound Papers
              </span>
            </Link>

            {/* ナビゲーション */}
            <nav className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive('/')
                    ? 'bg-primary-600/70 shadow-sm'
                    : 'hover:bg-primary-800/30'
                }`}
                style={{ color: isActive('/') ? '#ffffff' : 'rgba(255, 255, 255, 0.8)' }}
              >
                すべての論文
              </Link>
              {user && (
                <>
                  <Link
                    to="/bookmarks"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive('/bookmarks')
                        ? 'bg-primary-600/70 shadow-sm'
                        : 'hover:bg-primary-800/30'
                    }`}
                    style={{ color: isActive('/bookmarks') ? '#ffffff' : 'rgba(255, 255, 255, 0.8)' }}
                  >
                    ブックマーク
                  </Link>
                  <Link
                    to="/tags"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive('/tags')
                        ? 'bg-primary-600/70 shadow-sm'
                        : 'hover:bg-primary-800/30'
                    }`}
                    style={{ color: isActive('/tags') ? '#ffffff' : 'rgba(255, 255, 255, 0.8)' }}
                  >
                    タグ管理
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* データ更新・認証ボタン */}
          <div className="flex items-center space-x-3">
            {/* データ更新ボタン */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all bg-primary-700/60 hover:bg-primary-600/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              title="最新の論文データに更新"
            >
              <svg
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden sm:inline">
                {isRefreshing ? '更新中...' : 'データ更新'}
              </span>
            </button>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm hidden sm:block" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="btn-primary"
              >
                Googleでログイン
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
