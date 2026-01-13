# arXiv Sound Papers Viewer

音響分野の研究者向けに、arXivに投稿された音響関連論文を**日本語タイトル付き**で閲覧し、ブックマーク・タグ管理ができるWebアプリケーションです。

## 特徴

- ✨ **日本語翻訳**: 論文タイトルが自動的に日本語に翻訳されます
- 🔖 **ブックマーク機能**: 気になった論文を保存できます
- 🏷️ **タグ管理**: 論文をカテゴリ分けして整理できます（音声認識、音楽情報処理など）
- 🔍 **高度な検索・フィルタリング**: キーワード、カテゴリ、日付、タグで論文を絞り込めます
- 🔐 **Google認証**: Googleアカウントでログインし、データはクラウドに同期されます
- 📱 **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応

## デモ

[デモサイト（GitHub Pages）](https://{username}.github.io/arxiv_sound_papers)

## 対象論文カテゴリ

- **cs.SD** - Computer Science: Sound
- **eess.AS** - Electrical Engineering and Systems Science: Audio and Speech Processing
- **cs.AI** - Computer Science: Artificial Intelligence（音響関連のみ）

## 技術スタック

### フロントエンド
- React 18
- Vite
- Tailwind CSS
- React Router
- Firebase (Authentication & Firestore)

### バックエンド（データ収集）
- Python 3.10+
- arXiv API
- Google Translate API

### ホスティング
- GitHub Pages

## セットアップ

### 前提条件

- Node.js 18以上
- Python 3.10以上
- Firebaseプロジェクト
- Google Translate APIキー（オプション）

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/{username}/arxiv_sound_papers.git
cd arxiv_sound_papers
\`\`\`

### 2. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成
2. **Authentication**を有効化し、Googleプロバイダーを設定
3. **Firestore Database**を作成（本番モードまたはテストモード）
4. Firestoreのルールを設定：

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

5. プロジェクト設定からWeb APIキーなどの情報を取得

### 3. 環境変数の設定

\`\`\`bash
# フロントエンド用
cp .env.example .env

# .envを編集してFirebaseの設定を追加
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
\`\`\`

\`\`\`bash
# Pythonスクリプト用（データ収集）
cd scripts
cp .env.example .env

# .envを編集してGoogle Translate APIキーを追加
GOOGLE_TRANSLATE_API_KEY=your_google_api_key
\`\`\`

### 4. 依存関係のインストール

\`\`\`bash
# フロントエンド
npm install

# Python（データ収集スクリプト）
cd scripts
pip install -r requirements.txt
cd ..
\`\`\`

### 5. 論文データの取得

\`\`\`bash
cd scripts
python main.py
cd ..
\`\`\`

これにより、`data/papers.json`に論文データが保存されます。

### 6. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

ブラウザで http://localhost:3000 を開きます。

## デプロイ

### GitHub Pagesへのデプロイ

1. **package.jsonの`homepage`を更新**

\`\`\`json
"homepage": "https://{your-username}.github.io/arxiv_sound_papers"
\`\`\`

2. **GitHubリポジトリでSecretsを設定**

リポジトリの Settings > Secrets and variables > Actions で以下を追加：

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `GOOGLE_TRANSLATE_API_KEY`（データ更新用）

3. **GitHub Pagesの設定**

Settings > Pages で以下を設定：
- Source: GitHub Actions

4. **デプロイ**

\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

GitHub Actionsが自動的にビルドしてデプロイします。

### 手動デプロイ

\`\`\`bash
npm run deploy
\`\`\`

## 使い方

### 論文の閲覧

1. ホームページで最新の音響関連論文を閲覧
2. キーワード検索、カテゴリフィルタ、日付フィルタで絞り込み
3. 論文タイトルをクリックしてarXivで詳細を確認

### ブックマーク

1. Googleアカウントでログイン
2. 論文カードのブックマークアイコン（📑）をクリック
3. 「ブックマーク」ページで保存した論文を管理

### タグ管理

1. 「タグ管理」ページで新しいタグを作成（例：「音声認識」「音楽情報処理」）
2. ブックマークページで論文にタグを追加
3. タグでフィルタリングして関連論文を素早く見つける

## 自動更新の設定

GitHub Actionsを使用して、毎日自動的に論文データを更新できます。

`.github/workflows/update-papers.yml`が設定済みです（毎日0時UTC = 日本時間9時に実行）。

手動で更新する場合：
- GitHubリポジトリの「Actions」タブ
- 「Update Papers Data」ワークフローを選択
- 「Run workflow」をクリック

## 開発

### プロジェクト構造

\`\`\`
arxiv_sound_papers/
├── .github/workflows/    # GitHub Actions
├── scripts/              # データ収集スクリプト
├── data/                 # 論文データ (JSON)
├── public/               # 静的ファイル
├── src/
│   ├── components/       # Reactコンポーネント
│   ├── pages/            # ページコンポーネント
│   ├── hooks/            # カスタムフック
│   ├── services/         # Firebase連携
│   ├── context/          # React Context
│   ├── utils/            # ユーティリティ
│   └── styles/           # スタイル
├── 要件定義書.md
├── システム設計書.md
└── README.md
\`\`\`

### コマンド

\`\`\`bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# デプロイ
npm run deploy

# 論文データ更新
cd scripts && python main.py
\`\`\`

## トラブルシューティング

### 論文データが表示されない

- `data/papers.json`が存在することを確認
- Pythonスクリプトを実行: `cd scripts && python main.py`

### Firebaseエラー

- `.env`ファイルのFirebase設定が正しいか確認
- Firebase Consoleで認証とFirestoreが有効化されているか確認

### 翻訳が動作しない

- Google Translate APIキーが正しく設定されているか確認
- APIの無料枠（月50万文字）を超えていないか確認

## ライセンス

MIT License

## クレジット

- 論文データ: [arXiv.org](https://arxiv.org)
- 翻訳: Google Translate API
- アイコン: Heroicons

## 貢献

Issue・Pull Requestを歓迎します！

## 今後の拡張案

- [ ] 論文のアブストラクト翻訳
- [ ] 論文のPDFダウンロード機能
- [ ] ブックマークのエクスポート（CSV/JSON）
- [ ] 論文の被引用数表示
- [ ] メモ機能
- [ ] PWA対応（オフライン閲覧）
- [ ] プッシュ通知（新着論文アラート）
