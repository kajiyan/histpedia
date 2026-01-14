# Histpedia

Wikipediaの編集履歴をアニメーション再生するビジュアライゼーションツール

[![Demo](https://img.youtube.com/vi/9BNzmqYtRQU/0.jpg)](https://www.youtube.com/watch?v=9BNzmqYtRQU)

> デモ動画をクリックして再生

## 概要

Histpediaは、日本語版Wikipediaの記事がどのように編集・成長してきたかを視覚的に体験できるWebアプリケーションです。記事の編集履歴をタイムライン形式で再生し、各編集者の貢献を時系列で確認できます。

### このツールでできること

- Wikipedia記事の誕生から現在までの変遷を「動画」のように再生
- 各編集でどこが変更されたかを差分表示で確認
- 任意の時点にシークバーでジャンプ
- 特定のリビジョンをSNSで共有
- 記事に貢献したすべての編集者をエンドロールで表示

## 主要機能

| 機能 | 説明 |
|------|------|
| 記事検索 | Wikipedia記事をタイトルで検索 |
| タイムライン再生 | 編集履歴を1秒間隔で自動再生 |
| 差分表示モード | 連続するリビジョン間の変更箇所をハイライト |
| シークバー | 任意のリビジョンにジャンプ、編集量をグラフで可視化 |
| SNS共有 | Twitter/Facebookで特定時点を共有 |
| エンドロール | すべての編集者をクレジット表示 |

## 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Next.js | 9.4.4 |
| 言語 | TypeScript | 3.9.3 |
| UIライブラリ | React | 16.13.1 |
| 状態管理 | Redux + Redux Thunk | 4.0.5 |
| データ構造 | Immutable.js | 4.0.0-rc.12 |
| スタイリング | Emotion (CSS-in-JS) | 10.0.28 |
| HTTPクライアント | Axios + JSONP | 0.19.2 |
| パッケージ管理 | Yarn Workspaces | - |

## プロジェクト構成

Yarn Workspacesを使用したモノレポ構成です。

```plaintext
histpedia/
├── packages/
│   ├── histpedia-app/          # メインNext.jsアプリケーション
│   │   ├── pages/              # Next.jsページ
│   │   │   ├── index.tsx       # ホームページ（検索）
│   │   │   └── wiki/[titles]/  # 記事再生ページ
│   │   ├── src/
│   │   │   ├── components/     # Reactコンポーネント
│   │   │   │   ├── atoms/      # 基本UI要素
│   │   │   │   ├── molecules/  # 複合コンポーネント
│   │   │   │   ├── organisms/  # 機能単位コンポーネント
│   │   │   │   └── templates/  # ページテンプレート
│   │   │   ├── actions/        # Reduxアクション
│   │   │   ├── reducers/       # Reduxリデューサー
│   │   │   ├── services/       # API通信サービス
│   │   │   ├── store/          # Reduxストア設定
│   │   │   └── utils/          # ユーティリティ関数
│   │   └── public/             # 静的ファイル
│   ├── eslint-config/          # 共有ESLint設定
│   ├── postcss-config/         # 共有PostCSS設定
│   └── stylelint-config/       # 共有Stylelint設定
├── package.json                # ルートワークスペース設定
├── tsconfig.json               # TypeScript設定
└── yarn.lock                   # 依存関係ロックファイル
```

## セットアップ

### 必要な環境

- Node.js
- Yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kajiyan/histpedia.git
cd histpedia

# 依存関係をインストール
yarn install
```

### 開発サーバーの起動

```bash
yarn app:dev
```

ブラウザで <http://localhost:3002> を開きます。

### 本番ビルド

```bash
# ビルド
yarn app:build

# サーバー起動
yarn app:start
```

## 利用可能なスクリプト

### 開発

| コマンド | 説明 |
|---------|------|
| `yarn app:dev` | 開発サーバー起動（Port 3002） |
| `yarn app:analyze` | バンドルサイズ分析 |
| `yarn lint` | ESLint + Stylelint実行 |
| `yarn lint:script` | ESLintのみ実行 |
| `yarn lint:style` | Stylelintのみ実行 |

### ビルド・デプロイ

| コマンド | 説明 |
|---------|------|
| `yarn app:build` | 本番用ビルド |
| `yarn app:start` | 本番サーバー起動 |
| `yarn app:export` | 静的HTMLエクスポート |
| `yarn app:preprod` | ビルド前クリーンアップ |

### サーバー管理（PM2）

| コマンド | 説明 |
|---------|------|
| `yarn app:server:launch` | PM2でサーバー起動 |
| `yarn app:server:delete` | PM2プロセス削除 |
| `yarn app:server:logs` | PM2ログ表示 |

## アーキテクチャ

### コンポーネント設計（Atomic Design）

```plaintext
atoms/          → 最小UI要素（ボタン、入力フィールド等）
  ├── playButton.tsx
  ├── scrubber.tsx
  └── searchField.tsx

molecules/      → atomsの組み合わせ
  ├── seekbar.tsx
  ├── wikiBook.tsx
  └── endroll.tsx

organisms/      → 機能単位のコンポーネント
  ├── controller.tsx    # 再生コントローラー
  ├── player.tsx        # メインプレイヤー
  ├── searchForm.tsx    # 検索フォーム
  └── shareDialog.tsx   # 共有ダイアログ

templates/      → ページレイアウト
  ├── home.tsx
  └── wiki.tsx
```

### データフロー

```plaintext
ユーザー入力
    ↓
[SearchForm] 記事タイトル入力
    ↓
[Redux Action] fetchPageId → fetchRevisions → fetchContent
    ↓
[Wikipedia API] ja.wikipedia.org/w/api.php
    ↓
[Redux Store] entities.history (Immutable.js Map)
    ↓
[Controller] 1秒間隔で currentEntityIdIndex をインクリメント
    ↓
[Player/WikiBook] 該当リビジョンのコンテンツを表示
```

### Wikipedia API連携

エンドポイント: `https://ja.wikipedia.org/w/api.php`

| API | 用途 |
|-----|------|
| `action=query&titles=...` | ページID取得 |
| `action=query&prop=revisions` | リビジョン一覧取得 |
| `action=parse&oldid=...` | 特定リビジョンのHTML取得 |
| `/api/rest_v1/page/` | スタイルシート取得 |

## 設定ファイル

### TypeScript (`tsconfig.json`)

- ターゲット: ES5（IE11互換）
- Strictモード有効
- パスエイリアス: `~` → `./src`

### ESLint

- ベース: Airbnb + TypeScript
- Prettier統合
- React Hooks対応

### Next.js (`next.config.js`)

- バンドル分析（`ANALYZE=true`）
- 画像最適化
- Web Worker対応
- CSS Modules有効

## ブラウザ対応

- モダンブラウザ（Chrome, Firefox, Safari, Edge）
- IE11（core-jsポリフィル使用）
- モバイル対応（UA検出による最適化）

## 作者

@kajiyan

- GitHub: <https://github.com/kajiyan>

## ライセンス

このプロジェクトはプライベートリポジトリです。
