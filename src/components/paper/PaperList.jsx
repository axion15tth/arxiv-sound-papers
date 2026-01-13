import React from 'react';
import PaperCard from './PaperCard';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useTags } from '../../hooks/useTags';

const PaperList = ({ papers, showTags = true }) => {
  const { bookmarks } = useBookmarks();
  const { tags } = useTags();

  const isBookmarked = (paperId) => {
    return bookmarks.some(b => b.arxivId === paperId);
  };

  const getPaperTags = (paperId) => {
    if (!showTags) return [];

    const bookmark = bookmarks.find(b => b.arxivId === paperId);
    if (!bookmark || !bookmark.tags) return [];

    return tags.filter(tag => bookmark.tags.includes(tag.id));
  };

  if (papers.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12" style={{ color: 'rgba(255, 255, 255, 0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="mt-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>論文が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {papers.map(paper => (
        <PaperCard
          key={paper.id}
          paper={paper}
          isBookmarked={isBookmarked(paper.arxivId)}
          paperTags={getPaperTags(paper.arxivId)}
        />
      ))}
    </div>
  );
};

export default PaperList;
