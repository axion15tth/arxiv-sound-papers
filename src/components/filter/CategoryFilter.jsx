import React from 'react';
import { CATEGORIES } from '../../utils/constants';

const CategoryFilter = ({ selectedCategories, onChange }) => {
  const handleToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>カテゴリ</h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => handleToggle(key)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              selectedCategories.includes(key)
                ? 'shadow-md'
                : 'bg-primary-800/30 hover:bg-primary-700/40 border border-primary-700/60 shadow-sm'
            }`}
            style={selectedCategories.includes(key) ? { backgroundColor: color, color: '#ffffff' } : { color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
