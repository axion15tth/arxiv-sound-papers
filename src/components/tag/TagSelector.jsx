import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTags } from '../../hooks/useTags';
import { addTagToBookmark, removeTagFromBookmark } from '../../services/bookmarkService';
import TagBadge from './TagBadge';

const TagSelector = ({ paper, currentTags = [] }) => {
  const { user } = useAuth();
  const { tags } = useTags();
  const [isOpen, setIsOpen] = useState(false);

  const currentTagIds = currentTags.map(t => t.id);
  const availableTags = tags.filter(tag => !currentTagIds.includes(tag.id));

  const handleAddTag = async (tagId) => {
    if (!user) return;

    try {
      await addTagToBookmark(user.uid, paper.id, tagId);
    } catch (error) {
      console.error('タグ追加エラー:', error);
      alert('タグの追加に失敗しました');
    }
  };

  const handleRemoveTag = async (tagId) => {
    if (!user) return;

    try {
      await removeTagFromBookmark(user.uid, paper.id, tagId);
    } catch (error) {
      console.error('タグ削除エラー:', error);
      alert('タグの削除に失敗しました');
    }
  };

  return (
    <div className="relative">
      {/* 現在のタグ */}
      <div className="flex flex-wrap gap-2 mb-2">
        {currentTags.map(tag => (
          <TagBadge
            key={tag.id}
            tag={tag}
            onRemove={() => handleRemoveTag(tag.id)}
          />
        ))}
      </div>

      {/* タグ追加ボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium transition-colors hover:underline"
        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
      >
        + タグを追加
      </button>

      {/* タグ選択ドロップダウン */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-primary-900/95 rounded-lg shadow-lg border border-primary-700 p-3 backdrop-blur-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm" style={{ color: '#ffffff' }}>タグを選択</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-80 transition-opacity"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              ×
            </button>
          </div>
          {availableTags.length === 0 ? (
            <p className="text-sm text-center py-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              すべてのタグが追加済みです
            </p>
          ) : (
            <div className="space-y-2">
              {availableTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => {
                    handleAddTag(tag.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2 hover:bg-primary-800/50 rounded transition-colors"
                >
                  <TagBadge tag={tag} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
