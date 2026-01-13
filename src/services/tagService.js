import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
  arrayRemove,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * タグを作成
 */
export const createTag = async (userId, tagData) => {
  const tagsRef = collection(db, 'users', userId, 'tags');
  const docRef = await addDoc(tagsRef, {
    name: tagData.name,
    color: tagData.color || '#3B82F6',
    createdAt: serverTimestamp(),
    paperCount: 0
  });

  return {
    id: docRef.id,
    ...tagData,
    paperCount: 0
  };
};

/**
 * タグを削除
 * 関連するすべてのブックマークからもこのタグを削除
 */
export const deleteTag = async (userId, tagId) => {
  // タグを削除
  const tagRef = doc(db, 'users', userId, 'tags', tagId);
  await deleteDoc(tagRef);

  // すべてのブックマークからこのタグを削除
  const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
  const q = query(bookmarksRef, where('tags', 'array-contains', tagId));
  const snapshot = await getDocs(q);

  const batch = writeBatch(db);
  snapshot.docs.forEach(docSnapshot => {
    batch.update(docSnapshot.ref, {
      tags: arrayRemove(tagId)
    });
  });
  await batch.commit();
};

/**
 * タグを更新
 */
export const updateTag = async (userId, tagId, updates) => {
  const tagRef = doc(db, 'users', userId, 'tags', tagId);
  await updateDoc(tagRef, updates);
};
