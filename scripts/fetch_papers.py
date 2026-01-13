import requests
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import time


class ArxivFetcher:
    BASE_URL = "http://export.arxiv.org/api/query"

    def __init__(self, categories, keywords, days_back=7):
        self.categories = categories  # ["cs.SD", "eess.AS", "cs.AI"]
        self.keywords = keywords      # ["audio", "speech", "sound", "music"]
        self.days_back = days_back

    def fetch_papers(self):
        """指定されたカテゴリとキーワードで論文を取得"""
        papers = []

        # カテゴリベースの検索
        for category in self.categories:
            print(f"カテゴリ {category} から取得中...")
            papers.extend(self._fetch_by_category(category))
            time.sleep(3)  # arXiv APIのレート制限対策

        # キーワードベースの検索
        for keyword in self.keywords:
            print(f"キーワード '{keyword}' で検索中...")
            papers.extend(self._fetch_by_keyword(keyword))
            time.sleep(3)  # arXiv APIのレート制限対策

        # 重複削除
        unique_papers = self._remove_duplicates(papers)
        print(f"重複削除後: {len(unique_papers)}件")

        return unique_papers

    def _fetch_by_category(self, category):
        """カテゴリで検索"""
        query = f"cat:{category}"
        return self._query_arxiv(query)

    def _fetch_by_keyword(self, keyword):
        """キーワードで検索（音響関連カテゴリに限定）"""
        query = f"(all:{keyword}) AND (cat:cs.SD OR cat:eess.AS)"
        return self._query_arxiv(query)

    def _query_arxiv(self, query):
        """arXiv APIにクエリを送信"""
        params = {
            "search_query": query,
            "start": 0,
            "max_results": 20,
            "sortBy": "submittedDate",
            "sortOrder": "descending"
        }

        try:
            response = requests.get(self.BASE_URL, params=params, timeout=30)
            response.raise_for_status()
            papers = self._parse_response(response.text)
            return papers
        except Exception as e:
            print(f"エラー: {e}")
            return []

    def _parse_response(self, xml_text):
        """XMLレスポンスをパース"""
        root = ET.fromstring(xml_text)
        ns = {'atom': 'http://www.w3.org/2005/Atom',
              'arxiv': 'http://arxiv.org/schemas/atom'}

        papers = []
        for entry in root.findall('atom:entry', ns):
            # IDを取得
            id_text = entry.find('atom:id', ns).text
            arxiv_id = id_text.split('/')[-1].split('v')[0]  # バージョン番号を除去

            # カテゴリを取得
            categories = [
                cat.get('term')
                for cat in entry.findall('atom:category', ns)
            ]

            # 公開日を取得
            published = entry.find('atom:published', ns)
            published_date = published.text[:10] if published is not None else ""

            # タイトルを整形（改行と余分な空白を除去）
            title_elem = entry.find('atom:title', ns)
            title = ' '.join(title_elem.text.split()) if title_elem is not None else ""

            # 概要を整形
            summary_elem = entry.find('atom:summary', ns)
            abstract = ' '.join(summary_elem.text.split()) if summary_elem is not None else ""

            paper = {
                'id': arxiv_id,
                'arxivId': arxiv_id,
                'title': title,
                'authors': [
                    author.find('atom:name', ns).text
                    for author in entry.findall('atom:author', ns)
                ],
                'publishedDate': published_date,
                'categories': categories,
                'abstract': abstract,
                'url': f"https://arxiv.org/abs/{arxiv_id}",
                'pdfUrl': f"https://arxiv.org/pdf/{arxiv_id}.pdf"
            }
            papers.append(paper)

        return papers

    def _remove_duplicates(self, papers):
        """重複する論文を削除"""
        seen = set()
        unique = []
        for paper in papers:
            if paper['arxivId'] not in seen:
                seen.add(paper['arxivId'])
                unique.append(paper)
        return unique
