import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../hooks/useBookmarks';
import { useTags } from '../hooks/useTags';
import PaperCard from '../components/paper/PaperCard';
import TagSelector from '../components/tag/TagSelector';
import SearchBar from '../components/filter/SearchBar';
import TagFilter from '../components/filter/TagFilter';
import Loader from '../components/common/Loader';
import {
  filterByKeyword,
  filterByTags,
  sortPapers
} from '../utils/filterUtils';

const BookmarksPage = () => {
  const { user, login } = useAuth();
  const { bookmarks, loading } = useBookmarks();
  const { tags } = useTags();

  // フィルタ状態
  const [keyword, setKeyword] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [tagFilterMode, setTagFilterMode] = useState('OR');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // フィルタリングとソート
  const filteredBookmarks = useMemo(() => {
    let result = bookmarks;

    // キーワードフィルタ
    result = filterByKeyword(result, keyword);

    // タグフィルタ
    result = filterByTags(result, selectedTagIds, tagFilterMode);

    // ソート（bookmarkedAtでソート）
    if (sortBy === 'date') {
      result = [...result].sort((a, b) => {
        const dateA = a.bookmarkedAt?.toDate?.() || new Date(0);
        const dateB = b.bookmarkedAt?.toDate?.() || new Date(0);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else {
      result = sortPapers(result, sortBy, sortOrder);
    }

    return result;
  }, [bookmarks, keyword, selectedTagIds, tagFilterMode, sortBy, sortOrder]);

  const getPaperTags = (bookmark) => {
    if (!bookmark.tags) return [];
    return tags.filter(tag => bookmark.tags.includes(tag.id));
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-primary-400 dark:text-primary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-primary-50 mb-2">
            ブックマーク機能を使用するにはログインが必要です
          </h2>
          <p className="text-gray-600 dark:text-primary-200 mb-6">
            Googleアカウントでログインして、お気に入りの論文を保存しましょう
          </p>
          <button onClick={login} className="btn-primary">
            Googleでログイン
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <Loader text="ブックマークを読み込み中..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {bookmarks.length === 0 ? (
        <div className="text-center py-16">
          <svg className="mx-auto h-16 w-16 text-primary-400 dark:text-primary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-primary-50 mb-2">
            ブックマークがまだありません
          </h2>
          <p className="text-gray-600 dark:text-primary-200">
            気になった論文をブックマークして、後で見返すことができます
          </p>
        </div>
      ) : (
        <>
          {/* フィルタセクション */}
          <div className="card mb-6 space-y-4">
            <SearchBar
              value={keyword}
              onChange={setKeyword}
              placeholder="ブックマークした論文を検索..."
            />

            <TagFilter
              selectedTagIds={selectedTagIds}
              onChange={setSelectedTagIds}
              filterMode={tagFilterMode}
              onFilterModeChange={setTagFilterMode}
            />

            {/* ソート */}
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>並び替え</h3>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="date">ブックマーク日</option>
                  <option value="titleJa">タイトル（日本語）</option>
                  <option value="title">タイトル（英語）</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="btn-secondary"
                >
                  {sortOrder === 'asc' ? '↑ 昇順' : '↓ 降順'}
                </button>
              </div>
            </div>
          </div>

          {/* 結果表示 */}
          <div className="mb-4">
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {filteredBookmarks.length}件のブックマーク
              {bookmarks.length !== filteredBookmarks.length && ` (全${bookmarks.length}件中)`}
            </p>
          </div>

          {/* ブックマーク一覧 */}
          <div className="space-y-4">
            {filteredBookmarks.map(bookmark => (
              <div key={bookmark.id} className="card">
                <PaperCard
                  paper={bookmark}
                  isBookmarked={true}
                  paperTags={getPaperTags(bookmark)}
                />
                <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700/70">
                  <TagSelector
                    paper={bookmark}
                    currentTags={getPaperTags(bookmark)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarksPage;
