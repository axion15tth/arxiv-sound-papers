import { useState, useEffect } from 'react';

export const usePapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        // Viteのpublicディレクトリからデータを取得
        // import.meta.env.BASE_URLを使用してベースパスを考慮
        const basePath = import.meta.env.BASE_URL || '/';
        const dataPath = `${basePath}data/papers.json`.replace('//', '/');

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error('論文データの取得に失敗しました');
        }
        const data = await response.json();
        setPapers(data.papers || []);
        setLoading(false);
      } catch (err) {
        console.error('論文データ取得エラー:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return { papers, loading, error };
};
