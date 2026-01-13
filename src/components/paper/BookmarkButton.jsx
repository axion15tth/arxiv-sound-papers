import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addBookmark, removeBookmark } from '../../services/bookmarkService';

const BookmarkButton = ({ paper, isBookmarked }) => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      const confirmed = window.confirm('ブックマーク機能を使用するにはログインが必要です。ログインしますか？');
      if (confirmed) {
        await login();
      }
      return;
    }

    setLoading(true);
    try {
      if (isBookmarked) {
        await removeBookmark(user.uid, paper.id);
      } else {
        await addBookmark(user.uid, paper);
      }
    } catch (error) {
      console.error('ブックマーク操作エラー:', error);
      alert('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors ${
        isBookmarked
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-400 hover:text-gray-600'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isBookmarked ? 'ブックマーク解除' : 'ブックマークに追加'}
    >
      <svg
        className="w-6 h-6"
        fill={isBookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
};

export default BookmarkButton;
