import { defineContentScript } from '#imports'

import {
  DELIVERY_COMPANY_REGEXP,
  EXTERNAL_LINK_ICON_SVG,
  TRACKING_ID_REGEXP,
  TRACKING_URLS,
} from '@/constants'

export default defineContentScript({
  matches: ['https://www.amazon.co.jp/gp/your-account/ship-track?*'],
  runAt: 'document_end',
  main: () => void main(),
})

function getTrackingUrlBase(deliveryCompany: string): string | null {
  switch (deliveryCompany) {
    case 'ヤマト運輸':
      return TRACKING_URLS.YAMATO
    case '佐川急便':
      return TRACKING_URLS.SAGAWA
    case '日本郵便':
      return TRACKING_URLS.JAPANPOST
    case '福山通運':
      return TRACKING_URLS.FUKUTSU
    default:
      return null
  }
}

function main() {
  // トラッキングID要素
  const trackingIdElem = document.querySelector('.pt-delivery-card-trackingId')
  if (!trackingIdElem) return

  // 配送業者
  const deliveryCompany =
    trackingIdElem.previousElementSibling?.textContent.match(
      DELIVERY_COMPANY_REGEXP
    )?.[0]
  if (!deliveryCompany) return

  // 追跡番号
  const trackingId = trackingIdElem.textContent.match(TRACKING_ID_REGEXP)?.[0]
  if (!trackingId) return

  // 追跡ページのURL
  const trackingUrlBase = getTrackingUrlBase(deliveryCompany)
  if (!trackingUrlBase) return

  // 追跡ページのリンク
  const anchor = document.createElement('a')
  anchor.style.display = 'inline-flex'
  anchor.style.alignItems = 'center'
  anchor.style.gap = '0.125em'
  anchor.target = '_blank'
  anchor.rel = 'noreferrer'
  anchor.href = trackingUrlBase + trackingId

  const span = document.createElement('span')
  span.textContent = trackingId
  anchor.appendChild(span)

  anchor.insertAdjacentHTML('beforeend', EXTERNAL_LINK_ICON_SVG)

  // トラッキングIDをリンクに置き換える
  trackingIdElem.textContent = trackingIdElem.textContent.replace(
    TRACKING_ID_REGEXP,
    ''
  )
  trackingIdElem.appendChild(anchor)
}
