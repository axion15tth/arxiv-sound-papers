import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "論文タイトルや著者名で検索..." }) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-6 w-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-primary-700/70 bg-primary-900/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all backdrop-blur-lg shadow-lg"
          style={{ color: '#ffffff' }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors text-2xl font-bold"
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
