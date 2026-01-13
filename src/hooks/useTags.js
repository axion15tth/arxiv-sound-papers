import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export const useTags = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTags([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'tags'),
      orderBy('name')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tagData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTags(tagData);
      setLoading(false);
    }, (error) => {
      console.error('タグ取得エラー:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { tags, loading };
};
