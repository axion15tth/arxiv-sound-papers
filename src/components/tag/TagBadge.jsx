import React from 'react';

const TagBadge = ({ tag, onRemove, onClick }) => {
  return (
    <span
      className="inline-flex items-center px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
      style={{
        backgroundColor: tag.color + '20',
        color: tag.color,
        border: `1px solid ${tag.color}40`
      }}
      onClick={onClick}
    >
      {tag.name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 sm:ml-1 hover:text-red-600"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default TagBadge;
