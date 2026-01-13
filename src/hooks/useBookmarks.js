import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'bookmarks'),
      orderBy('bookmarkedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookmarkData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookmarks(bookmarkData);
      setLoading(false);
    }, (error) => {
      console.error('ブックマーク取得エラー:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { bookmarks, loading };
};
