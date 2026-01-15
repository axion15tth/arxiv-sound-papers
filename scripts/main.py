#!/usr/bin/env python3
"""
arXiv Sound Papers データ収集・翻訳スクリプト

使い方:
    python main.py

環境変数:
    GOOGLE_APPLICATION_CREDENTIALS: Google Cloudサービスアカウントキー（JSONファイル）
"""

import json
import os
from datetime import datetime
from fetch_papers import ArxivFetcher
from translate import Translator
from config import CATEGORIES, KEYWORDS, DAYS_BACK

# 環境変数から翻訳APIキーを取得
GOOGLE_TRANSLATE_API_KEY = os.getenv('GOOGLE_TRANSLATE_API_KEY')


def main():
    print("=" * 60)
    print("arXiv Sound Papers データ収集開始")
    print("=" * 60)
    print(f"対象カテゴリ: {', '.join(CATEGORIES)}")
    print(f"キーワード: {', '.join(KEYWORDS)}")
    print(f"取得期間: 過去{DAYS_BACK}日間")
    print("=" * 60)

    # 1. 論文データ取得
    print("\n[1/3] 論文データを取得中...")
    fetcher = ArxivFetcher(
        categories=CATEGORIES,
        keywords=KEYWORDS,
        days_back=DAYS_BACK
    )
    papers = fetcher.fetch_papers()
    print(f"✓ {len(papers)}件の論文を取得しました")

    if len(papers) == 0:
        print("論文が見つかりませんでした。終了します。")
        return

    # 2. 翻訳
    print("\n[2/3] タイトルを日本語に翻訳中...")
    if GOOGLE_TRANSLATE_API_KEY:
        try:
            translator = Translator(api_key=GOOGLE_TRANSLATE_API_KEY)
            papers = translator.translate_papers(papers)
            print("✓ 翻訳完了")
        except Exception as e:
            print(f"⚠ 翻訳エラー: {e}")
            print("  英語タイトルをそのまま使用します")
            for paper in papers:
                paper['titleJa'] = paper['title']
    else:
        print("⚠ Google Translate APIキーが設定されていません")
        print("  英語タイトルをそのまま使用します")
        for paper in papers:
            paper['titleJa'] = paper['title']

    # 3. JSON保存
    print("\n[3/3] データを保存中...")
    output = {
        "papers": papers,
        "lastUpdated": datetime.now().isoformat(),
        "totalCount": len(papers)
    }

    # dataディレクトリが存在しない場合は作成
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_dir, exist_ok=True)

    output_path = os.path.join(data_dir, 'papers.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # public/dataディレクトリにもコピー（ビルド用）
    public_data_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
    os.makedirs(public_data_dir, exist_ok=True)

    public_output_path = os.path.join(public_data_dir, 'papers.json')
    with open(public_output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"✓ データを保存しました: {output_path}")

    # 統計情報を表示
    print("\n" + "=" * 60)
    print("統計情報")
    print("=" * 60)
    print(f"総論文数: {len(papers)}件")

    # カテゴリ別の集計
    category_count = {}
    for paper in papers:
        for cat in paper['categories']:
            category_count[cat] = category_count.get(cat, 0) + 1

    print("\nカテゴリ別:")
    for cat, count in sorted(category_count.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count}件")

    print("\n✓ 完了しました！")


if __name__ == "__main__":
    main()
