export function openUrl(url) {
  if (!/^https?:\/\//.test(url)) {
    console.warn('openUrl: not a http(s) url', url)
    return
  }

  // #ifdef H5
  window.open(url, '_blank')
  // #endif

  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif

  // #ifdef MP-WEIXIN
  // 小程序：只能 web-view 页
  uni.navigateTo({
    url: '/pages/webview/webview?url=' + encodeURIComponent(url)
  })
  // #endif
}