# jyousho-official-site

情報処理研究会の公式サイトです。Astro でトップページ、班紹介、作品集、制作記録、文化祭ページを静的 HTML として生成し、Cloudflare Workers の静的アセット配信で公開します。

- 公開 URL: https://jyoushotku.com/
- Node.js: 22.12 以上

## 構成

```txt
src/pages/                 ページ
src/components/            共通 UI
src/layouts/               共通レイアウト
src/data/site.ts           サイト名、ナビ、班情報、文化祭情報
src/content/blog/*.md      制作記録
src/content/works/*.md     作品紹介
src/styles/global.css      全体の見た目
public/images/             画像アセット
```

## ローカル確認

```sh
npm install
npm run dev
```

表示された `http://localhost:4321/` をブラウザで開きます。公開前は必ずビルドを確認してください。

```sh
npm run build
```

## 作品の追加

`src/content/works/` に Markdown ファイルを追加します。ファイル名が URL になります。

例: `src/content/works/my-game.md`

```md
---
title: "作品タイトル"
description: "作品一覧に表示する短い説明"
publishedAt: 2026-07-01
team:
  - programming
creator: "制作者名またはチーム名"
image: "/images/works/my-game.webp"
imageAlt: "作品のスクリーンショット"
featured: false
tags:
  - Web
externalUrl: "https://example.com"
draft: false
---

作品紹介を書きます。
```

下書きのひな形は `src/content/works/_template.md` にあります。

`team` は `programming`、`illustration`、`cg`、`video`、`music` から選びます。複数班の混合作品は複数行で書けます。

```md
team:
  - programming
  - illustration
  - video
```

1つの班だけの場合は、短く `team: programming` と書いても大丈夫です。

`featured` は作品一覧ページの先頭に大きく表示するかどうかです。通常の作品は `featured: false` のままで大丈夫です。特に見せたい作品だけ `featured: true` にしてください。複数の作品を `true` にした場合は、新しい日付の作品が優先されます。

`externalUrl` は作品の公開 URL がある場合だけ書きます。ない場合は行ごと削除して構いません。

### 作品画像

作品画像は `public/images/works/` に置きます。Markdown からは `/images/works/ファイル名` で参照します。

```txt
public/images/works/my-game.webp
```

frontmatter の `image` にはこのように書きます。

```md
image: "/images/works/my-game.webp"
imageAlt: "作品のスクリーンショット"
```

本文中に画像を入れたい場合も同じパスを使えます。

```md
![ゲーム画面](/images/works/my-game-screen.webp)
```

画像形式は `webp`、`jpg`、`png` が使えます。ファイル名は日本語や空白を避けて、英数字とハイフンで `my-game-screen.webp` のようにすると安全です。

## 文化祭ページの更新

開催年、日程、場所、時間、来場時のお願いは `src/data/site.ts` の `festival` を編集します。文化祭ページ（`/festival`）と、トップページの文化祭案内の両方に反映されます。

```ts
export const festival = {
  year: '2026',
  date: '10月10日（土）・11日（日）',
  place: '第1校舎 3階',
  time: '9:00–16:00',
  notice: '混雑時は入場をお待ちいただくことがあります。',
};
```

| 項目 | 表示される場所 |
| :-- | :-- |
| `year` | 文化祭ページの見出し「文化祭」の横 |
| `date` | 文化祭ページの開催日、トップページの文化祭案内 |
| `place` | 文化祭ページの場所と会場、トップページの文化祭案内 |
| `time` | 文化祭ページの開催時間（開催情報とアクセス案内の両方） |
| `notice` | 文化祭ページの「お願い」 |

まだ決まっていない項目は、`日程が決まり次第お知らせします` のように「決まり次第お知らせします」と書きます。

駅からの行き方は `src/pages/festival/index.astro` の「アクセス」に直接書いてあります。駅名や徒歩時間を変えるときは、このファイルを編集します。見出し「つくる、試す、公開する。」と、その下の紹介文も同じファイルです。

保存したあと `npm run dev` を起動し、`http://localhost:4321/festival` とトップページで文言を確認します。公開前は `npm run build` も通してください。

## 主な編集場所

| ファイル | 役割 |
| :-- | :-- |
| `src/data/site.ts` | ナビ、班情報、文化祭の基本情報 |
| `src/pages/index.astro` | トップページ |
| `src/pages/about.astro` | 私たちについて |
| `src/pages/teams.astro` | 班紹介 |
| `src/pages/works/index.astro` | 作品一覧 |
| `src/pages/blog/index.astro` | 制作記録一覧 |
| `src/pages/festival/index.astro` | 文化祭ページ |
| `src/styles/global.css` | デザイン全体 |

## 公開

Cloudflare Workers の静的アセット配信は `wrangler.jsonc` で設定しています。

```sh
npm run build
npx wrangler deploy
```

GitHub 連携で公開している場合は、Cloudflare ダッシュボードの Deployments で成功・失敗を確認してください。
