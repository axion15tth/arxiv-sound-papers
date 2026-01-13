import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTags } from '../../hooks/useTags';
import { createTag, deleteTag, updateTag } from '../../services/tagService';
import { DEFAULT_TAG_COLORS } from '../../utils/constants';
import TagBadge from './TagBadge';
import Loader from '../common/Loader';

const TagEditor = () => {
  const { user } = useAuth();
  const { tags, loading } = useTags();
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(DEFAULT_TAG_COLORS[0]);
  const [editingTag, setEditingTag] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim() || !user) return;

    setIsCreating(true);
    try {
      await createTag(user.uid, {
        name: newTagName.trim(),
        color: newTagColor
      });
      setNewTagName('');
      setNewTagColor(DEFAULT_TAG_COLORS[0]);
    } catch (error) {
      console.error('タグ作成エラー:', error);
      alert('タグの作成に失敗しました');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm('このタグを削除しますか？関連付けられた論文からもタグが削除されます。')) {
      return;
    }

    try {
      await deleteTag(user.uid, tagId);
    } catch (error) {
      console.error('タグ削除エラー:', error);
      alert('タグの削除に失敗しました');
    }
  };

  const handleUpdateTag = async (tagId, updates) => {
    try {
      await updateTag(user.uid, tagId, updates);
      setEditingTag(null);
    } catch (error) {
      console.error('タグ更新エラー:', error);
      alert('タグの更新に失敗しました');
    }
  };

  if (loading) return <Loader text="タグを読み込み中..." />;

  return (
    <div className="space-y-6">
      {/* タグ作成フォーム */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#ffffff' }}>新しいタグを作成</h3>
        <form onSubmit={handleCreateTag} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="タグ名（例：音声認識）"
            className="input-field flex-1"
            maxLength={20}
          />
          <div className="flex gap-2">
            <select
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              className="input-field w-32"
            >
              {DEFAULT_TAG_COLORS.map(color => (
                <option key={color} value={color}>
                  <span style={{ color }}>■</span> {color}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!newTagName.trim() || isCreating}
              className="btn-primary whitespace-nowrap"
            >
              {isCreating ? '作成中...' : '作成'}
            </button>
          </div>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {DEFAULT_TAG_COLORS.map(color => (
            <button
              key={color}
              onClick={() => setNewTagColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                newTagColor === color ? 'border-primary-600 dark:border-primary-400 ring-2 ring-primary-200 dark:ring-primary-600' : 'border-primary-200 dark:border-primary-600'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* タグ一覧 */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#ffffff' }}>タグ一覧 ({tags.length}件)</h3>
        {tags.length === 0 ? (
          <p className="text-center py-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            タグがまだありません。上のフォームから作成してください。
          </p>
        ) : (
          <div className="space-y-3">
            {tags.map(tag => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-3 bg-primary-900/30 rounded-lg border border-primary-700/50"
              >
                <div className="flex items-center space-x-3">
                  <TagBadge tag={tag} />
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {tag.paperCount}件の論文
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="text-sm font-medium transition-colors hover:underline"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagEditor;
