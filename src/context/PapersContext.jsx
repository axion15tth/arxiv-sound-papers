import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

const PapersContext = createContext();

export const PapersProvider = ({ children }) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPapers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // キャッシュを回避するためにタイムスタンプを追加
      const basePath = import.meta.env.BASE_URL || '/';
      // 末尾スラッシュを確保してパスを結合
      const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
      const dataPath = `${normalizedBasePath}data/papers.json`;
      const timestamp = new Date().getTime();

      const response = await fetch(`${dataPath}?t=${timestamp}`);
      if (!response.ok) {
        throw new Error('論文データの取得に失敗しました');
      }
      const data = await response.json();
      setPapers(data.papers || []);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('論文データ取得エラー:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const refreshPapers = useCallback(() => {
    fetchPapers();
  }, [fetchPapers]);

  return (
    <PapersContext.Provider value={{
      papers,
      loading,
      error,
      lastUpdated,
      refreshPapers
    }}>
      {children}
    </PapersContext.Provider>
  );
};

export const usePapersContext = () => {
  const context = useContext(PapersContext);
  if (!context) {
    throw new Error('usePapersContext must be used within PapersProvider');
  }
  return context;
};
