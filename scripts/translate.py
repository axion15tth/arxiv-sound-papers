import requests
import time
import os


class Translator:
    def __init__(self, api_key=None):
        """
        Google Translate API (REST) クライアントを初期化
        api_key: Google Translate APIキー
        """
        self.api_key = api_key or os.getenv('GOOGLE_TRANSLATE_API_KEY')
        self.base_url = 'https://translation.googleapis.com/language/translate/v2'

        if not self.api_key:
            raise ValueError("Google Translate APIキーが設定されていません")

    def translate_text(self, text, source='en', target='ja'):
        """
        Google Translate REST APIでテキストを翻訳
        """
        params = {
            'q': text,
            'source': source,
            'target': target,
            'format': 'text',
            'key': self.api_key
        }

        try:
            response = requests.post(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            result = response.json()

            if 'data' in result and 'translations' in result['data']:
                return result['data']['translations'][0]['translatedText']
            else:
                print(f"翻訳エラー: 予期しないレスポンス形式")
                return text

        except Exception as e:
            print(f"翻訳エラー: {e}")
            return text

    def translate_papers(self, papers):
        """
        論文タイトルを日本語に翻訳
        """
        print(f"{len(papers)}件の論文タイトルを翻訳中...")

        for i, paper in enumerate(papers):
            try:
                # タイトルを翻訳
                paper['titleJa'] = self.translate_text(paper['title'])

                # 進捗表示
                if (i + 1) % 10 == 0:
                    print(f"  {i + 1}/{len(papers)}件完了")

                # レート制限対策（1秒あたり10リクエスト以下）
                time.sleep(0.15)

            except Exception as e:
                print(f"翻訳エラー: {paper['id']} - {e}")
                # エラーの場合は英語タイトルをそのまま使用
                paper['titleJa'] = paper['title']

        print("翻訳完了")
        return papers
