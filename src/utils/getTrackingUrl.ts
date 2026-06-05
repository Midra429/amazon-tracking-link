import { TRACKING_URLS } from '@/constants'

export function getTrackingUrl(
  carrier: string,
  trackingId: string
): string | null {
  let baseUrl

  // ヤマト運輸
  if (
    carrier.includes('ヤマト運輸') ||
    carrier.includes('アートセッティングデリバリー')
  ) {
    baseUrl = TRACKING_URLS.YAMATO
  }
  // 佐川急便
  else if (carrier.includes('佐川急便') || carrier.includes('SGムービング')) {
    baseUrl = TRACKING_URLS.SAGAWA
  }
  // 日本郵便
  else if (carrier.includes('日本郵便')) {
    baseUrl = TRACKING_URLS.JAPANPOST
  }
  // プラスカーゴサービス
  else if (carrier.includes('プラスカーゴサービス')) {
    baseUrl = TRACKING_URLS.PLUS_CS
  }
  // DHL
  else if (carrier.includes('DHL')) {
    baseUrl = TRACKING_URLS.DHL
  }

  if (!baseUrl) return null

  return baseUrl + trackingId
}
