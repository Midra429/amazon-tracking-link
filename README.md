# <sub><img src="assets/icon.png" width="30px" height="30px"></sub> Amazon Tracking Link
[![GitHub Release](https://img.shields.io/github/v/release/Midra429/amazon-tracking-link?label=Releases)](https://github.com/Midra429/amazon-tracking-link/releases/latest)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fnbnieoencnmlipigdjeecaoafaigmdh?label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/fnbnieoencnmlipigdjeecaoafaigmdh)
[![Firefox Add-ons](https://img.shields.io/amo/v/amazon-tracking-link?label=Firefox%20Add-ons)](https://addons.mozilla.org/ja/firefox/addon/amazon-tracking-link/)

[<img src="assets/badges/chrome.png" height="60px">](https://chromewebstore.google.com/detail/fnbnieoencnmlipigdjeecaoafaigmdh)
[<img src="assets/badges/firefox.png" height="60px">](https://addons.mozilla.org/ja/firefox/addon/amazon-tracking-link/)

## 概要
Amazon.co.jpの配送状況のトラッキングIDを配送業者の追跡ページのリンクにする拡張機能です。

<img src="assets/capture_01.png" width="100%">

---

## 開発
### 環境
- [Bun](https://bun.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Chrome](https://www.google.com/intl/ja/chrome/)

### 開発サーバー
```sh
# Chrome
bun run dev:chrome
```
```sh
# Firefox
bun run dev:firefox
```

### 出力
```sh
# dist/chrome-mv3
# dist/firefox-mv3
bun run build
```
```sh
# dist/chrome-mv3
bun run build:chrome
```
```sh
# dist/firefox-mv3
bun run build:firefox
```

### 出力 (ZIP)
```sh
# dist/amazon-tracking-link-0.0.0-chrome.zip
# dist/amazon-tracking-link-0.0.0-firefox.zip
# dist/amazon-tracking-link-0.0.0-sources.zip
bun run zip
```
```sh
# dist/amazon-tracking-link-0.0.0-chrome.zip
bun run zip:chrome
```
```sh
# dist/amazon-tracking-link-0.0.0-firefox.zip
# dist/amazon-tracking-link-0.0.0-sources.zip
bun run zip:firefox
```

## ライセンス
当ライセンスは [MIT](LICENSE.txt) ライセンスの規約に基づいて付与されています。
