import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "論文タイトルや著者名で検索..." }) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-sm sm:text-base md:text-lg border-2 border-primary-700/70 bg-primary-900/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all backdrop-blur-lg shadow-lg"
          style={{ color: '#ffffff' }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center transition-colors text-xl sm:text-2xl font-bold"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            aria-label="検索をクリア"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
