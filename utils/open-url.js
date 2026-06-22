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
	if(url === 'https://tingdong.cn/'){
		uni.navigateToMiniProgram({
		  appId: 'wxd93af1a26eaeba9e',      // 必填，wx 开头
		  extraData: {
		    from: 'bakaqr_coffee_core_house',
		    userId: 'wx3b438c249d99f80f'
		  },
		  envVersion: 'release',               // release / trial / develop
		  success(res) {
		    console.log('跳转成功', res)
		  },
		  fail(err) {
		    console.error('跳转失败', err.errMsg)
		    uni.showToast({ title: '无法打开小程序' })
		  }
		})
	}else{
		uni.navigateTo({
			url: '/pages/webview/webview?url=' + encodeURIComponent(url)
		})
	}
  // #endif
}