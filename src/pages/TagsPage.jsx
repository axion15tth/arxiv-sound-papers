import React from 'react';
import { useAuth } from '../context/AuthContext';
import TagEditor from '../components/tag/TagEditor';

const TagsPage = () => {
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-primary-400 dark:text-primary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-primary-50 mb-2">
            タグ管理機能を使用するにはログインが必要です
          </h2>
          <p className="text-gray-600 dark:text-primary-200 mb-6">
            Googleアカウントでログインして、タグを作成・管理しましょう
          </p>
          <button onClick={login} className="btn-primary">
            Googleでログイン
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TagEditor />
    </div>
  );
};

export default TagsPage;
