import { TRACKING_URLS } from '@/constants'

export function getTrackingUrl(
  carrier: string,
  trackingId: string
): string | null {
  let baseUrl

  switch (carrier) {
    case 'ヤマト運輸':
    case 'アートセッティングデリバリー':
      baseUrl = TRACKING_URLS.YAMATO
      break

    case '佐川急便':
    case 'SGムービング':
      baseUrl = TRACKING_URLS.SAGAWA
      break

    case '日本郵便':
      baseUrl = TRACKING_URLS.JAPANPOST
      break

    case 'プラスカーゴサービス':
      baseUrl = TRACKING_URLS.PLUS_CS
      break

    case 'DHL':
      baseUrl = TRACKING_URLS.DHL
      break

    default:
      return null
  }

  return baseUrl + trackingId
}
