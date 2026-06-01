// ==UserScript==
// @name Amazon Tracking Link
// @namespace https://midra.me/
// @version 1.0.2
// @description Amazon.co.jpの配送状況のトラッキングIDを配送業者の追跡ページのリンクにする拡張機能
// @homepage https://github.com/Midra429/amazon-tracking-link
// @author Midra <me@midra.me> (https://github.com/Midra429)
// @license MIT
// @match https://www.amazon.co.jp/gp/your-account/ship-track?*
// @match https://www.amazon.co.jp/progress-tracker/package?*
// @icon https://www.amazon.co.jp/favicon.ico
// @run-at document-end
// @noframes
// @updateURL https://raw.githubusercontent.com/Midra429/amazon-tracking-link/refs/heads/main/dist/amazon-tracking-link.user.js
// @downloadURL https://raw.githubusercontent.com/Midra429/amazon-tracking-link/refs/heads/main/dist/amazon-tracking-link.user.js
// ==/UserScript==
"use strict";
(function() {
	//#endregion
	//#region src/constants.ts
	const CARRIER_REGEXP = /(?<=\s)[^\s]+(?=\n|$)/;
	const TRACKING_ID_REGEXP = /(?<=\s)\d+(?=\n|$)/;
	const TRACKING_URLS = {
		YAMATO: "https://member.kms.kuronekoyamato.co.jp/parcel/detail?pno=",
		SAGAWA: "https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=",
		JAPANPOST: "https://trackings.post.japanpost.jp/services/srv/search/direct?locale=ja&reqCodeNo1=",
		PLUS_CS: "https://www.plus-cs.co.jp/kagu/?jt_cd01=",
		DHL: "https://www.dhl.com/jp-ja/home/tracking.html?submit=1&tracking-id="
	};
	const EXTERNAL_LINK_ICON_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>";
	//#endregion
	//#region src/utils/getTrackingUrl.ts
	function getTrackingUrl(carrier, trackingId) {
		let baseUrl;
		switch (carrier) {
			case "ヤマト運輸":
			case "アートセッティングデリバリー":
				baseUrl = TRACKING_URLS.YAMATO;
				break;
			case "佐川急便":
			case "SGムービング":
				baseUrl = TRACKING_URLS.SAGAWA;
				break;
			case "日本郵便":
				baseUrl = TRACKING_URLS.JAPANPOST;
				break;
			case "プラスカーゴサービス":
				baseUrl = TRACKING_URLS.PLUS_CS;
				break;
			case "DHL":
				baseUrl = TRACKING_URLS.DHL;
				break;
			default: return null;
		}
		return baseUrl + trackingId;
	}
	function main() {
		const trackingIdElems = document.querySelectorAll(".pt-delivery-card-trackingId, .tracking-event-trackingId-text > h4");
		for (const trackingIdElem of trackingIdElems) {
			const carrier = (trackingIdElem.previousElementSibling ?? trackingIdElem.parentElement?.previousElementSibling)?.textContent.match(CARRIER_REGEXP)?.[0];
			if (!carrier) return;
			const trackingId = trackingIdElem.textContent.match(TRACKING_ID_REGEXP)?.[0];
			if (!trackingId) return;
			const trackingUrl = getTrackingUrl(carrier, trackingId);
			if (!trackingUrl) return;
			const anchor = document.createElement("a");
			anchor.style.display = "inline-flex";
			anchor.style.alignItems = "center";
			anchor.style.gap = "0.25em";
			anchor.target = "_blank";
			anchor.rel = "noreferrer";
			anchor.href = trackingUrl;
			anchor.textContent = trackingId;
			anchor.insertAdjacentHTML("beforeend", EXTERNAL_LINK_ICON_SVG);
			trackingIdElem.textContent = trackingIdElem.textContent.replace(TRACKING_ID_REGEXP, "");
			trackingIdElem.appendChild(anchor);
		}
	}
	//#endregion
	//#region src/userscript.ts
	main();
	//#endregion
})();
