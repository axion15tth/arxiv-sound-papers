import React from 'react';
import { DATE_FILTER_PRESETS } from '../../utils/constants';
import { getDateNDaysAgo } from '../../utils/dateUtils';

const DateFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const handlePreset = (days) => {
    const start = getDateNDaysAgo(days);
    onStartDateChange(start);
    onEndDateChange(new Date());
  };

  const handleClear = () => {
    onStartDateChange(null);
    onEndDateChange(null);
  };

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>期間</h3>

      {/* プリセット */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
        {DATE_FILTER_PRESETS.map(preset => (
          <button
            key={preset.label}
            onClick={() => handlePreset(preset.days)}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-primary-800/30 rounded-lg hover:bg-primary-700/40 transition-all border border-primary-700/60 shadow-sm"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {preset.label}
          </button>
        ))}
        {(startDate || endDate) && (
          <button
            onClick={handleClear}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm transition-colors font-semibold hover:underline"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            クリア
          </button>
        )}
      </div>

      {/* 日付入力 */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>開始日</label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => onStartDateChange(e.target.value ? new Date(e.target.value) : null)}
            className="input-field text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>終了日</label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => onEndDateChange(e.target.value ? new Date(e.target.value) : null)}
            className="input-field text-xs sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
