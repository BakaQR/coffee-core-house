<template>
	<view class="container">
		
		<match-media :max-width="749">
			<text class="title">gtnh calculate</text>
			<view class="img-container">
				<image src="/static/logo.png" class="img"></image>
			</view>
			<view class="content">
				<text>content</text>
				<text>content</text>
				<text>content</text>
				<text>content</text>
				<text>content</text>
			</view>
		</match-media>
		
		<match-media :min-width="750">
			<text class="title wide">gtnh calculate</text>
			<view class="double-container">
				<view class="img-container">
					<image src="/static/logo.png" class="img wide"></image>
				</view>
				<view class="content wide">
					<text>content</text>
					<text>content</text>
					<text>content</text>
					<text>content</text>
					<text>content</text>
				</view>
			</view>
		</match-media>
	</view>
</template>

<script setup>
import { onBackPress, onHide, onShow, onLoad, onUnload } from '@dcloudio/uni-app'
onBackPress((options) => {
	const { from } = options
	
	if(from === 'navigateBack'){
		return false
	}
	
	uni.showModal({
	    title: '提示',
	    content: '确定要离开吗？未保存的内容将丢失',
	    success: (res) => {
	      if (res.confirm) {
	        uni.navigateBack()
	      }else{
					console.log('cancel back')
				}
	    }
	  })
	return true
})

onHide(() => {
	console.log('gtnh-calculate on hide')
})

onShow(() => {
	console.log('gtnh-calculate on show')
})

onLoad(() => {
	console.log('gtnh-calculate on load')
})

onUnload(() => {
	console.log('gtnh-calculate on unload')
})

</script>

<style lang="scss">
.container{
	padding: 24rpx;
}

.title{
	font-size: 20rpx;
	font-weight: 500;
	
	&.wide{
		font-size: 20px;
	}
}

.content{
	font-size: 16rpx;
	
	&.wide{
		font-size: 16px;
	}
	
}

.double-container{
	display: flex;
}

.img{
	margin: auto;
	width: 480rpx;
	height: 480rpx;
	
	&.wide{
		width: 480px;
		height: 480px;
	}
	
}


</style>
