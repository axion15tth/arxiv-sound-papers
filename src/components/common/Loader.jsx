import React from 'react';

const Loader = ({ text = '読み込み中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-800 border-t-primary-400"></div>
      <p className="mt-4 font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{text}</p>
    </div>
  );
};

export default Loader;
