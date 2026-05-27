import { defineContentScript } from '#imports'

import {
  CARRIER_REGEXP,
  EXTERNAL_LINK_ICON_SVG,
  TRACKING_ID_REGEXP,
} from '@/constants'
import { getTrackingUrl } from '@/utils/getTrackingUrl'

export default defineContentScript({
  matches: [
    'https://www.amazon.co.jp/gp/your-account/ship-track?*',
    'https://www.amazon.co.jp/progress-tracker/package?*',
  ],
  runAt: 'document_end',
  main: () => {
    // トラッキングID要素
    const trackingIdElems = document.querySelectorAll(
      '.pt-delivery-card-trackingId, .tracking-event-trackingId-text > h4'
    )

    for (const trackingIdElem of trackingIdElems) {
      // 配送業者
      const carrier = (
        trackingIdElem.previousElementSibling ??
        trackingIdElem.parentElement?.previousElementSibling
      )?.textContent.match(CARRIER_REGEXP)?.[0]
      if (!carrier) return

      // 追跡番号
      const trackingId =
        trackingIdElem.textContent.match(TRACKING_ID_REGEXP)?.[0]
      if (!trackingId) return

      // 追跡ページのURL
      const trackingUrl = getTrackingUrl(carrier, trackingId)
      if (!trackingUrl) return

      // 追跡ページのリンク
      const anchor = document.createElement('a')
      anchor.style.display = 'inline-flex'
      anchor.style.alignItems = 'center'
      anchor.style.gap = '0.25em'
      anchor.target = '_blank'
      anchor.rel = 'noreferrer'
      anchor.href = trackingUrl
      anchor.textContent = trackingId
      anchor.insertAdjacentHTML('beforeend', EXTERNAL_LINK_ICON_SVG)

      // トラッキングIDをリンクに置き換える
      trackingIdElem.textContent = trackingIdElem.textContent.replace(
        TRACKING_ID_REGEXP,
        ''
      )
      trackingIdElem.appendChild(anchor)
    }
  },
})
