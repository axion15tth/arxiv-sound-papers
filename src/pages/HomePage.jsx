import React, { useState, useMemo } from 'react';
import { usePapersContext } from '../context/PapersContext';
import PaperList from '../components/paper/PaperList';
import SearchBar from '../components/filter/SearchBar';
import CategoryFilter from '../components/filter/CategoryFilter';
import DateFilter from '../components/filter/DateFilter';
import Loader from '../components/common/Loader';
import {
  filterByKeyword,
  filterByCategories,
  filterByDateRange,
  sortPapers
} from '../utils/filterUtils';

const HomePage = () => {
  const { papers, loading, error } = usePapersContext();

  // フィルタ状態
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // フィルタリングとソート
  const filteredPapers = useMemo(() => {
    let result = papers;

    // キーワードフィルタ
    result = filterByKeyword(result, keyword);

    // カテゴリフィルタ
    result = filterByCategories(result, selectedCategories);

    // 日付フィルタ
    result = filterByDateRange(result, startDate, endDate);

    // ソート
    result = sortPapers(result, sortBy, sortOrder);

    return result;
  }, [papers, keyword, selectedCategories, startDate, endDate, sortBy, sortOrder]);

  if (loading) return <Loader text="論文データを読み込み中..." />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-primary-900/40 border-2 border-primary-600 rounded-lg p-6 text-center backdrop-blur-lg shadow-lg">
          <p className="font-semibold" style={{ color: '#ffffff' }}>エラーが発生しました: {error}</p>
          <p className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            論文データを取得できませんでした。データファイルが存在することを確認してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* フィルタセクション */}
      <div className="card mb-6 space-y-6">
        <SearchBar value={keyword} onChange={setKeyword} />

        {/* 詳細条件トグルボタン */}
        <div className="border-t border-primary-700/50 pt-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center justify-between w-full px-4 py-3 bg-primary-700/60 hover:bg-primary-600/60 rounded-lg transition-all font-medium"
            style={{ color: '#ffffff' }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              詳細条件
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* 詳細条件（トグル） */}
        {showAdvancedFilters && (
          <div className="space-y-6 border-t border-primary-700/50 pt-6">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
            />

            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
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
                  <option value="date">投稿日</option>
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
        )}
      </div>

      {/* 結果表示 */}
      <div className="mb-4 flex justify-between items-center">
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {filteredPapers.length}件の論文が見つかりました
          {papers.length !== filteredPapers.length && ` (全${papers.length}件中)`}
        </p>
      </div>

      <PaperList papers={filteredPapers} showTags={false} />
    </div>
  );
};

export default HomePage;
