import React from 'react';

const TagBadge = ({ tag, onRemove, onClick }) => {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
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
          className="ml-1 hover:text-red-600"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default TagBadge;
