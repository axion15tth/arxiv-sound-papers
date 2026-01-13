# セットアップガイド

このガイドでは、arXiv Sound Papers Viewerを初めてセットアップする手順を詳しく説明します。

## 目次

1. [前提条件の確認](#前提条件の確認)
2. [Firebaseプロジェクトの作成](#firebaseプロジェクトの作成)
3. [Google Translate APIの設定](#google-translate-apiの設定)
4. [ローカル環境のセットアップ](#ローカル環境のセットアップ)
5. [GitHubリポジトリの作成とデプロイ](#githubリポジトリの作成とデプロイ)
6. [動作確認](#動作確認)

---

## 前提条件の確認

以下がインストールされていることを確認してください：

- **Node.js**: バージョン18以上
  ```bash
  node --version  # v18.0.0以上
  ```

- **npm**: Node.jsに付属
  ```bash
  npm --version
  ```

- **Python**: バージョン3.10以上
  ```bash
  python3 --version  # 3.10以上
  ```

- **Git**
  ```bash
  git --version
  ```

---

## Firebaseプロジェクトの作成

### 1. Firebaseコンソールにアクセス

[Firebase Console](https://console.firebase.google.com/)にアクセスし、Googleアカウントでログインします。

### 2. 新しいプロジェクトを作成

1. 「プロジェクトを追加」をクリック
2. プロジェクト名を入力（例：`arxiv-sound-papers`）
3. Google Analyticsは任意（オフでも可）
4. 「プロジェクトを作成」をクリック

### 3. Authenticationの設定

1. 左側メニューから「Authentication」を選択
2. 「始める」をクリック
3. 「Sign-in method」タブを開く
4. 「Google」を選択し、有効化
5. プロジェクトのサポートメールを設定
6. 「保存」をクリック

### 4. Firestoreの設定

1. 左側メニューから「Firestore Database」を選択
2. 「データベースの作成」をクリック
3. ロケーションを選択（例：`asia-northeast1`）
4. セキュリティルールで「本番モード」または「テストモード」を選択
   - **本番モード推奨**（後でルールを設定）
5. 「有効にする」をクリック

### 5. Firestoreセキュリティルールの設定

1. Firestoreの「ルール」タブを開く
2. 以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーは自分のデータのみアクセス可能
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // その他のデータは読み書き不可
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. 「公開」をクリック

### 6. Web アプリの追加

1. プロジェクトの概要ページで「</>」（Webアイコン）をクリック
2. アプリのニックネームを入力（例：`arXiv Sound Papers Web`）
3. 「Firebase Hostingを設定」はチェックしない
4. 「アプリを登録」をクリック
5. **firebaseConfig**の内容をメモ（後で使用）

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## Google Translate APIの設定

### 1. Google Cloud Consoleにアクセス

[Google Cloud Console](https://console.cloud.google.com/)にアクセス。

### 2. プロジェクトを選択

先ほど作成したFirebaseプロジェクトを選択（同じプロジェクトIDが表示されます）。

### 3. Cloud Translation APIを有効化

1. 「APIとサービス」 > 「ライブラリ」を開く
2. 「Cloud Translation API」を検索
3. 「有効にする」をクリック

### 4. APIキーの作成

1. 「APIとサービス」 > 「認証情報」を開く
2. 「認証情報を作成」 > 「APIキー」を選択
3. APIキーが作成される（メモしておく）
4. **重要**: 「キーを制限」をクリック
   - アプリケーションの制限: なし（または「IPアドレス」を選択）
   - API の制限: 「キーを制限」を選択
   - 「Cloud Translation API」のみを選択
   - 「保存」をクリック

---

## ローカル環境のセットアップ

### 1. プロジェクトをクローン

```bash
git clone https://github.com/{username}/arxiv_sound_papers.git
cd arxiv_sound_papers
```

### 2. フロントエンドの環境変数を設定

```bash
cp .env.example .env
```

`.env`ファイルを編集：

```env
VITE_FIREBASE_API_KEY=AIza... # Firebaseの設定から取得
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 3. Pythonスクリプトの環境変数を設定

```bash
cd scripts
cp .env.example .env
```

`scripts/.env`ファイルを編集：

```env
GOOGLE_TRANSLATE_API_KEY=your_google_api_key
```

### 4. 依存関係をインストール

```bash
# フロントエンド
cd ..  # プロジェクトルートに戻る
npm install

# Python
cd scripts
pip install -r requirements.txt
cd ..
```

### 5. 論文データを取得

```bash
cd scripts
python main.py
cd ..
```

実行すると：
- arXiv APIから最新の論文を取得
- タイトルを日本語に翻訳
- `data/papers.json`に保存

### 6. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

---

## GitHubリポジトリの作成とデプロイ

### 1. GitHubでリポジトリを作成

1. [GitHub](https://github.com/)にログイン
2. 「New repository」をクリック
3. リポジトリ名: `arxiv_sound_papers`
4. Public または Private を選択
5. 「Create repository」をクリック

### 2. ローカルリポジトリをGitHubにプッシュ

```bash
git remote add origin https://github.com/{username}/arxiv_sound_papers.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3. package.jsonのhomepageを更新

`package.json`を編集：

```json
{
  "homepage": "https://{your-username}.github.io/arxiv_sound_papers",
  ...
}
```

コミット：

```bash
git add package.json
git commit -m "Update homepage URL"
git push
```

### 4. GitHub Secretsを設定

リポジトリの「Settings」 > 「Secrets and variables」 > 「Actions」 > 「New repository secret」

以下のシークレットを追加：

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | Firebaseの`apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebaseの`authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | Firebaseの`projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebaseの`storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebaseの`messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | Firebaseの`appId` |
| `GOOGLE_TRANSLATE_API_KEY` | Google Translate APIキー |

### 5. GitHub Pagesの設定

1. リポジトリの「Settings」 > 「Pages」
2. Source: **GitHub Actions**を選択
3. 保存

### 6. デプロイ

コミットをプッシュすると、GitHub Actionsが自動的にビルドしてデプロイします。

```bash
git push
```

「Actions」タブで進捗を確認できます。

完了後、以下のURLでアクセス可能：
```
https://{your-username}.github.io/arxiv_sound_papers
```

---

## 動作確認

### 1. Webサイトにアクセス

デプロイしたURLにアクセス。

### 2. 論文一覧の確認

- 論文が表示されることを確認
- 日本語タイトルが表示されることを確認

### 3. ログイン

- 「Googleでログイン」をクリック
- Googleアカウントでログイン

### 4. ブックマーク

- 論文のブックマークアイコンをクリック
- 「ブックマーク」ページで確認

### 5. タグ管理

- 「タグ管理」ページでタグを作成
- ブックマークした論文にタグを追加
- タグでフィルタリング

---

## よくある質問

### Q1: 論文データが表示されない

**A**: 以下を確認してください：
- `data/papers.json`が存在するか
- Pythonスクリプトを実行したか: `cd scripts && python main.py`

### Q2: ログインできない

**A**: 以下を確認してください：
- Firebase Authenticationが有効化されているか
- Googleプロバイダーが有効化されているか
- `.env`のFirebase設定が正しいか

### Q3: ブックマークが保存されない

**A**: 以下を確認してください：
- Firestoreが有効化されているか
- Firestoreのセキュリティルールが正しく設定されているか

### Q4: 翻訳が動作しない

**A**: 以下を確認してください：
- Google Translate APIが有効化されているか
- APIキーが正しく設定されているか
- APIの無料枠を超えていないか（月50万文字まで）

### Q5: GitHub Pagesにデプロイできない

**A**: 以下を確認してください：
- GitHub Secretsが正しく設定されているか
- GitHub Pagesで「GitHub Actions」が選択されているか
- GitHub Actionsのログでエラーを確認

---

## サポート

問題が解決しない場合は、GitHubリポジトリでIssueを作成してください。

---

以上でセットアップ完了です。お疲れ様でした！
