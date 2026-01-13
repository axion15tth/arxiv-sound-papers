import { isWithinDateRange } from './dateUtils';

/**
 * キーワードで論文をフィルタリング
 */
export const filterByKeyword = (papers, keyword) => {
  if (!keyword || keyword.trim() === '') return papers;

  const lowerKeyword = keyword.toLowerCase();
  return papers.filter(paper =>
    paper.title?.toLowerCase().includes(lowerKeyword) ||
    paper.titleJa?.toLowerCase().includes(lowerKeyword) ||
    paper.authors?.some(author => author.toLowerCase().includes(lowerKeyword))
  );
};

/**
 * カテゴリで論文をフィルタリング
 */
export const filterByCategories = (papers, selectedCategories) => {
  if (!selectedCategories || selectedCategories.length === 0) return papers;

  return papers.filter(paper =>
    paper.categories?.some(cat => selectedCategories.includes(cat))
  );
};

/**
 * 日付範囲で論文をフィルタリング
 */
export const filterByDateRange = (papers, startDate, endDate) => {
  if (!startDate && !endDate) return papers;

  return papers.filter(paper =>
    isWithinDateRange(paper.publishedDate, startDate, endDate)
  );
};

/**
 * タグで論文をフィルタリング
 */
export const filterByTags = (papers, selectedTagIds, filterMode = 'OR') => {
  if (!selectedTagIds || selectedTagIds.length === 0) return papers;

  if (filterMode === 'AND') {
    // すべてのタグを持つ論文のみ
    return papers.filter(paper =>
      selectedTagIds.every(tagId => paper.tags?.includes(tagId))
    );
  } else {
    // いずれかのタグを持つ論文
    return papers.filter(paper =>
      selectedTagIds.some(tagId => paper.tags?.includes(tagId))
    );
  }
};

/**
 * 論文をソート
 */
export const sortPapers = (papers, sortBy, sortOrder = 'desc') => {
  const sorted = [...papers].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.publishedDate) - new Date(b.publishedDate);
        break;
      case 'title':
        comparison = (a.title || '').localeCompare(b.title || '');
        break;
      case 'titleJa':
        comparison = (a.titleJa || '').localeCompare(b.titleJa || '', 'ja');
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};
