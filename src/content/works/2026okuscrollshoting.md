---
title: "奥スクロールシューティング"
description: "Unityとblenderで奥スクロールシューティングゲームを制作しました"
publishedAt: 2026-11-12
team:
  - cg
  - programming
creator: "ヨワミドリ"
image: "/images/works/2026okuscrollshoting/stage1.jpg"
imageAlt: "ステージ1のプレイ画面"
featured: false
tags:
  - Unity
  - Blender
draft: false
---


![敵1](/images/works/2026okuscrollshoting/enemy1.jpg)
![敵2](/images/works/2026okuscrollshoting/enemy2.jpg)
![敵3](/images/works/2026okuscrollshoting/enemy3.jpg)
![主人公機](/images/works/2026okuscrollshoting/mech.jpg)
![ライフル](/images/works/2026okuscrollshoting/rifle.jpg)
![ステージ1](/images/works/2026okuscrollshoting/stage1.jpg)
![ステージ2](/images/works/2026okuscrollshoting/stage2.jpg)
![ステージ3](/images/works/2026okuscrollshoting/stage3.jpg)



## 作品概要


プレイヤーがロボットを操作して奥から飛んでくる敵を倒すシューティングゲームです。<br>
ロボットや敵はBlenderを用いてモデリングし、FBX形式でUnityに取り込んでいます。<br>
一部のコードにはClaudeやGeminiに生成させたものを用いています。<br>
HPのUIであるハートはBlenderでモデリングした後、スクリーンショットをクリスタで切り抜いたものを書き出したものを利用しています。（奥行を表現するため画面を透視投影で表示しているため。）






## 使用した技術・ツール


- Unity
- Blender
- CLIP STUDIO PAINT
- Claude
- Gemini


## 工夫した点


敵の出現位置をランダムにするために敵の出現元となる空のオブジェクトが往復移動と往復回転を行うようにしました。<br>
Claudeに出力させる場合は使用したいUnityの機能を細かく指定することで期待通りのものが出力されるようにしました。


## URL


https://github.com/yowamidori/2026shooting