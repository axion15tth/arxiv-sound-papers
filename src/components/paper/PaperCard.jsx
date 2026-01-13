import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import { CATEGORIES } from '../../utils/constants';
import BookmarkButton from './BookmarkButton';
import TagBadge from '../tag/TagBadge';

const PaperCard = ({ paper, isBookmarked, paperTags = [] }) => {
  return (
    <div className="card group">
      {/* タイトル */}
      <div className="mb-1">
        <h3 className="text-xl font-bold mb-2 transition-colors" style={{ color: '#ffffff' }}>
          {paper.titleJa || paper.title}
        </h3>
        {paper.titleJa && (
          <>
            <div className="border-b border-primary-700/70 mb-2"></div>
            <p className="text-sm italic font-mono bg-gradient-to-r from-primary-300 via-primary-200 to-primary-300 bg-clip-text text-transparent">
              {paper.title}
            </p>
          </>
        )}
      </div>

      {/* タグ */}
      {paperTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1">
          {paperTags.map(tag => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      )}

      {/* メタ情報とアクション（1行） */}
      <div className="flex items-center justify-between gap-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(paper.publishedDate)}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {paper.authors.slice(0, 3).join(', ')}
            {paper.authors.length > 3 && ` 他${paper.authors.length - 3}名`}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 text-sm">
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:underline"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              arxiv
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>|</span>
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:underline"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              PDF
            </a>
          </div>
          <BookmarkButton paper={paper} isBookmarked={isBookmarked} />
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
