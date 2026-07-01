<template>
	<view class="header">
		<uni-swiper-dot :info="swiperImage" :current="swiperCurrentIndex" 
			:dots-styles="{
				backgroundColor: 'rgba(83, 200, 249,0.3)',
				border: '1px rgba(83, 200, 249,0.3) solid',
				color: '#fff',
				selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
				selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
			}">
			<swiper class="banner-swiper"
				circular
				:autoplay="true"
				:interval="5000"
				:duration="1000"
				@change="swiperChange">
				<swiper-item v-for="(item, index) in swiperImage" :key="index">
					<image :src="item" mode="aspectFit" class="banner-images"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
	
	<view class="container">
		<view>
			<text color="#027fff" class="grid-title-text">GTNH 工具</text>
			<uni-section class="mb-10" :title="dataVersion" type="line" titleFontSize='22rpx' ></uni-section>
			<view class="grid-nav">
				<view class="grid-item-container" 
					v-for="item in gtnhNavList" 
					:index="item.id" 
					:key="item.id"
					@click="toPage(item.page)">
					<image v-if="item.icon" :src="item.icon"/>
					<uni-icons v-else type="plusempty" size="100rpx"></uni-icons>
					<text class="grid-item-title">{{ item.name }}</text>
				</view>
			</view>
		</view>
		
		<view>
			<text color="#027fff"  class="grid-title-text">推荐</text>
			<uni-section class="mb-10" title="注意：以下均为外站链接，个人认为值得分享的网站，仅推荐，与本站无关" type="line" titleFontSize='22rpx' ></uni-section>
			<view class="grid-nav">
				<view class="grid-item-container" 
					v-for="item in outsideNavList" 
					:index="item.id" 
					:key="item.id"
					@click="openUrl(item.url)">
					<image v-if="item.icon" :src="item.icon"/>
					<uni-icons v-else type="plusempty" size="100"></uni-icons>
					<text class="grid-item-title">{{ item.name }}</text>
					<text class="grid-item-description">{{ item.description }}</text>
				</view>
			</view>
		</view>
		
	</view>
	
	<view class="foot">
		<text>About: Program By BakaQR</text>
		<text>Github: github.com/BakaQR</text>
	</view>
	
</template>

<script setup>
import { ref } from 'vue';
import { openUrl } from '@/utils/open-url.js'

const app = getApp()
const appName = ref(app.globalData.appName)
const version = ref(app.globalData.version)
const dataVersion = ref("当前数据版本: " + app.globalData.gtnhDataVersion)

const swiperImage = [
	'/static/background/Homepage-background-01.jpg',
	'/static/background/Homepage-background-02.jpg',
	'/static/background/Homepage-background-03.jpg'
]

const swiperCurrentIndex = ref(0)

const swiperChange = (e) => {
	swiperCurrentIndex.value = e.detail.current
}

const gtnhNavList = [
	{ id: 1, name: 'GTNH矿脉定位器', icon: '/static/gtnh/ores/iron-ore.png', page: 'gtnh-veins' },
	{ id: 2, name: 'GTNH材料计算器', icon: '/static/gtnh/material/iron.png', page:'gtnh-material' },
	{ id: 3, name: '敬请期待...' },
]

// 外站链接
const outsideNavList = [
	{
		id: 100, name: 'Miku工具箱', 
		icon: '/static/logo/logo-mktools.png',
		url: 'https://tools.miku.ac/',
		description: '大量好用有趣的AI工具'
	},
	{ 
		id: 101, name: '食用手册', 
		icon: '/static/logo/logo-sysc.svg',
		url: 'https://cook.yunyoujun.cn/home',
		description: '根据所选材料推荐菜谱及相关做法'
	},
	{ 
		id: 102, name: '听懂一切', 
		icon: '/static/logo/logo-tdyq.png',
		url: 'https://tingdong.cn/',
		description: '各种音频产品的云试听，可作为参考'
	},
]

const toPage = (page) => {

	uni.navigateTo({
		url: '/pages/' + page + '/' + page,
		success: (res) => { 
			// res.eventChannel.emit('acceptData', { id: 'bakaqr' })
			console.log('to: ' + page)
		},
		fail: (e) => console.log(e),
		events: {
			// acceptData: function(data) { console.log(data) }
		},
		animationType: 'pop-in',
		animationDuration: 500
	})

}

</script>

<style lang="scss">
.banner-swiper{
	width: 100%;
	height: 430rpx;
}

.banner-images{
	width: 100%;
	height: 100%;
}

.container {
	padding: 32rpx;
	margin: 32rpx;
	font-size: fs('normal');
	border-radius: 8rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.grid-nav{
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	gap: 16rpx;
}

.grid-item-container{
	width: 30%;
	padding: 16rpx 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16rpx;
	background-color: #fafafa;
	border-radius: 8rpx;
  box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
	
	image {
		width: 100rpx;
		height: 100rpx;
	}
	
	&:hover{
		cursor: pointer;
	}
	
}

.foot{
	margin: 16rpx auto;
	padding: 16rpx 0;
	width: 300rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: fs('small');
	
}

.grid-title-text {
	font-size: fs('xxl');
	font-weight: bold;
	color: #027fff;
	padding-left: 8rpx;
}

.grid-item-title {
	font-size: fs('small');
	text-align: center;
}

.grid-item-description {
	font-size: fs('xs');
	color: #6c6c6c;
	text-align: center;
	padding: 0 16rpx;
}
</style>
