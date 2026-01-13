import React from 'react';
import { useTags } from '../../hooks/useTags';
import TagBadge from '../tag/TagBadge';

const TagFilter = ({ selectedTagIds, onChange, filterMode, onFilterModeChange }) => {
  const { tags } = useTags();

  const handleToggle = (tagId) => {
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter(id => id !== tagId));
    } else {
      onChange([...selectedTagIds, tagId]);
    }
  };

  if (tags.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-primary-200">タグ</h3>
        {selectedTagIds.length > 0 && (
          <div className="flex gap-1 sm:gap-1.5 md:gap-2">
            <button
              onClick={() => onFilterModeChange('OR')}
              className={`text-[10px] sm:text-xs px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded transition-all ${
                filterMode === 'OR'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-primary-800/30 text-primary-700 dark:text-primary-200 border border-primary-200 dark:border-primary-700/60'
              }`}
            >
              OR
            </button>
            <button
              onClick={() => onFilterModeChange('AND')}
              className={`text-[10px] sm:text-xs px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded transition-all ${
                filterMode === 'AND'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-primary-800/30 text-primary-700 dark:text-primary-200 border border-primary-200 dark:border-primary-700/60'
              }`}
            >
              AND
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
        {tags.map(tag => (
          <div
            key={tag.id}
            onClick={() => handleToggle(tag.id)}
            className="cursor-pointer"
          >
            <TagBadge
              tag={tag}
              onClick={() => {}}
            />
            {selectedTagIds.includes(tag.id) && (
              <span className="ml-1 text-primary-600 dark:text-primary-300 font-bold">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
