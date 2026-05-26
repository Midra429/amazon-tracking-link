export const GITHUB_URL = 'https://github.com/Midra429/amazon-tracking-link'

export const DELIVERY_COMPANY_REGEXP = /(?<=\s)[^\s]+$/

export const TRACKING_ID_REGEXP = /(?<=\s)\d+$/

export const TRACKING_URLS = {
  /** ヤマト運輸, アートセッティングデリバリー */
  YAMATO: 'https://member.kms.kuronekoyamato.co.jp/parcel/detail?pno=',
  /** 佐川急便, SGムービング */
  SAGAWA: 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=',
  /** 日本郵便 */
  JAPANPOST:
    'https://trackings.post.japanpost.jp/services/srv/search/direct?locale=ja&reqCodeNo1=',
  /** プラスカーゴサービス */
  PLUS_CS: 'https://www.plus-cs.co.jp/kagu/?jt_cd01=',
  /** DHL */
  DHL: 'https://www.dhl.com/jp-ja/home/tracking.html?submit=1&tracking-id=',
}

export const EXTERNAL_LINK_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'
