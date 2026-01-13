import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * ブックマークを追加
 */
export const addBookmark = async (userId, paper) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', paper.id);
  await setDoc(bookmarkRef, {
    arxivId: paper.arxivId,
    title: paper.title,
    titleJa: paper.titleJa,
    authors: paper.authors,
    publishedDate: paper.publishedDate,
    categories: paper.categories,
    url: paper.url,
    pdfUrl: paper.pdfUrl,
    bookmarkedAt: serverTimestamp(),
    tags: []
  });
};

/**
 * ブックマークを削除
 */
export const removeBookmark = async (userId, paperId) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', paperId);
  await deleteDoc(bookmarkRef);
};

/**
 * 論文にタグを追加
 */
export const addTagToBookmark = async (userId, paperId, tagId) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', paperId);
  await updateDoc(bookmarkRef, {
    tags: arrayUnion(tagId)
  });

  // タグの論文カウントを増加
  const tagRef = doc(db, 'users', userId, 'tags', tagId);
  await updateDoc(tagRef, {
    paperCount: increment(1)
  });
};

/**
 * 論文からタグを削除
 */
export const removeTagFromBookmark = async (userId, paperId, tagId) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', paperId);
  await updateDoc(bookmarkRef, {
    tags: arrayRemove(tagId)
  });

  // タグの論文カウントを減少
  const tagRef = doc(db, 'users', userId, 'tags', tagId);
  await updateDoc(tagRef, {
    paperCount: increment(-1)
  });
};
