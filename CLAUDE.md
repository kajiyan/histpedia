# Histpedia

Wikipediaの記事編集履歴を時系列アニメーションで再生するビジュアライゼーションツール。

## スタック
- Next.js 14 (SSG) + TypeScript 5 + React 18
- Redux Toolkit + Immutable.js (状態管理)
- Emotion (CSS-in-JS)
- npm workspaces (モノレポ)
- AWS Amplify (Terraform管理)

## 構造
```
packages/
├── histpedia-app/       # メインNext.jsアプリ (src/, pages/)
├── eslint-config/       # 共有ESLint
├── postcss-config/      # 共有PostCSS
└── stylelint-config/    # 共有Stylelint
terraform/               # AWSインフラ (Amplify)
```

## コマンド
```bash
npm run app:dev          # 開発サーバー (port 3002)
npm run app:build        # ビルド
npm run lint             # ESLint実行
```

## デプロイ
```bash
cd terraform
terraform init && terraform apply  # AWS profile: nzu
```
Amplifyが`master`ブランチへのpushで自動デプロイ。

## アーキテクチャ
- **データ取得**: `src/services/wikiRepository.ts` - Wikipedia API統合
- **Redux Actions**: `src/actions/` - fetchPageId, fetchRevisions, fetchContent
- **コンポーネント**: Atomic Design (`atoms/`, `molecules/`, `organisms/`, `templates/`)
- **ページ**: `/` (検索), `/wiki/[titles]` (プレイヤー)

## 重要な規約
- IMPORTANT: Immutable.jsの`List`/`Map`を使用。plain objectに変換しない
- Redux storeは`next-redux-wrapper`で統合済み
- Wikipedia APIはJSONP経由 (`axios-jsonp`)
